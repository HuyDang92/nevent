import { useEffect, useState } from 'react';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import Loading from '~/components/customs/Loading';

interface UserInfoProp {
  className?: string;
  data?: IUserField | null;
}

const Notifycation = ({ data, className }: UserInfoProp) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return (
    <div className={`${className}`}>
      <h1 className="text-xl font-bold">Thông báo</h1>
    </div>
  );
};

export default Notifycation;
