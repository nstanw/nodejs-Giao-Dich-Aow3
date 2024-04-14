import moment from "moment";

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
        title: 'Số Gold',
        dataIndex: 'soGold',
        key: 'soGold',
        render: (text) => text ? text.toLocaleString() : 0,
    },
    {
        title: 'Số Tiền',
        dataIndex: 'soTien',
        key: 'soTien',
        render: (text) => text ? text.toLocaleString() : 0,
    },
    {
        title: "Số tiền nợ",
        dataIndex: "soTienNo",
        key: "soTien",
        render: (text) => text ? text.toLocaleString() : 0,
    },
    // {
    //     title: 'Loại Chuyển Khoản',
    //     dataIndex: 'loaiChuyenKhoan',
    //     key: 'loaiChuyenKhoan',
    // },
    // {
    //     title: 'Tên Người Dùng',
    //     dataIndex: ['user', 'fullName'],
    //     key: 'fullName',
    // },
    {
        title: 'Gmail',
        dataIndex: ['googleAccount', 0, 'gmail'],
        key: 'gmail',
    },
    {
        title: 'Password',
        dataIndex: ['googleAccount', 0, 'password'],
        key: 'password',
    },
    {
        title: 'Ghi Chú',
        dataIndex: 'note',
        key: 'note',
    },
];
export default columns;