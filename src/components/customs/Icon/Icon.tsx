import IonIcon from '@reacticons/ionicons';
import { MouseEvent } from 'react';

type IconProps = {
  className?: string;
  name: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Icon = ({ className, name, onClick }: IconProps) => {
  return (
    <button onClick={onClick}>
      <IonIcon name={name as any} className={`  ${className}`} />
    </button>
  );
};

export default Icon;
