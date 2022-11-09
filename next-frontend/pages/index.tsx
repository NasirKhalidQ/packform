import {
  Alert,
  DatePicker,
  Form,
  Input,
  notification,
  Space,
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

export default function Home() {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);

  const keyword = Form.useWatch("keyword", form);
  const dates = Form.useWatch("dates", form);

  async function getUser() {
    const startDate = moment(dates?.[0]).format("YYYY-MM-DD");
    const endDate = moment(dates?.[1]).format("YYYY-MM-DD");
    try {
      const response = await axios({
        url: "http://localhost:8080/orders",
        method: "get",
        params: {
          keyword,
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
    ["orders", keyword, dates?.[0], dates?.[1], currentPage],
    getUser,
    { keepPreviousData: true }
  );

  const columns: ColumnsType<IOrders> = [
    {
      title: "Order name",
      key: "Order_name",
      render: ({ Order_name, Product }: IOrders) => (
        <Typography.Paragraph>
          {Order_name}, {Product}
        </Typography.Paragraph>
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
    <div>
      <Head>
        <title>Packform Australia</title>
        <meta name="description" content="Test task for Packform Australia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form
        form={form}
        initialValues={{ dates: [moment("2000-01-01"), moment("2022-01-01")] }}
      >
        <div>
          <Typography.Title>Search</Typography.Title>
          <Form.Item name="keyword">
            <Input size="large" />
          </Form.Item>
        </div>
        <div>
          <Typography.Paragraph>Created Date</Typography.Paragraph>
          <Form.Item name="dates">
            <DatePicker.RangePicker />
          </Form.Item>
        </div>
        <div>
          <Typography.Paragraph>
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
          </Typography.Paragraph>
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
