import { ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import IonIcon from '@reacticons/ionicons';

type IconProps = {
  className?: string;
  name: string;
};

const Icon = ({ className, name }: IconProps) => {
  return <IonIcon name={name as any} className={`text-dark dark:text-white  ${className}`} />;
};

export default Icon;
