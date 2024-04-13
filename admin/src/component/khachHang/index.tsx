import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Modal, message } from "antd";
import http from "../../services/http";
import UserSelect from "../selector/UserSelect"; // adjust the path as needed
import DialogAddKhachHang from "../dialog/addKhachHang";

const KhachHangs = () => {
  const [form] = Form.useForm();
  const [googleAccounts, setGoogleAccounts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGoogleAccount, setEditingGoogleAccount] = useState<{
    _id: string;
  } | null>(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchKhachHangs();
  }, []);

  const fetchKhachHangs = async () => {
    const response = await http.get("/api/users");
    setGoogleAccounts(response.data);
  };

  const handleCreateOrUpdate = async (values) => {
    if (!user) {
      message.success("Please select a user");
    } else {
      values.user = user;
      if (editingGoogleAccount) {
        await http.patch(`/api/users/${editingGoogleAccount._id}`, values);
      } else {
        await http.post("/api/users", values);
      }
      setModalVisible(false);
      fetchKhachHangs();
    }
  };

  const handleDelete = async (googleAccount) => {
    await http.delete(`/api/users/${googleAccount._id}`);
    fetchKhachHangs();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      render: (text, _, index) => <div>{index + 1}</div>,
    },
    { title: "fullName", dataIndex: "fullName", key: "fullName" },
    { title: "zalo", dataIndex: "zalo", key: "zalo" },
    // {
    //   title: "facebook",
    //   dataIndex: "facebook",
    //   width: 150,
    //   key: "facebook",
    //   render: (text) => (
    //     <a href={text} target="_blank" rel="noopener noreferrer">
    //       {text}
    //     </a>
    //   ),
    // },
    { title: "note", dataIndex: "note", key: "note" },
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
      <DialogAddKhachHang
        onDone={function (): void {
          fetchKhachHangs();
        }}
      />
      <Table    pagination={false} dataSource={googleAccounts} columns={columns} rowKey="_id" />
      <Modal
        open={modalVisible}
        title="Thêm Khách Hàng"
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

export default KhachHangs;
