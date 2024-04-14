import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, List, Card, message } from "antd";
import http from "../services/http";
import UserSelect from "./selector/UserSelect";
import AccSelect from "./selector/AccSelect";

function ListStaffs() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [accSelect, ] = useState();

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await http.get("api/user");
        const staffs = response.data;
        setStaffs(staffs);
        // Add code to handle the fetched staffs, such as updating the state
      } catch (error) {
        console.log("Error:", error);
        // Add code to handle error, such as displaying an error message
      }
    };

    fetchStaffs();
  }, []);

  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (!accSelect) {
          message.error("Please select a account");
        } else {
          console.log("Success:", values);
          //hàm add nhân viên dùng await
          try {
            await form.validateFields();
            const values = form.getFieldsValue();
            console.log("Success:", values);
            await http.post("api/user", values);
            form.resetFields();
            setIsModalVisible(false);
          } catch (error) {
            console.log("Error:", error);
            // Add code to handle error, such as displaying an error message
          }
          form.resetFields();
          setIsModalVisible(false);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    // Thêm code để xử lý dữ liệu form tại đây
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Thêm khách hàng
      </Button>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={staffs}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.fullName}>
              {/* Thêm thông tin khác của khách hàng vào Card tại đây */}
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="Tạo giao dịch mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Chọn khách hàng" name="user">
            <UserSelect />
            {/* thêm khách hàng */}
          </Form.Item>
          <Form.Item label="Chọn tài khoản" name="addGoogleAccount">
            <AccSelect />
            {/* thêm tài khoản */}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ListStaffs;
