import { Select, Option } from '@material-tailwind/react';
import IonIcon from '@reacticons/ionicons';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
type FilterSelectorProp = {
  className?: string;
  type?: 'address' | 'category' | 'price';
  label: string;
};
type Address = {
  name: string;
};
const FilterSelector = ({ className, type = 'address', label }: FilterSelectorProp) => {
  const [optList, setOptList] = useState([]);
  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/')
      .then((res) => {
        setOptList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={`w-72 ${className}`}>
      <Select label={label} className="text-white" color="blue-gray">
        {optList.map((opt: Address, index: number) => (
          <Option key={index}>{opt.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export default FilterSelector;
