

// const horaires = [
//   ["Lundi - Vendredi", "9h - 18h"],
//   ["Samedi", "10h - 16h"],
//   ["Dimanche", "Fermé"],
// ];

// export default function HorairesCard() {
//   return (
//     <div className="bg-gradient-to-br from-violet-700 to-blue-700 rounded-xl p-5">
//       <h3 className="font-bold text-white mb-4">Horaires d'ouverture</h3>
//       {horaires.map(([jour, heure]) => (
//         <div key={jour} className="flex justify-between text-sm text-violet-100 mb-2">
//           {/* span c'est une balise qui permet de créer un conteneur inline */}
//           <span>{jour}</span>
//           <span className="font-medium">{heure}</span>
//         </div>
//       ))}
//     </div>
//   );
// }