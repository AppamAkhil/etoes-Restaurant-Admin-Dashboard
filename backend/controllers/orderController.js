const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

/**
 * @desc   Get all orders
 * @route  GET /api/orders
 * @query  status, page, limit
 */
exports.getOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate("items.menuItem", "name price")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      orders
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get single order by ID
 * @route  GET /api/orders/:id
 */
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItem"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Create new order
 * @route  POST /api/orders
 */
exports.createOrder = async (req, res, next) => {
  try {
    const { items, customerName, tableNumber } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items required" });
    }

    let totalAmount = 0;
    const formattedItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);

      if (!menuItem) {
        return res
          .status(404)
          .json({ message: "Menu item not found" });
      }

      totalAmount += menuItem.price * item.quantity;

      formattedItems.push({
        menuItem: menuItem._id,
        quantity: item.quantity,
        price: menuItem.price
      });
    }

    const order = await Order.create({
      orderNumber: `ORD-${Date.now()}`,
      items: formattedItems,
      totalAmount,
      customerName,
      tableNumber
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Update order status
 * @route  PATCH /api/orders/:id/status
 */
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Preparing",
      "Ready",
      "Delivered",
      "Cancelled"
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    next(error);
  }
};
