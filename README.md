# Bicycle Store Application

This is a TypeScript-based Express application integrated with MongoDB and Mongoose for managing a bicycle store. The application supports CRUD operations for bicycles and orders, ensuring data integrity through Mongoose schema validation. Additionally, it includes features for order management and revenue calculation.

## Features

- **CRUD Operations for Bicycles**
  - Create, Read, Update, and Delete bicycle records.
  - Search for bicycles by name, brand, or type.

- **Order Management**
  - Place orders for bicycles with inventory management.
  - Automatically adjust stock levels and handle out-of-stock scenarios.

- **Revenue Calculation**
  - Calculate total revenue from all orders using MongoDB aggregation.

- **Error Handling**
  - Comprehensive error responses with detailed validation messages and stack traces.

## Endpoints

### Bicycles
- **Create a Bicycle**: `POST /api/products`
- **Get All Bicycles**: `GET /api/products`
- **Get a Specific Bicycle**: `GET /api/products/:productId`
- **Update a Bicycle**: `PUT /api/products/:productId`
- **Delete a Bicycle**: `DELETE /api/products/:productId`

### Orders
- **Place an Order**: `POST /api/orders`
- **Calculate Revenue**: `GET /api/orders/revenue`

## Project Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or cloud instance)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/bicycle-store.git
   cd bicycle-store
