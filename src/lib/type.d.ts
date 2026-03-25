// Category User
export interface CategoryUser {
  id: number;
  name: string;
}

// User
export interface User {
  id: number;
  no: string;
  fullName: string;
  username: string;
  password: string;
  telphone: string;
  address: string;
  categoryUserId: number;
}

export interface Community {
  id: number;
  name: string;
  leaderUserId: number;
}

export interface CommunityMember {
  id: number;
  name: string;
  nik: string;
  communityId: number;
}

export type Member = {
  name: string;
  nik: string;
};
