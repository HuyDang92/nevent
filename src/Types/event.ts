interface IEvent {
  _id: string;
  title: string;
  start_date: string;
  location: {
    name: string;
  };
  desc: string;
  categories: ICategory[];
  status: string;
  approve: boolean;
  hot: boolean;
  hotLevel: number;
  banner: IBanner[];
  updatedAt: string;
}

interface ICategory {
  _id: string;
  name: string;
  image: IImage;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IBanner {
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
}

interface IImage {
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
}
// Định nghĩa một interface cho đối tượng Ticket
interface Ticket {
  status: string;
  _id: string;
  title: string;
  type: string;
  color: string;
  price: number;
}

// Định nghĩa một interface cho đối tượng ITicket
interface ITicket {
  totalTickets: number;
  event: IEvent;
  myTickets: Ticket[];
}
