import { CategoryUser, Community, CommunityMember, User } from "./type";

export const userMockData: User[] = [
  {
    id: 1,
    no: "3578160203990001",
    fullName: "Maulana Faisal Fardani",
    username: "akun_fans123",
    password: "password123",
    telphone: "081234567801",
    address: "jl rungkut 2 no 100 Surabaya",
    categoryUserId: 1,
  },
  {
    id: 2,
    no: "E58728453",
    fullName: "Tom Cruise",
    username: "akun_tourist123",
    password: "password123",
    telphone: "081234567802",
    address: "jl rungkut 6 no 10 Surabaya",

    categoryUserId: 2,
  },
  {
    id: 3,
    no: "3578161407920002",
    fullName: "Supri Karbu",
    username: "akun_community_rungkut",
    password: "password123",
    telphone: "081234567803",
    address: "jl rungkut 3 no 12 Surabaya",
    categoryUserId: 3,
  },

  {
    id: 4,
    no: "3578170301850003",
    fullName: "Agus Kopling",
    username: "akun_comunity_gubeng",
    password: "password123",
    telphone: "081234567804",
    address: "jl gubeng 3 no 15 Surabaya",
    categoryUserId: 3,
  },
];

export const mockCategoryUser: CategoryUser[] = [
  {
    id: 1,
    name: "Fans Lokal",
  },
  {
    id: 2,
    name: "Tourist",
  },
  {
    id: 3,
    name: "Leader Community",
  },
];

export const mockCommunity: Community[] = [
  {
    id: 1,
    name: "Komunitas Persebaya Rungkut",
    leaderUserId: 3,
  },

  {
    id: 2,
    name: "Komunitas Persebaya Gubeng",
    leaderUserId: 4,
  },
];

export const mockCommunityMembers: CommunityMember[] = [
  {
    id: 1,
    name: "member persebaya rungkut - 1",
    nik: "3578160203990002",
    communityId: 1,
  },
  {
    id: 2,
    name: "member persebaya rungkut - 2",
    nik: "3578160203490002",
    communityId: 1,
  },
  {
    id: 3,
    name: "member persebaya rungkut - 3",
    nik: "3578160205990002",
    communityId: 1,
  },
  {
    id: 4,
    name: "member persebaya rungkut - 4",
    nik: "3578160243990002",
    communityId: 1,
  },
  {
    id: 5,
    name: "member persebaya rungkut - 5",
    nik: "3578160203990003",
    communityId: 1,
  },
  {
    id: 6,
    name: "member persebaya rungkut - 6",
    nik: "3578160203990004",
    communityId: 1,
  },
  {
    id: 7,
    name: "member persebaya rungkut - 7",
    nik: "3578160203990005",
    communityId: 1,
  },
  {
    id: 8,
    name: "member persebaya rungkut - 8",
    nik: "3578160203990006",
    communityId: 1,
  },
  {
    id: 9,
    name: "member persebaya rungkut - 9",
    nik: "3578160203990007",
    communityId: 1,
  },
  {
    id: 10,
    name: "member persebaya rungkut - 10",
    nik: "3578160203990008",
    communityId: 1,
  },
  {
    id: 11,
    name: "member persebaya rungkut - 11",
    nik: "3578160203990009",
    communityId: 1,
  },
  {
    id: 12,
    name: "member persebaya rungkut - 12",
    nik: "3578160203990010",
    communityId: 1,
  },
  {
    id: 13,
    name: "member persebaya rungkut - 13",
    nik: "3578160203990011",
    communityId: 1,
  },
  {
    id: 14,
    name: "member persebaya rungkut - 14",
    nik: "3578160203990012",
    communityId: 1,
  },
  {
    id: 15,
    name: "member persebaya rungkut - 15",
    nik: "3578160203990013",
    communityId: 1,
  },
  {
    id: 16,
    name: "member persebaya rungkut - 16",
    nik: "3578160203990014",
    communityId: 1,
  },
  {
    id: 17,
    name: "member persebaya rungkut - 17",
    nik: "3578160203990015",
    communityId: 1,
  },
  {
    id: 18,
    name: "member persebaya rungkut - 18",
    nik: "3578160203990016",
    communityId: 1,
  },
  {
    id: 19,
    name: "member persebaya rungkut - 19",
    nik: "3578160203990017",
    communityId: 1,
  },
  {
    id: 20,
    name: "member persebaya rungkut - 20",
    nik: "3578160203990018",
    communityId: 1,
  },
  {
    id: 21,
    name: "member persebaya gubeng - 1",
    nik: "3578160204990001",
    communityId: 2,
  },
  {
    id: 22,
    name: "member persebaya gubeng - 2",
    nik: "3578160204990002",
    communityId: 2,
  },
  {
    id: 23,
    name: "member persebaya gubeng - 3",
    nik: "3578160204990003",
    communityId: 2,
  },
  {
    id: 24,
    name: "member persebaya gubeng - 4",
    nik: "3578160204990004",
    communityId: 2,
  },
  {
    id: 25,
    name: "member persebaya gubeng - 5",
    nik: "3578160204990005",
    communityId: 2,
  },
  {
    id: 26,
    name: "member persebaya gubeng - 6",
    nik: "3578160204990006",
    communityId: 2,
  },
  {
    id: 27,
    name: "member persebaya gubeng - 7",
    nik: "3578160204990007",
    communityId: 2,
  },
  {
    id: 28,
    name: "member persebaya gubeng - 8",
    nik: "3578160204990008",
    communityId: 2,
  },
  {
    id: 29,
    name: "member persebaya gubeng - 9",
    nik: "3578160204990009",
    communityId: 2,
  },
  {
    id: 30,
    name: "member persebaya gubeng - 10",
    nik: "3578160204990010",
    communityId: 2,
  },
];
