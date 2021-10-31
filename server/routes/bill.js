const express = require("express");
const BillController = require("../controllers/BillController");

const router = express.Router();

router.post("/bills", BillController.createBill);
router.get("/bills", BillController.getBill);
router.get("/bills/dateRange", BillController.getBillWithDateRange);
router.get("/bills/:id", BillController.getBillById);
router.put("/bills/:id", BillController.updateBill);
router.put("/bills/:id/item/:courseId", BillController.deleteBillProducts);

module.exports = router;
