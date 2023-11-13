interface ITicket {
  _id: string;
  title: string;
  type: string;
  event_id: string;
  color: string;
  price: number;
  quantity: number;
  desc: string;
}
interface IPayloadNotify {
  sender: string;
  recipient: string;
  content: string;
  url: string;
}
