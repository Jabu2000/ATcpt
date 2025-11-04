import mongoose from "mongoose";
import "dotenv/config";
import Event from "../models/Event.js";

const BASE_URL = process.env.BASE_URL || "http://localhost:4000";

const data = [
  // --- Club Nights & Parties ---
  {
    name: "Souk",
    address: "163 Long St, Cape Town City Centre, Cape Town, 8001",
    phone: "060 682 6894",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/Souk/Simg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/Souk/Simg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/Souk/Simg3.png`,
    ],
    rating: 4.2,
    category: "ClubNightsParties",
    about:
      "The mecca for soul food and groove. SA-inspired tapas for global palettes served in an elegant, vibey restaurant with cosy rooms, a covered balcony, and unrivaled music entertainment.",
    website: "https://www.soukcpt.com/",
    openingHours: {
      monday: { open: "closed", close: "closed" },
      tuesday: { open: "closed", close: "closed" },
      wednesday: { open: "18:00 pm", close: "02:00 am" },
      thursday: { open: "18:00 pm", close: "02:00 am" },
      friday: { open: "18:00 pm", close: "02:00 am" },
      saturday: { open: "18:00 pm", close: "02:00 am" },
      sunday: { open: "18:00 pm", close: "02:00 am" },
    },
  },

  {
    name: "DramaCPT",
    address: "259 Long St, Cape Town City Centre, Cape Town, 8012",
    phone: "072 323 6620",
    cuisine: "Hip Hop, R&B, amapino",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/drama/Dimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/drama/Dimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/drama/Dimg3.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/drama/Dimg4.png`,
    ],
    rating: 4.2,
    category: "ClubNightsParties",
    about:
      "Cape Town's latest trendy Tapas & Bar Lounge offering is here! Open Wednesday to Saturday from 4PM. Experience the Drama! ",
    website: "https://www.instagram.com/dramabar_cpt/?hl=en",
    openingHours: {
      monday: { open: "closed", close: "closed" },
      tuesday: { open: "closed", close: "closed" },
      wednesday: { open: "18:00 pm", close: "02:00 am" },
      thursday: { open: "18:00 pm", close: "02:00 am" },
      friday: { open: "18:00 pm", close: "02:00 am" },
      saturday: { open: "18:00 pm", close: "02:00 am" },
      sunday: { open: "18:00 pm", close: "02:00 am" },
    },
  },
  {
    name: "Sneaker Cartel",
    address: "164 Long St, Cape Town City Centre, Cape Town, 8000",
    phone: "082 666 3954",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/sneakercartel/SCimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/sneakercartel/SCimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/sneakercartel/SCimg3.png`,
    ],
    rating: 3.7,
    category: "ClubNightsParties",
    about:
      "Sneaker Cartel is Cape Town's premier sneaker bar and lounge. Offering a unique blend of street culture, music, and fashion, it's the perfect spot to unwind and socialize.",
    website: "https://www.instagram.com/sneaker_cartel_sa/?hl=en",
    openingHours: {
      monday: { open: "10:00 pm", close: "16:00 am" },
      tuesday: { open: "Closed", close: "Closed" },
      wednesday: { open: "10:00 pm", close: "16:00 am" },
      thursday: { open: "10:00 pm", close: "16:00 am" },
      friday: { open: "10:00 pm", close: "16:00 am" },
      saturday: { open: "10:00 pm", close: "16:00 am" },
      sunday: { open: "10:00 pm", close: "16:00 am" },
    },
  },

  {
    name: "Ayepyep",
    address: "14 Kloof St, Gardens, Cape Town, 8001",
    phone: "021 569 8265",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/ayepyep/Aimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/ayepyep/Aimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/ayepyep/Aimg3.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/ayepyep/Aimg4.png`,
    ],
    rating: 4.5,
    category: "ClubNightsParties",
    about:
      "Ayepyep Lifestyle Lounge is a premier nightlife and entertainment destination in Cape Town, offering an upscale experience with vibrant events, delicious South African cuisine, and a lively atmosphere. Perfect for those seeking luxury and style, Ayepyep provides an unforgettable social scene with a blend of music, culture, and exceptional service",
    website: "https://ayepyep.com/",
    openingHours: {
      monday: { open: "12:00 pm", close: "14:00 am" },
      tuesday: { open: "12:00 pm", close: "22:00 pm" },
      wednesday: { open: "12:00 pm", close: "22:00 pm" },
      thursday: { open: "12:00 pm", close: "23:00 pm" },
      friday: { open: "12:00 pm", close: "14:00 am" },
      saturday: { open: "12:00 pm", close: "14:00 am" },
      sunday: { open: "12:00 pm", close: "14:00 am" },
    },
  },
  {
    name: "Cubana",
    address: "95 Jan Smuts St, Cape Town City Centre, Cape Town, 8000",
    phone: "072 645 1643",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/cubana/Cimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/cubana/Cimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/cubana/Cimg3.png`,
    ],
    rating: 4.4,
    category: "ClubNightsParties",
    about:
      "Cubana is a vibrant nightclub in Cape Town known for its electrifying dance music, lively atmosphere, and top-notch DJs. It's the perfect spot for party-goers looking to dance the night away in style.",
    website: "https://cubana.co.za/cubana-greenpoint/",
    openingHours: {
      monday: { open: "09:00 am", close: "16:00 pm" },
      tuesday: { open: "09:00 am", close: "16:00 pm" },
      wednesday: { open: "09:00 am", close: "16:00 pm" },
      thursday: { open: "09:00 am", close: "16:00 pm" },
      friday: { open: "09:00 am", close: "16:00 pm" },
      saturday: { open: "09:00 am", close: "16:00 pm" },
      sunday: { open: "09:00 am", close: "16:00 pm" },
    },
  },

  {
    name: "Klubhouse",
    address: "53 Wale St, Cape Town City Centre, Cape Town, 8001",
    phone: "061 163 5389",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/klubhouse/KHimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/klubhouse/KHimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/klubhouse/KHimg3.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/klubhouse/KHimg4.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/klubhouse/KHimg5.png`,
    ],
    rating: 4.8,
    category: "ClubNightsParties",
    about:
      "Broke Klubhouse - Your Home Now & Forever. Broke Klubhouse houses BROKES flagship store, based in Cape Town, South Africa. Retail during the day and a bar at night. Music by Space Sounds. All are welcome!",
    website: "https://sobroke.online/products/broke-klubhouse-shop-t-shirt-1",
    openingHours: {
      monday: { open: "Closed", close: "Closed" },
      tuesday: { open: "10:00 am", close: "18:00 pm" },
      wednesday: { open: "10:00 am", close: "00:00 am" },
      thursday: { open: "10:00 am", close: "00:00 am" },
      friday: { open: "10:00 am", close: "00:00 am" },
      saturday: { open: "10:00 am", close: "00:00 am" },
      sunday: { open: "16:00 pm", close: "00:00 am" },
    },
  },
  {
    name: "Caprice",
    address: "37 Victoria Rd, Camps Bay, Cape Town, 8005",
    phone: "021 438 8315",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/caprice/Cimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/caprice/Cimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/caprice/Cimg3.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/caprice/Cimg4.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/caprice/Cimg5.png`,
    ],
    rating: 4.5,
    category: "ClubNightsParties",
    about:
      "Café Caprice in Camps Bay offers a wide variety of Burgers, all day Breakfast, Brunch, Mimosas and our popular Artisanal cocktails while enjoying our resident DJ's, who will be creating the perfect ambience while chilling on lounges watching exceptional sunsets at Cape Town's most popular spot.",
    website: "https://cafecaprice.co.za/",
    openingHours: {
      monday: { open: "12:00 pm", close: "00:00 am" },
      tuesday: { open: "09:00 am", close: "00:00 am" },
      wednesday: { open: "09:00 am", close: "00:00 am" },
      thursday: { open: "09:00 am", close: "00:00 am" },
      friday: { open: "09:00 am", close: "01:00 am" },
      saturday: { open: "09:00 am", close: "01:00 am" },
      sunday: { open: "09:00 am", close: "01:00 am" },
    },
  },

  {
    name: "Stones Obz",
    address: "84 Lower Main Rd, Observatory, Cape Town, 7925",
    phone: "021 448 9461",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/stones/Simg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/stones/Simg2.png`,
    ],
    rating: 4.2,
    category: "ClubNightsParties",
    about:
      "Stones is a vibrant nightclub in Observatory, Cape Town, known for its energetic atmosphere, top-notch DJs, and diverse music selection including hip hop and R&B. It's a popular spot for locals and visitors looking to dance and socialize late into the night.",
    website: "https://www.stones.co.za/observatory-m7kdg",
    openingHours: {
      monday: { open: "13:00 pm", close: "02:00 am" },
      tuesday: { open: "13:00 pm", close: "02:00 am" },
      wednesday: { open: "13:00 pm", close: "02:00 am" },
      thursday: { open: "13:00 pm", close: "02:00 am" },
      friday: { open: "13:00 pm", close: "02:00 am" },
      saturday: { open: "13:00 pm", close: "02:00 am" },
      sunday: { open: "13:00 pm", close: "02:00 am" },
    },
  },
  {
    name: "Two4one",
    address: "90 Lower Main Rd, Observatory, Cape Town, 7925",
    phone: "021 879 4614",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/two4one/TFOimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/two4one/TFOimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/two4one/TFOimg3.png`,
    ],
    rating: 3.6,
    category: "ClubNightsParties",
    about:
      " Two4one is a dynamic nightclub in Observatory, Cape Town, celebrated for its electrifying dance music scene. With a focus on electronic beats, it offers an energetic atmosphere where party-goers can enjoy top DJs and vibrant nightlife experiences.",
    website: "http://electricdreams.com",
    openingHours: {
      monday: { open: "13:00 pm", close: "02:00 am" },
      tuesday: { open: "13:00 pm", close: "02:00 am" },
      wednesday: { open: "13:00 pm", close: "02:00 am" },
      thursday: { open: "13:00 pm", close: "02:00 am" },
      friday: { open: "13:00 pm", close: "02:00 am" },
      saturday: { open: "13:00 pm", close: "02:00 am" },
      sunday: { open: "13:00 pm", close: "02:00 am" },
    },
  },

  {
    name: "Kind Regards",
    address: "86 Station Rd, Observatory, Cape Town, 7925",
    phone: "073 245 2317",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/kindregards/KRimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/kindregards/KRimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/kindregards/KRimg3.png`,
    ],
    rating: 3.9,
    category: "ClubNightsParties",
    about: "Restaurant with a great Atmosphere & delicious food & cocktails.",
    website: "https://www.instagram.com/kindregardsct/?hl=en",
    openingHours: {
      monday: { open: "13:00 pm", close: "02:00 am" },
      tuesday: { open: "13:00 pm", close: "02:00 am" },
      wednesday: { open: "13:00 pm", close: "02:00 am" },
      thursday: { open: "13:00 pm", close: "02:00 am" },
      friday: { open: "13:00 pm", close: "02:00 am" },
      saturday: { open: "13:00 pm", close: "02:00 am" },
      sunday: { open: "13:00 pm", close: "02:00 am" },
    },
  },
  {
    name: "Arcade",
    address: "107 Bree St, Cape Town City Centre, Cape Town, 8001",
    phone: "021 422 2138",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/arcade/Aimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/arcade/Aimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/arcade/Aimg3.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/arcade/Aimg4.png`,
    ],
    rating: 4.4,
    category: "ClubNightsParties",
    about:
      "Early evening cocktails Bottle service late night House, Hip-Hop, and R&B always. Strictly Ladies 23+ & Gents 25+ Thursday - Saturday, 8-late",
    website: "https://www.instagram.com/archivesa/?hl=en",
    openingHours: {
      monday: { open: "08:00 am", close: "02:00 am" },
      tuesday: { open: "08:00 am", close: "02:00 am" },
      wednesday: { open: "08:00 am", close: "02:00 am" },
      thursday: { open: "08:00 am", close: "02:00 am" },
      friday: { open: "08:00 am", close: "02:00 am" },
      saturday: { open: "08:00 am", close: "02:00 am" },
      sunday: { open: "Closed", close: "Closed" },
    },
  },

  {
    name: "LIV on bree",
    address: "207 Bree St, Cape Town City Centre, Cape Town, 8000",
    phone: "066 437 3086",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/livonbree/LOBimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/livonbree/LOBimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/livonbree/LOBimg3.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/livonbree/LOBimg4.png`,
    ],
    rating: 4.5,
    category: "ClubNightsParties",
    about:
      "LIV on Bree - Cape Town's newest Premium Restaurant and Lounge Venue",
    website: "https://account.dineplan.com/menu/Hp1nYsmR/4204",
    openingHours: {
      monday: { open: "Closed", close: "Closed" },
      tuesday: { open: "Closed", close: "Closed" },
      wednesday: { open: "Closed", close: "Closed" },
      thursday: { open: "10:00 am", close: "23:00 pm" },
      friday: { open: "10:00 am", close: "23:00 am" },
      saturday: { open: "10:00 am", close: "23:00 am" },
      sunday: { open: "10:00 am", close: "22:00 pm" },
    },
  },
  {
    name: "RANDS",
    address: "6 Makhabeni Road, Khaya Bazzar, Khayelitsha, Cape Town, 7784",
    phone: "083 874 6082",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/rands/Rimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/rands/Rimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/rands/Rimg3.png`,
    ],
    rating: 4.5,
    category: "ClubNightsParties",
    about:
      "Rands Cape Town is a leading outdoor lifestyle space with unmatched Braai recipes and unrivalled environ.",
    website: "https://www.instagram.com/randscapetown/?hl=en",
    openingHours: {
      monday: { open: "Closed", close: "Closed" },
      tuesday: { open: "Closed", close: "Closed" },
      wednesday: { open: "Closed", close: "Closed" },
      thursday: { open: "10:00 am", close: "23:00 pm" },
      friday: { open: "10:00 am", close: "23:00 am" },
      saturday: { open: "10:00 am", close: "23:00 am" },
      sunday: { open: "10:00 am", close: "22:00 pm" },
    },
  },

  {
    name: "Saints",
    address: "37 Harrington St, District Six, Cape Town, 8001",
    phone: "067 410 8043",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/saint/Simg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/saint/Simg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/saint/Simg3.png`,
    ],
    rating: 4,
    category: "ClubNightsParties",
    about:
      "Designed with a smooth, contemporary style, Saint Champagne Bar and Lounge is a place built for pure pleasure. With the exhilaration of the Cape Town night life, this sophisticated sanctuary offers a high energy experience, in the middle of it all – that transcends the notions of a classic upmarket lounge. It boasts a fully stocked bar that embraces seasonality, making this the perfect self-contained space for events. Exclusivity, excellence, and elegance are our mantras in showcasing the splendor of the world within. Saint Champagne Bar and Lounge features a seriously extensive list of champagne encompassing a wide range to suit all tastes – in addition, the magnificent location showcases the unrivaled beauty of Cape Town.",
    website: "https://saintlounge.co.za/",
    openingHours: {
      monday: { open: "Closed", close: "Closed" },
      tuesday: { open: "Closed", close: "Closed" },
      wednesday: { open: "10:00 am", close: "16:00 pm" },
      thursday: { open: "10:00 am", close: "16:00 pm" },
      friday: { open: "10:00 am", close: "16:00 pm" },
      saturday: { open: "10:00 am", close: "16:00 pm" },
      sunday: { open: "10:00 am", close: "16:00 pm" },
    },
  },
  {
    name: "The One",
    address: "4b Buiten St, Cape Town City Centre, Cape Town, 8001",
    phone: "072 946 9278",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/theone/TOimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/theone/TOimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/theone/TOimg3.png`,
    ],
    rating: 4,
    category: "ClubNightsParties",
    about:
      " The One is a premier nightclub in Cape Town, renowned for its vibrant atmosphere, top-tier DJs, and eclectic music selection that keeps the dance floor alive all night long.",
    website: "http://electricdreams.com",
    openingHours: {
      monday: { open: "12:00 pm", close: "23:00 pm" },
      tuesday: { open: "12:00 pm", close: "23:00 pm" },
      wednesday: { open: "12:00 pm", close: "23:00 pm" },
      thursday: { open: "12:00 pm", close: "23:00 pm" },
      friday: { open: "12:00 pm", close: "00:00 am" },
      saturday: { open: "12:00 pm", close: "00:00 am" },
      sunday: { open: "12:00 pm", close: "23:00 pm" },
    },
  },

  {
    name: "Yours Truly",
    address: "73 Kloof St, Schotsche Kloof, Cape Town, 8001",
    phone: "069 572 4837",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Clubsandnightlife/yourstruly/YTimg1.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/yourstruly/YTimg2.png`,
      `${BASE_URL}/uploads/events/Clubsandnightlife/yourstruly/YTimg3.png`,
    ],
    rating: 4.3,
    category: "ClubNightsParties",
    about:
      "Yours Truly is a trendy nightclub in Cape Town known for its vibrant atmosphere, eclectic music selection, and lively dance floor. It's a popular spot for locals and tourists looking to experience the city's nightlife scene.",
    website: "https://www.allyoursco.com/yours-truly",
    openingHours: {
      monday: { open: "07:00 am", close: "00:00 am" },
      tuesday: { open: "07:00 am", close: "00:00 am" },
      wednesday: { open: "07:00 am", close: "00:00 am" },
      thursday: { open: "07:00 am", close: "00:00 am" },
      friday: { open: "07:00 am", close: "00:00 am" },
      saturday: { open: "07:00 am", close: "00:00 am" },
      sunday: { open: "07:00 am", close: "00:00 am" },
    },
  },
  // --- Music & Open Mic ---
  {
    name: "Open wine",
    address: "72 Wale St, Cape Town City Centre, Cape Town, 8001",
    phone: "067 617 6064",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Livemusicandopenmics/openwine/OWimg1.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/openwine/OWimg2.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/openwine/OWimg3.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/openwine/OWimg4.png`,
    ],
    rating: 4.4,
    category: "MusicOpenMic",
    about:
      " Open Wine is a cozy wine bar in Cape Town that offers a curated selection of local and international wines, paired with live music performances from talented local artists. It's the perfect spot for wine enthusiasts and music lovers to unwind and enjoy a relaxed evening.",
    website: "https://www.instagram.com/openwine_za/?hl=en",
    openingHours: {
      monday: { open: "12:00 pm", close: "23:00 pm" },
      tuesday: { open: "12:00 pm", close: "23:00 pm" },
      wednesday: { open: "12:00 pm", close: "23:00 pm" },
      thursday: { open: "12:00 pm", close: "23:00 pm" },
      friday: { open: "12:00 pm", close: "23:00 am" },
      saturday: { open: "12:00 pm", close: "23:00 am" },
      sunday: { open: "14:00 pm", close: "23:00 pm" },
    },
  },
  {
    name: "Mojo market live performances",
    address: "84 Regent Rd, Sea Point, Cape Town, 8000",
    phone: "082 973 4673",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Livemusicandopenmics/mojomarket/MMimg1.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/mojomarket/MMimg2.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/mojomarket/MMimg3.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/mojomarket/MMimg4.png`,
    ],
    rating: 4.2,
    category: "MusicOpenMic",
    about:
      "Mojo Market is a vibrant indoor food and lifestyle market. Open 7 days a week with free entrance. Experience food stalls, five bars, sports, daily live music, and weekly & monthly events. Located right in the #HeartOfSeaPoint at 30 Regent Rd. There's #SomethingForEveryone at MOJO. Mojo is open every day, 365 days a year with the following trading hours: Coffee & Breakfast open daily from 8am Food Stalls & Bars: Sun - Thurs 11am-10pm Fri - Sat 11am-11pm Kindly email admin1@freedomproperties.co.za for all general enquiries. ",
    website: "http://openmicnights.com",
    openingHours: {
      monday: { open: "09:00 am", close: "00:00 am" },
      tuesday: { open: "09:00 am", close: "01:00 am" },
      wednesday: { open: "09:00 am", close: "01:00 am" },
      thursday: { open: "09:00 am", close: "01:00 am" },
      friday: { open: "09:00 am", close: "01:00 am" },
      saturday: { open: "09:00 am", close: "01:00 am" },
      sunday: { open: "09:00 am", close: "00:00 am" },
    },
  },
  {
    name: "The Athletic Club Social",
    address: "35 Buitengracht St, CBD, Cape Town, 8001",
    phone: "084 087 5566",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Livemusicandopenmics/theathleticclubsocial/TACSimg1.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/theathleticclubsocial/TACSimg2.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/theathleticclubsocial/TACSimg3.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/theathleticclubsocial/TACSimg4.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/theathleticclubsocial/TACSimg5.png`,
    ],
    rating: 4.5,
    category: "MusicOpenMic",
    about:
      "Restaurant Bar Lounge with live music performances and a vibrant social scene.",
    website:
      "https://www.dineplan.com/restaurants/the-athletic-club-and-social",
    openingHours: {
      monday: { open: "16:00 pm", close: "23:00 pm" },
      tuesday: { open: "16:00 pm", close: "23:00 pm" },
      wednesday: { open: "16:00 pm", close: "00:00 am" },
      thursday: { open: "12:00 pm", close: "02:00 am" },
      friday: { open: "12:00 pm", close: "02:00 am" },
      saturday: { open: "12:00 pm", close: "02:00 am" },
      sunday: { open: "Closed", close: "Closed" },
    },
  },
  {
    name: "The House Machines",
    address: "84 Shortmarket St, Cape Town City Centre, Cape Town, 8000",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thehousemachines/THMimg1.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thehousemachines/THMimg2.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thehousemachines/THMimg3.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thehousemachines/THMimg4.png`,
    ],
    rating: 4.5,
    category: "MusicOpenMic",
    about:
      " The House of Machines is a unique blend of a café, bar, and motorcycle workshop. It offers a vibrant atmosphere with live music performances, craft beers, and artisanal coffee, making it a popular spot for locals and tourists alike.",
    website: "https://thehouseofmachines.com/",
    openingHours: {
      monday: { open: "07:00 am", close: "02:00 am" },
      tuesday: { open: "07:00 am", close: "02:00 am" },
      wednesday: { open: "07:00 am", close: "02:00 am" },
      thursday: { open: "07:00 am", close: "02:00 am" },
      friday: { open: "07:00 am", close: "02:00 am" },
      saturday: { open: "09:00 am", close: "02:00 am" },
      sunday: { open: "Closed", close: "Closed" },
    },
  },
  {
    name: "The Kaya Cafe",
    address: "35 Loop St, Cape Town City Centre, Cape Town, 8001",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thekayacafe/TKCimg1.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thekayacafe/TKCimg2.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thekayacafe/TKCimg3.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thekayacafe/TKCimg4.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thekayacafe/TKCimg5.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thekayacafe/TKCimg6.png`,
    ],
    rating: 5,
    category: "MusicOpenMic",
    about:
      "Cape Town's Creativity, Curated at the KAYA Café! The KAYA Café is an oasis of creativity, community, and collaboration, located right in the center of the Cape Town CBD. Featuring a selection of some of Cape Town's best artists and vendors that rotate on a quarterly basis, the KAYA Café aims to showcase and help develop young creators and entrepreneurs to be able to grow their businesses in community. With an exciting lineup of events featuring some of the most exciting, innovative, and important creators and topics in a variety of mediums and formats, the KAYA Café aims to provide a home for the conversations, communities, and content that will take the Cape Town creative industries forward!",
    website: "https://www.thekayacafe.co.za/",
    openingHours: {
      monday: { open: "07:00 am", close: "16:00 pm" },
      tuesday: { open: "07:00 am", close: "16:00 pm" },
      wednesday: { open: "07:00 am", close: "16:00 pm" },
      thursday: { open: "07:00 am", close: "16:00 pm" },
      friday: { open: "07:00 am", close: "16:00 am" },
      saturday: { open: "Closed", close: "Closed" },
      sunday: { open: "Closed", close: "Closed" },
    },
  },
  {
    name: "Select Live",
    address: "189 Buitengracht St, Gardens, Cape Town, 8001",
    phone: "061 588 8388",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Livemusicandopenmics/selectlive/SLimg1.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/selectlive/SLimg2.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/selectlive/SLimg3.png`,
    ],
    rating: 4.6,
    category: "MusicOpenMic",
    about:
      "Unique Live Music featuring local and international artists every Friday, Saturday and Sunday. All artists and musicians are welcomed every other day of the week for recording, enquiring or just chilling with us on the balcony !",
    website: "https://selectivecity.co.za/selective-live/",
    openingHours: {
      monday: { open: "Closed", close: "Closed" },
      tuesday: { open: "Closed", close: "Closed" },
      wednesday: { open: "Closed", close: "Closed" },
      thursday: { open: "16:00 pm", close: "02:00 am" },
      friday: { open: "16:00 pm", close: "02:00 am" },
      saturday: { open: "16:00 pm", close: "02:00 am" },
      sunday: { open: "16:00 pm", close: "02:00 am" },
    },
  },
  {
    name: "The Arm Chair",
    address: "135 Lower Main Rd, Observatory, Cape Town, 7925",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thearmchair/TACimg1.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thearmchair/TACimg2.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thearmchair/TACimg3.png`,
      `${BASE_URL}/uploads/events/Livemusicandopenmics/thearmchair/TACimg4.png`,
    ],
    rating: 4.5,
    category: "MusicOpenMic",
    about:
      "The Armchair Theatre is a vibrant entertainment venue in Cape Town, offering a diverse range of events including karaoke, standup comedy, pub quizzes, and live music performances. It provides a cozy and intimate atmosphere for guests to enjoy a night of entertainment and fun, with affordable ticket prices and a fully stocked bar.",
    website: "https://armchair.kamooni.africa/",
    openingHours: {
      monday: { open: "12:00 pm", close: "02:00 am" },
      tuesday: { open: "12:00 pm", close: "02:00 am" },
      wednesday: { open: "12:00 pm", close: "02:00 am" },
      thursday: { open: "12:00 pm", close: "02:00 am" },
      friday: { open: "12:00 pm", close: "02:00 am" },
      saturday: { open: "12:00 pm", close: "02:00 am" },
      sunday: { open: "12:00 pm", close: "02:00 am" },
    },
  },

  // --- Creative Events ---
  {
    name: "Night in lagos",
    address: "View location on IG",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Eventandfestivals/nightinlagos/NILimg1.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/nightinlagos/NILimg2.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/nightinlagos/NILimg3.png`,
    ],
    rating: 4.8,
    category: "CreativeEvents",
    about:
      "Join us for a night of vibrant Lagos culture, featuring traditional music, dance, and crafts.",
    website: "https://www.instagram.com/nightinlagos_au/?hl=en",
    openingHours: {
      saturday: { open: "18:00 pm", close: "late" },
    },
  },
  {
    name: "The soul oasis",
    address: "View location on IG",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Eventandfestivals/thesouloasis/TSOimg1.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/thesouloasis/TSOimg2.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/thesouloasis/TSOimg3.png`,
    ],
    rating: 4.9,
    category: "CreativeEvents",
    about:
      "Experience a soulful retreat with workshops on meditation, art, and holistic wellness.",
    website: "https://www.instagram.com/nightinlagos_au/?hl=en",
    openingHours: {
      saturday: { open: "18:00 pm", close: "late" },
    },
  },
  {
    name: "Frnds of Jazz",
    address: "View location on IG",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Eventandfestivals/friendsofjazz/FJimg1.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/friendsofjazz/FJimg2.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/friendsofjazz/FJimg3.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/friendsofjazz/FJimg4.png`,
    ],
    rating: 4.8,
    category: "CreativeEvents",
    about:
      "Join us for an evening of smooth jazz performances by local artists in an intimate setting.",
    website: "https://whatsonincapetown.com/event/friends-of-jazz-house-party/",
    openingHours: {
      saturday: { open: "18:00 pm", close: "late" },
    },
  },
  {
    name: "Sunflower festival",
    address: "View location on IG",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Eventandfestivals/sunflowerfestival/SFimg1.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/sunflowerfestival/SFimg2.png`,
    ],
    rating: 4.9,
    category: "CreativeEvents",
    about:
      "Celebrate the beauty of sunflowers with art installations, live music, and local food vendors.",
    website: "https://www.instagram.com/sunfloweroutdoorfestival/?hl=en",
    openingHours: {
      saturday: { open: "18:00 pm", close: "late" },
    },
  },
  {
    name: "Meidum-Festival",
    address: "View location on IG",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Eventandfestivals/meidumfestival/MFimg1.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/meidumfestival/MFimg2.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/meidumfestival/MFimg3.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/meidumfestival/MFimg4.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/meidumfestival/MFimg5.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/meidumfestival/MFimg6.png`,
    ],
    rating: 4.8,
    category: "CreativeEvents",
    about:
      "Immerse yourself in a fusion of art, music, and culture at the Meidum Festival, celebrating creativity in all its forms.",
    website: "https://meidumfestival.com/",
    openingHours: {
      saturday: { open: "18:00 pm", close: "late" },
    },
  },
  {
    name: "Keinemusik live",
    address: "View location on IG",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Eventandfestivals/keinemusik/Kimg1.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/keinemusik/Kimg2.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/keinemusik/Kimg3.png`,
    ],
    rating: 4.9,
    category: "CreativeEvents",
    about:
      "Experience the electrifying beats of Keinemusik live in concert, bringing their signature sound to the stage.",
    website:
      "https://keinemusik.howler.co.za/events/keinemusik-cape-town-2025-46a5",
    openingHours: {
      saturday: { open: "18:00 pm", close: "late" },
    },
  },
  {
    name: "Alcazar Cape Town NYE",
    address: "View location on IG",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Eventandfestivals/alcazar/Aimg1.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/alcazar/Aimg2.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/alcazar/Aimg3.png`,
      `${BASE_URL}/uploads/events/Eventandfestivals/alcazar/Aimg4.png`,
    ],
    rating: 4.7,
    category: "CreativeEvents",
    about:
      " Ring in the New Year at Alcazar Cape Town with an unforgettable celebration featuring live music, gourmet dining, and spectacular views of the city skyline.",
    website: "https://www.alcazarcapetown.com/nye",
    openingHours: {
      saturday: { open: "18:00 pm", close: "late" },
    },
  },

  //--- SocialNights ---
  {
    name: "Silent Disco Cape Town",
    address: "3 Farriers Way, Hout Bay, Cape Town, 7806",
    phone: "072 777 0717",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Socialnights/silentdisco/SDimg1.png`,
      `${BASE_URL}/uploads/events/Socialnights/silentdisco/SDimg2.png`,
      `${BASE_URL}/uploads/events/Socialnights/silentdisco/SDimg3.png`,
      `${BASE_URL}/uploads/events/Socialnights/silentdisco/SDimg4.png`,
      `${BASE_URL}/uploads/events/Socialnights/silentdisco/SDimg5.png`,
    ],
    rating: 5,
    category: "SocialNights",
    about:
      "Multi-channel wireless headphones for corporate activations and Silent Discos all over Southern Africa",
    website: "https://silentevents.co.za/",
    openingHours: {
      monday: { open: "09:00 am", close: "17:00 pm" },
      tuesday: { open: "09:00 am", close: "17:00 pm" },
      wednesday: { open: "09:00 am", close: "17:00 pm" },
      thursday: { open: "09:00 am", close: "17:00 pm" },
      friday: { open: "09:00 am", close: "17:00 pm" },
      saturday: { open: "09:00 am", close: "17:00 pm" },
      sunday: { open: "09:00 am", close: "17:00 pm" },
    },
  },
  {
    name: "Nice Cafe",
    address:
      "1a Queen Victoria St, Cape Town City Centre, Cape Town, 8001",
    phone: "084 3333 3336",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Socialnights/nicecafe/NCimg1.png`,
      `${BASE_URL}/uploads/events/Socialnights/nicecafe/NCimg2.png`,
      `${BASE_URL}/uploads/events/Socialnights/nicecafe/NCimg3.png`,
      `${BASE_URL}/uploads/events/Socialnights/nicecafe/NCimg4.png`,
      `${BASE_URL}/uploads/events/Socialnights/nicecafe/NCimg5.png`,
    ],
    rating: 4.9,
    category: "SocialNights",
    about:
      "Your new favourite coffee shop, located next door to St George’s Cathedral, the soon to Neighbourgood Church House Workspace and Company Gardens. Stop by for light eats, sandwhiches, a cookie and of course, a coffee.",
    website: "http://craftandcreate.com",
    openingHours: {
      monday: { open: "06:00 pm", close: "16:00 pm" },
      tuesday: { open: "06:00 pm", close: "16:00 pm" },
      wednesday: { open: "06:00 pm", close: "16:00 pm" },
      thursday: { open: "06:00 pm", close: "16:00 pm" },
      friday: { open: "06:00 pm", close: "16:00 pm" },
      saturday: { open: "07:00 am", close: "13:00 pm" },
      sunday: { open: "07:00 am", close: "13:00 pm" },
    },
  },
  {
    name: "Slowcookedsunday",
    address: "view location on IG",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Socialnights/slowcookedsunday/SCSimg1.png`,
      `${BASE_URL}/uploads/events/Socialnights/slowcookedsunday/SCSimg2.png`,
      `${BASE_URL}/uploads/events/Socialnights/slowcookedsunday/SCSimg3.png`,
      `${BASE_URL}/uploads/events/Socialnights/slowcookedsunday/SCSimg4.png`,
      `${BASE_URL}/uploads/events/Socialnights/slowcookedsunday/SCSimg5.png`,
    ],
    rating: 4.9,
    category: "SocialNights",
    about:
      "Slow Cooked Sundays is all about bringing people together to share a delicious meal, enjoy great company, and create lasting memories. Our events are designed to foster a sense of community and connection, where everyone feels welcome and valued. Whether you're a seasoned foodie or just looking for a fun way to spend your Sunday, Slow Cooked Sundays has something for everyone. Join us for an unforgettable experience that will leave you feeling nourished, inspired, and connected.",
    website: "https://www.instagram.com/slowcookedsundaysct/reels/?hl=en",
    openingHours: {},
  },
  {
    name: "Mono No Aware",
    address: "view location on IG",
    phone: "",
    cuisine: "",
    images: [
      `${BASE_URL}/uploads/events/Socialnights/mononoaware/MAimg1.png`,
      `${BASE_URL}/uploads/events/Socialnights/mononoaware/MAimg2.png`,
      `${BASE_URL}/uploads/events/Socialnights/mononoaware/MAimg3.png`,
      `${BASE_URL}/uploads/events/Socialnights/mononoaware/MAimg4.png`,
      `${BASE_URL}/uploads/events/Socialnights/mononoaware/MAimg5.png`,
    ],
    rating: 4.8,
    category: "SocialNights",
    about:
      " Mono No Aware is a Japanese term that translates to 'the pathos of things' or 'an empathy toward things.' It refers to the awareness of the impermanence of all things and a gentle sadness or wistfulness at their passing. In the context of our social nights, Mono No Aware embodies the appreciation of fleeting moments shared with others, creating meaningful connections and memories that linger even as time moves on.",
    website: "https://www.instagram.com/mononoawareza/?hl=en",
    openingHours: {},
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
