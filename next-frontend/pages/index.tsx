import { DatePicker, Form, Input, Space, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import Head from "next/head";
import moment from "moment-timezone";
import { RangePickerProps } from "antd/lib/date-picker/generatePicker";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect } from "react";
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

  const onChange: RangePickerProps<any>["onChange"] = (date, dateString) => {};
  const keyword = Form.useWatch("keyword", form);
  const dates = Form.useWatch("dates", form);

  useEffect(() => {
    console.log(dates);
  }, [dates]);

  async function getUser() {
    const startDate = moment(dates?.[0]).format("YYYY-MM-DD");
    const endDate = moment(dates?.[1]).format("YYYY-MM-DD");
    console.log(startDate, endDate);
    try {
      const response = await axios({
        url: "http://localhost:8080/orders",
        method: "get",
        params: {
          keyword,
          startDate,
          endDate,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  const ordersResult = useQuery(["orders", keyword, dates], getUser);

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
        <Typography.Paragraph>{text}</Typography.Paragraph>
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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
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
          <Typography.Paragraph>Total Amount: </Typography.Paragraph>
        </div>
        <Table
          columns={columns}
          dataSource={
            ordersResult.isSuccess ? ordersResult.data?.data?.orders : []
          }
          rowKey="Order_name"
          pagination={{ showSizeChanger: false }}
          loading={ordersResult.isLoading}
        />
      </Form>
    </div>
  );
}
