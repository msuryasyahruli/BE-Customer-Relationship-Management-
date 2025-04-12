const {
  selectAllServices,
  countData,
  findId,
  selectService,
  insertService,
  updateService,
  deleteService,
} = require("../model/service");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const servicesController = {
  getAllServices: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby;
      const sort = req.query.sort;
      const result = await selectAllServices(limit, offset, sortby, sort);
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

  getDetailService: async (req, res) => {
    try {
      const service_id = String(req.params.id);

      const { rowCount } = await findId(service_id);
      if (!rowCount) {
        return res.json({ message: "ID Not Found" });
      }

      const result = await selectService(service_id);
      commonHelper.response(res, result.rows[0], 200, "Get data success");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  createService: async (req, res) => {
    try {
      const { service_name, speed, quota, price, status } = req.body;
      const service_id = uuidv4();
      const data = {
        service_id,
        service_name,
        speed,
        quota,
        price,
        status,
      };

      const result = await insertService(data);
      commonHelper.response(res, result.rows, 201, "Service created");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  updateService: async (req, res) => {
    try {
      const service_id = String(req.params.id);
      const { service_name, speed, quota, price, status } = req.body;
      const { rowCount } = await findId(service_id);
      if (!rowCount) {
        return res.json({ message: "ID Not Found" });
      }

      const data = {
        service_id,
        service_name,
        speed,
        quota,
        price,
        status,
      };

      const result = await updateService(data);
      commonHelper.response(res, result.rows, 200, "Updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  deleteService: async (req, res) => {
    try {
      const service_id = String(req.params.id);
      const { rowCount } = await findId(service_id);
      if (!rowCount) {
        return res.json({ message: "ID Not Found" });
      }

      const result = await deleteService(service_id);
      commonHelper.response(res, result.rows, 200, "Updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

module.exports = servicesController;
