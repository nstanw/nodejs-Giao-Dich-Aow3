import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  List,
  Card,
  DatePicker,
  Input,
  InputNumber,
  Switch,
  Select,
  Table,
} from "antd";
import http from "../../services/http";
import AccSelect from "../selector/AccSelect";
import UserSelect from "../selector/UserSelect";
import columns from "./columns";
const { Option } = Select;
interface Staff {
  fullName: string;
  user: any;
  // Thêm các trường khác tương ứng với dữ liệu của bạn
}

function GiaoDichs() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [giaoDichs, setGiaoDichs] = useState<Staff[]>([]);
  const [userSelect, setUserSelect] = useState();
  const [accSelect, setAccSelect] = useState();
  const fetchGiaoDichs = async () => {
    try {
      const response = await http.get("api/giaoDichs");
      const staffs = response.data;
      setGiaoDichs(staffs);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchGiaoDichs();
  }, []);

  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          values.googleAccount = [accSelect];
          values.user = userSelect;
          await http.post("/api/giaoDichs", values);
          form.resetFields();
        } catch (error) {
          console.error(error);
        }
        form.resetFields();
        fetchGiaoDichs();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    // Thêm code để xử lý dữ liệu form tại đây
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Tạo giao dịch
      </Button>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={giaoDichs}
        renderItem={(item) => (
          <List.Item>
            <Card title={item?.user?.fullName}>
              {/* Thêm thông tin khác của khách hàng vào Card tại đây */}
            </Card>
          </List.Item>
        )}
      />
      <Table columns={columns} dataSource={giaoDichs} rowKey="_id" />;
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
          <Form.Item label="Chọn khách hàng" name="user">
            <UserSelect onChange={(value) => setUserSelect(value)} />
          </Form.Item>
          <Form.Item label="Chọn tài khoản" name="addGoogleAccount">
            <AccSelect onChange={(value) => setAccSelect(value)} />
          </Form.Item>
          <Form.Item label="Ngày giao dịch" name="ngayGiaoDich">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Nợ" name="isNo" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Số Gold" name="soGold">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Số tiền" name="soTien">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Loại chuyển khoản" name="loaiChuyenKhoan">
            <Select >
              <Option value="Ngân Hàng">Ngân Hàng</Option>
              <Option value="Momo">Momo</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Note" name="note">
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item label="Images" name="images">
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}

export default GiaoDichs;
