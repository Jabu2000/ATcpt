import mongoose from "mongoose";
import "dotenv/config";
import Place from "../models/Places.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

const data = [
    // --- NatureOutdoors ---
  {
    name: "Table Mountain",
    address: "Cape Town, South Africa",
    phone: "+27 21 123 4567",
    cuisine: "Nature",
    images: [`${BASE_URL}/uploads/places/nature1.jpg`],
    rating: 4.8,
    category: "NatureOutdoors",
    about: "A stunning flat-topped mountain offering panoramic views of Cape Town and the surrounding ocean.",
    website: "https://www.tablemountain.net",
    openingHours: {
        monday: { open: "08:00", close: "18:00" },
        tuesday: { open: "08:00", close: "18:00" },
        wednesday: { open: "08:00", close: "18:00" },
        thursday: { open: "08:00", close: "18:00" },
        friday: { open: "08:00", close: "18:00" },
        saturday: { open: "08:00", close: "18:00" },
        sunday: { open: "08:00", close: "18:00" },
        },
  },
  {
    name: "Kirstenbosch Botanical Gardens",
    address: "Rhodes Dr, Newlands, Cape Town, South Africa",
    phone: "+27 21 799 8783",
    cuisine: "Nature",
    images: [`${BASE_URL}/uploads/places/nature2.jpg`],
    rating: 4.7,
    category: "NatureOutdoors",
    about: "A world-renowned botanical garden showcasing South Africa's rich flora.",
    website: "https://www.sanbi.org/gardens/kirstenbosch/",
    openingHours: {
        monday: { open: "08:00", close: "18:00" },
        tuesday: { open: "08:00", close: "18:00" },
        wednesday: { open: "08:00", close: "18:00" },
        thursday: { open: "08:00", close: "18:00" },
        friday: { open: "08:00", close: "18:00" },
        saturday: { open: "08:00", close: "18:00" },
        sunday: { open: "08:00", close: "18:00" },
        },
  },
    {
    name: "Boulders Beach",
    address: "Simon's Town, Cape Town, South Africa",
    phone: "+27 21 786 2325",
    cuisine: "Nature",
    images: [`${BASE_URL}/uploads/places/nature3.jpg`],
    rating: 4.6,
    category: "NatureOutdoors",
    about: "A beautiful beach known for its resident African penguin colony.",
    website: "https://www.sanparks.org/parks/table_mountain/tourism/attractions.php",
    openingHours: {
        monday: { open: "06:00", close: "18:00" },
        tuesday: { open: "06:00", close: "18:00" },
        wednesday: { open: "06:00", close: "18:00" },
        thursday: { open: "06:00", close: "18:00" },
        friday: { open: "06:00", close: "18:00" },
        saturday: { open: "06:00", close: "18:00" },
        sunday: { open: "06:00", close: "18:00" },
        },
  },
    // --- HistoricalCultural ---
    {
    name: "Robben Island",
    address: "Robben Island, Cape Town, South Africa",
    phone: "+27 21 413 4200",
    cuisine: "Historical",
    images: [`${BASE_URL}/uploads/places/historical1.jpg`],
    rating: 4.9,
    category: "HistoricalCultural",
    about: "A UNESCO World Heritage Site known for its historical significance and former prison.",
    website: "https://www.robben-island.org.za",
    openingHours: {
        monday: { open: "09:00", close: "15:00" },
        tuesday: { open: "09:00", close: "15:00" },
        wednesday: { open: "09:00", close: "15:00" },
        thursday: { open: "09:00", close: "15:00" },
        friday: { open: "09:00", close: "15:00" },
        saturday: { open: "09:00", close: "15:00" },
        sunday: { open: "09:00", close: "15:00" },
        },
    },
    {
    name: "Castle of Good Hope",
    address: "Buitenkant St, Cape Town, South Africa",
    phone: "+27 21 467 8000",
    cuisine: "Historical",
    images: [`${BASE_URL}/uploads/places/historical2.jpg`],
    rating: 4.5,
    category: "HistoricalCultural",
    about: "The oldest surviving colonial building in South Africa, dating back to the 17th century.",
    website: "https://www.castleofgoodhope.co.za",
    openingHours: {
        monday: { open: "09:00", close: "17:00" },
        tuesday: { open: "09:00", close: "17:00" },
        wednesday: { open: "09:00", close: "17:00" },
        thursday: { open: "09:00", close: "17:00" },
        friday: { open: "09:00", close: "17:00" },
        saturday: { open: "09:00", close: "17:00" },
        sunday: { open: "09:00", close: "17:00" },
        },
    },
    {
      name: "District Six Museum",
      address: "25A Buitenkant St, Cape Town, South Africa",
      phone: "+27 21 466 7200",
      cuisine: "Cultural",
      images: [`${BASE_URL}/uploads/places/historical3.jpg`],
      rating: 4.4,
      category: "HistoricalCultural",
      about: "A museum dedicated to the history of District Six and the forced remove",
      website: "https://www.districtsix.co.za",
      openingHours: {
          monday: { open: "09:00", close: "16:30" },
          tuesday: { open: "09:00", close: "16:30" },
          wednesday: { open: "09:00", close: "16:30" },
          thursday: { open: "09:00", close: "16:30" },
          friday: { open: "09:00", close: "16:30" },
          saturday: { open: "09:00", close: "16:30" },
          sunday: { open: "09:00", close: "16:30" },
          },
    },
    // --- Entertainment ---
    {
      name: "V&A Waterfront",
      address: "V&A Waterfront, Cape Town, South Africa",
      phone: "+27 21 408 7600",
      cuisine: "Entertainment",
      images: [`${BASE_URL}/uploads/places/entertainment1.jpg`],
      rating: 4.7,
      category: "Entertainment",
      about: "A bustling shopping and entertainment hub with shops, restaurants, and attractions.",
      website: "https://www.waterfront.co.za",
      openingHours: {
          monday: { open: "09:00", close: "21:00" },
          tuesday: { open: "09:00", close: "21:00" },
          wednesday: { open: "09:00", close: "21:00" },
          thursday: { open: "09:00", close: "21:00" },
          friday: { open: "09:00", close: "21:00" },
          saturday: { open: "09:00", close: "21:00" },
          sunday: { open: "09:00", close: "21:00" },
          },
    },
    {
      name: "Cape Town Stadium",
      address: "De Beers Ave, Green Point, Cape Town, South Africa",
      phone: "+27 21 410 5000",
      cuisine: "Entertainment",
      images: [`${BASE_URL}/uploads/places/entertainment2.jpg`],
      rating: 4.6,
      category: "Entertainment",
      about: "A modern stadium hosting sports events, concerts, and other large-scale events.",
      website: "https://www.capetownstadium.com",
      openingHours: {
          monday: { open: "10:00", close: "18:00" },
          tuesday: { open: "10:00", close: "18:00" },
          wednesday: { open: "10:00", close: "18:00" },
          thursday: { open: "10:00", close: "18:00" },
          friday: { open: "10:00", close: "18:00" },
          saturday: { open: "10:00", close: "18:00" },
          sunday: { open: "10:00", close: "18:00" },
          },
    },
    {
      name: "Theatre on the Bay",
      address: "Quay 5, V&A Waterfront, Cape Town, South Africa",
      phone: "+27 21 418 1234",
      cuisine: "Entertainment",
      images: [`${BASE_URL}/uploads/places/entertainment3.jpg`],
      rating: 4.5,
      category: "Entertainment",
      about: "A premier venue for live theatre productions, musicals, and performances.",
      website: "https://www.theatreonthebay.co.za",
      openingHours: {
          monday: { open: "10:00", close: "18:00" },
          tuesday: { open: "10:00", close: "18:00" },
          wednesday: { open: "10:00", close: "18:00" },
          thursday: { open: "10:00", close: "18:00" },
          friday: { open: "10:00", close: "18:00" },
          saturday: { open: "10:00", close: "18:00" },
          sunday: { open: "10:00", close: "18:00" },
          },
    },

    // --- SocialActivities ---
    {
      name: "Long Street",
      address: "Long St, Cape Town, South Africa",
      phone: "+27 21 123 4567",
      cuisine: "Social",
      images: [`${BASE_URL}/uploads/places/social1.jpg`],
      rating: 4.4,
      category: "SocialActivities",
      about: "A vibrant street known for its nightlife, bars, clubs, and restaurants.",
      website: "https://www.capetown.travel/attractions/long-street/",
      openingHours: {
          monday: { open: "10:00", close: "02:00" },
          tuesday: { open: "10:00", close: "02:00" },
          wednesday: { open: "10:00", close: "02:00" },
          thursday: { open: "10:00", close: "02:00" },
          friday: { open: "10:00", close: "02:00" },
          saturday: { open: "10:00", close: "02:00" },
          sunday: { open: "10:00", close: "02:00" },
          },
    },
    {
      name: "Camps Bay Beach",
      address: "Camps Bay, Cape Town, South Africa",
      phone: "+27 21 123 4567",
      cuisine: "Social",
      images: [`${BASE_URL}/uploads/places/social2.jpg`],
      rating: 4.7,
      category: "SocialActivities",
      about: "A popular beach with trendy bars and restaurants along the promenade.",
      website: "https://www.capetown.travel/attractions/camps-bay-beach/",
      openingHours: {
          monday: { open: "06:00", close: "18:00" },
          tuesday: { open: "06:00", close: "18:00" },
          wednesday: { open: "06:00", close: "18:00" },
          thursday: { open: "06:00", close: "18:00" },
          friday: { open: "06:00", close: "18:00" },
          saturday: { open: "06:00", close: "18:00" },
          sunday: { open: "06:00", close: "18:00" },
          },
    },
    {
      name: "Kloof Street",
      address: "Kloof St, Cape Town, South Africa",
      phone: "+27 21 123 4567",
      cuisine: "Social",
      images: [`${BASE_URL}/uploads/places/social3.jpg`],
      rating: 4.5,
      category: "SocialActivities",
      about: "A lively street with a mix of cafes, bars, and boutiques, perfect for socializing.",
      website: "https://www.capetown.travel/attractions/kloof-street/",
      openingHours: {
          monday: { open: "10:00", close: "22:00" },
          tuesday: { open: "10:00", close: "22:00" },
          wednesday: { open: "10:00", close: "22:00" },
          thursday: { open: "10:00", close: "22:00" },
          friday: { open: "10:00", close: "22:00" },
          saturday: { open: "10:00", close: "22:00" },
          sunday: { open: "10:00", close: "22:00" },
          },
    },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Place.deleteMany({});
    console.log("🗑️ Old stors deleted");

    await Place.insertMany(data);
    console.log(`✅ Seeded ${data.length} entries`);
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();
