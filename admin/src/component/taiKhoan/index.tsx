import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Modal, message } from "antd";
import http from "../../services/http";
import UserSelect from "../selector/UserSelect"; // adjust the path as needed

const GoogleAccountCRUD = () => {
  const [form] = Form.useForm();
  const [googleAccounts, setGoogleAccounts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGoogleAccount, setEditingGoogleAccount] = useState<{
    _id: string;
  } | null>(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchGoogleAccounts();
  }, []);

  const fetchGoogleAccounts = async () => {
    const response = await http.get("/api/googleAccounts");
    setGoogleAccounts(response.data);
  };

  const handleCreateOrUpdate = async (values) => {
    if (!user) {
      message.success("Please select a user");
    } else {
      values.user = user;
      if (editingGoogleAccount) {
        await http.patch(
          `/api/googleAccounts/${editingGoogleAccount._id}`,
          values
        );
      } else {
        await http.post("/api/googleAccounts", values);
      }
      setModalVisible(false);
      fetchGoogleAccounts();
    }
  };

  const handleDelete = async (googleAccount) => {
    await http.delete(`/api/googleAccounts/${googleAccount._id}`);
    fetchGoogleAccounts();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      render: (text, _, index) => <div>{index + 1}</div>,
    },
    { title: "Gmail", dataIndex: "gmail", key: "gmail" },
    { title: "Password", dataIndex: "password", key: "password" },
    { title: "Info", dataIndex: "info", key: "info" },
    {
      title: "Action",
      key: "action",
      render: (_, googleAccount) => (
        <div>
          <Button
            onClick={() => {
              setEditingGoogleAccount(googleAccount);
              setModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(googleAccount)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        onClick={() => {
          setEditingGoogleAccount(null);
          setModalVisible(true);
        }}
      >
        New Google Account
      </Button>
      <Table  pagination={false} dataSource={googleAccounts} columns={columns} rowKey="_id" />
      <Modal
        visible={modalVisible}
        title="Google Account"
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingGoogleAccount || undefined}
          onFinish={handleCreateOrUpdate}
        >
          <Form.Item
            label="Gmail"
            name="gmail"
            rules={[{ required: true, message: "Please input the gmail!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="user"
            name="user"
            rules={[{ required: true, message: "Please input the gmail!" }]}
          >
            <UserSelect onChange={(value) => setUser(value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Info" name="info">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GoogleAccountCRUD;
