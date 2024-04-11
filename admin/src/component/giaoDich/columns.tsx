
const columns = [
    {
      title: 'Ngày giao dịch',
      dataIndex: 'ngayGiaoDich',
      key: 'ngayGiaoDich',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Số Gold',
      dataIndex: 'soGold',
      key: 'soGold',
      render: (text) => text.toLocaleString(),
    },
    {
      title: 'Số tiền',
      dataIndex: 'soTien',
      key: 'soTien',
      render: (text) => text.toLocaleString(),
    },
    // {
    //   title: 'Loại chuyển khoản',
    //   dataIndex: 'loaiChuyenKhoan',
    //   key: 'loaiChuyenKhoan',
    // },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user) => user.fullName,
    },
    // {
    //   title: 'Google Account',
    //   dataIndex: 'googleAccount',
    //   key: 'googleAccount',
    //   render: (googleAccounts) => googleAccounts.map((account) => account.gmail).join(', '),
    // },
  ];
export default columns;