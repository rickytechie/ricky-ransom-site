/**
 * Super Samurai Game Type Definitions
 * Complete TypeScript types for the 2D platformer game engine
 */

export type GameState = "menu" | "playing" | "paused" | "gameOver" | "victory";
export type Direction = "left" | "right";

export interface Vector2 {
  x: number;
  y: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Player Entity
export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  isGrounded: boolean;
  isJumping: boolean;
  direction: Direction;
  health: number;
  isAttacking: boolean;
  attackCooldown: number;
  attackHitboxActive: boolean;
}

// Enemy Entity
export interface Enemy {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  isGrounded: boolean;
  direction: Direction;
  health: number;
  patrolMin: number;
  patrolMax: number;
  detectionRange: number;
  moveSpeed: number;
  attacked: boolean;
}

// Platform Entity
export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "normal" | "breakable" | "moving";
  breakable: boolean;
  broken: boolean;
}

// Collectible Entity
export interface Collectible {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  collected: boolean;
  type: "coin" | "crest";
  value: number;
}

// Game Level
export interface GameLevel {
  platforms: Platform[];
  enemies: Enemy[];
  collectibles: Collectible[];
  playerStart: Vector2;
  victoryZone: Rectangle;
}

// Game Config
export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  gravity: number;
  friction: number;
  moveSpeed: number;
  jumpForce: number;
}
