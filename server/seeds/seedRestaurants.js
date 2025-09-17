import mongoose from "mongoose";
import "dotenv/config";
import Restaurant from "../models/Restaurant.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";


const data = [
  // --- Restaurants ---
  {
    name: "Kloof Street House",
    address: "30 Kloof St, Gardens, Cape Town",
    phone: "+27 21 423 4413",
    cuisine: "Contemporary",
    category: "restaurant",
    images: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.6,
  },
  {
    name: "The Pot Luck Club",
    address: "Silo Top Floor, The Old Biscuit Mill, Woodstock, Cape Town",
    phone: "+27 21 447 0804",
    cuisine: "Tapas / Contemporary",
    category: "restaurant",
    images: [
      "https://images.unsplash.com/photo-1541542684-4a6aea8d1462?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.7,
  },
  {
    name: "FYN Restaurant",
    address:
      "5th Floor Speakers' Corner, 37 Parliament St, Cape Town City Centre",
    phone: "+27 21 286 2736",
    cuisine: "Fine Dining / Japanese-South African",
    category: "restaurant",
    images: [
      "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.8,
  },
  {
    name: "La Colombe",
    address: "Silvermist Wine Estate, Constantia Nek",
    phone: "+27 21 794 2390",
    cuisine: "Fine Dining",
    category: "restaurant",
    images: [
      "https://images.unsplash.com/photo-1541542684-4e6a58ee6a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.9,
  },
  {
    name: "Chefs Warehouse at Beau Constantia",
    address: "Beau Constantia Wine Estate, Constantia",
    phone: "+27 21 794 8632",
    cuisine: "Small Plates / Contemporary",
    category: "restaurant", // ✅ added
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    name: "Harbour House V&A Waterfront",
    address: "Quay 4, V&A Waterfront, Cape Town",
    phone: "+27 21 418 4744",
    cuisine: "Seafood",
    category: "restaurant", // ✅ added
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    name: "Belly of the Beast",
    address: "110 Harrington St, District Six, Cape Town",
    phone: "+27 21 461 0335",
    cuisine: "Tasting Menu",
    category: "restaurant", // ✅ added
    rating: 4.8,
    images: [`${BASE_URL}/uploads/photo1.png`],
    // 🆕 New fields
    about:
      "Famous fried chicken brand offering quick meals, burgers, and takeaways in Claremont. Famous fried chicken brand offering quick meals, burgers, and takeaways in Claremont.Famous fried chicken brand offering quick meals, burgers, and takeaways in Claremont.",
    website: "https://www.bellyofthebeast.co.za",
    openingHours: {
      monday: { open: "09:00", close: "22:00" },
      tuesday: { open: "09:00", close: "22:00" },
      wednesday: { open: "09:00", close: "22:00" },
      thursday: { open: "09:00", close: "22:00" },
      friday: { open: "09:00", close: "23:00" },
      saturday: { open: "09:00", close: "23:00" },
      sunday: { open: "09:00", close: "22:00" },
    },
  },

  // --- Coffee Shops ---
  {
    name: "Truth Coffee Roasting",
    address: "36 Buitenkant St, Cape Town City Centre",
    phone: "+27 21 200 0440",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.7,
  },
  {
    name: "Origin Coffee Roasters",
    address: "28 Hudson St, De Waterkant, Cape Town",
    phone: "+27 21 421 1000",
    cuisine: "Coffee / Artisan Roastery",
    category: "coffee",
    images: [
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.6,
  },
  {
    name: "Deluxe Coffeeworks",
    address: "25 Church St, Cape Town City Centre",
    phone: "+27 21 422 2916",
    cuisine: "Coffee / Espresso Bar",
    category: "coffee",
    images: [
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.5,
  },

  // --- Student Takeaways ---
  {
    name: "Nando’s Long Street",
    address: "223 Long St, Cape Town City Centre",
    phone: "+27 21 423 1709",
    cuisine: "Portuguese / Fast Casual",
    category: "takeaway",
    images: [
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.3,
  },
  {
    name: "Pizza Hut Rondebosch",
    address: "Main Rd, Rondebosch, Cape Town",
    phone: "+27 21 685 1234",
    cuisine: "Pizza / Fast Food",
    category: "takeaway",
    images: [
      "https://images.unsplash.com/photo-1601924582971-df6a14b85b0e?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.2,
  },
  {
    name: "KFC Claremont",
    address: "Main Rd, Claremont, Cape Town",
    phone: "+27 21 671 4470",
    cuisine: "Fried Chicken / Fast Food",
    category: "takeaway",
    images: [
      "https://images.unsplash.com/photo-1588167056547-c9f4d5a0b5b1?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.1,

    // 🆕 New fields
    about:
      "Famous fried chicken brand offering quick meals, burgers, and takeaways in Claremont.",
    website: "https://www.kfc.co.za",
    openingHours: {
      monday: { open: "09:00", close: "22:00" },
      tuesday: { open: "09:00", close: "22:00" },
      wednesday: { open: "09:00", close: "22:00" },
      thursday: { open: "09:00", close: "22:00" },
      friday: { open: "09:00", close: "23:00" },
      saturday: { open: "09:00", close: "23:00" },
      sunday: { open: "09:00", close: "22:00" },
    },
  },
  {
    name: "Burger King Rondebosch",
    address: "Main Rd, Rondebosch, Cape Town",
    phone: "+27 21 689 5555",
    cuisine: "Burgers / Fast Food",
    category: "takeaway",
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.0,
  },

  {
    name: "Steers Claremont",
    address: "Main Rd, Claremont, Cape Town",
    phone: "+27 21 674 1234",
    cuisine: "Burgers / Fast Food",
    category: "takeaway",
    images: [ 
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.2,
  },

  //--- Breakfast / Brunch Places ---
  {
    name: "The Breakfast Club",
    address: "1st Floor, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 2224",
    cuisine: "Breakfast / Brunch",
    category: "Breakfast / Brunch Places",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.5,
  },
  {
    name: "Jason Bakery",
    address: "185 Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 1622",
    cuisine: "Bakery / Brunch",
    category: "Breakfast / Brunch Places",
    images: [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    ], 
    rating: 4.6,
  },
  {
    name: "Clarke's Bar & Dining Room",
    address: "St. George's Mall, Cape Town City Centre",
    phone: "+27 21 422 0010",
    cuisine: "Breakfast / Brunch",
    category: "Breakfast / Brunch Places",
    images: [
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.4,
  },
  {
    name: "Bootlegger Coffee Company",
    address: "Shop 3, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3344",
    cuisine: "Coffee / Breakfast",
    category: "Breakfast / Brunch Places",
    images: [
      "https://images.unsplash.com/photo-1517686469429-8bdb88a3f2c3?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.3,
  },

  //--- TikTok Recommendations ---
  {
    name: "The Dog's Bollocks",
    address: "Shop 4, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3344",
    cuisine: "Burgers / Fast Food",
    category: "TikTok",
    images: [
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.5,
  },
  {
    name: "Scheckter's RAW",
    address: "Shop 5, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3345",
    cuisine: "Vegan / Healthy",
    category: "TikTok",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.6,
  },
  {
    name: "The Foodbarn Deli",
    address: "Shop 6, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3346",
    cuisine: "Deli / Gourmet",
    category: "TikTok",
    images: [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.4,
  },
  {
    name: "Lekker Vegan",
    address: "Shop 7, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3347",
    cuisine: "Vegan / Fast Food",
    category: "TikTok",
    images: [
      "https://images.unsplash.com/photo-1517686469429-8bdb88a3f2c3?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.3,
  },

  //--- Dessert Places ---
  {
    name: "The Creamery",
    address: "Shop 8, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3348",
    cuisine: "Ice Cream / Desserts",
    category: "Dessert",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.7,
  },
  {
    name: "Milky Lane",
    address: "Shop 9, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3349",
    cuisine: "Milkshakes / Desserts",
    category: "Dessert",
    images: [
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.5,
  },
  {
    name: "Dulce Cafe",
    address: "Shop 10, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3350",
    cuisine: "Cakes / Coffee",
    category: "Dessert",
    images: [
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.6,
  },

  //--- Hangout Bars & Social Eateries ---
  {
    name: "The Gin Bar",
    address: "Shop 11, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3351",
    cuisine: "Bar / Cocktails",
    category: "Hangout",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.8,
  },
  {
    name: "Asoka",
    address: "Shop 12, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3352",
    cuisine: "Asian Fusion / Bar",
    category: "Hangout",
    images: [
      "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.7,
  },
  {
    name: "Tjing Tjing Rooftop Bar",
    address: "Shop 13, 2A Kloof St, Gardens, Cape Town",
    phone: "+27 21 422 3353",
    cuisine: "Rooftop Bar / Asian",
    category: "Hangout",
    images: [
      "https://images.unsplash.com/photo-1541542684-4a6aea8d1462?q=80&w=1200&auto=format&fit=crop",
    ],
    rating: 4.6,
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Restaurant.deleteMany({});
    console.log("🗑️ Old restaurants deleted");

    await Restaurant.insertMany(data);
    console.log(`✅ Seeded ${data.length} entries`);
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();
