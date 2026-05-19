/**
 * Gym Mingle Type Definitions
 * Complete TypeScript types for the Tinder-style matching platform
 */

export type SpicyTier = "Vanilla" | "Adventurous" | "Spicy" | "Extra Spicy";

export interface FitnessActivity {
  name: string;
  icon: string;
}

export interface UserProfile {
  id: number;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  bio: string;
  motto: string;
  matchScore: number;
  fitnessActivities: FitnessActivity[];
  cuisinePreference: string;
  dateVibe: string;
  spicyTier: SpicyTier;
}

export interface VenueCategory {
  name: string;
  icon: string;
  venues: Venue[];
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  description: string;
  icon: string;
}

export interface DateStage {
  stage: 1 | 2 | 3;
  title: string;
  icon: string;
  description: string;
  categoryType: "fitness" | "relaxation" | "dining";
}

export interface DateItinerary {
  id: string;
  title: string;
  matchedWith: string;
  stages: {
    stage: 1 | 2 | 3;
    venue: Venue;
    startTime: string;
    duration: number;
  }[];
}

export interface MatchEvent {
  userId: number;
  userName: string;
  timestamp: Date;
  itinerary?: DateItinerary;
}

export interface SwipeAction {
  type: "like" | "pass";
  profileId: number;
  direction: "left" | "right";
}
