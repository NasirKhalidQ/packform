package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"

	"database/sql"

	_ "github.com/lib/pq"
)

func GetOrders(c *gin.Context) {
	keyword := c.Query("keyword")
	offset := c.Query(("offset"))
	startDate := c.Query(("startDate"))

	startDateString := "'"
	startDateString += startDate
	startDateString += "'"

	endDate := c.Query(("endDate"))

	endDateString := "'"
	endDateString += endDate
	endDateString += "'"

	fmt.Println(startDateString)
	fmt.Println(endDateString)

	connStr := "user=nasirkhalid dbname=nasirkhalid host=localhost sslmode=disable"
	db, err := sql.Open("postgres", connStr)
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
	oi.price_per_unit * oi.quantity AS total_amount, d.delivered_quantity * oi.price_per_unit AS delivered_amount

	FROM orders o LEFT JOIN customers cu ON o.customer_id = cu.user_id
	LEFT JOIN customer_companies cc ON cu.company_id = cc.company_id 
	LEFT JOIN order_items oi ON o.id = oi.order_id 
	LEFT JOIN deliveries d ON d.order_item_id = oi.id
	`

	params := []interface{}{}

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

	rows, err := db.Query(baseQuery, params...)

	for rows.Next() {
		var order_name string
		var product string
		var company_name string
		var name string
		var created_at string
		var total_amount *float64
		var delivered_amount *float64

		if err := rows.Scan(&order_name, &product, &company_name, &name, &created_at, &total_amount, &delivered_amount); err != nil {
			log.Fatal(err)
		}

		s = append(s, Order{Order_name: order_name,
			Product:          product,
			Company_name:     company_name,
			Name:             name,
			Created_at:       created_at,
			Total_amount:     total_amount,
			Delivered_amount: delivered_amount})

	}
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	c.JSON(200, gin.H{
		"orders": s,
	})

	panic((err))

}

func main() {
	fmt.Println("Hello world")

	r := gin.Default()
	r.GET("/orders", GetOrders)
	r.Run()
}
