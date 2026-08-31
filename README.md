# Store Manager API

A simple RESTful backend for managing a store's **products**, **suppliers**, and **sales**, built with **Node.js**, **Express**, and **MySQL**.

## Features

- 📦 **Products** — create, read, update, delete, update price, search, and get stock stats
- 🚚 **Suppliers** — create, read, update, delete, and search by name
- 💰 **Sales** — record sales and query totals per product
- 🗄️ **Database utilities** — manage constraints, categories, and a restricted `store_manager` DB user (SELECT/INSERT/DELETE only)
- 🌱 Auto-seeds sample data (a supplier, a few products, and a sale) on startup

## Tech Stack

- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [MySQL](https://www.mysql.com/) via [mysql2](https://github.com/sidorares/node-mysql2)

## Project Structure

```
src/
├── app.js                     # Express app setup and route mounting
├── main.js                    # Entry point
├── database/
│   └── connectDB.js           # MySQL connection pool + connection check
├── modules/
│   ├── Products/               # Product controller + service
│   ├── Suppliers/              # Supplier controller + service
│   ├── Sales/                  # Sale controller + service
│   └── DataBase/               # DB-level operations (constraints, categories)
└── scripts/
    ├── seed.js                 # Seeds sample supplier/product/sale data
    └── create-store-manager.sql.js  # Creates a restricted MySQL user
```

## Prerequisites

- Node.js (v18+ recommended)
- MySQL Server running locally
- A database named `store_db` with the appropriate tables (`suppliers`, `products`, `sales`, etc.)

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd store-manager-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the database connection**

   Edit `src/database/connectDB.js` with your MySQL credentials:
   ```js
   let db = mysql.createPool({
     host: "localhost",
     port: 3306,
     user: "root",
     password: "root",
     database: "store_db",
   });
   ```

   > ⚠️ For production, move these credentials to environment variables instead of hardcoding them.

4. **Run the server**
   ```bash
   npm run dev
   ```

   The server starts on `http://localhost:3000` and will auto-connect to MySQL and seed sample data.

## API Endpoints

### Products — `/product`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/product` | Get all products |
| GET | `/product/allProductNotSold` | Get products that haven't been sold |
| GET | `/product/maxProductQuantitiy` | Get the product with max stock quantity |
| GET | `/product/:id` | Get a product by ID |
| POST | `/product` | Add a new product |
| PATCH | `/product/updatePrice` | Update a product's price |
| PATCH | `/product/:id` | Update a product |
| DELETE | `/product/:id` | Delete a product by ID |
| DELETE | `/product/deleteProduct/:name` | Delete a product by name |

### Suppliers — `/supplier`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/supplier` | Get all suppliers |
| GET | `/supplier/searchByChar/:char` | Get suppliers whose names start with a character |
| POST | `/supplier` | Add a new supplier |
| PATCH | `/supplier/:id` | Update a supplier |
| DELETE | `/supplier/:id` | Delete a supplier |

### Sales — `/sale`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/sale` | Get all sales |
| GET | `/sale/AllSalesIncludeName` | Get all sales including product name |
| GET | `/sale/totalQuantity` | Get total quantity sold per product |
| GET | `/sale/:productID` | Get sales for a specific product |
| POST | `/sale` | Record a new sale |

### Database — `/database`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/database/constraint` | Add a DB constraint |
| POST | `/database/:addCategory` | Add a category |
| DELETE | `/database/:removeCategory` | Remove a category |
| PATCH | `/database/contactNumber` | Change the type of the contact number column |

## Notes

- `src/scripts/create-store-manager.sql.js` creates a `store_manager` MySQL user with limited privileges (SELECT, INSERT, DELETE). Uncomment the `run()` call in `src/app.js` to execute it once.
- Sample seed data is inserted automatically on every server start (it checks for existing records first, so it won't duplicate).

## License

ISC
