export interface IRequestUser {
  // for token decoded
  user: {
    id: number;
    email: string;
    role: string;
    branchId: number;
    status: string;
  };
}
