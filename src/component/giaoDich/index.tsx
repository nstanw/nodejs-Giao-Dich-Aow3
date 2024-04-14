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
  Descriptions,
  TimeRangePickerProps,
} from "antd";
import { Link } from 'react-router-dom';
import AccSelect from "../selector/AccSelect";
import UserSelect from "../selector/UserSelect";
import columns from "./columns";
import giaoDichServices from "../../services/giaoDichs/giaoDichServices";
import moment from "moment";
import dayjs from "dayjs";
import KhachHangSelect from "../selector/KhachHangSelect";
import SortComponent from "./search";

const { RangePicker } = DatePicker;
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
  const [userSelect, setUserSelect] = useState<any>();
  const [accSelect, setAccSelect] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const startDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
  const startDate = dayjs().add(-1, 'd').format('YYYY-MM-DD HH:mm:ss');
  const endDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

  const fetchGiaoDichs = async (startDate, endDate) => {
    try {
      setIsLoading(true);

      const response = await giaoDichServices.getAllGiaoDichs(
        {
          startDate: startDate,
          endDate: endDate
        }
      );
      const staffs = response;
      setGiaoDichs(staffs);
      setIsLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchGiaoDichs(startDate, endDate);
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
          values.user = userSelect.value;
          await await giaoDichServices.addGiaoDich(values);
          form.resetFields();
        } catch (error) {
          console.error(error);
        }
        form.resetFields();
        fetchGiaoDichs(startDate, endDate);
        setIsModalVisible(false);
      })
      .catch((info) => {
        setIsModalVisible(false);
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

  //#region  // Các hàm xử lý thời gian
  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Today', value: [dayjs().add(0, 'd'), dayjs()] },
    { label: 'This Mounth', value: [dayjs().startOf('month'), dayjs()] },
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ];

  const onChangeTimeSearch = (dates, dateStrings) => {
    let [startDate, endDate] = dateStrings;
    startDate = moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    endDate = moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    console.log('Start date:', startDate);
    console.log('End date:', endDate);
    // Gọi API ở đây với startDate và endDate
    fetchGiaoDichs(startDate, endDate);
  };

  //#endregion

  //#region  tính toàn tiền, gold, nợ
  const totalGold = giaoDichs.reduce((total, item) => total + item?.soGold, 0);
  const totalMoney = giaoDichs.reduce((total, item) => total + item?.soTien, 0);
  const totalMoneyNo = giaoDichs.reduce((total, item) => total + (item?.soTienNo || 0), 0);
  const giaGoldTrungBinh = totalMoney / totalGold;
  //#endregion

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Tạo giao dịch
      </Button>


      <Form.Item label="Filter time transaction" name="timeSearch">
        <RangePicker defaultValue={[dayjs().startOf('month'), dayjs()]} onChange={onChangeTimeSearch} presets={rangePresets} />
      </Form.Item>
      
      <SortComponent onSortChange={(value)=> console.log(value)} />;

      <Spin spinning={isLoading}>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, lg: 3 }}
          dataSource={uniqueStaffs}
          renderItem={(item) => (
            <List.Item>
              <Card title={item?.user?.fullName}>
                <Link to={`/${item?.user?._id}`}>
                  <Button type="link">Chi tiết</Button>
                </Link>
              </Card>
            </List.Item>
          )}
        />
      </Spin>

      <Card>
        <Descriptions title="Thông tin giao dịch">
          <Descriptions.Item label="Tổng số Gold">{totalGold}</Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">{totalMoney}</Descriptions.Item>
          <Descriptions.Item label="Tổng tiền nợ">{totalMoneyNo}</Descriptions.Item>
          <Descriptions.Item label="Giá gold trung bình">{giaGoldTrungBinh.toLocaleString()}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Table
        rowKey="_id"
        pagination={false}
        loading={isLoading}
        columns={columns}
        dataSource={giaoDichs}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: event => {
              // Mở modal và đặt giá trị ban đầu cho form với dữ liệu từ hàng được nhấn đúp
              setIsModalVisible(true);
              form.setFieldsValue(record);
            },
          }
        }}
      />

      <Modal
        title="Tạo giao dịch mới"
        open={isModalVisible}
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
            <KhachHangSelect
              onChange={(value) => setUserSelect(value)}
              macv={""} />
          </Form.Item>
          {userSelect && userSelect.value &&
            <Form.Item label="Chọn tài khoản" name="addGoogleAccount">
              <AccSelect
                onChange={(value) => setAccSelect(value)}
                user={userSelect.value}
              />
            </Form.Item>
          }
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
