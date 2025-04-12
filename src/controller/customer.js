const {
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
  findId,
  countData,
  selectAllCustomers,
} = require("../model/customer");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const customersController = {
  getAllServices: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby;
      const sort = req.query.sort;
      const result = await selectAllCustomers(limit, offset, sortby, sort);
      const {
        rows: [count],
      } = await countData();

      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };

      commonHelper.response(
        res,
        result.rows,
        200,
        "Get data success",
        pagination
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getDetailCustomer: async (req, res) => {
    try {
      const customer_id = String(req.params.id);

      const { rowCount } = await findId(customer_id);
      if (!rowCount) {
        return res.json({ message: "ID Not Found" });
      }

      const result = await selectCustomer(customer_id);
      commonHelper.response(res, result.rows[0], 200, "Get data success");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  createCustomer: async (req, res) => {
    try {
      const {
        customer_name,
        email,
        phone_number,
        status,
        service_id,
        start_date,
        end_date,
      } = req.body;
      const customer_id = uuidv4();

      const data = {
        customer_id,
        customer_name,
        email,
        phone_number,
        status,
        service_id,
        start_date,
        end_date,
      };

      const result = await insertCustomer(data);
      commonHelper.response(res, result.rows, 201, "Customer created");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const customer_id = String(req.params.id);
      const {
        customer_name,
        email,
        phone_number,
        status,
        service_id,
        start_date,
        end_date,
      } = req.body;
      const { rowCount } = await findId(customer_id);
      if (!rowCount) {
        return res.json({ message: "ID Not Found" });
      }

      const data = {
        customer_id,
        customer_name,
        email,
        phone_number,
        status,
        service_id,
        start_date,
        end_date,
      };

      const result = await updateCustomer(data);
      commonHelper.response(res, result.rows, 200, "Updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const customer_id = String(req.params.id);
      const { rowCount } = await findId(customer_id);
      if (!rowCount) {
        return res.json({ message: "ID Not Found" });
      }

      const result = await deleteCustomer(customer_id);
      commonHelper.response(res, result.rows, 200, "Deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

module.exports = customersController;
