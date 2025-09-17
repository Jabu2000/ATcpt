// import { useState } from "react";

// const RestaurantCard = ({ restaurant, token }) => {
//   const [saved, setSaved] = useState(false);

//   const saveRestaurant = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/users/save/${restaurant._id}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`, // send JWT
//           },
//         }
//       );
//       if (res.ok) setSaved(true);
//     } catch (err) {
//       console.error("Error saving restaurant:", err);
//     }
//   };

//   const removeRestaurant = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/users/save/${restaurant._id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.ok) setSaved(false);
//     } catch (err) {
//       console.error("Error removing restaurant:", err);
//     }
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-md">
//       <h2 className="text-xl font-bold">{restaurant.name}</h2>
//       <p>{restaurant.address}</p>
//       <p>⭐ {restaurant.rating}</p>
//       {saved ? (
//         <button
//           onClick={removeRestaurant}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Remove
//         </button>
//       ) : (
//         <button
//           onClick={saveRestaurant}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Save
//         </button>
//       )}
//     </div>
//   );
// };

// export default RestaurantCard;