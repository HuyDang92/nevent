import { ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import IonIcon from '@reacticons/ionicons';

type ButtonProps = {
  icon?: string;
  className?: string;
  value: ReactNode | string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  mode?: 'light' | 'dark';
  border?: string;
};

const Button = ({
  icon,
  onClick,
  className,
  value,
  type = 'button',
  mode = 'light',
  border = 'rounded-xl',
}: ButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex gap-2 ${border} border px-4 py-2 font-medium shadow-border-btn transition-all hover:scale-105 ${
        mode === 'light' ? 'text-dark bg-white' : 'border-cs_light bg-black text-white dark:border-2'
      }  ${className}`}
      whileTap={{ scale: 0.9 }}
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
