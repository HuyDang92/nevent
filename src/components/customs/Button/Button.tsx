import React from 'react';
import { motion } from 'framer-motion';

type ButtonProps = {
  className?: string;
  value: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

const Button = ({ className, value, type = 'button', onClick }: ButtonProps) => {
  return (
    <motion.button
      className={`rounded-full border-2 border-cs_purple px-4 py-2 font-bold text-cs_purple transition hover:bg-cs_purple hover:text-white ${className}`}
      whileTap={{ scale: 0.9 }}
      type={type}
      onClick={onClick}
    >
      {value}
    </motion.button>
  );
};

export default Button;
