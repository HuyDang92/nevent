import { ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import IonIcon from '@reacticons/ionicons';

type ButtonProps = {
  icon?: string;
  className?: string;
  value: ReactNode | string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ icon, onClick, className, value, type = 'button' }: ButtonProps) => {
  return (
    <motion.button onClick={onClick} className={`px-4 py-2 flex ${className}`} whileTap={{ scale: 0.9 }} type={type}>
      {icon && (
        <>
            {icon?.includes('assets') ? (
                <img src={icon} className="h-[30px] w-[30px] mr-[20px]" alt="" />
              ) : (
                <IonIcon name={icon} className="mr-[20px] text-3xl" />
              )}
        </>
      )}
      {value}
    </motion.button>
  );
};

export default Button;
