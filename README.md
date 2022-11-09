# 📦 Packform Australia - Full stack Software Engineer test

This assessment is a part of the hiring process at Packform for the full-stack software dev position.

## Libraries used 📚

- [NextJS](https://nextjs.org) with [Typescript](https://www.typescriptlang.org)
- [Antd](https://ant.design/components/overview/) as component library
- [React-Query](https://react-query-v3.tanstack.com/) for data fetching, handling pagination, keyword search
- [MomentJS](https://momentjs.com/timezone/) for handling dates and timezone format

## Tasks Completed ✅

- Opening the orders page should display all customer orders
- Ability to search orders by part of the order or product name
- Ability to filter orders by date range (Melbourne/Australia TZ)
- Maximum of 5 orders per page
- Switch between pages using forward, back button as well as jump to any page number
- Details displayed for each order; Order name, Customer Company name , Customer name, Order date (Melbourne/Australia TZ), Delivered amount (dash if nothing is delivered) , Total amount
- Keyword has been debounced at 500ms to avoid server crashing from concurrent requests

## Not Completed / Work In Progress ❌

- Using VueJS for frontend intead of React/NextJS

## Demo:

### Main Page

Main page with route "/" redirects to "/orders"

### Orders Page

Orders page can be accessed from "/orders" route
Total amount at top is the aggregate of the total amounts from displayed orders in table

### Paginated results with 5 orders per page
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/75773436/200906300-1bde6d0d-7d36-42f3-a7f2-cb1cd577e325.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/75773436/200906215-f905ed7a-db02-4276-8da8-b58d6d56868e.png">

### Keyword search using Product name
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/75773436/200906696-ca8ee80a-1261-4362-93d1-206d1a4075c5.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/75773436/200906868-d923c4df-c351-4e02-a89e-51b546530587.png">

### Keyword search using Order name
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/75773436/200907071-93bfdb09-d2b8-4f15-af46-4ecb7febb8cd.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/75773436/200907191-a864b445-c6e7-4c1d-bfb2-2c239b64b786.png">

### Filter by date
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/75773436/200908968-0f6ac297-809f-41e5-83c2-856864c37cd3.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/75773436/200909105-0479f696-f8a9-449c-9ea4-a32df9d38435.png">

