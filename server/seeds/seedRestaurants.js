import mongoose from "mongoose";
import "dotenv/config";
import Restaurant from "../models/Restaurant.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";


const data = [
  // --- Restaurants ---
  {
    name: "The Wolf House",
    address: "62 Kloof St, Gardens, Cape Town, 8001",
    phone: "021 271 0641",
    cuisine: "ContemAporary",
    category: "restaurant",
    images: [
      `${BASE_URL}/uploads/restaurants/wolfhouse/wolfhouse1.png`, `${BASE_URL}/uploads/restaurants/wolfhouse/wolfhouse2.png`, `${BASE_URL}/uploads/restaurants/wolfhouse/wolfhouse3.png`, `${BASE_URL}/uploads/restaurants/wolfhouse/wolfhouse4.png`, `${BASE_URL}/uploads/restaurants/wolfhouse/wolfhouse5.png`, `${BASE_URL}/uploads/restaurants/wolfhouse/wolfhouse6.png`, `${BASE_URL}/uploads/restaurants/wolfhouse/wolfhouse7.png`
    ],
    rating: 3.7,
    category: "restaurant",
    about:
      "Relax, unwind and indulge in the city life. Founded in 2020, The Wolf House is a trendy restaurant in Kloof Street with a rooftop bar. The ideal spot to chill out for after-work drinks. Delicious food and breath-taking sunsets.",
    website: "https://thewolfhouse.co.za/#book",
    openingHours: {
      monday: { open: "12:00", close: "23:00" },
      tuesday: { open: "12:00", close: "23:00" },
      wednesday: { open: "12:00", close: "23:00" },
      thursday: { open: "12:00", close: "23:00" },
      friday: { open: "12:00", close: "00:00" },
      saturday: { open: "12:00", close: "00:00" },
      sunday: { open: "12:00", close: "23:00" },
    },
  },
  {
    name: "Burger & Brews",
    address:
      "110 Bree St, Cape Town City Centre, Cape Town, 8000",
    phone: "",
    cuisine: "Fine Dining ",
    category: "restaurant",
    images: [
      `${BASE_URL}/uploads/restaurants/Burgers&Brews/B&Bimg1.png`, `${BASE_URL}/uploads/restaurants/Burgers&Brews/B&Bimg2.png`, `${BASE_URL}/uploads/restaurants/Burgers&Brews/B&Bimg3.png`, `${BASE_URL}/uploads/restaurants/Burgers&Brews/B&Bimg4.png`, `${BASE_URL}/uploads/restaurants/Burgers&Brews/B&Bimg5.png`, `${BASE_URL}/uploads/restaurants/Burgers&Brews/B&Bimg6.png`,
    ],
    rating: 4,
    category: "restaurant",
    about:
      "Burger Brews documents the experiences of regular Capetonian brus in our search for the best burger spots in Cape Town. Of course, what is a good burger without a good brew?!We review each restaurant we visit and provide ratings based on five categories which form part of every dining experience.Relax, unwind and indulge in the city life. Founded in 2020, The Wolf House is a trendy restaurant in Kloof Street with a rooftop bar. The ideal spot to chill out for after-work drinks. Delicious food and breath-taking sunsets.",
    website: "https://burgerbrews.co.za/",
    openingHours: {
      monday: { open: "11:00", close: "22:00" },
      tuesday: { open: "11:00", close: "22:00" },
      wednesday: { open: "11:00", close: "23:00" },
      thursday: { open: "11:00", close: "23:00" },
      friday: { open: "11:00", close: "23:00" },
      saturday: { open: "11:00", close: "23:00" },
      sunday: { open: "11:00", close: "23:00" },
    },
  },
  {
    name: "Zuney Wagyu Burger Bar",
    address: "Shop 2, 69A Kloof St, Gardens, Cape Town, 8001",
    phone: "076 430 7584",
    cuisine: "Fine Dining",
    category: "restaurant",
    images: [
      `${BASE_URL}/uploads/restaurants/ZuneywagyuBurger/ZWBimg1.png`, `${BASE_URL}/uploads/restaurants/ZuneywagyuBurger/ZWBimg2.png`, `${BASE_URL}/uploads/restaurants/ZuneywagyuBurger/ZWBimg3.png`, `${BASE_URL}/uploads/restaurants/ZuneywagyuBurger/ZWBimg4.png`, `${BASE_URL}/uploads/restaurants/ZuneywagyuBurger/ZWBimg5.png`,
    ],
    rating: 4.8,
    category: "restaurant",
    about:
      "Famous for their 100% Wagyu beef burgers, Zuney Wagyu Burger Bar in Kloof Street, Cape Town, offers a gourmet burger experience with a variety of unique toppings and sides. Their commitment to quality and flavor has made them a favorite among burger enthusiasts.",
    website: "https://www.zuneyburgers.com/",
    openingHours: {
      monday: { open: "11:00", close: "22:00" },
      tuesday: { open: "11:00", close: "22:00" },
      wednesday: { open: "11:00", close: "22:00" },
      thursday: { open: "11:00", close: "01:00" },
      friday: { open: "11:00", close: "01:00" },
      saturday: { open: "11:00", close: "01:00" },
      sunday: { open: "11:00", close: "22:00" },
    },
  },
  {
    name: "Jerry's Burger Bar",
    address: "Heritage Square, 98 Shortmarket St, Cape Town City Centre, Cape Town, 8001",
    phone: "021 569 1355",
    cuisine: "Small Plates / ContemAporary",
    category: "restaurant", // ✅ added
    images: [
      `${BASE_URL}/uploads/restaurants/JerrysBurgerBar/JBBimg1.png`, `${BASE_URL}/uploads/restaurants/JerrysBurgerBar/JBBimg2.png`, `${BASE_URL}/uploads/restaurants/JerrysBurgerBar/JBBimg3.png`, `${BASE_URL}/uploads/restaurants/JerrysBurgerBar/JBBimg4.png`, `${BASE_URL}/uploads/restaurants/JerrysBurgerBar/JBBimg5.png`,
    ],
    rating: 4.5,
    category: "restaurant",
    about:
      "Jerry’s was born from our belief that a burger isn’t JUST a burger! We aim to provide an experience, using the freshest, best locally-sourced ingredients on a daily basis. A place to meet, enjoy great food, craft beers and whiskey",
    website: "https://www.jerrysburgerbar.co.za/",
    openingHours: {
      monday: { open: "11:00", close: "22:30" },
      tuesday: { open: "11:00", close: "22:30" },
      wednesday: { open: "11:00", close: "22:30" },
      thursday: { open: "11:00", close: "22:30" },
      friday: { open: "11:00", close: "22:30" },
      saturday: { open: "11:00", close: "22:30" },
      sunday: { open: "11:00", close: "22:30" },
    },
  },
  {
    name: "Egghead",
    address: "34 Kloof St, Gardens, Cape Town, 8005",
    phone: "021 286 9034",
    cuisine: "Seafood",
    category: "restaurant", // ✅ added
    images: [
      `${BASE_URL}/uploads/restaurants/Egghead/EHimg1.png`, `${BASE_URL}/uploads/restaurants/Egghead/EHimg2.png`, `${BASE_URL}/uploads/restaurants/Egghead/EHimg3.png`, `${BASE_URL}/uploads/restaurants/Egghead/EHimg4.png`, `${BASE_URL}/uploads/restaurants/Egghead/EHimg5.png`, `${BASE_URL}/uploads/restaurants/Egghead/EHimg6.png`,
    ],
    rating: 4.5,
    category: "restaurant",
    about:
      "We like our people the way we like our eggs, sunny-side up or a little scrambled. Whether you’re an early riser wanting coffee and a treat, a creative looking for a place to work, or asocialite wanting to grab dinner with friends, we have a spot for you. Our space is a contemAporary take on an old-school 70’s diner, brought to life by retro design elements and food that warms your soul. Bauhaus art covers the walls, neon lights make the restaurant's gold and eclectic Ornaments keep your eyes wandering. Curbside tables offer a view of the table mountain, the bar tables are a perfect place to work, and a train of cosy Yellow booths will temApt you to cheers a few drinks.",
    website: "https://burgerbrews.co.za/",
    openingHours: {
      monday: { open: "11:00", close: "22:00" },
      tuesday: { open: "11:00", close: "22:00" },
      wednesday: { open: "11:00", close: "23:00" },
      thursday: { open: "11:00", close: "23:00" },
      friday: { open: "11:00", close: "23:00" },
      saturday: { open: "11:00", close: "23:00" },
      sunday: { open: "11:00", close: "23:00" },
    },
  },
  {
    name: "Cape Tandoor",
    address: "Shop G26, Cape Station -Retail, 7 Adderley St, Foreshore, Cape Town, 8001",
    phone: "066 519 8929",
    cuisine: "Tasting Menu",
    category: "restaurant", // ✅ added
    rating: 3.8,
    images: [
      `${BASE_URL}/uploads/restaurants/CapeTandoor/CTimg1.png`, `${BASE_URL}/uploads/restaurants/CapeTandoor/CTimg2.png`, `${BASE_URL}/uploads/restaurants/CapeTandoor/CTimg3.png`, `${BASE_URL}/uploads/restaurants/CapeTandoor/CTimg4.png`, `${BASE_URL}/uploads/restaurants/CapeTandoor/CTimg5.png`,
    ],
    about:
      "Cape Tandoor is an Indian restaurant located in Cape Town, South Africa. Known for its authentic Indian cuisine, the restaurant offers a variety of traditional dishes prepared with rich spices and fresh ingredients. The ambiance is warm and inviting, making it a popular spot for both locals and tourists looking to enjoy a flavorful dining experience.",
    website: "@cape_tandoor",
    openingHours: {
      monday: { open: "09:00", close: "20:00" },
      tuesday: { open: "09:00", close: "20:00" },
      wednesday: { open: "09:00", close: "20:00" },
      thursday: { open: "09:00", close: "20:00" },
      friday: { open: "09:00", close: "20:00" },
      saturday: { open: "09:00", close: "20:00" },
      sunday: { open: "09:00", close: "20:00" },
    },
  },
  {
    name: "Kloof Street House",
    address: "30 Kloof St, Gardens, Cape Town, 8005",
    phone: "021 423 4413",
    cuisine: "ContemAporary",
    category: "restaurant", // ✅ added
    rating: 4.4,
    images: [
      `${BASE_URL}/uploads/restaurants/KloofStreetHouse/KSHimg1.png`, `${BASE_URL}/uploads/restaurants/KloofStreetHouse/KSHimg2.png`, `${BASE_URL}/uploads/restaurants/KloofStreetHouse/KSHimg3.png`, `${BASE_URL}/uploads/restaurants/KloofStreetHouse/KSHimg4.png`,
    ],
    about:
      "Richly furnished dining rooms in Victorian house with bar and leafy gardens, for eclectic cuisine.",
    website: "http://www.kloofstreethouse.co.za/menu/al-la-carte/",
    openingHours: {
      monday: { open: "12:00", close: "00:00" },
      tuesday: { open: "10:00", close: "00:00" },
      wednesday: { open: "10:00", close: "00:00" },
      thursday: { open: "10:00", close: "00:00" },
      friday: { open: "10:00", close: "00:00" },
      saturday: { open: "10:00", close: "00:00" },
      sunday: { open: "10:00", close: "00:00" },
    },
  },
   {
    name: "Nolz Kitchen",
    address: "Salt Orchard, A1 Briar Rd, Salt River, Cape Town",
    phone: "078 545 0865",
    cuisine: "ContemAporary",
    category: "restaurant", // ✅ added
    rating: 4.6,
    images: [
      `${BASE_URL}/uploads/restaurants/NolzKitchen/NKimg1.png`, `${BASE_URL}/uploads/restaurants/NolzKitchen/NKimg2.png`, `${BASE_URL}/uploads/restaurants/NolzKitchen/NKimg3.png`, `${BASE_URL}/uploads/restaurants/NolzKitchen/NKimg4.png`, `${BASE_URL}/uploads/restaurants/NolzKitchen/NKimg5.png`, `${BASE_URL}/uploads/restaurants/NolzKitchen/NKimg6.png`,
    ],
    about:
      "Nolz Kitchen is a vibrant eatery located in Salt River, Cape Town, known for its innovative and flavorful dishes. The restaurant offers a diverse menu that blends local ingredients with international culinary techniques, creating a unique dining experience. With a focus on fresh, seasonal produce and bold flavors, Nolz Kitchen has become a favorite among food enthusiasts looking for something different in the Cape Town dining scene.",
    website: "@nolz_kitchen",
    openingHours: {
      monday: { open: "12:00", close: "22:00" },
      tuesday: { close: "Closed" },
      wednesday: { open: "12:00", close: "22:00" },
      thursday: { open: "12:00", close: "22:00" },
      friday: { open: "12:00", close: "22:00" },
      saturday: { open: "12:00", close: "22:00" },
      sunday: { open: "12:00", close: "22:00" },
    },
  },
  {
    name: "Scheckters Raw",
    address: "98 Regent Rd, Sea Point, Cape Town, 8060",
    phone: "067 019 7080",
    cuisine: "ContemAporary",
    category: "restaurant", // ✅ added
    rating: 4.4,
    images: [
      `${BASE_URL}/uploads/restaurants/SchecktersRaw/SRimg1.png`, `${BASE_URL}/uploads/restaurants/SchecktersRaw/SRimg2.png`, `${BASE_URL}/uploads/restaurants/SchecktersRaw/SRimg3.png`, `${BASE_URL}/uploads/restaurants/SchecktersRaw/SRimg4.png`, `${BASE_URL}/uploads/restaurants/SchecktersRaw/SRimg5.png`, `${BASE_URL}/uploads/restaurants/SchecktersRaw/SRimg6.png`,
    ],
    about:
      "Scheckter’s Raw was created in the spirit of giving and sharing. Health food has always been a big part of my diet but when I was living in New York launching Scheckter’s OrganicEnergy™ I was blown away by the ingenuity and creativity that was flourishing in the health food scene and a greater passion was sparked in me.",
    website: "http://www.schecktersraw.com/",
    openingHours: {
      monday: { open: "08:00", close: "21:00" },
      tuesday: { open: "08:00", close: "21:00" },
      wednesday: { open: "08:00", close: "21:00" },
      thursday: { open: "08:00", close: "21:00" },
      friday: { open: "08:00", close: "21:00" },
      saturday: { open: "08:00", close: "21:00" },
      sunday: { open: "08:00", close: "21:00" },
    },
  },
  {
    name: "The Poke co",
    address: "12 Dreyer st, Claremont (7700)",
    phone: "087 470 0583",
    cuisine: "ContemAporary",
    category: "restaurant", // ✅ added
    rating: 4.7,
    images: [
      `${BASE_URL}/uploads/restaurants/ThePokeco/TPCimg1.png`, `${BASE_URL}/uploads/restaurants/ThePokeco/TPCimg2.png`, `${BASE_URL}/uploads/restaurants/ThePokeco/TPCimg3.png`, `${BASE_URL}/uploads/restaurants/ThePokeco/TPCimg4.png`, `${BASE_URL}/uploads/restaurants/ThePokeco/TPCimg5.png`, `${BASE_URL}/uploads/restaurants/ThePokeco/TPCimg6.png`,
    ],
    about:
      "Whether you're looking for a meal on-the-go, or a meal to take slow, our healthy Poké bowls are the best in the Western Cape.",
    website: "https://www.thepokeco.5loyalty.com/",
    openingHours: {
      monday: { open: "12:30", close: "20:00" },
      tuesday: { open: "10:30", close: "20:00" },
      wednesday: { open: "10:30", close: "20:00" },
      thursday: { open: "10:30", close: "20:00" },
      friday: { open: "10:30", close: "20:00" },
      saturday: { open: "10:30", close: "20:00" },
      sunday: { open: "10:30", close: "20:00" },
    },
  },
  {
    name: "Plucky's",
    address: "Mojo Market, 30 Regent Rd, Sea point, Cape Town",
    phone: "072 425 9964",
    cuisine: "ContemAporary",
    category: "restaurant", // ✅ added
    rating: 3.7,
    images: [
      `${BASE_URL}/uploads/restaurants/Pluckys/PLimg1.png`, `${BASE_URL}/uploads/restaurants/Pluckys/PLimg2.png`, `${BASE_URL}/uploads/restaurants/Pluckys/PLimg3.png`, `${BASE_URL}/uploads/restaurants/Pluckys/PLimg4.png`, `${BASE_URL}/uploads/restaurants/Pluckys/PLimg5.png`,
    ],
    about:
      "Halaal Certified, Plant-based & Flexitarian. Plucky’s Fried Chicken Korean Style. For the RSA Rainbow Nation. MAKE MY DAY!",
    website: "https://www.pluckys.co.za/menu",
    openingHours: {
      monday: { open: "11:00", close: "21:00" },
      tuesday: { open: "11:00", close: "21:00" },
      wednesday: { open: "11:00", close: "21:00" },
      thursday: { open: "11:00", close: "21:00" },
      friday: { open: "11:00", close: "23:00" },
      saturday: { open: "11:00", close: "23:00" },
      sunday: { open: "11:00", close: "21:00" },
    },
  },
  {
    name: "The Power And The Glory",
    address: "13d Kloof Nek Rd, Tamoerskloof, Cape Town ",
    phone: "021 213 1213",
    cuisine: "ContemAporary",
    category: "restaurant", // ✅ added
    rating: 4.4,
    images: [
      `${BASE_URL}/uploads/restaurants/ThePowerAndTheGlory/TPGimg1.png`, `${BASE_URL}/uploads/restaurants/ThePowerAndTheGlory/TPGimg2.png`, `${BASE_URL}/uploads/restaurants/ThePowerAndTheGlory/TPGimg3.png`, `${BASE_URL}/uploads/restaurants/ThePowerAndTheGlory/TPGimg4.png`, `${BASE_URL}/uploads/restaurants/ThePowerAndTheGlory/TPGimg5.png`, `${BASE_URL}/uploads/restaurants/ThePowerAndTheGlory/TPGimg6.png`,
        ],
    about:
      "This cozy hangout with a cool vibe offers coffee & light fare, along with draft beer & cider.",
    website: "https://www.allyoursco.com/the-power-and-the-glory",
    openingHours: {
      monday: { open: "07:30", close: "02:00" },
      tuesday: { open: "07:30", close: "02:00" },
      wednesday: { open: "07:30", close: "02:00" },
      thursday: { open: "07:30", close: "02:00" },
      friday: { open: "07:30", close: "02:00" },
      saturday: { open: "08:00", close: "02:00" },
      sunday: { open: "07:30", close: "02:00" },
    },
  },
  {
    name: "Seoul Pocha",
    address: " 28 Main Rd, Rondebosch, Cape Town, 7701",
    phone: "087 470 1260",
    cuisine: "ContemAporary",
    category: "restaurant", // ✅ added
    rating: 4.8,
    images: [
      `${BASE_URL}/uploads/restaurants/SeoulPocha/SPimg1.png`, `${BASE_URL}/uploads/restaurants/SeoulPocha/SPimg2.png`, `${BASE_URL}/uploads/restaurants/SeoulPocha/SPimg3.png`, `${BASE_URL}/uploads/restaurants/SeoulPocha/SPimg4.png`, `${BASE_URL}/uploads/restaurants/SeoulPocha/SPimg5.png`, `${BASE_URL}/uploads/restaurants/SeoulPocha/SPimg6.png`,
    ],
    about:
      "Experience the vibrant flavors of Korea at Seoul Pocha, your go-to destination for authentic Korean cuisine. Located in the heart of Rondebosch, Cape Town, we serve traditional favorites like bibimbap, Korean BBQ, and hearty stews. Whether you're stopping by for a quick lunch or a full dining experience, our warm atmosphere and friendly service will make you feel right at home or in Seoul. Dine in and taste Korea today at Seoul Pocha",
    website: "https://account.dineplan.com/menu/gCdKc9lj/5087",
    openingHours: {
      monday: { open: "12:00", close: "21:00" },
      tuesday: { open: "12:00", close: "21:00" },
      wednesday: { open: "12:00", close: "21:00" },
      thursday: { open: "12:00", close: "21:00" },
      friday: { open: "12:00", close: "21:00" },
      saturday: { open: "12:00", close: "21:00" },
      sunday: { open: "12:00", close: "21:00" },
    },
  },
  {
    name: "Linko Sushi",
    address: "88 Lower Main Rd, Observatory, Cape Town",
    phone: "021 447 6509",
    cuisine: "ContemAporary",
    category: "restaurant", // ✅ added
    rating: 4.5,
    images: [
      `${BASE_URL}/uploads/restaurants/LinkoSushi/LSimg1.png`, `${BASE_URL}/uploads/restaurants/LinkoSushi/LSimg2.png`, `${BASE_URL}/uploads/restaurants/LinkoSushi/LSimg3.png`, `${BASE_URL}/uploads/restaurants/LinkoSushi/LSimg4.png`, `${BASE_URL}/uploads/restaurants/LinkoSushi/LSimg5.png`, `${BASE_URL}/uploads/restaurants/LinkoSushi/LSimg6.png`,
    ],
    about:
      "Linko Restaurant is a family-owned business that was established in January 2013 by the owner, Linko Zhou. At Linko Restaurant we create unique culinary experiences for people who enjoy authentic Chinese food and fresh sushi. We have the culinary ingenuity of skillful chefs, dazzling foods and the friendliest service.",
    website: "http://www.linkorestaurant.co.za/",
    openingHours: {
      monday: { open: "11:00", close: "21:00" },
      tuesday: { open: "11:00", close: "21:00" },
      wednesday: { open: "11:00", close: "21:00" },
      thursday: { open: "11:00", close: "21:00" },
      friday: { open: "11:00", close: "21:00" },
      saturday: { open: "11:00", close: "21:00" },
      sunday: { open: "11:00", close: "21:00" },
    },
  },
  {
    name: "The Eatery",
    address: "70 Belvedere Rd, Claremont, Cape Town, 7708",
    phone: "021 003 4504",
    cuisine: "ContemAporary",
    category: "restaurant", // ✅ added
    rating: 4.4,
    images: [
      `${BASE_URL}/uploads/restaurants/TheEatery/TEimg1.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg2.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg3.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg4.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg5.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg6.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg7.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg8.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg9.png`,
    ],
    about:
      "We’re about friends and family, about feel-good food made with care, about in-store service and take-aways that makes you smile, and of course, truly excellent cocktails and coffees.",
    website: "https://theeaterygrill.co.za/wp-content/uploads/2024/09/Eatery-Online-Menu.pdf",
    openingHours: {
      monday: { open: "11:00", close: "21:30" },
      tuesday: { open: "11:00", close: "21:30" },
      wednesday: { open: "11:00", close: "21:30" },
      thursday: { open: "11:00", close: "21:30" },
      friday: { open: "11:00", close: "21:30" },
      saturday: { open: "09:00", close: "21:30" },
      sunday: { open: "09:00", close: "21:30" },
    },
  },
  {
    name: "Obz Cafe",
    address: "115 Lower Main Rd, Observatory, Cape Town",
    phone: "069 581 3875",
    cuisine: "ContemAporary",
    category: "restaurant", // ✅ added
    rating: 4,
    images: [
      `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg1.png`, `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg2.png`, `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg3.png`, `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg4.png`, `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg5.png`, `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg6.png`,
    ],
    about:
      "Upbeat and urban, the new Obz Cafe restaurant is situated in the heart of Observatory. So come for a visit, sit down, enjoy the friendly vibe and great food and become part of the Obz Cafe family!",
    website: "http://www.kloofstreethouse.co.za/menu/al-la-carte/",
    openingHours: {
      monday: { open: "11:00", close: "22:00" },
      tuesday: { open: "11:00", close: "22:00" },
      wednesday: { open: "11:00", close: "22:00" },
      thursday: { open: "11:00", close: "22:00" },
      friday: { open: "11:00", close: "22:30" },
      saturday: { open: "09:00", close: "22:30" },
      sunday: { open: "09:00", close: "21:00" },
    },
  },

  // --- Coffee Shops ---
  {
    name: "Seattle Coffee",
    address: "Rothesay Pl, Mouille Point, Cape Town, 8005",
    phone: "",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg5.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg6.png`,
    ],
    rating: 4.5,
    about:
    "We strive to capture the artisanal approach towards our craft through the traceability of crops, handpicked harvesting, hand-roasting, and manual espresso.",
    website: "https://www.seattlecoffeecomApany.co.za/",
    openingHours: {
      monday: { open: "06:30", close: "21:00" },
      tuesday: { open: "06:30", close: "21:00" },
      wednesday: { open: "06:30", close: "21:00" },
      thursday: { open: "06:30", close: "21:00" },
      friday: { open: "06:30", close: "21:00" },
      saturday: { open: "06:30", close: "22:00" },
      sunday: { open: "06:30", close: "21:00" },
    },
  },
  {
    name: "The Ladder",
    address: "136 Bree St, Cape Town City Centre, Cape Town, 8001",
    phone: "082 451 1572",
    cuisine: "Coffee / Artisan Roastery",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/TheLadder/TLimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheLadder/TLimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheLadder/TLimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheLadder/TLimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheLadder/TLimg5.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheLadder/TLimg6.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheLadder/TLimg7.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheLadder/TLimg8.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheLadder/TLimg9.png`,
    ],
    rating: 4.6,
    about:
    "The Ladder is a Daytime Cafe` located in central Cape Town, it offers easy all day breakfasts and light meals together with artisan coffee and other healthy refreshments. The Ladder is also hired out as an event space for intimate gatherings or milestone events. Our building is also home to Saint John of the Ladder on the top floor.",
    website: "https://www.theladderon136.com/",
    openingHours: {
      monday: { open: "07:00", close: "16:00" },
      tuesday: { open: "07:00", close: "16:00" },
      wednesday: { open: "07:00", close: "16:00" },
      thursday: { open: "07:00", close: "16:00" },
      friday: { open: "07:00", close: "16:00" },
      saturday: { open: "08:00", close: "14:00" },
      sunday: {  close: "Closed" },
    },
  },
  {
    name: "Saint James",
    address: "43 Station Rd, Observatory, Cape Town, 7925",
    phone: "",
    cuisine: "Coffee / Espresso Bar",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/SaintJames/SJimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SaintJames/SJimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SaintJames/SJimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SaintJames/SJimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SaintJames/SJimg5.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SaintJames/SJimg6.png`,
    ],
    rating: 4.5,
    about:
      "Saint James is a specialty coffee roastery and espresso bar located in the heart of Observatory, Cape Town. We are passionate about sourcing, roasting, and serving the highest quality coffee beans from around the world. Our espresso bar offers a cozy and welcoming atmosphere where you can enjoy expertly crafted coffee beverages, from classic espressos to innovative specialty drinks. Whether you're a coffee connoisseur or just looking for a great cup of coffee, Saint James is the perfect destination for all your caffeine needs.",
    website: "https://www.instagram.com/saintjamescafeobz/?hl=en",
    openingHours: {
      monday: { open: "06:30", close: "15:30" },
      tuesday: { open: "06:30", close: "15:30" },
      wednesday: { open: "06:30", close: "15:30" },
      thursday: { open: "06:30", close: "15:30" },
      friday: { open: "06:30", close: "15:30" },
      saturday: { open: "06:30", close: "15:30" },
      sunday: { open: "07:30", close: "15:30" },
    },
  },
  {   
    name: "Flatmountain Coffee",
    address: "103 Sir Lowry Rd, Woodstock, Cape Town, 7925",
    phone: "082 821 3979",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/FlatMountainCoffee/FMCimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/FlatMountainCoffee/FMCimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/FlatMountainCoffee/FMCimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/FlatMountainCoffee/FMCimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/FlatMountainCoffee/FMCimg5.png`, 
    ],
    rating: 4.8,
    about:
    "We take pride in extracting enthusiasm from every coffee moment. Recognising that with intentional sourcing of green beans, careful roasting, precise brewing and stimulating surroundings, there is more to coffee than caffeine. We celebrate that coffee is comAplex and the ritual of drinking a great cup is simAply life changing.",
    website: "https://flatmountainroasters.co.za/",
    openingHours: {
      monday: { open: "07:30", close: "15:30" },
      tuesday: { open: "07:30", close: "15:30" },
      wednesday: { open: "07:30", close: "15:30" },
      thursday: { open: "07:30", close: "15:30" },
      friday: { open: "07:30", close: "15:30" },
      saturday: { open: "09:00", close: "13:00" },
      sunday: { close: "Closed" },
    },
  },
  {
    name: "The Eatery",
    address: "70 Belvedere Rd, Claremont, Cape Town, 7708",
    phone: "021 003 4504",
    cuisine: "Coffee / Café",
    category: "coffee",
    rating: 4.4,
    images: [
      `${BASE_URL}/uploads/restaurants/TheEatery/TEimg1.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg2.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg3.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg4.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg5.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg6.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg7.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg8.png`, `${BASE_URL}/uploads/restaurants/TheEatery/TEimg9.png`,
    ],
    about:
      "We’re about friends and family, about feel-good food made with care, about in-store service and take-aways that makes you smile, and of course, truly excellent cocktails and coffees.",
    website: "https://theeaterygrill.co.za/wp-content/uploads/2024/09/Eatery-Online-Menu.pdf",
    openingHours: {
      monday: { open: "11:00", close: "21:30" },
      tuesday: { open: "11:00", close: "21:30" },
      wednesday: { open: "11:00", close: "21:30" },
      thursday: { open: "11:00", close: "21:30" },
      friday: { open: "11:00", close: "21:30" },
      saturday: { open: "09:00", close: "21:30" },
      sunday: { open: "09:00", close: "21:30" },
    },
  },
  {
    name: "Cafe Chiffon",
    address: "SHOGF007, Old Cape Quarter, 72 Waterkant St, Green Point, Cape Town, 8001",
    phone: "068035 5552",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/CafeChiffon/CCimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/CafeChiffon/CCimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/CafeChiffon/CCimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/CafeChiffon/CCimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/CafeChiffon/CCimg5.png`,
    ],
    rating: 4.7,
    about:
    "Cafe Chiffon is a charming café located in the heart of Cape Town, South Africa. Known for its delightful ambiance and cozy atmosphere, Cafe Chiffon offers a variety of freshly brewed coffees, teas, and a selection of delicious pastries and light meals. The café is a popular spot for both locals and tourists looking to relax and enjoy quality food and beverages in a welcoming environment.",
    website: "@cafechiffon.cpt",
    openingHours: {
      monday: { open: "07:30", close: "17:30" },
      tuesday: { open: "07:30", close: "17:30" },
      wednesday: { open: "07:30", close: "17:30" },
      thursday: { open: "07:30", close: "17:30" },
      friday: { open: "07:30", close: "17:30" },
      saturday: { open: "08:00", close: "16:00" },
      sunday: { close: "Closed" },
    },
  },
  {
    name: "Truth Coffee",
    address: "36 Buitenkant St, Cape Town City Centre, Cape Town, 8000",
    phone: "021 201 7000",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg5.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg6.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg7.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg8.png`,
    ],
    rating: 4.5,
    about:
    "Co-founded by Andrzej Janik and David Donde, pioneers of speciality coffee in Cape Town, our mission was to create extraordinary coffee experiences, and we did. Truth Café has been recognised as the best in the world several times over by publications both abroad and in our very own backyard. If you're looking for bold, full-flavoured coffees, look no further than Truth. At Truth, we've mastered inimitable blends, crafted to bring you world-class coffee, every time. Whether you’re more into dark and intense, or smooth and balanced, look no further. We have the perfect brew for you",
    website: "https://za.truth.coffee/",
    openingHours: {
      monday: { open: "07:00", close: "22:00" },
      tuesday: { open: "07:00", close: "22:00" },
      wednesday: { open: "07:00", close: "22:00" },
      thursday: { open: "07:00", close: "22:00" },
      friday: { open: "07:00", close: "22:00" },
      saturday: { open: "07:00", close: "22:00" },
      sunday: { open: "08:00", close: "22:00" },
    },
  },
  {
    name: "Fein Coffee",
    address: "142 Buitengracht St, Cape Town City Centre, Cape Town, 8000",
    phone: "",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg5.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg6.png`,
    ],
    rating: 5,
    about:
    "Because every bestie deserves a perfect coffee moment",
    website: "@fiencoffeeph",
    openingHours: {
      monday: { open: "07:30", close: "18:00" },
      tuesday: { open: "07:30", close: "18:00" },
      wednesday: { open: "07:30", close: "18:00" },
      thursday: { open: "07:30", close: "18:00" },
      friday: { open: "07:30", close: "18:00" },
      saturday: { open: "10:00", close: "15:00" },
      sunday: { close: "Closed" },
    },
  },
  {
    name: "Nice Cafe",
    address: " Inside Church House, 1a Queen Victoria St, Cape Town City Centre, Cape Town, 8001",
    phone: "084 333 3336",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg5.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg6.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg7.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg8.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg9.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg10.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg11.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/NiceCafe/NCimg12.png`,
    ],
    rating: 4.3,
    about:
    "Nice Cafe is a specialty coffee shop located in the heart of Cape Town, South Africa. Known for its cozy atmosphere and high-quality coffee, Nice Cafe offers a variety of expertly brewed coffee drinks, including espresso, cappuccino, and pour-over options. The café also serves a selection of light meals and pastries, making it a popular spot for both locals and tourists looking to enjoy a relaxing coffee experience in a welcoming environment.",
    website: "https://www.instagram.com/wearenice_/?hl=en",
    openingHours: {
      monday: { open: "06:00", close: "16:00" },
      tuesday: { open: "06:00", close: "16:00" },
      wednesday: { open: "06:00", close: "16:00" },
      thursday: { open: "06:00", close: "16:00" },
      friday: { open: "06:00", close: "16:00" },
      saturday: { open: "07:00", close: "13:00" },
      sunday: { open: "07:00", close: "13:00" },
    },
  },
  {
    name: "The Grind",
    address: "322 Victoria Rd, Salt River, Cape Town, 7925",
    phone: "078217 1542",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/TheGrind/TGimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheGrind/TGimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheGrind/TGimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheGrind/TGimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheGrind/TGimg5.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/TheGrind/TGimg6.png`,
    ],
    rating: 4.7,
    about:
    " The Grind is a specialty coffee roastery and café located in Salt River, Cape Town. We are passionate about sourcing, roasting, and serving the highest quality coffee beans from around the world. Our café offers a cozy and welcoming atmosphere where you can enjoy expertly crafted coffee beverages, from classic espressos to innovative specialty drinks. Whether you're a coffee connoisseur or just looking for a great cup of coffee, The Grind is the perfect destination for all your caffeine needs.",
    website: "@thegrind_322",
    openingHours: {
      monday: { open: "06:00", close: "18:00" },
      tuesday: { open: "06:00", close: "18:00" },
      wednesday: { open: "06:00", close: "18:00" },
      thursday: { open: "06:00", close: "18:00" },
      friday: { open: "06:00", close: "20:00" },
      saturday: { open: "06:00", close: "20:00" },
      sunday: { open: "06:00", close: "14:00" },
    },
  },
  {
    name: "Vidae Caffe",
    address: "Rustenburg shops, 41 Main Rd, Rondebosch, Cape Town, 7700",
    phone: "021 565 0510",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/VidaeCaffe/VCimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/VidaeCaffe/VCimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/VidaeCaffe/VCimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/VidaeCaffe/VCimg4.png`, 
    ],
    rating: 4.1,
    about:
    "Cafe chain influenced by European street culture, for own-brand coffee, snacks & sweet baked items.",
    website: "https://www.vidaecaffe.com/menu/",
    openingHours: {
      monday: { open: "06:30", close: "17:30" },
      tuesday: { open: "06:30", close: "17:30" },
      wednesday: { open: "06:30", close: "17:30" },
      thursday: { open: "06:30", close: "17:30" },
      friday: { open: "06:30", close: "17:30" },
      saturday: { open: "08:00", close: "15:00" },
      sunday: { open: "08:00", close: "14:00" },
    },
  },
  {
    name: "The 777 Coffee",
    address: "City center, 66 Keerom St, Cape Town City Centre, Cape Town, 8000",
    phone: "065 593 6130",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg5.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg6.png`,
    ],
    rating: 5,
    about:
    "777 Coffee Shop: Where every sip takes you on a flight of flavor. Join us for expertly crafted coffee, delicious treats, and a cozy atmosphere inspired by the skies",
    website: "",
    openingHours: {
      monday: { open: "06:00", close: "21:30" },
      tuesday: { open: "06:00", close: "21:30" },
      wednesday: { open: "06:00", close: "21:30" },
      thursday: { open: "06:00", close: "21:30" },
      friday: { open: "06:00", close: "21:30" },
      saturday: { open: "06:00", close: "21:30" },
      sunday: { open: "06:00", close: "21:30" },
    },
  },
  {
    name: "My Brew Coffee",
    address: "Moves Around",
    phone: "073 219 7400",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/MyBrewCoffee/MBCimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/MyBrewCoffee/MBCimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/MyBrewCoffee/MBCimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/MyBrewCoffee/MBCimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/MyBrewCoffee/MBCimg5.png`,
    ],
    rating: 4.7,
    about:
    "Step right up and meet, My Brew Espresso Catering! Picture this: a cozy coffee trailer that's more than just a pit stop for your caffeine fix. It's a warm gathering spot where you can sip on top-notch drinks and soak up good vibes. We're all about building connections and spreading positivity, so think of us as your go-to hangout hub.",
    website: "https://www.my-brew.co.za/",
    openingHours: {
      monday: { open: "07:00", close: "20:00" },
      tuesday: { open: "07:00", close: "20:00" },
      wednesday: { open: "07:00", close: "20:00" },
      thursday: { open: "07:00", close: "20:00" },
      friday: { open: "07:00", close: "20:00" },
      saturday: { open: "08:00", close: "17:00" },
      sunday: { open: "10:00", close: "14:00" },
    },
  },
  {
    name: "Sonder Cafe",
    address: "79 Lower Main Rd, Observatory, Cape Town, 7925",
    phone: ")83 394 6672",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      `${BASE_URL}/uploads/restaurants/CoffeeShops/SonderCafe/SCimg1.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SonderCafe/SCimg2.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SonderCafe/SCimg3.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SonderCafe/SCimg4.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SonderCafe/SCimg5.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SonderCafe/SCimg6.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SonderCafe/SCimg7.png`, `${BASE_URL}/uploads/restaurants/CoffeeShops/SonderCafe/SCimg8.png`,
    ],
    rating: 4.7,
    about:
    "Your local spot for good coffee, sweet treats, toasties and meeting new friends. Come work, eat & connect. Be a part of our story",
    website: "https://www.sonderobz.com/",
    openingHours: {
      monday: { open: "07:30", close: "16:00" },
      tuesday: { open: "07:30", close: "16:00" },
      wednesday: { open: "07:30", close: "16:00" },
      thursday: { open: "07:30", close: "16:00" },
      friday: { open: "07:30", close: "16:00" },
      saturday: { open: "08:00", close: "15:00" },
      sunday: { close: "Closed" },
    },
  },
  {
    name: "Obz Cafe",
    address: "115 Lower Main Rd, Observatory, Cape Town",
    phone: "069 581 3875",
    cuisine: "Coffee / Espresso Bar",
    category: "coffee", // ✅ added
    rating: 4,
    images: [
      `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg1.png`, `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg2.png`, `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg3.png`, `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg4.png`, `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg5.png`, `${BASE_URL}/uploads/restaurants/ObzCafe/OCimg6.png`,
    ],
    about:
      "Upbeat and urban, the new Obz Cafe restaurant is situated in the heart of Observatory. So come for a visit, sit down, enjoy the friendly vibe and great food and become part of the Obz Cafe family!",
    website: "http://www.kloofstreethouse.co.za/menu/al-la-carte/",
    openingHours: {
      monday: { open: "11:00 am", close: "22:00 pm" },
      tuesday: { open: "11:00 am", close: "22:00 pm" },
      wednesday: { open: "11:00 am", close: "22:00 pm" },
      thursday: { open: "11:00 am", close: "22:00 pm" },
      friday: { open: "11:00 am", close: "22:30 pm" },
      saturday: { open: "09:00 am", close: "22:30 pm" },
      sunday: { open: "09:00 am", close: "21:00 pm" },
    },
  },

  // --- Student Takeaways ---
  {
    name: "Mj Bugers",
    address: "59 CamApground Rd, Rondebosch, Cape Town, 7700",
    phone: "061 602 2069",
    cuisine: "Portuguese / Fast Casual",
    category: "takeaway",
    images: [
      `${BASE_URL}/uploads/restaurants/TakeAways/MjBurgers/MBimg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/MjBurgers/MBimg2.png`, `${BASE_URL}/uploads/restaurants/TakeAways/MjBurgers/MBimg3.png`, `${BASE_URL}/uploads/restaurants/TakeAways/MjBurgers/MBimg4.png`, `${BASE_URL}/uploads/restaurants/TakeAways/MjBurgers/MBimg5.png`, `${BASE_URL}/uploads/restaurants/TakeAways/MjBurgers/MBimg6.png`, `${BASE_URL}/uploads/restaurants/TakeAways/MjBurgers/MBimg7.png`,
    ],
    rating: 4.7,
    about:
    "MJ’s Burgers hit the Cape Town smash burger scene in early 2023 from their garage at their home in Rondebosch. After killing it at Pop-Ups and events they now have a stand alone store and fans couldn’t be happier.",
    website: "@mjsburgercpt",
    openingHours: {
      monday: { close: "Closed" },
      tuesday: { open: "14:30 pm", close: "22:00 pm" },
      wednesday: { open: "14:30 pm", close: "23:00 pm" },
      thursday: { open: "14:30 pm", close: "23:00 pm" },
      friday: { open: "14:30 pm", close: "23:00 pm" },
      saturday: { open: "12:00 pm", close: "21:00 pm" },
      sunday: { open: "12:00 pm", close: "15:00 pm" },
    },
  },
  {
    name: "Continental",
    address: "Shop No. 2, 350 Victoria Rd, Salt River, Cape Town, 7925",
    phone: "021 448 2812",
    cuisine: "Pizza / Fast Food",
    category: "takeaway",
    images: [
      `${BASE_URL}/uploads/restaurants/TakeAways/Continental/Cimg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Continental/Cimg2.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Continental/Cimg3.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Continental/Cimg4.png`, 
    ],
    rating: 4.1,
    about:
    " Continental is a well-known fast-food chain in South Africa cape town, famous for its delicious and affordable fried chicken, burgers, and other fast-food items. Established in 1993, Continental has grown to become one of the largest fast-food franchises in the country, with numerous outlets across various cities. The brand is recognized for its commitment to quality, taste, and customer satisfaction, making it a popular choice for quick meals among locals and tourists alike.",
    website: " https://continental.co.za/menu/",
    openingHours: {
      monday: { open: "06:00 am", close: "21:00 pm" },
      tuesday: { open: "06:00 am", close: "21:00 pm" },
      wednesday: { open: "06:00 am", close: "21:00 pm" },
      thursday: { open: "06:00 am", close: "21:00 pm" },
      friday: { open: "06:00 am", close: "21:00 pm" },
      saturday: { open: "06:00 am", close: "22:00 pm" },
      sunday: { close: "Closed" },
    },
  },
  {
    name: "Grill Baby",
    address: "262 Voortrekker Rd, Parow East, Cape Town, 7501",
    phone: "087 077 0429",
    cuisine: "Fried Chicken / Fast Food",
    category: "takeaway",
    images: [
      `${BASE_URL}/uploads/restaurants/TakeAways/GrillBaby/GBimg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/GrillBaby/GBimg2.png`, `${BASE_URL}/uploads/restaurants/TakeAways/GrillBaby/GBimg3.png`, `${BASE_URL}/uploads/restaurants/TakeAways/GrillBaby/GBimg4.png`, `${BASE_URL}/uploads/restaurants/TakeAways/GrillBaby/GBimg5.png`, `${BASE_URL}/uploads/restaurants/TakeAways/GrillBaby/GBimg6.png`, `${BASE_URL}/uploads/restaurants/TakeAways/GrillBaby/GBimg7.png`,
    ],
    rating: 3.5,
    about:
    "GATSBY, GRILLS, JAFFLEs AND Wood oven Pizza Grill Baby Style!",
    website: "https://www.grillbaby.co.za/",
    openingHours: {
      monday: { open: "12:00 pm", close: "21:00 pm" },
      tuesday: { open: "12:00 pm", close: "21:00 pm" },
      wednesday: { open: "12:00 pm", close: "21:00 pm" },
      thursday: { open: "12:00 pm", close: "21:00 pm" },
      friday: { open: "14:00 pm", close: "22:00 pm" },
      saturday: { open: "12:00 pm", close: "22:00 pm" },
      sunday: { open: "12:00 pm", close: "20:00 pm" },
    },
  },
  {
    name: "Smash Wagon",
    address: "41 4th Ave, Parow, Cape Town, 7500",
    phone: "062 055 7124",
    cuisine: "Burgers / Fast Food",
    category: "takeaway",
    images: [
      `${BASE_URL}/uploads/restaurants/TakeAways/SmashWagon/SWimg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/SmashWagon/SWimg2.png`, `${BASE_URL}/uploads/restaurants/TakeAways/SmashWagon/SWimg3.png`, `${BASE_URL}/uploads/restaurants/TakeAways/SmashWagon/SWimg4.png`, `${BASE_URL}/uploads/restaurants/TakeAways/SmashWagon/SWimg5.png`, `${BASE_URL}/uploads/restaurants/TakeAways/SmashWagon/SWimg6.png`,
    ],
    rating: 4.4,
    about:
      "Here's a mouth-watering business description for Smashwagon, your burger joint *Smashwagon: Fuel Your Cravings* Get ready to buckle up and indulge in the ultimate burger experience at Smashwagon! Our burger joint is dedicated to serving up mouth-watering, smash-style burgers that will satisfy your cravings and leave you wanting more. *Our Story* At Smashwagon, we're passionate about burgers, and we're on a mission to elevate the classic burger joint experience. Our chefs use only the freshest ingredients, sourced locally whenever possible, to craft burgers that are both delicious and visually stunning. *Our Menu* From classic cheeseburgers to gourmet masterpieces, our menu features a range of options to suit every taste and dietary",
    website: "@smashwagoncpt",
    openingHours: {
      monday: { open: "11:00 am", close: "21:30 pm" },
      tuesday: { open: "11:00 am", close: "21:30 pm" },
      wednesday: { open: "11:00 am", close: "22:00 pm" },
      thursday: { open: "11:00 am", close: "22:00 pm" },
      friday: { open: "10:30 am", close: "22:30 pm" },
      saturday: { open: "10:30 am", close: "22:00 pm" },
      sunday: { open: "09:00 am", close: "17:00 pm" },
    },
  },
  {
    name: "Hermanos Chicken",
    address: "121 Ottery Road, Wynberg, Ottery, Cape Town, 7708",
    phone: "079 122 7315",
    cuisine: "Burgers / Fast Food",
    category: "takeaway",
    images: [ 
      `${BASE_URL}/uploads/restaurants/TakeAways/HermanosChicken/HCimg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/HermanosChicken/HCimg2.png`, `${BASE_URL}/uploads/restaurants/TakeAways/HermanosChicken/HCimg3.png`, `${BASE_URL}/uploads/restaurants/TakeAways/HermanosChicken/HCimg4.png`, `${BASE_URL}/uploads/restaurants/TakeAways/HermanosChicken/HCimg5.png`, `${BASE_URL}/uploads/restaurants/TakeAways/HermanosChicken/HCimg6.png`, `${BASE_URL}/uploads/restaurants/TakeAways/HermanosChicken/HCimg7.png`,
    ],
    rating: 3.9,
    about:
      "Buttermilk Fried Chicken Tenders Wings Chicken Sandwiches",
    website: "@hermanoschicken_za",
    openingHours: {
      monday: { close: "Closed" },
      tuesday: { open: "12:00 pm", close: "21:00 pm" },
      wednesday: { open: "12:00 pm", close: "21:00 pm" },
      thursday: { open: "12:00 pm", close: "21:00 pm" },
      friday: { open: "14:00 pm", close: "22:00 pm" },
      saturday: { open: "12:00 pm", close: "22:00 pm" },
      sunday: { open: "12:00 pm", close: "20:00 pm" },
    },
  },
  {
    name: "Karbros",
    address: "423a Main Rd, Observatory, Cape Town, 7925",
    phone: "061 525 3807",
    cuisine: "Burgers / Fast Food",
    category: "takeaway",
    images: [ 
      `${BASE_URL}/uploads/restaurants/TakeAways/Karbros/Kimg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Karbros/Kimg2.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Karbros/Kimg3.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Karbros/Kimg4.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Karbros/Kimg5.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Karbros/Kimg6.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Karbros/Kimg7.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Karbros/Kimg8.png`,
    ],
    rating: 4.1,
    about:
      "Crazy Good Fast Food Burgers, Wings, Fries & More",
    website: "@karbros_takeaways",
    openingHours: {
      monday: { open: "09:00 am", close: "23:00 pm" },
      tuesday: { open: "09:00 am", close: "23:00 pm" },
      wednesday: { open: "09:00 am", close: "23:00 pm" },
      thursday: { open: "09:00 am", close: "23:00 pm" },
      friday: { open: "09:00 am", close: "01:15 am" },
      saturday: { open: "Open 24 hours" },
      sunday: { open: "09:00 am", close: "17:00 pm" },
    },
  },
  {
    name: "Food Inn",
    address: "156 Long St, Cape Town City Centre, Cape Town, 8000",
    phone: "021 422 5060",
    cuisine: "Burgers / Fast Food",
    category: "takeaway",
    images: [ 
      `${BASE_URL}/uploads/restaurants/TakeAways/FoodInn/FIimg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/FoodInn/FIimg2.png`,
    ], 
    rating: 4,
    about:
      "Food Inn India offers a delicious journey through Indian cuisine, from fragrant curries and fluffy naan to sizzling tandoori platters. Explore the diversity of Indian flavors, from classic street food like Gatsby rolls and Bunny Chow to unique Indo-Chinese creations. Food Inn India caters to both those seeking a taste of traditional India and adventurous palates craving something new",
    website: "http://foodinn247.co.za/",
    openingHours: {
      monday: { open: "Open 24 hours" },
      tuesday: { open: "Open 24 hours" },
      wednesday: { open: "Open 24 hours" },
      thursday: { open: "Open 24 hours" },
      friday: { open: "Open 24 hours" },
      saturday: { open: "Open 24 hours" },
      sunday: { open: "11:00 am", close: "22:00 pm" },
    },
  },
  {
    name: "Smasht",
    address: "54 Belvedere Rd, Rondebosch, Cape Town, 7770",
    phone: "076 151 5010",
    cuisine: "Burgers / Fast Food",
    category: "takeaway",
    images: [ 
      `${BASE_URL}/uploads/restaurants/TakeAways/Smasht/Simg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Smasht/Simg2.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Smasht/Simg3.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Smasht/Simg4.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Smasht/Simg5.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Smasht/Simg6.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Smasht/Simg7.png`, `${BASE_URL}/uploads/restaurants/TakeAways/Smasht/Simg8.png`,
    ],
    rating: 4.3,
    about:
      "Smasht Burger Restaurant in Rondebosch, Cape Town, is a popular eatery known for its gourmet smash burgers. They offer a variety of delicious burger options made with fresh ingredients, along with sides like fries and shakes. The casual and vibrant atmosphere makes it a great spot for burger enthusiasts looking for a satisfying meal.",
    website: "@smashtburgers",
    openingHours: {
      monday: { close: "Closed" },
      tuesday: { open: "10:00 am", close: "21:00 pm" },
      wednesday: { open: "10:00 am", close: "21:00 pm" },
      thursday: { open: "10:00 am", close: "21:00 pm" },
      friday: { open: "10:00 am", close: "22:00 pm" },
      saturday: { open: "10:00 am", close: "22:00 pm" },
      sunday: { open: "10:00 am", close: "21:00 pm" },
    },
  },
  {
    name: "Crispy King",
    address: "210 Long St, Cape Town City Centre, Cape Town, 8000",
    phone: "073 010 9944",
    cuisine: "Burgers / Fast Food",
    category: "takeaway",
    images: [ 
      `${BASE_URL}/uploads/restaurants/TakeAways/CrispyKing/CKimg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/CrispyKing/CKimg2.png`, `${BASE_URL}/uploads/restaurants/TakeAways/CrispyKing/CKimg3.png`, `${BASE_URL}/uploads/restaurants/TakeAways/CrispyKing/CKimg4.png`, `${BASE_URL}/uploads/restaurants/TakeAways/CrispyKing/CKimg5.png`, `${BASE_URL}/uploads/restaurants/TakeAways/CrispyKing/CKimg6.png`,
    ],
    rating: 3.7,
    about:
      "Fried and grilled chicken,burgers,halaal,wings,hot wings,carolina wings,Krispy chicken,fafa meal ,Krispy fiesta ,grilled fiesta ,wraps ,paella.",
    website: "https://www.krispykingsa.co.za/",
    openingHours: {
      monday: { open: "11:00 am", close: "05:00 am" },
      tuesday: { open: "11:00 am", close: "05:00 am" },
      wednesday: { open: "11:00 am", close: "05:00 am" },
      thursday: { open: "11:00 am", close: "05:00 am" },
      friday: { open: "11:00 am", close: "05:00 am" },
      saturday: { open: "11:00 am", close: "05:00 am" },
      sunday: { open: "11:00 am", close: "05:00 am" },
    },
  },
  {
    name: "Bigga D's",
    address: "Metal Lane, 4 Kloof St, Gardens, Cape Town, 8001",
    phone: "083 634 9699",
    cuisine: "Burgers / Fast Food",
    category: "takeaway",
    images: [ 
      `${BASE_URL}/uploads/restaurants/TakeAways/BiggaDs/BDimg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/BiggaDs/BDimg2.png`, `${BASE_URL}/uploads/restaurants/TakeAways/BiggaDs/BDimg3.png`, `${BASE_URL}/uploads/restaurants/TakeAways/BiggaDs/BDimg4.png`, `${BASE_URL}/uploads/restaurants/TakeAways/BiggaDs/BDimg5.png`, `${BASE_URL}/uploads/restaurants/TakeAways/BiggaDs/BDimg6.png`, `${BASE_URL}/uploads/restaurants/TakeAways/BiggaDs/BDimg7.png`, `${BASE_URL}/uploads/restaurants/TakeAways/BiggaDs/BDimg8.png`, `${BASE_URL}/uploads/restaurants/TakeAways/BiggaDs/BDimg9.png`,
    ],
    rating: 4.7,
    about:
      "Bigga D’s Pop Up Food Truck offers various unique authentic cuisines from all over the world.",
    website: "@bigga_d_s_foodstruck",
    openingHours: {
      monday: { close: "Closed" },
      tuesday: { close: "Closed" },
      wednesday: { open: "16:00 pm", close: "21:00 pm" },
      thursday: { close: "Closed" },
      friday: { close: "Closed" },
      saturday: { open: "08:00 am", close: "14:00 pm" },
      sunday: { open: "08:30 am", close: "14:00 pm" },
    },
  },
  {
    name: "Eastern Food Bazaar",
    address: "96 Longmarket St, Cape Town City Centre, Cape Town, 8001",
    phone: "021 461 2458",
    cuisine: "Burgers / Fast Food",
    category: "takeaway",
    images: [ 
      `${BASE_URL}/uploads/restaurants/TakeAways/EasternFoodBazaar/EFBimg1.png`, `${BASE_URL}/uploads/restaurants/TakeAways/EasternFoodBazaar/EFBimg2.png`, `${BASE_URL}/uploads/restaurants/TakeAways/EasternFoodBazaar/EFBimg3.png`, `${BASE_URL}/uploads/restaurants/TakeAways/EasternFoodBazaar/EFBimg4.png`, `${BASE_URL}/uploads/restaurants/TakeAways/EasternFoodBazaar/EFBimg5.png`, `${BASE_URL}/uploads/restaurants/TakeAways/EasternFoodBazaar/EFBimg6.png`, `${BASE_URL}/uploads/restaurants/TakeAways/EasternFoodBazaar/EFBimg7.png`, `${BASE_URL}/uploads/restaurants/TakeAways/EasternFoodBazaar/EFBimg8.png`,
    ],
    rating: 4.3,
    about:
      "Regional Indian, Chinese and Turkish street food from a string of bustling stalls with seating area.",
    website: "@easternfoodbazaarct",
    openingHours: {
      monday: { open: "10:00 am", close: "21:00 pm" },
      tuesday: { open: "10:00 am", close: "21:00 pm" },
      wednesday: { open: "10:00 am", close: "21:00 pm" },
      thursday: { open: "10:00 am", close: "21:00 pm" },
      friday: { open: "10:00 am", close: "21:00 pm" },
      saturday: { open: "10:00 am", close: "21:00 pm" },
      sunday: { open: "10:00 am", close: "21:00 pm" },
    },
  },

  //--- Breakfast / Brunch Places ---
  {
    name: "Butter",
    address: "Centre, 176 Main Rd, Sea Point, Cape Town, 8006",
    phone: "071 336 8270",
    cuisine: "Bakery / Brunch",
    category: "Breakfast / Brunch Places",
    images: [ 
      `${BASE_URL}/uploads/restaurants/Breakfast/Butter/Bimg1.png`, `${BASE_URL}/uploads/restaurants/Breakfast/Butter/Bimg2.png`, `${BASE_URL}/uploads/restaurants/Breakfast/Butter/Bimg3.png`, `${BASE_URL}/uploads/restaurants/Breakfast/Butter/Bimg4.png`, `${BASE_URL}/uploads/restaurants/Breakfast/Butter/Bimg5.png`, `${BASE_URL}/uploads/restaurants/Breakfast/Butter/Bimg6.png`,
    ],
    rating: 4.4,
    about:
      "BUTTER is our happy place, and we want it to be yours too. It’s cosy and comfy, and the food tastes like more. Whether you stay for one coffee or a day of work, there’ll always be a happy tune in the background and friendly faces to greet you. It’s a place to hangout, a place to work, a place to recharge, and a place to energize. It’s somewhere for you to feel at home.",
    website: "https://butterallday.com/",
    openingHours: {
      monday: { open: "08:00 am", close: "17:00 pm" },
      tuesday: { open: "08:00 am", close: "17:00 pm" },
      wednesday: { open: "08:00 am", close: "17:00 pm" },
      thursday: { open: "08:00 am", close: "17:00 pm" },
      friday: { open: "08:00 am", close: "17:00 pm" },
      saturday: { open: "09:00 am", close: "17:00 pm" },
      sunday: { open: "09:00 am", close: "17:00 pm" },
    },
  },
  {
    name: "Mulberry And Prince",
    address: "12 Pepper St, Cape Town City Centre, Cape Town, 8000",
    phone: "",
    cuisine: "Bakery / Brunch",
    category: "Breakfast / Brunch Places",
    images: [
      `${BASE_URL}/uploads/restaurants/Breakfast/MulberryAndPrince/MAPimg1.png`, `${BASE_URL}/uploads/restaurants/Breakfast/MulberryAndPrince/MAPimg2.png`, `${BASE_URL}/uploads/restaurants/Breakfast/MulberryAndPrince/MAPimg3.png`, `${BASE_URL}/uploads/restaurants/Breakfast/MulberryAndPrince/MAPimg4.png`, `${BASE_URL}/uploads/restaurants/Breakfast/MulberryAndPrince/MAPimg5.png`, `${BASE_URL}/uploads/restaurants/Breakfast/MulberryAndPrince/MAPimg6.png`, `${BASE_URL}/uploads/restaurants/Breakfast/MulberryAndPrince/MAPimg7.png`, `${BASE_URL}/uploads/restaurants/Breakfast/MulberryAndPrince/MAPimg8.png`,
    ], 
    rating: 4.1,
    about:
    "Your go-to destination in Cape Town for a delicious start to your day, or a well-deserved break with irresistible breakfast, brunch, and lunch.",
    website: "https://www.mulberryandprince.co.za/menu",
    openingHours: {
      monday: { open: "09:00 am", close: "15:30 pm" },
      tuesday: { open: "09:00 am", close: "15:30 pm" },
      wednesday: { open: "09:00 am", close: "15:30 pm" },
      thursday: { open: "09:00 am", close: "15:30 pm" },
      friday: { open: "09:00 am", close: "15:30 pm" },
      saturday: { open: "09:00 am", close: "15:00 pm" },
      sunday: { open: "09:00 am", close: "15:00 pm" },
    },
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
    name: "Dip n Dip",
    address: "V&A Waterfront, Shop 6244, Breakwater Blvd, Cape Town, 8001",
    phone: "021 427 9045",
    cuisine: "Ice Cream / Desserts",
    category: "Dessert",
    images: [
      `${BASE_URL}/uploads/restaurants/Dessert/DipNDip/DNDimg1.png`, `${BASE_URL}/uploads/restaurants/Dessert/DipNDip/DNDimg2.png`, `${BASE_URL}/uploads/restaurants/Dessert/DipNDip/DNDimg3.png`, `${BASE_URL}/uploads/restaurants/Dessert/DipNDip/DNDimg4.png`, `${BASE_URL}/uploads/restaurants/Dessert/DipNDip/DNDimg5.png`, `${BASE_URL}/uploads/restaurants/Dessert/DipNDip/DNDimg6.png`, `${BASE_URL}/uploads/restaurants/Dessert/DipNDip/DNDimg7.png`,
    ],
    rating: 4,
    about:
    "dipndip was created by two friends who had a love for chocolate and one goal… TO MAKE PEOPLE SMILE!They wanted everyone to fall in love with chocolate as much as they did so they took the overwhelming success of one small kiosk and have transformed it to a global brand ",
    website: "@dipndipsouthafrica",
    openingHours: {
      monday: { open: "09:00 am", close: "15:30 pm" },
      tuesday: { open: "09:00 am", close: "15:30 pm" },
      wednesday: { open: "09:00 am", close: "15:30 pm" },
      thursday: { open: "09:00 am", close: "15:30 pm" },
      friday: { open: "09:00 am", close: "15:30 pm" },
      saturday: { open: "09:00 am", close: "15:00 pm" },
      sunday: { open: "09:00 am", close: "15:00 pm" },
    },
  },
  {
    name: "Cookie co",
    address: "16 Bree St, Cape Town City Centre, Cape Town, 8000",
    phone: "066 185 5013",
    cuisine: "Milkshakes / Desserts",
    category: "Dessert",
    images: [
      `${BASE_URL}/uploads/restaurants/Dessert/CookieCo/Cimg1.png`, `${BASE_URL}/uploads/restaurants/Dessert/CookieCo/Cimg2.png`, `${BASE_URL}/uploads/restaurants/Dessert/CookieCo/Cimg3.png`, `${BASE_URL}/uploads/restaurants/Dessert/CookieCo/Cimg4.png`, `${BASE_URL}/uploads/restaurants/Dessert/CookieCo/Cimg5.png`, `${BASE_URL}/uploads/restaurants/Dessert/CookieCo/Cimg6.png`, `${BASE_URL}/uploads/restaurants/Dessert/CookieCo/Cimg7.png`, `${BASE_URL}/uploads/restaurants/Dessert/CookieCo/Cimg8.png`,
    ],
    rating: 4.3,
    about:
    "Cookie Co. is the home of the original gourmet American-style cookie in South Africa. We pour our heart and soul into creating some of the most delectable, gooey, moreish cookies around that are designed solely to feed the insatiable appetite of true cookie fans across the country! Pair this with a cup of the finest coffee and you’ll get one of the sweetest combinations you can find! Speaking of sweet, we don’t stop with just cookies; oh no. In fact, we have such little self-control that we also decided to stock some of the world’s best ice-cream as well as a whole range of local and imported sweets and treats! We are cheat day central, the perfect blue Monday pick-me-up, the instiller of childhood nostalgia. We are Cookie Co!",
    website: "https://www.cookieco.co.za/",
    openingHours: {
      monday: { open: "07:00 am", close: "16:00 pm" },
      tuesday: { open: "07:00 am", close: "16:00 pm" },
      wednesday: { open: "07:00 am", close: "16:00 pm" },
      thursday: { open: "07:00 am", close: "16:00 pm" },
      friday: { open: "07:00 am", close: "16:00 pm" },
      saturday: { open: "09:00 am", close: "16:00 pm" },
      sunday: { open: "09:00 am", close: "13:00 pm" },
    },
  },
  {
    name: "Rapt The Art Of Indulgence",
    address: "39 Buitenkant St, Cape Town City Centre, Cape Town, 8000",
    phone: "021 201 7000",
    cuisine: "Cakes / Coffee",
    category: "Dessert",
    images: [
      `${BASE_URL}/uploads/restaurants/Dessert/RaptTheArtOfIndulgence/RTAOIimg1.png`, `${BASE_URL}/uploads/restaurants/Dessert/RaptTheArtOfIndulgence/RTAOIimg2.png`, `${BASE_URL}/uploads/restaurants/Dessert/RaptTheArtOfIndulgence/RTAOIimg3.png`, `${BASE_URL}/uploads/restaurants/Dessert/RaptTheArtOfIndulgence/RTAOIimg4.png`, `${BASE_URL}/uploads/restaurants/Dessert/RaptTheArtOfIndulgence/RTAOIimg5.png`, `${BASE_URL}/uploads/restaurants/Dessert/RaptTheArtOfIndulgence/RTAOIimg6.png`, 
    ],
    rating: 4.4,
    about:
    "We offer choice. We are delicious. We are Rapt.",
    website: "@raptindulgence",
    openingHours: {
      monday: { open: "10:00 am", close: "18:00 pm" },
      tuesday: { open: "10:00 am", close: "18:00 pm" },
      wednesday: { open: "10:00 am", close: "18:00 pm" },
      thursday: { open: "10:00 am", close: "18:00 pm" },
      friday: { open: "10:00 am", close: "18:00 pm" },
      saturday: { open: "10:00 am", close: "18:00 pm" },
      sunday: { open: "10:00 am", close: "16:00 pm" },
    },
  },
  {
    name: "Crumbs And Cream",
    address: "126 Main Rd, Sea Point, Cape Town, 8060",
    phone: "067 446 2352",
    cuisine: "Cakes / Coffee",
    category: "Dessert",
    images: [
      `${BASE_URL}/uploads/restaurants/Dessert/CrumbsAndCream/CACimg1.png`, `${BASE_URL}/uploads/restaurants/Dessert/CrumbsAndCream/CACimg2.png`, `${BASE_URL}/uploads/restaurants/Dessert/CrumbsAndCream/CACimg3.png`, `${BASE_URL}/uploads/restaurants/Dessert/CrumbsAndCream/CACimg4.png`, `${BASE_URL}/uploads/restaurants/Dessert/CrumbsAndCream/CACimg5.png`, `${BASE_URL}/uploads/restaurants/Dessert/CrumbsAndCream/CACimg6.png`, `${BASE_URL}/uploads/restaurants/Dessert/CrumbsAndCream/CACimg7.png`, `${BASE_URL}/uploads/restaurants/Dessert/CrumbsAndCream/CACimg8.png`,
    ],
    rating: 4.3,
    about:
    "Create your own personalised Crumbs & Cream sandwich by choosing any two different cookies from the regularly updated variety of freshly baked cookies. (Think Choc Chip, Red Velvet and even Milk Tart…yum!) Then pick your ice-cream of choice and decide on any of their yummy toppings and spreads. The best part about a trip to Crumbs & Cream? With so many different combinations, there’ll always be something new to indulge in!",
    website: "https://www.crumbsandcream.co.za/",
    openingHours: {
      monday: { open: "07:00 am", close: "11:00 pm" },
      tuesday: { open: "07:00 am", close: "11:00 pm" },
      wednesday: { open: "07:00 am", close: "11:00 pm" },
      thursday: { open: "07:00 am", close: "11:00 pm" },
      friday: { open: "07:00 am", close: "11:00 pm" },
      saturday: { open: "07:00 am", close: "11:00 pm" },
      sunday: { open: "07:00 am", close: "11:00 pm" },
    },
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
    rating: 4.3,
    about:
    "Your go-to destination in Cape Town for a delicious start to your day, or a well-deserved break with irresistible breakfast, brunch, and lunch.",
    website: "https://www.mulberryandprince.co.za/menu",
    openingHours: {
      monday: { open: "09:00 am", close: "15:30 pm" },
      tuesday: { open: "09:00 am", close: "15:30 pm" },
      wednesday: { open: "09:00 am", close: "15:30 pm" },
      thursday: { open: "09:00 am", close: "15:30 pm" },
      friday: { open: "09:00 am", close: "15:30 pm" },
      saturday: { open: "09:00 am", close: "15:00 pm" },
      sunday: { open: "09:00 am", close: "15:00 pm" },
    },
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
    rating: 4.1,
    about:
    "Your go-to destination in Cape Town for a delicious start to your day, or a well-deserved break with irresistible breakfast, brunch, and lunch.",
    website: "https://www.mulberryandprince.co.za/menu",
    openingHours: {
      monday: { open: "09:00 am", close: "15:30 pm" },
      tuesday: { open: "09:00 am", close: "15:30 pm" },
      wednesday: { open: "09:00 am", close: "15:30 pm" },
      thursday: { open: "09:00 am", close: "15:30 pm" },
      friday: { open: "09:00 am", close: "15:30 pm" },
      saturday: { open: "09:00 am", close: "15:00 pm" },
      sunday: { open: "09:00 am", close: "15:00 pm" },
    },
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
    rating: 4.1,
    about:
    "Your go-to destination in Cape Town for a delicious start to your day, or a well-deserved break with irresistible breakfast, brunch, and lunch.",
    website: "https://www.mulberryandprince.co.za/menu",
    openingHours: {
      monday: { open: "09:00 am", close: "15:30 pm" },
      tuesday: { open: "09:00 am", close: "15:30 pm" },
      wednesday: { open: "09:00 am", close: "15:30 pm" },
      thursday: { open: "09:00 am", close: "15:30 pm" },
      friday: { open: "09:00 am", close: "15:30 pm" },
      saturday: { open: "09:00 am", close: "15:00 pm" },
      sunday: { open: "09:00 am", close: "15:00 pm" },
    },
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
    rating: 4.1,
    about:
    "Your go-to destination in Cape Town for a delicious start to your day, or a well-deserved break with irresistible breakfast, brunch, and lunch.",
    website: "https://www.mulberryandprince.co.za/menu",
    openingHours: {
      monday: { open: "09:00 am", close: "15:30 pm" },
      tuesday: { open: "09:00 am", close: "15:30 pm" },
      wednesday: { open: "09:00 am", close: "15:30 pm" },
      thursday: { open: "09:00 am", close: "15:30 pm" },
      friday: { open: "09:00 am", close: "15:30 pm" },
      saturday: { open: "09:00 am", close: "15:00 pm" },
      sunday: { open: "09:00 am", close: "15:00 pm" },
    },
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
    rating: 4.1,
    about:
    "Your go-to destination in Cape Town for a delicious start to your day, or a well-deserved break with irresistible breakfast, brunch, and lunch.",
    website: "https://www.mulberryandprince.co.za/menu",
    openingHours: {
      monday: { open: "09:00 am", close: "15:30 pm" },
      tuesday: { open: "09:00 am", close: "15:30 pm" },
      wednesday: { open: "09:00 am", close: "15:30 pm" },
      thursday: { open: "09:00 am", close: "15:30 pm" },
      friday: { open: "09:00 am", close: "15:30 pm" },
      saturday: { open: "09:00 am", close: "15:00 pm" },
      sunday: { open: "09:00 am", close: "15:00 pm" },
    },
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
