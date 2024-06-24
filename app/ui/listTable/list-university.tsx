import { FilterType, WishData } from '@/app/lib/definitions';
import { theme } from 'antd';
import ListContent from './list-content';
import ListHeader from './list-header';

export default function ListUniversity({
  filterType,
  wishData,
}: {
  filterType: FilterType;
  wishData: WishData;
}) {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <>
      <ListHeader token={token} />
      <ListContent filterType={filterType} wishData={wishData} />
    </>
  );
}
