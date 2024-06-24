import {
  FilterType,
  UniversityWish,
  UserInfo,
  WishData,
} from '@/app/lib/definitions';
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import ListUniversity from '../listTable/list-university';

export default function FilterWish({
  data,
  userInfo,
}: {
  data: UniversityWish[];
  userInfo: UserInfo;
}) {
  const [wishData, setWishData] = useState<WishData>({
    totalData: [],
    steadyData: [],
    rushData: [],
    preserveData: [],
  });
  const [filterType, setFilterType] = useState<FilterType>('rush');

  useEffect(() => {
    const { score, score_interval, rank_interval } = userInfo;
    const totalData = data.filter(
      (item) =>
        Number(item.position_new) <= rank_interval[0] &&
        Number(item.position_new) > rank_interval[1]
    );
    const steadyData = data.filter(
      (item) =>
        // Number(item.score_new) > score - 20 &&
        // Number(item.score_new) < score + 20 &&
        Number(item.position_new) <= score_interval[0] &&
        Number(item.position_new) >= score_interval[1]
    );

    const rushData = totalData.filter(
      (item) =>
        // (Number(item.score_new) > score - 20 ||
        //   item.score_new === '新增专业') &&
        Number(item.position_new) < score_interval[1]
    );
    const preserveData = totalData.filter(
      (item) =>
        // (Number(item.score_new) >= score - 20 ||
        //   item.score_new === '新增专业') &&
        Number(item.position_new) >= score_interval[0]
    );
    setWishData({
      totalData,
      steadyData,
      rushData,
      preserveData,
    });
  }, [userInfo, data]);
  const handleFilter = (type: FilterType) => {
    setFilterType(type);
  };

  return (
    <>
      <div className="relative mt-6">
        <div className="absolute left-32 flex h-10 items-center overflow-hidden whitespace-nowrap bg-gray-100 px-5 py-7">
          <div>
            <span className="text-large tracking-widest text-gray-400">
              为您找到 {wishData.totalData.length} 条报考数据
            </span>
          </div>

          <div className="ml-7 flex items-center">
            <Button
              style={{
                width: '115px',
                height: '32px',
              }}
              type={filterType === 'rush' ? 'primary' : 'default'}
              onClick={() => handleFilter('rush')}
            >
              冲 {wishData.rushData.length}
            </Button>
            <Button
              style={{
                width: '115px',
                height: '32px',
                margin: '0 30px',
              }}
              type={filterType === 'steady' ? 'primary' : 'default'}
              onClick={() => handleFilter('steady')}
            >
              稳 {wishData.steadyData.length}
            </Button>
            <Button
              style={{
                width: '115px',
                height: '32px',
              }}
              type={filterType === 'preserve' ? 'primary' : 'default'}
              onClick={() => handleFilter('preserve')}
            >
              保 {wishData.preserveData.length}
            </Button>
          </div>

          <div className="ml-7 flex flex-nowrap whitespace-nowrap">
            <Input
              addonBefore="院校搜索"
              className="mr-7"
              disabled
              style={{
                width: '270px',
              }}
            />
            <Input
              addonBefore="专业搜索"
              disabled
              style={{
                width: '270px',
              }}
            />
          </div>
        </div>
      </div>

      <div className="h-14" />
      <ListUniversity filterType={filterType} wishData={wishData} />
    </>
  );
}
