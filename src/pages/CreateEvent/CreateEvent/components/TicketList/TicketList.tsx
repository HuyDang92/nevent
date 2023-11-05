interface Prop {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const TicketList = ({ setActiveStep }: Prop) => {
  return <h1>Ticket</h1>;
};

export default TicketList;
