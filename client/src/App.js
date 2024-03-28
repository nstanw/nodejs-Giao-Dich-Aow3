import React from "react";
import {
  Form,
  Input,
  DatePicker,
  Switch,
  InputNumber,
  Button,
  message,
} from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const App = () => {
  const onFinish = (values) => {
    console.log("Received values from form: ", values);
  };

  const props = {
    name: "image",
    action: "http://localhost:5000/upload",
    // headers: {
    //   authorization: "authorization-text",
    // },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


  const propsMultyUpload = {
    name: 'images',
    action: 'http://localhost:5000/uploads',
    headers: {
      // authorization: 'authorization-text',
    },
    multiple: true,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <>Nhập thông tin giao dịch</>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        name="user_form"
        onFinish={onFinish}
      >
        <Form.Item name={["newUser", "upload"]} label="Upload 1 file">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
       
        <Form.Item name={["newUser", "uploads"]} label="Upload nhiều file">
          <Upload {...propsMultyUpload}>
            <Button icon={<UploadOutlined />}>Click to Upload many file</Button>
          </Upload>
        </Form.Item>

        <Form.Item name={["newUser", "userName"]} label="User Name">
          <Input />
        </Form.Item>
        <Form.Item name={["newUser", "fullName"]} label="Full Name">
          <Input />
        </Form.Item>
        <Form.Item name={["newUser", "email"]} label="Email">
          <Input />
        </Form.Item>
        <Form.Item name={["newUser", "password"]} label="Password">
          <Input.Password />
        </Form.Item>
        <Form.Item name={["newUser", "facebook"]} label="Facebook">
          <Input />
        </Form.Item>
        <Form.Item name={["newUser", "zalo"]} label="Zalo">
          <Input />
        </Form.Item>
        <Form.Item name={["taiKhoan", "gmail"]} label="Gmail">
          <Input />
        </Form.Item>
        <Form.Item name={["taiKhoan", "password"]} label="Password">
          <Input.Password />
        </Form.Item>
        <Form.Item
          name={["thongTinGiaoDich", "ngayGiaoDich"]}
          label="Transaction Date"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={["thongTinGiaoDich", "isNo"]}
          label="Is No"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item name={["thongTinGiaoDich", "soGold"]} label="Gold Amount">
          <InputNumber />
        </Form.Item>
        <Form.Item name={["thongTinGiaoDich", "soTien"]} label="Money Amount">
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["thongTinGiaoDich", "loaiChuyenKhoan"]}
          label="Transaction Type"
        >
          <Input />
        </Form.Item>
        <Form.Item name={["thongTinGiaoDich", "note"]} label="Note">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
