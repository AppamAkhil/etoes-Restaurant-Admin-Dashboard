const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} = require("../controllers/orderController");

/**
 * ORDER ROUTES
 */

// Get all orders (pagination + status filter)
router.get("/", getOrders);

// Get single order by ID (with populated items)
router.get("/:id", getOrderById);

// Create new order
router.post("/", createOrder);

// Update order status
router.patch("/:id/status", updateOrderStatus);

module.exports = router;
