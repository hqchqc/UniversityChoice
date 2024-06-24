export type UniversityWish = {
  id: number;
  collageID: string;
  collageName: string;
  province: string;
  city: string;
  bz: string;
  collageLevel: string;
  collageType: string;
  majorID: string;
  majorName: string;
  planNum: number;
  planNum_2: null | number;
  schooling: string;
  tuition: string;
  xk: string;
  xk_pre: string;
  xk_last: string;
  xk_qian: string;
  note: string;
  score_new: string;
  score_last: string;
  score_qian: string;
  position_new: string;
  position_last: number;
  position_qian: number;
  planNum_last: number;
  planNum_qian: number;
  xkpg: null | string;
  rkdx: string;
  rkzy: string;
  sszy: null | string;
  yxsp: string;
  zysp: null | string;
  zsjz_url: null | string;
};

export type UserInfo = {
  score: number;
  score_interval: number[];
  rank_interval: number[];
  choice_sub: string[];
};

export type WishData = {
  totalData: UniversityWish[];
  steadyData: UniversityWish[];
  rushData: UniversityWish[];
  preserveData: UniversityWish[];
};

export type FilterType = 'rush' | 'steady' | 'preserve';
