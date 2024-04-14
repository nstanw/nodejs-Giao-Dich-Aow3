import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal } from "antd"; // adjust the path as needed
import http from "../../../services/http";


interface IProps {
  onDone: () => void;
}

const DialogAddKhachHang : React.FC<IProps> = ({onDone}) => {
  const [form] = Form.useForm();
  const [, setGoogleAccounts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGoogleAccount, setEditingGoogleAccount] = useState<any>();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    fetchGoogleAccounts();
  }, []);

  const fetchGoogleAccounts = async () => {
    const response = await http.get("/api/users/");
    setGoogleAccounts(response.data);
  };

  const handleCreateOrUpdate = async (values: any) => {
    if (editingGoogleAccount) {
      await http.patch(
        `/api/users/${editingGoogleAccount._id}`,
        values
      );
    } else {
      await http.post("/api/users", values);
    }
    onDone();
    setModalVisible(false);
    fetchGoogleAccounts();
  };

  return (
    <div>
      <Button
        onClick={() => {
          setEditingGoogleAccount(null);
          setModalVisible(true);
        }}
      >
        New Khách Hàng
      </Button>
      <Modal
        open={modalVisible}
        title="Thêm Khách Hàng"
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          initialValues={editingGoogleAccount}
          onFinish={handleCreateOrUpdate}
        >
          <Form.Item
            label="Tên"
            name="fullName"
            rules={[{ required: true, message: "Please input the full name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Facebook" name="facebook">
            <Input />
          </Form.Item>
          <Form.Item label="Zalo" name="zalo">
            <Input />
          </Form.Item>
          <Form.Item label="Note" name="note">
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item label="Username" name="userName">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item> */}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DialogAddKhachHang;
