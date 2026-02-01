const express = require("express");
const router = express.Router();

const {
  getMenu,
  searchMenu,
  createMenu,
  updateMenu,
  deleteMenu,
  toggleAvailability
} = require("../controllers/menuController");

/**
 * MENU ROUTES
 */

// Get all menu items (filters supported)
router.get("/", getMenu);

// Search menu items (name + ingredients)
router.get("/search", searchMenu);

// Create new menu item
router.post("/", createMenu);

// Update menu item
router.put("/:id", updateMenu);

// Delete menu item
router.delete("/:id", deleteMenu);

// Toggle availability (optimistic UI)
router.patch("/:id/availability", toggleAvailability);

module.exports = router;
