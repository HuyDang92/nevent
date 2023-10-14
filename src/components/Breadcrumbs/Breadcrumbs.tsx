import React from 'react';
import { Breadcrumbs } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Icon from '../customs/Icon';

interface IProps {
  baseLink: string;
  linkBack: string;
  link?: string;
}

const BreadcrumbsComponent: React.FC<IProps> = ({ baseLink, linkBack, link }) => {
  const breadcrumbsCommonProps = {
    className: 'items-center bg-transparent p-0 pb-5 px-2',
  };

  return link ? (
    <Breadcrumbs {...breadcrumbsCommonProps}>
      <Link to={linkBack} className=" text-[0.9375rem] font-medium leading-normal text-cs_gray">
        {baseLink}
      </Link>
      <Link to={`#`} className="text-[0.9375rem] font-medium leading-normal text-cs_gray">
        {link}
      </Link>
    </Breadcrumbs>
  ) : (
    <Breadcrumbs {...breadcrumbsCommonProps}>
      <Link to={linkBack} className="text-[0.9375rem] font-medium leading-normal text-cs_gray">
        {baseLink}
      </Link>
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;