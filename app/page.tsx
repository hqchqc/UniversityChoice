'use client';

import { createFromIconfontCN } from '@ant-design/icons';
import { theme } from 'antd';
import FilterScore from './ui/baseInfo/filter-score';

export default function Home() {
  const { useToken } = theme;
  const { token } = useToken();
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4591694_xbnj1c8c0af.js',
  });

  return (
    <main>
      <FilterScore IconFont={IconFont} token={token} />
    </main>
  );
}
