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
      className={`${value && icon && 'flex'} gap-2 ${
        rounded_full ? 'rounded-full' : 'rounded-xl'
      } border px-4 py-2 font-medium shadow-border-light transition-all ${
        mode === 'light' ? 'bg-white text-cs_semi_green' : 'border-cs_light bg-cs_semi_green text-white'
      }  ${className}`}
      whileTap={{ scale: 0.8 }}
      type={type}
    >
      {icon && (
        <>
          {icon?.includes('assets') ? (
            <img src={icon} className="h-[30px] w-[30px]" alt="" />
          ) : (
            <IonIcon name={icon as any} className="text-2xl" />
          )}
        </>
      )}
      <span>{value}</span>
    </motion.button>
  );
};

export default Button;
