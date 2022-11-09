/* eslint-disable @next/next/no-img-element */

import {
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Table,
  Tag,
  Typography,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import Head from "next/head";
import moment from "moment-timezone";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import styles from "../../styles/Orders.module.css";
import { useDebounce } from "../../hooks";

moment.tz.setDefault("Australia/Melbourne");

interface IOrders {
  Order_name: string;
  Product: string;
  Company_name: string;
  Name: string;
  Created_at: string;
  Total_amount: number;
  Delivered_amount: number;
}

export default function Orders() {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);

  const keyword = Form.useWatch("keyword", form);
  const debouncedKeyword = useDebounce(keyword, 500);

  const dates = Form.useWatch("dates", form);

  async function getUser() {
    const startDate = dates?.[0]
      ? moment(dates?.[0]).format("YYYY-MM-DD")
      : "2020-01-01";
    const endDate = dates?.[1]
      ? moment(dates?.[1]).format("YYYY-MM-DD")
      : "2022-01-01";
    try {
      const response = await axios({
        url: "http://localhost:8080/orders",
        method: "get",
        params: {
          keyword: debouncedKeyword,
          startDate,
          endDate,
          offset: (currentPage - 1) * 5,
        },
      });

      return response;
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message,
        placement: "bottomRight",
        maxCount: 3,
        duration: 3,
      });
    }
  }
  const ordersResult = useQuery(
    ["orders", debouncedKeyword, dates?.[0], dates?.[1], currentPage],
    getUser,
    { keepPreviousData: true }
  );

  const columns: ColumnsType<IOrders> = [
    {
      title: "Order name",
      key: "Order_name",
      render: ({ Order_name, Product }: IOrders) => (
        <>
          <Row>
            <Typography.Text>{Order_name}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text style={{ color: "gray" }}>
              {Product}
            </Typography.Text>
          </Row>
        </>
      ),
    },
    {
      title: "Customer Company",
      dataIndex: "Company_name",
      key: "Order_name",
      render: (text: IOrders["Company_name"]) => (
        <Typography.Paragraph>{text}</Typography.Paragraph>
      ),
    },
    {
      title: "Customer name",
      dataIndex: "Name",
      key: "Order_name",
      render: (text: IOrders["Name"]) => (
        <Typography.Paragraph>{text}</Typography.Paragraph>
      ),
    },
    {
      title: "Order date",
      dataIndex: "Created_at",
      key: "Order_name",
      render: (text: IOrders["Created_at"]) => (
        <Typography.Paragraph>
          {moment(text).format("MMM Do, h:mm A")}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Delivered Amount",
      dataIndex: "Delivered_amount",
      key: "Order_name",
      render: (text: IOrders["Delivered_amount"]) =>
        text ? <Tag color="green">${text?.toFixed(2)}</Tag> : "-",
    },
    {
      title: "Total Amount",
      dataIndex: "Total_amount",
      key: "Order_name",
      render: (text: IOrders["Total_amount"]) =>
        text ? <Tag color="cyan">${text?.toFixed(2)}</Tag> : "-",
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Packform Australia</title>
        <meta name="description" content="Test task for Packform Australia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form form={form}>
        <div>
          <Row style={{ placeItems: "baseline", gap: "16px" }}>
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png"
              alt="search"
              width={30}
              height={30}
            />
            <Typography.Title>Search</Typography.Title>
          </Row>
          <Form.Item name="keyword">
            <Input size="large" onChange={() => setCurrentPage(1)} />
          </Form.Item>
        </div>
        <div>
          <Typography.Title level={5}>Created Date</Typography.Title>
          <Form.Item name="dates">
            <DatePicker.RangePicker />
          </Form.Item>
        </div>
        <div>
          <Typography.Title level={5} style={{ display: "flex", gap: "6px" }}>
            Total Amount:
            {ordersResult?.data?.data?.orders.length > 0 ? (
              <Tag color="magenta">
                $
                {ordersResult?.data?.data?.orders
                  .reduce((accumulator: number, order: IOrders) => {
                    return accumulator + order.Total_amount;
                  }, 0)
                  .toFixed(2)}
              </Tag>
            ) : null}
          </Typography.Title>
        </div>
        <Table
          columns={columns}
          dataSource={
            ordersResult.isSuccess ? ordersResult.data?.data?.orders : []
          }
          pagination={{
            showSizeChanger: false,
            total: ordersResult?.data?.data?.rows,
            pageSize: 5,
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
            position: ["bottomCenter"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          loading={ordersResult.isLoading}
        />
      </Form>
    </div>
  );
}
