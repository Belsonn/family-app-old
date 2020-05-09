export interface FamilyResponse {
  status: string;
  data: {
    family: Family;
  };
}

export interface Family {
  users: [User];
  groceries: [string];
  _id: string;
  name: string;
  inviteToken: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}
