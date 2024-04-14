import React, { useState } from 'react';
import { Select, Radio, Space } from 'antd';

const { Option } = Select;

const SortComponent = ({ onSortChange }) => {
  const [sortField, setSortField] = useState('ngayGiaoDich');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSortFieldChange = (value) => {
    setSortField(value);
    onSortChange(value, sortOrder);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    onSortChange(sortField, e.target.value);
  };

  return (
    <Space>
      <Select defaultValue={sortField} style={{ width: 120 }} onChange={handleSortFieldChange}>
        <Option value="ngayGiaoDich">Time Transaction</Option>
        <Option value="user">Name</Option>
        {/* Add more options as needed */}
      </Select>
      <Radio.Group onChange={handleSortOrderChange} value={sortOrder}>
        <Radio value={'asc'}>Ascending</Radio>
        <Radio value={'desc'}>Descending</Radio>
      </Radio.Group>
    </Space>
  );
};

export default SortComponent;