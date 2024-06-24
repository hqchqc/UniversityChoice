import { GlobalToken, Tag } from 'antd';

export default function ListHeader({ token }: { token: GlobalToken }) {
  return (
    <div className="mt-4 flex items-center px-32">
      <div className="ml-2 flex items-center whitespace-nowrap">
        <div>
          <Tag color={token.colorPrimaryActive}>2024年最新</Tag>
          <span className="text-sm opacity-60">招生院校</span>
        </div>

        <div className="mx-32">
          <Tag color={token.colorPrimaryActive}>2024年最新</Tag>
          <span className="text-sm opacity-60">招生专业</span>
        </div>

        <div>
          <Tag color={token.colorPrimaryActive}>2024年最新</Tag>
          <span className="text-sm opacity-60">专业简注</span>
        </div>
      </div>

      <div className="flex items-center whitespace-nowrap">
        <span className="ml-28 text-sm opacity-60">2023年招录</span>
        <span className="mx-10 text-sm opacity-60">2022年招录</span>
        <span className="text-sm opacity-60">2021年招录</span>
        <span className="ml-28 text-sm opacity-60">操作</span>
      </div>
    </div>
  );
}
