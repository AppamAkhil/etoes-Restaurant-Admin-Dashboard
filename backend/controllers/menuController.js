const MenuItem = require("../models/MenuItem");

exports.getMenu = async (req, res) => {
  const { category, available } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (available) filter.isAvailable = available === "true";

  const items = await MenuItem.find(filter);
  res.json(items);
};

exports.searchMenu = async (req, res) => {
  const items = await MenuItem.find({
    $text: { $search: req.query.q },
  });
  res.json(items);
};

exports.createMenu = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
};

exports.updateMenu = async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
};

exports.deleteMenu = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

exports.toggleAvailability = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  item.isAvailable = !item.isAvailable;
  await item.save();
  res.json(item);
};
