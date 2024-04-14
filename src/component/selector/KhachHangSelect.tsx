import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import useDebounce from '../../util/useDebounce';
import { User } from '../../services/giaoDichs/dto/Transactions';
import userService from '../../services/users/userService';

const { Option } = Select;

interface ISelectInputProps {
  value?: LabeledValue;
  onChange?: (value: LabeledValue) => void;
  defaultValue?: LabeledValue;
  macv: string;
  style?: React.CSSProperties;
}

const KhachHangSelect: React.FC<ISelectInputProps> = ({ value = undefined, onChange, macv, defaultValue, style }) => {
  const [fetching, setFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [nhanViens, setNhanViens] = useState<User[]>([]);
  const [selected, setSelected] = useState<string | number | LabeledValue>();

  useEffect(() => {
    (async function run() {
      if (debouncedSearchTerm) {
        setNhanViens([]);
        setFetching(true);
        var items = await userService.getAllUsers({ limit: 500, q: debouncedSearchTerm });
        setFetching(false);
        setNhanViens(items);
      } else {
        setNhanViens((await userService.getAllUsers({ limit: 500 })));
      }
      setFetching(false);
    })();
  }, [debouncedSearchTerm]);

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onSearch = (value) => {
    setSearchTerm(value);
  };
  return (
    <>
      <Select
        showSearch
        style={style}
        labelInValue
        allowClear={true}
        notFoundContent={
          fetching ? <Spin size="small" /> : <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>Không tìm thấy</div>
        }
        onSearch={(value) => onSearch(value)}
        value={selected || value}
        filterOption={false}
        onChange={(selection, object) => {
          setSelected(selection);
          triggerChange(selection);
        }}
      >
        {nhanViens.map((d) => (
          <Option value={d._id} key={d._id}>
            {d.fullName}
          </Option>
        ))}
      </Select>
    </>
  );
};
export default KhachHangSelect;
