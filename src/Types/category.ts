interface ICategory {
  _id: string;
  name: string;
  image: {
    _id: string;
    url: string;
    secureUrl: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
}
