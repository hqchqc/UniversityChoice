import { subMapToCn } from './map-word';

export async function fetchWishData(score: Number, choice_sub: string[]) {
  try {
    const subMap = choice_sub.map((item) => subMapToCn[item]);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}?score=${score}&xk1=${subMap[0]}&xk2=${subMap[1]}&xk3=${subMap[2]}`,
      {
        method: 'get',
        headers: {
          Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION as string,
        },
      }
    );
    let res = await result.json();
    return res;
  } catch (error) {
    console.error('Get Data Error', error);
    throw new Error('Failed to fetchWishData');
  }
}
