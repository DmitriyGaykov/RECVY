export class User {
  id: string;
  login: string;
  firstname: string;
  lastname: string;
  password: string;
  aboutme: string;
  age: number;
  regdate: Date;
  role: string[];
  photos: string[];
}

export type BlockedUser = User & { reason: string };