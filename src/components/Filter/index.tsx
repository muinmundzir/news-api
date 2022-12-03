import React, { FormEvent } from 'react'

import { Input, Select } from 'antd';

import { countryOptions } from '../../utils/countryEntities';
import { FilterInterface } from './FilterInterface';

const Filter = ({changeCountry, changeQuery, isQuerying}: FilterInterface) => {
  const handleChangeCountry = (value: string) => {
    changeCountry(value);
  };

  const handleChangeQuery = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    changeQuery(value);
  };

  const onSearch = (value: string) => {
    changeCountry(value);
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: '2rem' }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <p>Keyword</p>
          <Input
            placeholder="Search.."
            onChange={(event) => handleChangeQuery(event)}
          />
        </div>
        <p>Region</p>
        <Select
          disabled={isQuerying}
          showSearch
          optionFilterProp="children"
          defaultValue="us"
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          style={{ width: 120 }}
          onChange={handleChangeCountry}
          options={countryOptions}
        />
      </div>
  )
}

export default Filter