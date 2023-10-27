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
