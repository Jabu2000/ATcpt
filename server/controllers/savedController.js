import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import Activity from "../models/Activities.js";
import Store from "../models/Store.js";
import Event from "../models/Event.js";

const isValidType = (t) => ["restaurant", "activity", "store", "Event"].includes(t);

export async function getSaved(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .populate({ path: "savedRestaurants", select: "name images address rating" })
      .populate({ path: "savedActivities", select: "name images address rating" })
      .populate({ path: "savedStores", select: "name images address rating" })
      .populate({ path: "savedEvents", select: "name images address rating" });

    if (!user) return res.status(404).json({ error: "User not found" });

    const items = [
      ...(user.savedRestaurants || []).map((doc) => ({
        _id: doc._id,
        type: "restaurant",
        name: doc.name,
        image: doc.images?.[0] || null,
        address: doc.address || "",
        rating: doc.rating || 0,
      })),
      ...(user.savedActivities || []).map((doc) => ({
        _id: doc._id,
        type: "activity",
        name: doc.name,
        image: doc.images?.[0] || null,
        address: doc.address || "",
        rating: doc.rating || 0,
      })),
      ...(user.savedStores || []).map((doc) => ({
        _id: doc._id,
        type: "store",
        name: doc.name,
        image: doc.images?.[0] || null,
        address: doc.address || "",
        rating: doc.rating || 0,
      })),
      ...(user.savedEvents || []).map((doc) => ({
        _id: doc._id,
        type: "event",
        name: doc.name,
        image: doc.images?.[0] || null,
        address: doc.address || "",
        rating: doc.rating || 0,
      })),
    ];

    res.json(items);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to load saved items" });
  }
}

export async function saveItem(req, res) {
  try {
    const { itemId, itemType } = req.body;
    if (!itemId || !isValidType(itemType)) {
      return res.status(400).json({ error: "itemId and valid itemType required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (itemType === "restaurant") {
      const exists = await Restaurant.exists({ _id: itemId });
      if (!exists) return res.status(404).json({ error: "Restaurant not found" });

      await User.updateOne(
        { _id: user._id },
        { $addToSet: { savedRestaurants: itemId } }
      );
    } else if (itemType === "activity") {
      const exists = await Activity.exists({ _id: itemId });
      if (!exists) return res.status(404).json({ error: "Activity not found" });

      await User.updateOne(
        { _id: user._id },
        { $addToSet: { savedActivities: itemId } }
      );
    } else if (itemType === "store") {
      const exists = await Store.exists({ _id: itemId });
      if (!exists) return res.status(404).json({ error: "Store not found" });

      await User.updateOne(
        { _id: user._id },
        { $addToSet: { savedStores: itemId } }
      );
    } else if (itemType === "Event") {
      const exists = await Event.exists({ _id: itemId });
      if (!exists) return res.status(404).json({ error: "Event not found" });

      await User.updateOne(
        { _id: user._id },
        { $addToSet: { savedEvents: itemId } }
      );
    }

    return getSaved(req, res); // return updated list
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save item" });
  }
}

export async function removeItem(req, res) {
  try {
    const { itemId } = req.params;
    const { type } = req.query; // ?type=restaurant|activity|store

    if (!itemId || !isValidType(type)) {
      return res
        .status(400)
        .json({ error: "itemId param and valid type query required" });
    }

    let update;
    if (type === "restaurant") {
      update = { $pull: { savedRestaurants: itemId } };
    } else if (type === "activity") {
      update = { $pull: { savedActivities: itemId } };
    } else if (type === "store") {
      update = { $pull: { savedStores: itemId } };
    } else if (type === "Event") {
      update = { $pull: { savedEvents: itemId } };
    }

    await User.updateOne({ _id: req.user._id }, update);
    return getSaved(req, res); // return updated list
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to remove item" });
  }
};