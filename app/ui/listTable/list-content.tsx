import { FilterType, WishData } from '@/app/lib/definitions';
import { DownOutlined } from '@ant-design/icons';
import { List } from 'antd';

export default function ListContent({
  filterType,
  wishData,
}: {
  filterType: FilterType;
  wishData: WishData;
}) {
  const data =
    filterType === 'rush'
      ? wishData.rushData
      : filterType === 'preserve'
        ? wishData.preserveData
        : wishData.steadyData;

  return (
    <div className="relative">
      <div className="absolute left-32 min-h-full">
        <List
          dataSource={data}
          pagination={{
            total: data.length,
            align: 'center',
          }}
          className="min-w-full"
          renderItem={(item, index) => (
            <List.Item>
              <div className="flex">
                <div className="w-52 flex-shrink-0">
                  <div className="text-xl">{item.collageName}</div>
                  <div className="mt-4 flex">
                    <div
                      className={`h-20 w-11 rounded bg-red-400 ${filterType === 'preserve' ? 'bg-[#3f91f5]' : filterType === 'steady' ? 'bg-[#f58e3f]' : 'bg-[#ee1e1e]'} px-2 pt-3 text-center text-xl text-white`}
                    >
                      {filterType === 'preserve'
                        ? '保'
                        : filterType === 'steady'
                          ? '稳'
                          : '冲'}{' '}
                      {index + 1}
                    </div>
                    <div className="items-left ml-4 flex flex-col justify-around opacity-60">
                      <span>院校代码 : {item.collageID}</span>
                      <span>
                        {item.collageLevel} {item.bz}
                      </span>
                      <span>
                        {item.province}/{item.city} {item.collageType}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mx-20 h-[124px] w-52 flex-shrink-0">
                  <div className="text-xl">{item.majorName}</div>
                  <div className="mt-4">
                    <div className="items-left flex h-20 flex-col justify-around opacity-60">
                      <span>专业代码 : {item.majorID}</span>
                      <div className="flex justify-between">
                        <span>人数: {item.planNum} </span>
                        <span>科目: {item.xk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>学费: {item.tuition} </span>
                        <span>学制: {item.schooling}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-52 flex-shrink-0 pt-8 text-xs font-thin opacity-60">
                  <span>{item.note} </span>
                </div>

                <div className="ml-8 w-80 flex-shrink-0">
                  <div className="mx-4 flex items-center justify-between whitespace-nowrap">
                    <div>
                      <span className="opacity-80">分数: </span>
                      <span> {item.score_new}分</span>
                    </div>
                    <div>{item.score_last}分</div>
                    <div>{item.score_qian}分</div>
                  </div>

                  <div className="my-4 flex h-12 items-center justify-between whitespace-nowrap bg-gray-100 px-4">
                    <div>
                      <span className="opacity-80">位次: </span>
                      <span> {item.position_new}名</span>
                    </div>
                    <div>{item.position_last}名</div>
                    <div>{item.position_qian}名</div>
                  </div>

                  <div className="mx-4 flex items-center justify-between whitespace-nowrap">
                    <div>
                      <span className="opacity-80">招生人数: </span>
                      <span> {item.planNum}人</span>
                    </div>
                    <div>{item.planNum_last}人</div>
                    <div>{item.planNum_qian}人</div>
                  </div>
                </div>

                <div className="ml-20 flex flex-col items-center justify-center whitespace-nowrap">
                  <DownOutlined />
                  <span className="opacity-80">更多信息</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
