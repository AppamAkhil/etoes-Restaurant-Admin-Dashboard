const mongoose = require("mongoose");
const dotenv = require("dotenv");
const MenuItem = require("./models/MenuItem");
const Order = require("./models/Order");

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await MenuItem.deleteMany();
    await Order.deleteMany();

    const menuItems = await MenuItem.insertMany([
      {
        name: "Margherita Pizza",
        category: "Main Course",
        price: 250,
        ingredients: ["cheese", "tomato"],
        preparationTime: 15
      },
      {
        name: "Veg Burger",
        category: "Main Course",
        price: 150,
        ingredients: ["bun", "patty"],
        preparationTime: 10
      },
      {
        name: "Chocolate Cake",
        category: "Dessert",
        price: 120,
        ingredients: ["cocoa", "flour"],
        preparationTime: 8
      },
      {
        name: "Cold Coffee",
        category: "Beverage",
        price: 90,
        ingredients: ["milk", "coffee"],
        preparationTime: 5
      }
    ]);

    await Order.insertMany([
      {
        orderNumber: "ORD-1001",
        customerName: "Akhil",
        tableNumber: 4,
        status: "Pending",
        items: [
          {
            menuItem: menuItems[0]._id,
            quantity: 2,
            price: menuItems[0].price
          }
        ],
        totalAmount: 500
      }
    ]);

    console.log("✅ Database Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seed();
