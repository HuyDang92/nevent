import IonIcon from '@reacticons/ionicons';

type IconProps = {
  className?: string;
  name: string;
};

const Icon = ({ className, name }: IconProps) => {
  return <IonIcon name={name as any} className={`  ${className}`} />;
};

export default Icon;
