import mongoose from "mongoose";
import "dotenv/config";
import Event from "../models/Event.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

const data = [
    // --- Club Nights & Parties ---
    {
        name: "Electric Dreams",
        address: "123 Neon St, Party City",
        phone: "123-456-7890",
        cuisine: "Electronic Dance Music",
        images: [`${BASE_URL}/uploads/events/event1.jpg`],
        rating: 4.8,
        category: "ClubNightsParties",
        about: "Experience the ultimate electronic dance music nights with top DJs and vibrant lights.",
        website: "http://electricdreams.com",
        openingHours: {
            friday: { open: "22:00", close: "04:00" },
            saturday: { open: "22:00", close: "04:00" },
        },
    },

    {
        name: "Midnight Groove",
        address: "456 Dance Ave, Club Town",
        phone: "987-654-3210",
        cuisine: "Hip Hop & R&B",
        images: [`${BASE_URL}/uploads/events/event2.jpg`],
        rating: 4.5,
        category: "ClubNightsParties",
        about: "Dance the night away with the best hip hop and R&B tracks in town.",
        website: "http://midnightgroove.com",
        openingHours: {
            friday: { open: "21:00", close: "03:00" },
            saturday: { open: "21:00", close: "03:00" },
        },
    },
    // --- Music & Open Mic ---
    {
        name: "Acoustic Vibes",
        address: "789 Melody Ln, Music City",
        phone: "555-123-4567",
        cuisine: "Live Acoustic Music",
        images: [`${BASE_URL}/uploads/events/event3.jpg`],
        rating: 4.7,
        category: "MusicOpenMic",
        about: "Enjoy soulful acoustic performances by local artists in an intimate setting.",
        website: "http://acousticvibes.com",
        openingHours: {
            thursday: { open: "19:00", close: "22:00" },
            friday: { open: "19:00", close: "22:00" },
            saturday: { open: "19:00", close: "22:00" },
        },
    },
    {
        name: "Open Mic Nights",
        address: "321 Talent St, Star City",
        phone: "444-987-6543",
        cuisine: "Variety of Performances",
        images: [`${BASE_URL}/uploads/events/event4.jpg`],
        rating: 4.6,
        category: "MusicOpenMic",
        about: "Showcase your talent or enjoy performances from local musicians, poets, and comedians.",
        website: "http://openmicnights.com",
        openingHours: {
            wednesday: { open: "20:00", close: "23:00" },
            friday: { open: "20:00", close: "23:00" },
            saturday: { open: "20:00", close: "23:00" },
        },
    },
    // --- Creative Events ---  
    {
        name: "Art & Sip",
        address: "654 Canvas Rd, Creative Town",
        phone: "333-222-1111",
        cuisine: "Painting & Wine",
        images: [`${BASE_URL}/uploads/events/event5.jpg`],
        rating: 4.9,
        category: "CreativeEvents",
        about: "Unleash your creativity with guided painting sessions while enjoying a glass of wine.",
        website: "http://artandsip.com",
        openingHours: {
            tuesday: { open: "18:00", close: "21:00" },
            thursday: { open: "18:00", close: "21:00" },
            saturday: { open: "14:00", close: "17:00" },
        },
    },
    {
        name: "Craft & Create",
        address: "987 DIY Blvd, Maker City",
        phone: "222-333-4444",
        cuisine: "Hands-on Workshops",
        images: [`${BASE_URL}/uploads/events/event6.jpg`],
        rating: 4.8,
        category: "CreativeEvents",
        about: "Join our workshops to learn new crafts and create unique handmade items.",
        website: "http://craftandcreate.com",
        openingHours: {
            saturday: { open: "10:00", close: "13:00" },
            sunday: { open: "10:00", close: "13:00" },
        },
    },

    //--- SocialNights ---
     {
        name: "Paint the city",
        address: "654 Canvas Rd, Cape Town",
        phone: "353-2672-8961",
        cuisine: "Painting & Wine",
        images: [`${BASE_URL}/uploads/events/event1.jpg`],
        rating: 4.9,
        category: "SocialNights",
        about: "Unleash your creativity with guided painting sessions while enjoying a glass of wine.",
        website: "http://artandsip.com",
        openingHours: {
            tuesday: { open: "18:00", close: "21:00" },
            thursday: { open: "18:00", close: "21:00" },
            saturday: { open: "14:00", close: "17:00" },
        },
    },
    {
        name: "Hi Friend",
        address: "987 DIY Blvd, Maker City",
        phone: "+27 976 567 7987",
        cuisine: "Hands-on Workshops",
        images: [`${BASE_URL}/uploads/events/event2.jpg`],
        rating: 4.8,
        category: "SocialNights",
        about: "Join our workshops to learn new crafts and create unique handmade items.",
        website: "http://craftandcreate.com",
        openingHours: {
            saturday: { open: "10:00", close: "13:00" },
            sunday: { open: "10:00", close: "13:00" },
        },
    },

    //--- OutdoorNightEvents ---
    {
        name: "The Wave",
        address: "Lower Main, Cape Town obs",
        phone: "555-123-4567",
        cuisine: "Live Acoustic Music",
        images: [`${BASE_URL}/uploads/events/event3.jpg`],
        rating: 4.7,
        category: "OutdoorNightEvents",
        about: "Enjoy soulful acoustic performances by local artists in an intimate setting.",
        website: "http://acousticvibes.com",
        openingHours: {
            thursday: { open: "19:00", close: "22:00" },
            friday: { open: "19:00", close: "22:00" },
            saturday: { open: "19:00", close: "22:00" },
        },
    },
    {
        name: "night in lagos",
        address: "321 Woodstock, Cape Town",
        phone: "+27 787 576 7866",
        cuisine: "Variety of Performances",
        images: [`${BASE_URL}/uploads/events/event4.jpg`],
        rating: 4.6,
        category: "OutdoorNightEvents",
        about: "Showcase your talent or enjoy performances from local musicians, poets, and comedians.",
        website: "http://openmicnights.com",
        openingHours: {
            saturday: { open: "20:00", close: "23:00" },
        },
    },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Event.deleteMany({});
    console.log("🗑️ Old events deleted");

    await Event.insertMany(data);
    console.log(`✅ Seeded ${data.length} entries`);
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();