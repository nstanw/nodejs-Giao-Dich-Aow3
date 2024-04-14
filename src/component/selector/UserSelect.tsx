import http from "../../services/http";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { User } from "../../services/giaoDichs/dto/Transactions";

const { Option } = Select;

const UserSelect = ({ onChange = (value) => {} }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await http.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Select placeholder="Select a user" onChange={(value) => onChange(value)}>
      {users.map((user) => (
        <Option key={user._id} value={user._id}>
          {user.fullName}
        </Option>
      ))}
    </Select>
  );
};

export default UserSelect;
