import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, message } from "antd"; // adjust the path as needed
import http from "../../../services/http";
import UserSelect from "../../selector/UserSelect";

interface IProps {
  onDone: () => void;
}

const AddGoogleAccount: React.FC<IProps> = ({onDone}) => {
  const [form] = Form.useForm();
  const [, setGoogleAccounts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGoogleAccount, setEditingGoogleAccount] = useState<any>();
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchGoogleAccounts();
  }, []);

  const fetchGoogleAccounts = async () => {
    const response = await http.get("/api/googleAccounts/");
    setGoogleAccounts(response.data);
  };

  const handleCreateOrUpdate = async (values: any) => {
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
      onDone();
      setModalVisible(false);
      fetchGoogleAccounts();
    }
  };

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
      <Modal
        open={modalVisible}
        title="Google Account"
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          initialValues={editingGoogleAccount}
          onFinish={handleCreateOrUpdate}
        >
          <Form.Item
            label="user"
            name="user"
            rules={[{ required: true, message: "Please input the gmail!" }]}
          >
            <UserSelect onChange={(value) => setUser(value)} />
          </Form.Item>
          <Form.Item
            label="Gmail"
            name="gmail"
            rules={[{ required: true, message: "Please input the gmail!" }]}
          >
            <Input />
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

export default AddGoogleAccount;
