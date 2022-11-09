package main

import (
	"log"

	"database/sql"

	_ "github.com/lib/pq"
)

func InitializeDb() {

	connStr := "user=nasirkhalid dbname=nasirkhalid host=localhost sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	baseQuery := `
	DROP TABLE IF EXISTS customer_companies;
	CREATE TABLE customer_companies
	(company_id integer NOT NULL PRIMARY KEY,company_name varchar);
	COPY customer_companies(company_id, company_name)
	FROM '/Users/nasirkhalid/Desktop/packform/backend/initialize/customer_companies.csv'
	DELIMITER ','
	CSV HEADER;

	DROP TABLE IF EXISTS deliveries;
	CREATE TABLE deliveries
	(id integer NOT NULL PRIMARY KEY, order_item_id integer, delivered_quantity integer);
	COPY deliveries(id, order_item_id, delivered_quantity)
	FROM '/Users/nasirkhalid/Desktop/packform/backend/initialize/deliveries.csv'
	DELIMITER ','
	CSV HEADER;
	`

	db.Query(baseQuery)
}

func main() {
	InitializeDb()
}
