interface IUserField {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  phone: string;
  address: string;
  avatar: {
    url: string;
  };
  role: {
    id: string;
    name: string;
  };
  coverImage: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}
interface INotify {
  _id: string;
  sender: IUserField;
  recipient: IUserField;
  content: string;
  url: null | string;
  view: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
