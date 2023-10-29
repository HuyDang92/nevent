import { ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import IonIcon from '@reacticons/ionicons';

type ButtonProps = {
  icon?: string;
  className?: string;
  value?: ReactNode | string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  mode?: 'light' | 'dark';
  rounded_full?: boolean;
};

const Button = ({ icon, onClick, className, value, type = 'button', mode = 'light', rounded_full }: ButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${value && icon && 'flex justify-center'} gap-2 ${
        rounded_full ? 'rounded-full' : 'rounded-xl'
      } px-4 py-2 font-medium shadow-border-light transition-all ${
        mode === 'light' ? 'bg-white text-cs_semi_green' : ' bg-cs_semi_green text-white'
      }  ${className}`}
      whileTap={{ scale: 0.9 }}
      type={type}
    >
      {icon && <IonIcon name={icon as any} className="text-2xl" />}
      <span>{value}</span>
    </motion.button>
  );
};

export default Button;
