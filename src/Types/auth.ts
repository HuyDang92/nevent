interface IUserField {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  phone: string;
  address: string;
  avatar: string;
  role: {
    id: string;
    name: string;
  };
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}
