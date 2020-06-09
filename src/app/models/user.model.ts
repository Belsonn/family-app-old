export interface UserModelResponse {
  status: string;
  data: {
    user: UserModel;
  };
}

export interface UserModel {
  family: string,
  _id: string,
  name: string,
  email: string
}
