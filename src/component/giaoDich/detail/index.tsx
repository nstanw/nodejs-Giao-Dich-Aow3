import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Table } from 'antd';
import giaoDichServices from '../../../services/giaoDichs/giaoDichServices';
import columns from './column';
import { Transaction, User } from '../../../services/giaoDichs/dto/Transactions';

const DetailGiaoDich: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        let isMounted = true;
        const getGiaoDichByUser = async () => {
            try {
                const response = await giaoDichServices.getGiaoDichByUser(userId);
                const transactions = response;

                if (transactions) {
                    setTransactions(transactions);
                    setUser(transactions[0].user);
                }
            } catch (error) {
                console.log("Error:", error);
            }
        }

        try {
            getGiaoDichByUser();
        } catch (error) {
            console.log("Error:", error);
        }

        return () => {
            isMounted = false;
        };
    }, [userId]);

    //#region  tính toàn tiền, gold, nợ
    const totalGold = transactions.reduce((total, item) => total + item?.soGold, 0);
    const totalMoney = transactions.reduce((total, item) => total + item?.soTien, 0);
    const totalMoneyNo = transactions.reduce((total, item) => total + (item?.soTienNo || 0), 0);
    const giaGoldTrungBinh = totalMoney / totalGold;
    //#endregion


    return (
        <div>
            {user && (
                <Card>
                    <Descriptions title="Thông tin người dùng">
                        <Descriptions.Item label="Tên đầy đủ">{user.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Facebook">{user.facebook}</Descriptions.Item>
                        <Descriptions.Item label="Zalo">{user.zalo}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="Thông tin giao dịch">
                        <Descriptions.Item label="Tổng số Gold">{totalGold.toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền">{totalMoney.toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền nợ">{totalMoneyNo.toLocaleString()}</Descriptions.Item>
                        <Descriptions.Item label="Giá gold trung bình">{giaGoldTrungBinh.toLocaleString()}</Descriptions.Item>
                    </Descriptions>
                </Card>
            )}
            <Card style={{ marginTop: 20 }}>
                <Table pagination={false} columns={columns} dataSource={transactions} rowKey="_id" /> {/* Update rowKey="_id" to rowKey="id" */}
            </Card>
        </div>
    );
};

export default DetailGiaoDich;