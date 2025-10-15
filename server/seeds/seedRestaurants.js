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
    cuisine: "Contemporary",
    category: "restaurant",
    images: ["/uploads/restaurants/wolfhouse/wolfhouse1.png", "/uploads/restaurants/wolfhouse/wolfhouse2.png", "/uploads/restaurants/wolfhouse/wolfhouse3.png", "/uploads/restaurants/wolfhouse/wolfhouse4.png", "/uploads/restaurants/wolfhouse/wolfhouse5.png", "/uploads/restaurants/wolfhouse/wolfhouse6.png", "/uploads/restaurants/wolfhouse/wolfhouse7.png"],
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
      "/uploads/restaurants/Burgers&Brews/B&Bimg1.png", "/uploads/restaurants/Burgers&Brews/B&Bimg2.png", "/uploads/restaurants/Burgers&Brews/B&Bimg3.png", "/uploads/restaurants/Burgers&Brews/B&Bimg4.png", "/uploads/restaurants/Burgers&Brews/B&Bimg5.png", "/uploads/restaurants/Burgers&Brews/B&Bimg6.png",
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
      "/uploads/restaurants/ZuneywagyuBurger/ZWBimg1.png", "/uploads/restaurants/ZuneywagyuBurger/ZWBimg2.png", "/uploads/restaurants/ZuneywagyuBurger/ZWBimg3.png", "/uploads/restaurants/ZuneywagyuBurger/ZWBimg4.png", "/uploads/restaurants/ZuneywagyuBurger/ZWBimg5.png",
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
    cuisine: "Small Plates / Contemporary",
    category: "restaurant", // ✅ added
    images: [
      "/uploads/restaurants/JerrysBurgerBar/JBBimg1.png", "/uploads/restaurants/JerrysBurgerBar/JBBimg2.png", "/uploads/restaurants/JerrysBurgerBar/JBBimg3.png", "/uploads/restaurants/JerrysBurgerBar/JBBimg4.png", "/uploads/restaurants/JerrysBurgerBar/JBBimg5.png",
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
      "/uploads/restaurants/Egghead/EHimg1.png", "/uploads/restaurants/Egghead/EHimg2.png", "/uploads/restaurants/Egghead/EHimg3.png", "/uploads/restaurants/Egghead/EHimg4.png", "/uploads/restaurants/Egghead/EHimg5.png", "/uploads/restaurants/Egghead/EHimg6.png",
    ],
    rating: 4.5,
    category: "restaurant",
    about:
      "We like our people the way we like our eggs, sunny-side up or a little scrambled. Whether you’re an early riser wanting coffee and a treat, a creative looking for a place to work, or asocialite wanting to grab dinner with friends, we have a spot for you. Our space is a contemporary take on an old-school 70’s diner, brought to life by retro design elements and food that warms your soul. Bauhaus art covers the walls, neon lights make the restaurant's gold and eclectic Ornaments keep your eyes wandering. Curbside tables offer a view of the table mountain, the bar tables are a perfect place to work, and a train of cosy Yellow booths will tempt you to cheers a few drinks.",
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
      "/uploads/restaurants/CapeTandoor/CTimg1.png", "/uploads/restaurants/CapeTandoor/CTimg2.png", "/uploads/restaurants/CapeTandoor/CTimg3.png", "/uploads/restaurants/CapeTandoor/CTimg4.png", "/uploads/restaurants/CapeTandoor/CTimg5.png",
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
    cuisine: "Contemporary",
    category: "restaurant", // ✅ added
    rating: 4.4,
    images: [
      "/uploads/restaurants/KloofStreetHouse/KSHimg1.png", "/uploads/restaurants/KloofStreetHouse/KSHimg2.png", "/uploads/restaurants/KloofStreetHouse/KSHimg3.png", "/uploads/restaurants/KloofStreetHouse/KSHimg4.png",
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
    cuisine: "Contemporary",
    category: "restaurant", // ✅ added
    rating: 4.6,
    images: [
      "/uploads/restaurants/NolzKitchen/NKimg1.png", "/uploads/restaurants/NolzKitchen/NKimg2.png", "/uploads/restaurants/NolzKitchen/NKimg3.png", "/uploads/restaurants/NolzKitchen/NKimg4.png", "/uploads/restaurants/NolzKitchen/NKimg5.png", "/uploads/restaurants/NolzKitchen/NKimg6.png",
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
    cuisine: "Contemporary",
    category: "restaurant", // ✅ added
    rating: 4.4,
    images: [
      "/uploads/restaurants/SchecktersRaw/SRimg1.png", "/uploads/restaurants/SchecktersRaw/SRimg2.png", "/uploads/restaurants/SchecktersRaw/SRimg3.png", "/uploads/restaurants/SchecktersRaw/SRimg4.png", "/uploads/restaurants/SchecktersRaw/SRimg5.png", "/uploads/restaurants/SchecktersRaw/SRimg6.png",
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
    cuisine: "Contemporary",
    category: "restaurant", // ✅ added
    rating: 4.7,
    images: [
      "/uploads/restaurants/ThePokeco/TPimg1.png", "/uploads/restaurants/ThePokeco/TPimg2.png", "/uploads/restaurants/ThePokeco/TPimg3.png", "/uploads/restaurants/ThePokeco/TPimg4.png", "/uploads/restaurants/ThePokeco/TPimg5.png", "/uploads/restaurants/ThePokeco/TPimg6.png",
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
    cuisine: "Contemporary",
    category: "restaurant", // ✅ added
    rating: 3.7,
    images: [
      "/uploads/restaurants/Pluckys/Pimg1.png", "/uploads/restaurants/Pluckys/Pimg2.png", "/uploads/restaurants/Pluckys/Pimg3.png", "/uploads/restaurants/Pluckys/Pimg4.png", "/uploads/restaurants/Pluckys/Pimg5.png",
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
    cuisine: "Contemporary",
    category: "restaurant", // ✅ added
    rating: 4.4,
    images: [
      "/uploads/restaurants/ThePowerAndTheGlory/TPGimg1.png", "/uploads/restaurants/ThePowerAndTheGlory/TPGimg2.png", "/uploads/restaurants/ThePowerAndTheGlory/TPGimg3.png", "/uploads/restaurants/ThePowerAndTheGlory/TPGimg4.png", "/uploads/restaurants/ThePowerAndTheGlory/TPGimg5.png", "/uploads/restaurants/ThePowerAndTheGlory/TPGimg6.png",
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
    cuisine: "Contemporary",
    category: "restaurant", // ✅ added
    rating: 4.8,
    images: [
      "/uploads/restaurants/SeoulPocha/SPimg1.png", "/uploads/restaurants/SeoulPocha/SPimg2.png", "/uploads/restaurants/SeoulPocha/SPimg3.png", "/uploads/restaurants/SeoulPocha/SPimg4.png", "/uploads/restaurants/SeoulPocha/SPimg5.png", "/uploads/restaurants/SeoulPocha/SPimg6.png",
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
    cuisine: "Contemporary",
    category: "restaurant", // ✅ added
    rating: 4.5,
    images: [
      "/uploads/restaurants/LinkoSushi/LSimg1.png", "/uploads/restaurants/LinkoSushi/LSimg2.png", "/uploads/restaurants/LinkoSushi/LSimg3.png", "/uploads/restaurants/LinkoSushi/LSimg4.png", "/uploads/restaurants/LinkoSushi/LSimg5.png", "/uploads/restaurants/LinkoSushi/LSimg6.png",
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
    cuisine: "Contemporary",
    category: "restaurant", // ✅ added
    rating: 4.4,
    images: [
      "/uploads/restaurants/TheEatery/TEimg1.png", "/uploads/restaurants/TheEatery/TEimg2.png", "/uploads/restaurants/TheEatery/TEimg3.png", "/uploads/restaurants/TheEatery/TEimg4.png", "/uploads/restaurants/TheEatery/TEimg5.png", "/uploads/restaurants/TheEatery/TEimg6.png", "/uploads/restaurants/TheEatery/TEimg7.png", "/uploads/restaurants/TheEatery/TEimg8.png", "/uploads/restaurants/TheEatery/TEimg9.png",
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
    cuisine: "Contemporary",
    category: "restaurant", // ✅ added
    rating: 4,
    images: [
      "/uploads/restaurants/ObzCafe/OCimg1.png", "/uploads/restaurants/ObzCafe/OCimg2.png", "/uploads/restaurants/ObzCafe/OCimg3.png", "/uploads/restaurants/ObzCafe/OCimg4.png", "/uploads/restaurants/ObzCafe/OCimg5.png", "/uploads/restaurants/ObzCafe/OCimg6.png",
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
      "/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg1.png", "/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg2.png", "/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg3.png", "/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg4.png", "/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg5.png", "/uploads/restaurants/CoffeeShops/SeattleCoffee/SCimg6.png",
    ],
    rating: 4.5,
    about:
    "We strive to capture the artisanal approach towards our craft through the traceability of crops, handpicked harvesting, hand-roasting, and manual espresso.",
    website: "https://www.seattlecoffeecompany.co.za/",
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
      "/uploads/restaurants/CoffeeShops/TheLadder/TLimg1.png", "/uploads/restaurants/CoffeeShops/TheLadder/TLimg2.png", "/uploads/restaurants/CoffeeShops/TheLadder/TLimg3.png", "/uploads/restaurants/CoffeeShops/TheLadder/TLimg4.png", "/uploads/restaurants/CoffeeShops/TheLadder/TLimg5.png", "/uploads/restaurants/CoffeeShops/TheLadder/TLimg6.png", "/uploads/restaurants/CoffeeShops/TheLadder/TLimg7.png", "/uploads/restaurants/CoffeeShops/TheLadder/TLimg8.png", "/uploads/restaurants/CoffeeShops/TheLadder/TLimg9.png",
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
      "/uploads/restaurants/CoffeeShops/SaintJames/SJimg1.png", "/uploads/restaurants/CoffeeShops/SaintJames/SJimg2.png", "/uploads/restaurants/CoffeeShops/SaintJames/SJimg3.png", "/uploads/restaurants/CoffeeShops/SaintJames/SJimg4.png", "/uploads/restaurants/CoffeeShops/SaintJames/SJimg5.png", "/uploads/restaurants/CoffeeShops/SaintJames/SJimg6.png",
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
    name: "Flatmoutain Coffee",
    address: " 103 Sir Lowry Rd, Woodstock, Cape Town, 7925",
    phone: "082 821 3979",
    cuisine: "Coffee / Café",
    category: "coffee",
    images: [
      "/uploads/restaurants/CoffeeShops/FlatMountainCoffee/FMCimg1.png", "/uploads/restaurants/CoffeeShops/FlatMountainCoffee/FMCimg2.png", "/uploads/restaurants/CoffeeShops/FlatMountainCoffee/FMCimg3.png", "/uploads/restaurants/CoffeeShops/FlatMountainCoffee/FMCimg4.png", "/uploads/restaurants/CoffeeShops/FlatMountainCoffee/FMCimg5.png", 
    ],
    rating: 4.8,
    about:
    "We take pride in extracting enthusiasm from every coffee moment. Recognising that with intentional sourcing of green beans, careful roasting, precise brewing and stimulating surroundings, there is more to coffee than caffeine. We celebrate that coffee is complex and the ritual of drinking a great cup is simply life changing.",
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
      "/uploads/restaurants/TheEatery/TEimg1.png", "/uploads/restaurants/TheEatery/TEimg2.png", "/uploads/restaurants/TheEatery/TEimg3.png", "/uploads/restaurants/TheEatery/TEimg4.png", "/uploads/restaurants/TheEatery/TEimg5.png", "/uploads/restaurants/TheEatery/TEimg6.png", "/uploads/restaurants/TheEatery/TEimg7.png", "/uploads/restaurants/TheEatery/TEimg8.png", "/uploads/restaurants/TheEatery/TEimg9.png",
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
      "/uploads/restaurants/CoffeeShops/CafeChiffon/CCimg1.png", "/uploads/restaurants/CoffeeShops/CafeChiffon/CCimg2.png", "/uploads/restaurants/CoffeeShops/CafeChiffon/CCimg3.png", "/uploads/restaurants/CoffeeShops/CafeChiffon/CCimg4.png", "/uploads/restaurants/CoffeeShops/CafeChiffon/CCimg5.png",
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
      "/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg1.png", "/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg2.png", "/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg3.png", "/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg4.png", "/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg5.png", "/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg6.png", "/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg7.png", "/uploads/restaurants/CoffeeShops/TruthCoffee/TCimg8.png",
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
      "/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg1.png", "/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg2.png", "/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg3.png", "/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg4.png", "/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg5.png", "/uploads/restaurants/CoffeeShops/FeinCoffee/FCimg6.png",
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
      "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg1.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg2.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg3.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg4.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg5.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg6.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg7.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg8.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg9.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg10.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg11.png", "/uploads/restaurants/CoffeeShops/NiceCafe/NCimg12.png",
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
      "/uploads/restaurants/CoffeeShops/TheGrind/TGimg1.png", "/uploads/restaurants/CoffeeShops/TheGrind/TGimg2.png", "/uploads/restaurants/CoffeeShops/TheGrind/TGimg3.png", "/uploads/restaurants/CoffeeShops/TheGrind/TGimg4.png", "/uploads/restaurants/CoffeeShops/TheGrind/TGimg5.png", "/uploads/restaurants/CoffeeShops/TheGrind/TGimg6.png",
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
      "/uploads/restaurants/CoffeeShops/VidaeCaffe/VCimg1.png", "/uploads/restaurants/CoffeeShops/VidaeCaffe/VCimg2.png", "/uploads/restaurants/CoffeeShops/VidaeCaffe/VCimg3.png", "/uploads/restaurants/CoffeeShops/VidaeCaffe/VCimg4.png", 
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
      "/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg1.png", "/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg2.png", "/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg3.png", "/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg4.png", "/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg5.png", "/uploads/restaurants/CoffeeShops/The777Coffee/TSCimg6.png",
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
      "/uploads/restaurants/CoffeeShops/MyBrewCoffee/MBCimg1.png", "/uploads/restaurants/CoffeeShops/MyBrewCoffee/MBCimg2.png", "/uploads/restaurants/CoffeeShops/MyBrewCoffee/MBCimg3.png", "/uploads/restaurants/CoffeeShops/MyBrewCoffee/MBCimg4.png", "/uploads/restaurants/CoffeeShops/MyBrewCoffee/MBCimg5.png",
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
      "/uploads/restaurants/CoffeeShops/SonderCafe/SCimg1.png", "/uploads/restaurants/CoffeeShops/SonderCafe/SCimg2.png", "/uploads/restaurants/CoffeeShops/SonderCafe/SCimg3.png", "/uploads/restaurants/CoffeeShops/SonderCafe/SCimg4.png", "/uploads/restaurants/CoffeeShops/SonderCafe/SCimg5.png", "/uploads/restaurants/CoffeeShops/SonderCafe/SCimg6.png", "/uploads/restaurants/CoffeeShops/SonderCafe/SCimg7.png", "/uploads/restaurants/CoffeeShops/SonderCafe/SCimg8.png",
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
      "/uploads/restaurants/ObzCafe/OCimg1.png", "/uploads/restaurants/ObzCafe/OCimg2.png", "/uploads/restaurants/ObzCafe/OCimg3.png", "/uploads/restaurants/ObzCafe/OCimg4.png", "/uploads/restaurants/ObzCafe/OCimg5.png", "/uploads/restaurants/ObzCafe/OCimg6.png",
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
    name: "Pizza Hut Rondebosch",
    address: "Main Rd, Rondebosch, Cape Town",
    phone: "+27 21 685 1234",
    cuisine: "Pizza / Fast Food",
    category: "takeaway",
    images: [
      "https://images.unsplash.com/photo-1601924582971-df6a14b85b0e?q=80&w=1200&auto=format&fit=crop",
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
    name: "KFC Claremont",
    address: "Main Rd, Claremont, Cape Town",
    phone: "+27 21 671 4470",
    cuisine: "Fried Chicken / Fast Food",
    category: "takeaway",
    images: [
      "https://images.unsplash.com/photo-1588167056547-c9f4d5a0b5b1?q=80&w=1200&auto=format&fit=crop",
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
