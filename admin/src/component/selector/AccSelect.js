import http from "../../services/http";
import React, { useEffect, useState } from "react";
import { Select } from "antd";

const { Option } = Select;

const AccSelect = ({ onChange = (value) => {} }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await http.get("/api/googleAccounts");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Select placeholder="Chọn tài khoản" onChange={(value) => onChange(value)}>
      {users.map((user) => (
        <Option key={user._id} value={user._id}>
          {user.gmail}
        </Option>
      ))}
    </Select>
  );
};

export default AccSelect;
