const Pool = require("../config/db");

const allowedSortColumns = [
  "service_name",
  "speed",
  "quota",
  "price",
  "status",
  "create_at",
];
const allowedSortDirections = ["ASC", "DESC"];

const selectAllServices = (limit, offset, sortby = "speed", sort = "ASC") => {
  const sortColumn = allowedSortColumns.includes(sortby) ? sortby : "create_at";
  const sortDirection = allowedSortDirections.includes(sort.toUpperCase())
    ? sort.toUpperCase()
    : "ASC";
  const query = `
    SELECT * FROM services
    ORDER BY ${sortColumn} ${sortDirection}
    LIMIT $1 OFFSET $2
  `;
  return Pool.query(query, [limit, offset]);
};

const selectService = (id) => {
  return Pool.query("SELECT * FROM services WHERE service_id = $1", [id]);
};

const insertService = (data) => {
  const { service_id, service_name, speed, quota, price, status } = data;
  const query = `
    INSERT INTO services(service_id, service_name, speed, quota, price, status)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  const values = [service_id, service_name, speed, quota, price, status];
  return Pool.query(query, values);
};

const updateService = (data) => {
  const { service_id, service_name, speed, quota, price, status } = data;
  const query = `
    UPDATE services
    SET service_name = $1,
        speed = $2,
        quota = $3,
        price = $4,
        status = $5
    WHERE service_id = $6
  `;
  const values = [service_name, speed, quota, price, status, service_id];
  return Pool.query(query, values);
};

const deleteService = (id) => {
  const query = `DELETE FROM services WHERE service_id = $1`;
  const values = [id];
  return Pool.query(query, values);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM services");
};

const findId = async (id) => {
  const result = await Pool.query(
    `SELECT service_id FROM services WHERE service_id = $1`,
    [id]
  );
  return result;
};

module.exports = {
  selectAllServices,
  selectService,
  insertService,
  updateService,
  deleteService,
  countData,
  findId,
};
