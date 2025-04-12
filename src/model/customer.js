const Pool = require("../config/db");

const allowedSortColumns = [
  "customer_name",
  "email",
  "phone_number",
  "status",
  "start_date",
  "end_date",
  "created_at",
];
const allowedSortDirections = ["ASC", "DESC"];

const selectAllCustomers = (
  limit,
  offset,
  sortby = "created_at",
  sort = "ASC"
) => {
  const sortColumn = allowedSortColumns.includes(sortby)
    ? sortby
    : "created_at";
  const sortDirection = allowedSortDirections.includes(sort.toUpperCase())
    ? sort.toUpperCase()
    : "ASC";
  const query = `
    SELECT * FROM customers
    ORDER BY ${sortColumn} ${sortDirection}
    LIMIT $1 OFFSET $2
  `;
  return Pool.query(query, [limit, offset]);
};

const selectCustomer = (id) => {
  return Pool.query(
    `SELECT 
      customers.*, 
      services.service_name 
    FROM customers 
    LEFT JOIN services 
    ON customers.service_id = services.service_id 
    WHERE customers.customer_id = $1`,
    [id]
  );
};

const insertCustomer = (data) => {
  const {
    customer_id,
    customer_name,
    email,
    phone_number,
    status,
    service_id,
    start_date,
    end_date,
  } = data;
  const query = `
    INSERT INTO customers(
        customer_id, 
        customer_name, 
        email, phone_number, 
        status, service_id, 
        start_date, 
        end_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  const values = [
    customer_id,
    customer_name,
    email,
    phone_number,
    status,
    service_id,
    start_date,
    end_date,
  ];
  return Pool.query(query, values);
};

const updateCustomer = (data) => {
  const {
    customer_id,
    customer_name,
    email,
    phone_number,
    status,
    service_id,
    start_date,
    end_date,
  } = data;
  const query = `
    UPDATE customers
    SET customer_name  = $1,
        email  = $2,
        phone_number = $3,
        status = $4,
        service_id = $5,
        start_date = $6,
        end_date = $7
    WHERE customer_id = $8
  `;
  const values = [
    customer_name,
    email,
    phone_number,
    status,
    service_id,
    start_date,
    end_date,
    customer_id,
  ];
  return Pool.query(query, values);
};

const deleteCustomer = (id) => {
  return Pool.query("DELETE FROM customers WHERE customer_id = $1", [id]);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM customers");
};

const findId = async (id) => {
  const result = await Pool.query(
    `SELECT customer_id FROM customers WHERE customer_id = $1`,
    [id]
  );
  return result;
};

module.exports = {
  selectAllCustomers,
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
  countData,
  findId,
};
