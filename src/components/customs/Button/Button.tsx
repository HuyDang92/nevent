import { ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import Icon from '../Icon';

type ButtonProps = {
  icon?: string;
  className?: string;
  value?: ReactNode | string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  mode?: 'light' | 'dark';
  rounded_full?: boolean;
  disabled?: boolean;
};

const Button = ({
  icon,
  onClick,
  disabled,
  className,
  value,
  type = 'button',
  mode = 'light',
  rounded_full,
}: ButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${value && icon && 'flex items-center justify-center'} gap-2 ${
        rounded_full ? 'rounded-full' : 'rounded-[10px]'
      } px-3 py-2 font-medium shadow-border-light transition-all sm:px-4 sm:py-2 ${
        mode === 'light' ? 'bg-white text-cs_semi_green' : ' bg-cs_semi_green text-white'
      }  ${className} text-sm sm:text-[15px]`}
      whileTap={{ scale: 0.9 }}
      type={type}
      disabled={disabled}
    >
      {icon && <Icon name={icon} className="text-sm sm:text-xl" />}
      <span>{value}</span>
    </motion.button>
  );
};

export default Button;
