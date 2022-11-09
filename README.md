# 📦 Packform Australia - Full stack Software Engineer test

This assessment is a part of the hiring process at Packform for the full-stack software dev position.

<br>

## Libraries/Framework used 📚

- [NextJS](https://nextjs.org) with [Typescript](https://www.typescriptlang.org)💪
- [Antd](https://ant.design/components/overview/) as component library
- [React-Query](https://react-query-v3.tanstack.com/) for data fetching, handling pagination, keyword search
- [MomentJS](https://momentjs.com/timezone/) for handling dates and timezone format

<br>

## Tasks Completed ✅

- Opening the orders page should display all customer orders
- Ability to search orders by part of the order or product name
- Ability to filter orders by date range (Melbourne/Australia TZ)
- Maximum of 5 orders per page
- Switch between pages using forward, back button as well as jump to any page number
- Details displayed for each order; Order name, Customer Company name , Customer name, Order date (Melbourne/Australia TZ), Delivered amount (dash if nothing is delivered) , Total amount
- Keyword has been debounced at 500ms to avoid server crashing from concurrent requests

<br>

## Not Completed / Work In Progress ❌

- Using VueJS for frontend intead of React/NextJS

<br>

## Demo:

<br>

### Main Page

Main page with route "/" redirects to "/orders"

<br>

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

### Timezone Melbourne/Australia

![image](https://user-images.githubusercontent.com/75773436/200911229-d2de46fa-7621-408d-9d5c-e22b7eef0832.png)

<br>

## Installation instructions

- Install [VSCode](https://code.visualstudio.com/)
- Install [NodeJS](https://nodejs.org/en/)
- Launch VSCode terminal using <kbd>Cmd</kbd> + <kbd>V</kbd> and cd into the folder where you want to clone the repository
- Clone the repo using `git clone https://github.com/NasirKhalidQ/packform.git`

<br>

## Frontend-- NextJS💻

- Cd into the folder `next-frontend`
- In terminal run `npm install` to install packages
- Run `npm run dev`
- Frontend is now serving on <kbd>localhost:3000</kbd>

<br>
You will see this error as backend is not setup yet
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/75773436/200916416-dfae80ca-c861-4cfc-986e-74ba914023e4.png">

<br>

## Backend-- PostgreSQL with GO 😨

- Install PostgresAPP from [https://postgresapp.com/](https://postgresapp.com/)
- Click on initialize to initialize a db with your username as the database, then click start to start the server for Postgres
<img width="718" alt="image" src="https://user-images.githubusercontent.com/75773436/200918140-c8b8dca3-a71b-46db-b863-41fe83d075f6.png">
- These are the default settings for Postgres
<img width="759" alt="image" src="https://user-images.githubusercontent.com/75773436/200918486-cda68afe-0104-4ea0-b45b-9b530a018316.png">
- psql comes bundled with PostgresAPP but you need to set the path using
`sudo mkdir -p /etc/paths.d &&
echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp`
- Check if it is installed by typing `psql` in the terminal, you should see this if path was successfully set:
<img width="986" alt="image" src="https://user-images.githubusercontent.com/75773436/200917733-2ed4bc79-6446-491a-9d6c-96ce8f53c9b9.png">

