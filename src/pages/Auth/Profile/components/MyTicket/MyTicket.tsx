import { useEffect, useState } from 'react';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import Loading from '~/components/customs/Loading';

interface UserInfoProp {
  className?: string;
  data?: IUserField | null;
}

const MyTicket = ({ data, className }: UserInfoProp) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  console.log('MyTicket');
  
  return (
    <div className={`${className}`}>
      <h1 className="text-xl font-bold">Vé của bạn</h1>
    </div>
  );
};

export default MyTicket;
