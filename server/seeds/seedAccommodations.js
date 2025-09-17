import mongoose from "mongoose";
import "dotenv/config";
import Accommodation from "../models/Accommodation.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

const data = [
    //--- SupportResidences ---
     {
        name: "Accommodation 1",
        address: "123 Vintage St, Cityville",
        phone: "555-1234",
        cuisine: "N/A",
        images: [`${BASE_URL}/uploads/accommodations/accommodation.jpg`],
        rating: 4.5,
        category: "SupportResidences",
        about: "A treasure trove of vintage clothing and accessories from the 60s, 70s, and 80s.",
        website: "http://www.retrorevival.com",
        openingHours: {
            monday: { open: "10:00", close: "18:00" },
            tuesday: { open: "10:00", close: "18:00" },
            wednesday: { open: "10:00", close: "18:00" },
            thursday: { open: "10:00", close: "18:00" },
            friday: { open: "10:00", close: "20:00" },
            saturday: { open: "10:00", close: "20:00" },
            sunday: { open: "12:00", close: "16:00" },
        },
    },
    {
        name: "Accommodation 2",
        address: "456 Classic Ave, Townsville",
        phone: "555-5678",
        cuisine: "N/A",
        images: [`${BASE_URL}/uploads/accommodations/accommodation1.jpg`],
        rating: 4.7,
        category: "SupportResidences",
        about: "Curated collection of vintage furniture, home decor, and unique finds.",
        website: "http://www.timelesstreasures.com",
        openingHours: {
            monday: { open: "11:00", close: "17:00" },
            tuesday: { open: "11:00", close: "17:00" },
            wednesday: { open: "11:00", close: "17:00" },
            thursday: { open: "11:00", close: "17:00" },
            friday: { open: "11:00", close: "19:00" },
            saturday: { open: "11:00", close: "19:00" },
            sunday: { open: "12:00", close: "16:00" },
        },
    },
    //--- PrivateSingle ---
    {
        name: "Accommodation 3",
        address: "789 Fashion Rd, Metropolis",
        phone: "555-8765",
        cuisine: "N/A",
        images: [`${BASE_URL}/uploads/accommodations/accommodation3.jpg`],
        rating: 4.8,
        category: "PrivateSingle",
        about: "Contemporary fashion boutique featuring the latest trends and designer labels.",
        website: "http://www.chicboutique.com",
        openingHours: {
            monday: { open: "10:00", close: "19:00" },
            tuesday: { open: "10:00", close: "19:00" },
            wednesday: { open: "10:00", close: "19:00" },
            thursday: { open: "10:00", close: "19:00" },
            friday: { open: "10:00", close: "21:00" },
            saturday: { open: "10:00", close: "21:00" },
            sunday: { open: "12:00", close: "17:00" },
        },
    },
    {
        name: "Accommodation 4",
        address: "321 Trendy Ln, Uptown",
        phone: "555-4321",
        cuisine: "N/A",
        images: [`${BASE_URL}/uploads/accommodations/accommodation4.jpg`],
        rating: 4.6,
        category: "PrivateSingle",
        about: "A stylish boutique offering a mix of casual and formal wear for the modern individual.",
        website: "http://www.urbanstyle.com",
        openingHours: {
            monday: { open: "10:00", close: "18:00" },
            tuesday: { open: "10:00", close: "18:00" },
            wednesday: { open: "10:00", close: "18:00" },
            thursday: { open: "10:00", close: "18:00" },
            friday: { open: "10:00", close: "20:00" },
            saturday: { open: "10:00", close: "20:00" },
            sunday: { open: "12:00", close: "16:00" },
        },
    },

    //--- SharedHousesApartments ---
       {
        name: "Accommodation 5",
        address: "123 Vintage St, Cityville",
        phone: "555-1234",
        cuisine: "N/A",
        images: [`${BASE_URL}/uploads/accommodations/accommodation.jpg`],
        rating: 4.5,
        category: "SharedHousesApartments",
        about: "A treasure trove of vintage clothing and accessories from the 60s, 70s, and 80s.",
        website: "http://www.retrorevival.com",
        openingHours: {
            monday: { open: "10:00", close: "18:00" },
            tuesday: { open: "10:00", close: "18:00" },
            wednesday: { open: "10:00", close: "18:00" },
            thursday: { open: "10:00", close: "18:00" },
            friday: { open: "10:00", close: "20:00" },
            saturday: { open: "10:00", close: "20:00" },
            sunday: { open: "12:00", close: "16:00" },
        },
    },
    {
        name: "Accommodation 6",
        address: "456 Classic Ave, Townsville",
        phone: "555-5678",
        cuisine: "N/A",
        images: [`${BASE_URL}/uploads/accommodations/accommodation1.jpg`],
        rating: 4.7,
        category: "SharedHousesApartments",
        about: "Curated collection of vintage furniture, home decor, and unique finds.",
        website: "http://www.timelesstreasures.com",
        openingHours: {
            monday: { open: "11:00", close: "17:00" },
            tuesday: { open: "11:00", close: "17:00" },
            wednesday: { open: "11:00", close: "17:00" },
            thursday: { open: "11:00", close: "17:00" },
            friday: { open: "11:00", close: "19:00" },
            saturday: { open: "11:00", close: "19:00" },
            sunday: { open: "12:00", close: "16:00" },
        },
    },

    //--- PrivateStudentComplexes ---
        {
        name: "Accommodation 7",
        address: "789 Fashion Rd, Metropolis",
        phone: "555-8765",
        cuisine: "N/A",
        images: [`${BASE_URL}/uploads/accommodations/accommodation3.jpg`],
        rating: 4.8,
        category: "PrivateStudentComplexes",
        about: "Contemporary fashion boutique featuring the latest trends and designer labels.",
        website: "http://www.chicboutique.com",
        openingHours: {
            monday: { open: "10:00", close: "19:00" },
            tuesday: { open: "10:00", close: "19:00" },
            wednesday: { open: "10:00", close: "19:00" },
            thursday: { open: "10:00", close: "19:00" },
            friday: { open: "10:00", close: "21:00" },
            saturday: { open: "10:00", close: "21:00" },
            sunday: { open: "12:00", close: "17:00" },
        },
    },
    {
        name: "Accommodation 8",
        address: "321 Trendy Ln, Uptown",
        phone: "555-4321",
        cuisine: "N/A",
        images: [`${BASE_URL}/uploads/accommodations/accommodation4.jpg`],
        rating: 4.6,
        category: "PrivateStudentComplexes",
        about: "A stylish boutique offering a mix of casual and formal wear for the modern individual.",
        website: "http://www.urbanstyle.com",
        openingHours: {
            monday: { open: "10:00", close: "18:00" },
            tuesday: { open: "10:00", close: "18:00" },
            wednesday: { open: "10:00", close: "18:00" },
            thursday: { open: "10:00", close: "18:00" },
            friday: { open: "10:00", close: "20:00" },
            saturday: { open: "10:00", close: "20:00" },
            sunday: { open: "12:00", close: "16:00" },
        },
    },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Accommodation.deleteMany({});
    console.log("🗑️ Old Accommodations deleted");

    await Accommodation.insertMany(data);
    console.log(`✅ Seeded ${data.length} entries`);
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();
