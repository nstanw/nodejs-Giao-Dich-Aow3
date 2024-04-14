import http from "../../services/http";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { GoogleAccount, User } from "../../services/giaoDichs/dto/Transactions";

const { Option } = Select;

const AccSelect = ({ onChange = (value) => {}, user }) => {
  const [googleAccount, setGoogleAccount] = useState<GoogleAccount[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await http.get("/api/googleAccounts", {
          params: { user: user },
        });
        setGoogleAccount(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <Select placeholder="Chọn tài khoản" onChange={(value) => onChange(value)}>
      {googleAccount.map((user) => (
        <Option key={user._id} value={user._id}>
          {user.gmail}
        </Option>
      ))}
    </Select>
  );
};

export default AccSelect;
