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
  Spin,
  Space,
} from "antd";
import AccSelect from "../selector/AccSelect";
import UserSelect from "../selector/UserSelect";
import columns from "./columns";
import giaoDichServices from "../../services/giaoDichs/giaoDichServices";
import moment from "moment";
const { Option } = Select;
interface Staff {
  fullName: string;
  user: any;
  soGold: number;
  soTien: number;
  soTienNo: number;
  // Thêm các trường khác tương ứng với dữ liệu của bạn
}

function GiaoDichs() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [giaoDichs, setGiaoDichs] = useState<Staff[]>([]);
  const [userSelect, setUserSelect] = useState();
  const [accSelect, setAccSelect] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const fetchGiaoDichs = async () => {
    try {
      setIsLoading(true);
      const response = await giaoDichServices.getGiaoDichs();
      const staffs = response;
      setGiaoDichs(staffs);
      setIsLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
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
          await await giaoDichServices.addGiaoDich(values);
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

  const uniqueStaffs = giaoDichs.filter(
    (staff, index, self) =>
      index === self.findIndex((s) => s.user.fullName === staff.user.fullName)
  );
  const initvalue = {
    ngayGiaoDich: moment(),
    soTienNo: 0,
    loaiChuyenKhoan: "Ngân Hàng",
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Tạo giao dịch
      </Button>
      <Spin spinning={isLoading}>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, lg: 3 }}
          dataSource={uniqueStaffs}
          renderItem={(item) => (
            <List.Item>
              <Card title={item?.user?.fullName}>
                {/* Thêm thông tin khác của khách hàng vào Card tại đây */}
              </Card>
            </List.Item>
          )}
        />
      </Spin>
      <Space style={{ textAlign: "left" }}>
        <h4>
          Tổng số Gold:
          {giaoDichs
            .reduce((total, item) => total + item?.soGold, 0)
            .toLocaleString()}
        </h4>
        <h4>
          Tổng tiền:
          {giaoDichs
            .reduce((total, item) => total + item?.soTien, 0)
            .toLocaleString()}
        </h4>
        <h4>
          Tổng tiền nợ:
          {giaoDichs
            .reduce((total, item) => total + item?.soTienNo, 0)
            .toLocaleString()}
        </h4>
      </Space>
      <Table
        pagination={false}
        loading={isLoading}
        columns={columns}
        dataSource={giaoDichs}
        rowKey="_id"
      />
      ;
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
          initialValues={initvalue}
        >
          <Form.Item label="Chọn khách hàng" name="user">
            <UserSelect onChange={(value) => setUserSelect(value)} />
          </Form.Item>
          <Form.Item label="Chọn tài khoản" name="addGoogleAccount">
            <AccSelect
              onChange={(value) => setAccSelect(value)}
              user={userSelect}
            />
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
          <Form.Item label="Số tiền chuyển khoản" name="soTien">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Số tiền nợ" name="soTienNo">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Loại chuyển khoản" name="loaiChuyenKhoan">
            <Select>
              <Option value="No">Chưa thanh toán</Option>
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
