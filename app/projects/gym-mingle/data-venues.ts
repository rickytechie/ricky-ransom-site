/**
 * NYC Venues Data
 * Real NYC small businesses across 5 key categories for the date generator
 */

import { VenueCategory } from "./types";

export const nycVenues: VenueCategory[] = [
  {
    name: "Gyms & Fitness",
    icon: "🏋️",
    venues: [
      {
        id: "gym-1",
        name: "Chelsea Piers",
        address: "62 Chelsea Piers, New York, NY 10011",
        neighborhood: "Chelsea",
        description: "Premier waterfront sports complex with rock climbing, basketball, swimming pools, and full gym facilities.",
        icon: "🧗‍♀️",
      },
      {
        id: "gym-2",
        name: "Equinox Hudson Yards",
        address: "10 Hudson Yards, New York, NY 10001",
        neighborhood: "Hudson Yards",
        description: "Luxury fitness destination with rooftop pool, multiple studios, and world-class trainers.",
        icon: "🏊",
      },
      {
        id: "gym-3",
        name: "Brooklyn Boulders",
        address: "575 Degraw St, Brooklyn, NY 11217",
        neighborhood: "Gowanus",
        description: "Urban climbing gym with bouldering walls, rope climbing, and vibrant community.",
        icon: "🧗",
      },
      {
        id: "gym-4",
        name: "Barry's Bootcamp",
        address: "628 Broadway, New York, NY 10012",
        neighborhood: "SoHo",
        description: "Iconic high-intensity interval training studio with iconic red rooms and results-driven workouts.",
        icon: "🔥",
      },
      {
        id: "gym-5",
        name: "Rumble Boxing",
        address: "461 Amsterdam Ave, New York, NY 10024",
        neighborhood: "Upper West Side",
        description: "Boxing-inspired fitness studio with heavy bags, cardio circuits, and knockout energy.",
        icon: "🥊",
      },
    ],
  },
  {
    name: "Shops & Boutiques",
    icon: "🛍️",
    venues: [
      {
        id: "shop-1",
        name: "Kith NYC",
        address: "91 Greene St, New York, NY 10012",
        neighborhood: "SoHo",
        description: "Premium streetwear and lifestyle boutique featuring exclusive sneaker releases and designer collaborations.",
        icon: "👟",
      },
      {
        id: "shop-2",
        name: "Dover Street Market",
        address: "160 Lexington Ave, New York, NY 10016",
        neighborhood: "Flatiron",
        description: "Multi-level curated shopping experience showcasing avant-garde fashion and lifestyle brands.",
        icon: "👗",
      },
      {
        id: "shop-3",
        name: "Atelier Cph",
        address: "83 Mercer St, New York, NY 10012",
        neighborhood: "SoHo",
        description: "Scandinavian design boutique featuring minimalist fashion and sustainable lifestyle products.",
        icon: "🛍️",
      },
      {
        id: "shop-4",
        name: "Nike Flagship",
        address: "529 Broadway, New York, NY 10012",
        neighborhood: "SoHo",
        description: "Massive Nike temple featuring limited releases, customization services, and athletic innovation.",
        icon: "✓",
      },
      {
        id: "shop-5",
        name: "Lululemon NYC",
        address: "420 Broadway, New York, NY 10013",
        neighborhood: "Tribeca",
        description: "Premium athletic apparel with expert fitting and exclusive community events.",
        icon: "⚪",
      },
    ],
  },
  {
    name: "Spas & Relaxation",
    icon: "🧖",
    venues: [
      {
        id: "spa-1",
        name: "Aire Ancient Baths",
        address: "307 Spring St, New York, NY 10013",
        neighborhood: "SoHo",
        description: "Ancient bathing rituals in a luxurious soho setting with pools, saunas, and massage treatments.",
        icon: "🛁",
      },
      {
        id: "spa-2",
        name: "QC NY Spa Governor's Island",
        address: "1 Governors Island, New York, NY 10004",
        neighborhood: "Governors Island",
        description: "Luxury spa sanctuary featuring thermal baths, saunas, ice rooms, and waterfront relaxation.",
        icon: "🧖‍♀️",
      },
      {
        id: "spa-3",
        name: "Sanctuary Spa SoHo",
        address: "119 Mercer St, New York, NY 10012",
        neighborhood: "SoHo",
        description: "Full-service spa with massage, facials, and wellness treatments in a tranquil SoHo setting.",
        icon: "💆",
      },
      {
        id: "spa-4",
        name: "Attune Healing",
        address: "69 Franklin St, New York, NY 10013",
        neighborhood: "TriBeCa",
        description: "Holistic wellness center with acupuncture, massage, and recovery therapies.",
        icon: "🕉️",
      },
      {
        id: "spa-5",
        name: "Karmaling",
        address: "88 Mercer St, New York, NY 10012",
        neighborhood: "SoHo",
        description: "Wellness retreat offering massage, facials, and beauty treatments with Tibetan philosophy.",
        icon: "✨",
      },
    ],
  },
  {
    name: "Parks & Pools",
    icon: "🌳",
    venues: [
      {
        id: "park-1",
        name: "Central Park Sheep Meadow",
        address: "Central Park, West 66th St, New York, NY 10023",
        neighborhood: "Midtown West",
        description: "Iconic 15-acre meadow perfect for picnics, yoga, outdoor games, and sunset relaxation.",
        icon: "🌾",
      },
      {
        id: "park-2",
        name: "McCarren Park Pool",
        address: "776 Lorimer St, Brooklyn, NY 11211",
        neighborhood: "Williamsburg",
        description: "Historic NYC public pool with Olympic-sized lap and shallow pools, community events year-round.",
        icon: "🏊",
      },
      {
        id: "park-3",
        name: "Astoria Park Pool",
        address: "19-04 Shore Blvd, Queens, NY 11369",
        neighborhood: "Astoria",
        description: "Stunning 1930s pool with Olympic dimensions, diving boards, and waterfront views of Manhattan.",
        icon: "💦",
      },
      {
        id: "park-4",
        name: "Hudson River Greenway",
        address: "Riverside Park, New York, NY 10023",
        neighborhood: "Upper West Side",
        description: "12-mile waterfront park perfect for jogging, cycling, and waterfront leisure activities.",
        icon: "🚴",
      },
      {
        id: "park-5",
        name: "Prospect Park",
        address: "Multiple Entries, Brooklyn, NY 11215",
        neighborhood: "Park Slope",
        description: "585-acre urban oasis with hiking trails, lakes, sports fields, and scenic viewpoints.",
        icon: "🏞️",
      },
    ],
  },
  {
    name: "Skate Parks",
    icon: "🛹",
    venues: [
      {
        id: "skate-1",
        name: "LES Coleman Skatepark",
        address: "2 Delancey St, New York, NY 10002",
        neighborhood: "Lower East Side",
        description: "Legendary street spot with street plaza, rails, ledges, and NYC skate culture at its core.",
        icon: "🛹",
      },
      {
        id: "skate-2",
        name: "Pier 62 Skatepark",
        address: "Pier 62, Chelsea Waterfront, New York, NY 10011",
        neighborhood: "Chelsea",
        description: "Modern waterfront skate plaza with bowls, street course, and Hudson River views.",
        icon: "🌊",
      },
      {
        id: "skate-3",
        name: "Blading Alley Brooklyn",
        address: "5 Oak St, Brooklyn, NY 11201",
        neighborhood: "DUMBO",
        description: "Indoor skating rink and community space for roller skating and skateboarding.",
        icon: "🛼",
      },
      {
        id: "skate-4",
        name: "Tompkins Square Park Skate Spot",
        address: "101 Avenue A, New York, NY 10009",
        neighborhood: "East Village",
        description: "Historic community park with DIY skate spots and vibrant street culture.",
        icon: "🎨",
      },
      {
        id: "skate-5",
        name: "Astoria Park Skate Area",
        address: "Astoria Park, Queens, NY 11369",
        neighborhood: "Astoria",
        description: "Queens skating destination with smooth asphalt and community skate sessions.",
        icon: "✨",
      },
    ],
  },
];

/**
 * Helper function to get a random venue from a specific category
 */
export function getRandomVenueFromCategory(categoryName: string): any {
  const category = nycVenues.find((c) => c.name === categoryName);
  if (!category) return null;
  return category.venues[Math.floor(Math.random() * category.venues.length)];
}

/**
 * Helper function to generate a random itinerary
 */
export function generateRandomItinerary() {
  const fitnessVenue = getRandomVenueFromCategory("Gyms & Fitness");
  const relaxationVenues = [
    getRandomVenueFromCategory("Spas & Relaxation"),
    getRandomVenueFromCategory("Parks & Pools"),
  ];
  const relaxationVenue = relaxationVenues[Math.floor(Math.random() * relaxationVenues.length)];

  // For dining, we'll use placeholder restaurants (can be expanded)
  const diningVenues = [
    {
      id: "rest-1",
      name: "Carbone",
      address: "181 Thompson St, New York, NY 10012",
      neighborhood: "Greenwich Village",
      description: "Italian fine dining hotspot with celebrity clientele and world-class cuisine.",
      icon: "🍝",
    },
    {
      id: "rest-2",
      name: "Cote",
      address: "16 Beaver St, New York, NY 10004",
      neighborhood: "Financial District",
      description: "Korean steakhouse experience with premium beef and theatrical dining.",
      icon: "🥩",
    },
    {
      id: "rest-3",
      name: "Eleven Madison Park",
      address: "11 Madison Ave, New York, NY 10010",
      neighborhood: "Flatiron",
      description: "Michelin-starred fine dining with innovative American cuisine.",
      icon: "⭐",
    },
  ];
  const diningVenue = diningVenues[Math.floor(Math.random() * diningVenues.length)];

  return {
    fitness: fitnessVenue,
    relaxation: relaxationVenue,
    dining: diningVenue,
  };
}
