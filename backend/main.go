package main

import (
	"fmt"
	"log"
	"os"

	"github.com/NasirKhalidQ/packform/initialize"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"

	"database/sql"

	"github.com/joho/godotenv"
)

func GetOrders(c *gin.Context) {
	// get url query parameters
	keyword := c.Query("keyword")
	offset := c.Query(("offset"))
	startDate := c.Query(("startDate"))
	endDate := c.Query(("endDate"))

	// concatenate for date query
	startDateString := "'"
	startDateString += startDate
	startDateString += "'"

	endDateString := "'"
	endDateString += endDate
	endDateString += "'"

	// get database connection string from .env file
	envError := godotenv.Load((".env"))
	if envError != nil {
		fmt.Printf("Could not load env file")
		os.Exit(1)
	}
	// connect to db
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}

	type Order struct {
		Order_name       string
		Product          string
		Company_name     string
		Name             string
		Created_at       string
		Total_amount     *float64
		Delivered_amount *float64
	}

	baseQuery := `
	SELECT o.order_name, oi.product,
	cc.company_name, cu.name,
	o.created_at,
	oi.price_per_unit * oi.quantity AS total_amount, d.delivered_quantity * oi.price_per_unit AS delivered_amount,
	COUNT(*) OVER()

	FROM orders o LEFT JOIN customers cu ON o.customer_id = cu.user_id
	LEFT JOIN customer_companies cc ON cu.company_id = cc.company_id
	LEFT JOIN order_items oi ON o.id = oi.order_id
	LEFT JOIN deliveries d ON d.order_item_id = oi.id
	`

	params := []interface{}{}

	// make query params optional by setting a default date if none given
	if startDate != "" && endDate != "" {
		baseQuery += fmt.Sprintf(` WHERE o.created_at >= $%d AND o.created_at <= $%d`, len(params)+1, len(params)+2)
		params = append(params, startDateString, endDateString)
	} else {
		baseQuery += ` WHERE o.created_at >= '2000-01-01' AND o.created_at <= NOW()`
	}

	if keyword != "" {
		baseQuery += fmt.Sprintf(` AND to_tsvector(oi.product || ' ' || o.order_name) @@ phraseto_tsquery($%d)`, len(params)+1)
		params = append(params, keyword)
	}

	s := make([]Order, 0)

	baseQuery += `
	ORDER BY o.order_name, oi.product
	`

	if offset != "" {
		baseQuery += fmt.Sprintf(` OFFSET $%d LIMIT 5`, len(params)+1)
		params = append(params, offset)
	} else {
		baseQuery += ` OFFSET 0 LIMIT 5`
	}

	// spread params on base query string
	rows, err := db.Query(baseQuery, params...)

	// total variable to handle pagination on frontend
	var total int64 = 0
	for rows.Next() {
		var order_name string
		var product string
		var company_name string
		var name string
		var created_at string
		var total_amount *float64
		var delivered_amount *float64
		var count int64

		if err := rows.Scan(&order_name, &product, &company_name, &name, &created_at, &total_amount, &delivered_amount, &count); err != nil {
			log.Fatal(err)
		}

		s = append(s, Order{Order_name: order_name,
			Product:          product,
			Company_name:     company_name,
			Name:             name,
			Created_at:       created_at,
			Total_amount:     total_amount,
			Delivered_amount: delivered_amount})

		total = count
	}
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	// return response as json
	c.JSON(200, gin.H{
		"orders": s,
		"rows":   total,
	})

	panic((err))

}

func main() {
	// populate db from csv file
	initialize.InitializeDb()

	r := gin.Default()
	r.GET("/orders", GetOrders)
	r.Run()
}
