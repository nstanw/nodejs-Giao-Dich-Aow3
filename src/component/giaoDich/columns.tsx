import moment from "moment";
import { Link } from 'react-router-dom';
const columns = [
  {
    title: "STT",
    dataIndex: "STT",
    key: "STT",
    render: (text, _, index) => <div>{index + 1}</div>,
  },
  {
    title: "Duration",
    dataIndex: "Duration",
    key: "Duration",
    render: (text, record) => {
      const today = moment();
      const transactionDate = moment(record.ngayGiaoDich);
      const diffDays = today.diff(transactionDate, 'days');
      return diffDays;
    },
  },
  {
    title: "Ngày giao dịch",
    dataIndex: "ngayGiaoDich",
    key: "ngayGiaoDich",
    render: (text) => moment(text).format("DD/MM/YYYY"),
  },
  {
    title: "Số Gold",
    dataIndex: "soGold",
    key: "soGold",
    render: (text) => text ? text.toLocaleString() : 0,
  },
  {
    title: "Số tiền",
    dataIndex: "soTien",
    key: "soTien",
    render: (text) => text ? text.toLocaleString() : 0,
  },
  {
    title: "Số tiền nợ",
    dataIndex: "soTienNo",
    key: "soTien",
    render: (text) => text ? text.toLocaleString() : 0,
  },
  // {
  //   title: 'Loại chuyển khoản',
  //   dataIndex: 'loaiChuyenKhoan',
  //   key: 'loaiChuyenKhoan',
  // },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    render: (user) => <Link to={`/${user._id}`}>{user.fullName}</Link>,
  },
  // {
  //   title: 'Google Account',
  //   dataIndex: 'googleAccount',
  //   key: 'googleAccount',
  //   render: (googleAccounts) => googleAccounts.map((account) => account.gmail).join(', '),
  // },
];
export default columns;
