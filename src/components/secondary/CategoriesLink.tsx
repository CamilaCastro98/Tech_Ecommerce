import React, { Children } from 'react';
import Link from 'next/link';
import ICategoryLink from '@/interfaces/CategoryLink';

const CategoryLink: React.FC <ICategoryLink>= ({index,children}) => {
  return (
    <li key={index}>
      <Link className="categories" href={`/category/${index}`}>
        {children}
      </Link>
    </li>
  );
};

export default CategoryLink;
