'use client';

import { fetchWishData } from '@/app/lib/data';
import { UniversityWish, UserInfo } from '@/app/lib/definitions';
import { subMapToCn } from '@/app/lib/map-word';
import { IconFontProps } from '@ant-design/icons/lib/components/IconFont';
import {
  Button,
  Checkbox,
  Col,
  GetProp,
  GlobalToken,
  InputNumber,
  InputNumberProps,
  Modal,
  Row,
  message,
} from 'antd';
import { FC, useEffect, useState } from 'react';
import styles from '../../home.module.css';
import FilterWish from '../totalData/filter-wish';

export default function FilterScore({
  IconFont,
  token,
}: {
  IconFont: FC<IconFontProps<string>>;
  token: GlobalToken;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabledBox, setDisabledBox] = useState<string[]>([]);
  const [score, setScore] = useState<Number>(0);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    score: 0,
    score_interval: [0, 0],
    rank_interval: [0, 0],
    choice_sub: [],
  });
  const [universityData, setUniversityData] = useState<UniversityWish[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const allSubjects = [
    'Physics',
    'Chemistry',
    'Biology',
    'Politics',
    'History',
    'Geography',
    'Technical',
  ];

  useEffect(() => {
    const userInfoByLocal = localStorage.getItem('_choice_useInfo');
    let unSelectSub: string[] = [];
    if (userInfoByLocal) {
      const parseUserInfo = JSON.parse(userInfoByLocal) as UserInfo;
      setUserInfo({
        ...parseUserInfo,
      });
      unSelectSub = allSubjects.filter(
        (item) => !parseUserInfo.choice_sub.includes(item)
      );
      if (parseUserInfo.choice_sub.length === 3 && parseUserInfo.score) {
        // handleOk();1
        fetchData(parseUserInfo);
      }
    } else {
      localStorage.setItem('_choice_useInfo', JSON.stringify(userInfo));
    }
    if (unSelectSub.length === 4) {
      setDisabledBox(unSelectSub);
    } else {
      setDisabledBox([]);
    }
    console.log('prod test');
  }, []);

  const fetchData = async (userInfo: UserInfo) => {
    const data = await fetchWishData(userInfo.score, userInfo.choice_sub);
    if (data.data.length) {
      setUserInfo({
        ...userInfo,
        rank_interval: data.position_default_range,
        score_interval: data.position_cb,
      });
      setUniversityData(data.data as UniversityWish[]);
      localStorage.setItem(
        '_choice_useInfo',
        JSON.stringify({
          ...userInfo,
          rank_interval: data.position_default_range,
          score_interval: data.position_cb,
        })
      );
    } else {
      messageApi.open({
        type: 'error',
        content: '网络请求异常，请检查网络！',
      });
      setUniversityData([]);
    }
  };

  const modalStyles = {
    header: {
      display: 'flex',
      justifyContent: 'center',
      color: 'yellow',
    },
  };

  const handleOk = async () => {
    const choice_sub = allSubjects.filter(
      (item) => !disabledBox.includes(item)
    );
    const userInfo = JSON.parse(
      localStorage.getItem('_choice_useInfo') || '{}'
    );

    const data = await fetchWishData(score, choice_sub);
    if (data.data.length) {
      setUserInfo({
        ...userInfo,
        score,
        choice_sub,
        rank_interval: data.position_default_range,
        score_interval: data.position_cb,
      });
      setUniversityData(data.data as UniversityWish[]);
      localStorage.setItem(
        '_choice_useInfo',
        JSON.stringify({
          ...userInfo,
          score,
          choice_sub,
          rank_interval: data.position_default_range,
          score_interval: data.position_cb,
        })
      );
    } else {
      messageApi.open({
        type: 'error',
        content: '网络请求异常，请检查网络！',
      });
      setUniversityData([]);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setScore(0);
    if (userInfo.choice_sub.length) {
      const unSelectSub = allSubjects.filter(
        (item) => !userInfo.choice_sub.includes(item)
      );
      setDisabledBox(unSelectSub);
    } else {
      setDisabledBox([]);
    }
  };

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    const unSelectSub = allSubjects.filter(
      (item) => !checkedValues.includes(item)
    );
    if (checkedValues.length === 3) {
      setDisabledBox(unSelectSub);
    } else {
      setDisabledBox([]);
    }
  };

  const handleScoreChange: InputNumberProps['onChange'] = (value) => {
    value && setScore(Number(value));
  };

  return (
    <>
      <header className="flex w-full items-center whitespace-nowrap px-32 pt-5">
        <div onClick={showModal} className="cursor-pointer">
          <span>
            🏆 我的高考总分: {userInfo.score === 0 ? '-' : userInfo.score}
          </span>
        </div>
        <div className="mx-48">
          <span>
            分数区间 : {userInfo.score === 0 ? '' : userInfo.score - 20} -{' '}
            {userInfo.score === 0 ? '' : userInfo.score + 20}
          </span>
        </div>
        <div className="mr-48">
          <span>
            位次区间 :
            {userInfo.rank_interval[0] === 0 ? '' : userInfo.rank_interval[0]} -{' '}
            {userInfo.rank_interval[1] === 0 ? '' : userInfo.rank_interval[1]}
          </span>
        </div>
        <div>
          <span className="inline">
            我的选科：
            {userInfo.choice_sub.map((item) => subMapToCn[item]).toString()}
          </span>
          <IconFont
            type="icon-edit"
            className="ml-2 cursor-pointer text-lg"
            style={{ color: `${token.colorPrimary}` }}
            onClick={showModal}
          />
        </div>
      </header>

      <FilterWish data={universityData} userInfo={userInfo} />

      <Modal
        title="请选择三门选考科目"
        width={420}
        footer={[
          <Button
            key="submit"
            type="primary"
            block
            onClick={handleOk}
            disabled={!(score && disabledBox.length === 4)}
          >
            智能填报
          </Button>,
        ]}
        destroyOnClose
        styles={modalStyles}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={handleClose}
      >
        <Checkbox.Group
          onChange={onChange}
          className={styles.checkboxIcon}
          defaultValue={userInfo.choice_sub}
        >
          <Row gutter={[16, 40]}>
            <Col>
              <Checkbox
                value="Physics"
                disabled={disabledBox.includes('Physics')}
              >
                <div className="flex flex-col items-center justify-center">
                  <IconFont type="icon-wuli" className="text-6xl" />
                  <span>物理</span>
                </div>
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="Chemistry"
                disabled={disabledBox.includes('Chemistry')}
              >
                <div className="flex flex-col items-center justify-center">
                  <IconFont type="icon-huaxue" className="text-6xl" />
                  <span>化学</span>
                </div>
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="Biology"
                disabled={disabledBox.includes('Biology')}
              >
                <div className="flex flex-col items-center justify-center">
                  <IconFont type="icon-shengwu" className="text-6xl" />
                  <span>生物</span>
                </div>
              </Checkbox>
            </Col>
          </Row>

          <Row gutter={[16, 40]}>
            <Col>
              <Checkbox
                value="Politics"
                disabled={disabledBox.includes('Politics')}
              >
                <div className="flex flex-col items-center justify-center">
                  <IconFont type="icon-zhengzhi" className="text-6xl" />
                  <span>政治</span>
                </div>
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="History"
                disabled={disabledBox.includes('History')}
              >
                <div className="flex flex-col items-center justify-center">
                  <IconFont type="icon-lishi" className="text-6xl" />
                  <span>历史</span>
                </div>
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="Geography"
                disabled={disabledBox.includes('Geography')}
              >
                <div className="flex flex-col items-center justify-center">
                  <IconFont type="icon-dili" className="text-6xl" />
                  <span>地理</span>
                </div>
              </Checkbox>
            </Col>
            <Col>
              <Checkbox
                value="Technical"
                disabled={disabledBox.includes('Technical')}
              >
                <div className="flex flex-col items-center justify-center">
                  <IconFont type="icon-xinxijishu" className="text-6xl" />
                  <span>技术</span>
                </div>
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>

        <InputNumber
          size="middle"
          style={{
            width: '100%',
            margin: '16px 0',
          }}
          onChange={handleScoreChange}
        />
      </Modal>
    </>
  );
}
