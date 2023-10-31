export interface TabsProp {
  children: React.ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  availableLink?: boolean
}

export interface TabsHeaderProp {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  activeTab?: number;
  setActiveTab?: (index: number) => void;
  children: React.ReactNode;
}

export interface TabProp {
  index: number;
  className?: string;
  activeTab?: number;
  width?: number;
  setActiveTab?: (index: number) => void;
  children?: React.ReactNode;
  onClick?: () => void;
  link?: string;
}

export interface TabsBodyProp {
  className?: string;
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  activeTab?: number;
  setActiveTab?: (index: number) => void;
}

export interface TabsContent {
  index?: number;
  className?: string;
  children?: React.ReactNode | string;
  activeTab?: number;
}
