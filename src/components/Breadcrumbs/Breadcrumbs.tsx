import React from 'react';
import { Breadcrumbs } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

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
      <Link to={linkBack} className="text-[0.9375rem] font-medium leading-normal text-cs_gray">
        {baseLink}
      </Link>
      <Link
        to={`#`}
        className="max-w-[250px] truncate text-[0.9375rem] font-medium leading-normal text-cs_gray md:max-w-none"
      >
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
