interface IEvent {
  _id: string;
  creator: Creator;
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
  totalTicketIssue: number;
  salesStartDate: string;
  salesEndDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Creator {
  _id: string;
  user: IUserField;
  type: string;
  name: string;
  crn: string;
  placeOfIssue: string;
  dateOfIssue: string;
  address: string;
  cccd: string;
  taxCode: string;
  organization_name: string;
  description: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
interface IEventInfo {
  banner: string[];
  logo: string;
  name: string;
  address: string;
  location: ILocation | null;
  category: string;
  categories: ICategory | null;
  description: string;
  file: null | File[];
  // organization_name: string;
  // organization_desc: string;
  // organization_phone: string;
  // organization_email: string;
  // organization_img: string;
}
interface IAddTimeline {
  beginDate: string;
  endDate: string;
  beginTime: string;
  endTime: string;
}
interface TicketListInfo {
  title: string;
  quantity: number;
  color: string;
  type: string;
  price: number;
  desc: string;
}
interface IEventSettings {
  URL: string;
  privacy: string;
  name: string;
  noti: string;
  active_noti: boolean;
}
interface IPaymentInfo {
  owner: string;
  account_num: string;
  bank: string;
  branch: string;
  VAT: boolean;
}
// Định nghĩa một interface cho đối tượng Ticket
interface Ticket {
  status: string;
  _id: string;
  title: string;
  type: string;
  color: string;
  price: number;
  desc: string;
  qr: string;
}

// Định nghĩa một interface cho đối tượng ITicket
interface ITicket {
  totalTickets: number;
  event: IEvent;
  myTickets: Ticket[];
}
interface IPurchase {
  _id: string;
  tickets: Ticket[];
  code: string | null;
  user: string;
  date: string;
  status: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
