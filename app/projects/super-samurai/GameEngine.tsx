"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  GameState,
  Player,
  Enemy,
  Platform,
  Collectible,
  GameLevel,
  GameConfig,
} from "./types";

const GAME_CONFIG: GameConfig = {
  canvasWidth: 800,
  canvasHeight: 600,
  gravity: 0.6,
  friction: 0.85,
  moveSpeed: 5,
  jumpForce: 12,
};

// Level Design
const LEVEL: GameLevel = {
  platforms: [
    // Ground
    { x: 0, y: 550, width: 800, height: 50, type: "normal", breakable: false, broken: false },
    // First platforms
    { x: 100, y: 480, width: 120, height: 20, type: "normal", breakable: false, broken: false },
    { x: 280, y: 420, width: 120, height: 20, type: "normal", breakable: false, broken: false },
    { x: 460, y: 380, width: 120, height: 20, type: "normal", breakable: false, broken: false },
    { x: 600, y: 450, width: 150, height: 20, type: "normal", breakable: false, broken: false },
    // Second tier
    { x: 150, y: 350, width: 100, height: 20, type: "normal", breakable: false, broken: false },
    { x: 350, y: 280, width: 140, height: 20, type: "normal", breakable: false, broken: false },
    { x: 550, y: 320, width: 120, height: 20, type: "normal", breakable: false, broken: false },
    // Top tier
    { x: 200, y: 220, width: 100, height: 20, type: "normal", breakable: false, broken: false },
    { x: 450, y: 150, width: 150, height: 20, type: "normal", breakable: false, broken: false },
    // Victory platform
    { x: 650, y: 100, width: 100, height: 20, type: "normal", breakable: false, broken: false },
  ],
  enemies: [
    {
      id: "ashigaru-1",
      x: 350,
      y: 425,
      width: 30,
      height: 40,
      velocityX: 0,
      velocityY: 0,
      isGrounded: false,
      direction: "right",
      health: 1,
      patrolMin: 280,
      patrolMax: 430,
      detectionRange: 200,
      moveSpeed: 2,
      attacked: false,
    },
    {
      id: "ashigaru-2",
      x: 550,
      y: 385,
      width: 30,
      height: 40,
      velocityX: 0,
      velocityY: 0,
      isGrounded: false,
      direction: "left",
      health: 1,
      patrolMin: 450,
      patrolMax: 650,
      detectionRange: 180,
      moveSpeed: 2,
      attacked: false,
    },
    {
      id: "ashigaru-3",
      x: 400,
      y: 285,
      width: 30,
      height: 40,
      velocityX: 0,
      velocityY: 0,
      isGrounded: false,
      direction: "right",
      health: 1,
      patrolMin: 350,
      patrolMax: 550,
      detectionRange: 200,
      moveSpeed: 2,
      attacked: false,
    },
  ],
  collectibles: [
    { id: "coin-1", x: 130, y: 450, width: 15, height: 15, collected: false, type: "coin", value: 10 },
    { id: "coin-2", x: 310, y: 390, width: 15, height: 15, collected: false, type: "coin", value: 10 },
    { id: "crest-1", x: 490, y: 350, width: 18, height: 18, collected: false, type: "crest", value: 50 },
    { id: "coin-3", x: 630, y: 420, width: 15, height: 15, collected: false, type: "coin", value: 10 },
    { id: "coin-4", x: 180, y: 320, width: 15, height: 15, collected: false, type: "coin", value: 10 },
    { id: "crest-2", x: 480, y: 120, width: 18, height: 18, collected: false, type: "crest", value: 50 },
  ],
  playerStart: { x: 50, y: 480 },
  victoryZone: { x: 650, y: 50, width: 100, height: 100 },
};

interface GameEngineProps {
  onStateChange?: (state: GameState) => void;
  onScoreChange?: (score: number) => void;
  onHealthChange?: (health: number) => void;
}

export function GameEngine({ onStateChange, onScoreChange, onHealthChange }: GameEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("menu");
  const [score, setScore] = useState(0);

  // Game state refs (persist across renders)
  const gameStateRef = useRef<GameState>("menu");
  const playerRef = useRef<Player>({
    x: LEVEL.playerStart.x,
    y: LEVEL.playerStart.y,
    width: 25,
    height: 35,
    velocityX: 0,
    velocityY: 0,
    isGrounded: false,
    isJumping: false,
    direction: "right",
    health: 3,
    isAttacking: false,
    attackCooldown: 0,
    attackHitboxActive: false,
  });

  const scoreRef = useRef(0);
  const enemiesRef = useRef<Enemy[]>(JSON.parse(JSON.stringify(LEVEL.enemies)));
  const collectiblesRef = useRef<Collectible[]>(JSON.parse(JSON.stringify(LEVEL.collectibles)));
  const keysRef = useRef<Record<string, boolean>>({});
  const gameLoopRef = useRef<number | null>(null);

  // Input handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;

      if (e.key === " " || e.key.toLowerCase() === "w") {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Collision detection utility
  const checkCollision = (rect1: any, rect2: any): boolean => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  // Physics & Game Logic
  const updateGame = () => {
    const player = playerRef.current;
    const { canvasHeight, gravity, friction, moveSpeed, jumpForce } = GAME_CONFIG;

    // --- PLAYER MOVEMENT ---
    player.velocityX *= friction;
    if (keysRef.current["arrowleft"] || keysRef.current["a"]) {
      player.velocityX = -moveSpeed;
      player.direction = "left";
    }
    if (keysRef.current["arrowright"] || keysRef.current["d"]) {
      player.velocityX = moveSpeed;
      player.direction = "right";
    }

    // --- JUMP ---
    if ((keysRef.current[" "] || keysRef.current["w"]) && player.isGrounded) {
      player.velocityY = -jumpForce;
      player.isJumping = true;
      player.isGrounded = false;
    }

    // --- ATTACK ---
    if ((keysRef.current["f"] || keysRef.current["click"]) && player.attackCooldown === 0) {
      player.isAttacking = true;
      player.attackCooldown = 15;
      player.attackHitboxActive = true;
    }

    // Update attack cooldown
    if (player.attackCooldown > 0) {
      player.attackCooldown--;
      if (player.attackCooldown < 10) {
        player.attackHitboxActive = false;
      }
    }

    // --- GRAVITY ---
    player.velocityY += gravity;
    player.y += player.velocityY;
    player.x += player.velocityX;

    // --- COLLISION WITH PLATFORMS ---
    player.isGrounded = false;
    for (const platform of LEVEL.platforms) {
      if (!platform.broken) {
        if (
          player.x < platform.x + platform.width &&
          player.x + player.width > platform.x &&
          player.y + player.height >= platform.y &&
          player.y + player.height <= platform.y + platform.height + 8 &&
          player.velocityY >= 0
        ) {
          player.y = platform.y - player.height;
          player.velocityY = 0;
          player.isGrounded = true;
          player.isJumping = false;
        }
      }
    }

    // --- BOUNDARY COLLISIONS ---
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > GAME_CONFIG.canvasWidth)
      player.x = GAME_CONFIG.canvasWidth - player.width;
    if (player.y > canvasHeight) {
      // Death
      playerRef.current.health--;
      if (playerRef.current.health <= 0) {
        gameStateRef.current = "gameOver";
      } else {
        player.x = LEVEL.playerStart.x;
        player.y = LEVEL.playerStart.y;
        player.velocityX = 0;
        player.velocityY = 0;
      }
    }

    // --- ENEMY AI & PHYSICS ---
    for (const enemy of enemiesRef.current) {
      if (enemy.health <= 0) continue;

      // Gravity
      enemy.velocityY += gravity;
      enemy.y += enemy.velocityY;
      enemy.x += enemy.velocityX;

      // Collision with platforms
      enemy.isGrounded = false;
      for (const platform of LEVEL.platforms) {
        if (!platform.broken && checkCollision(enemy, platform)) {
          if (player.velocityY >= 0) {
            enemy.y = platform.y - enemy.height;
            enemy.velocityY = 0;
            enemy.isGrounded = true;
          }
        }
      }

      // Patrol AI
      if (Math.abs(player.x - enemy.x) < enemy.detectionRange) {
        // Chase player
        enemy.velocityX = (player.x > enemy.x ? 1 : -1) * enemy.moveSpeed;
        enemy.direction = player.x > enemy.x ? "right" : "left";
      } else {
        // Patrol
        if (enemy.x <= enemy.patrolMin) {
          enemy.direction = "right";
        } else if (enemy.x >= enemy.patrolMax) {
          enemy.direction = "left";
        }
        enemy.velocityX = (enemy.direction === "right" ? 1 : -1) * (enemy.moveSpeed * 0.7);
      }

      // Enemy-player collision (damage)
      if (checkCollision(player, enemy) && !enemy.attacked) {
        if (!player.isAttacking) {
          player.health--;
          enemy.attacked = true;
          if (player.health <= 0) {
            gameStateRef.current = "gameOver";
          }
        }
      } else if (!checkCollision(player, enemy)) {
        enemy.attacked = false;
      }

      // Boundary
      if (enemy.x < 0 || enemy.x + enemy.width > GAME_CONFIG.canvasWidth) {
        enemy.x = enemy.x < 0 ? 0 : GAME_CONFIG.canvasWidth - enemy.width;
      }
    }

    // --- ATTACK HITBOX ---
    if (player.attackHitboxActive) {
      const attackRange = 40;
      const attackHitbox = {
        x: player.direction === "right" ? player.x + player.width : player.x - attackRange,
        y: player.y,
        width: attackRange,
        height: player.height,
      };

      for (const enemy of enemiesRef.current) {
        if (enemy.health > 0 && checkCollision(attackHitbox, enemy)) {
          enemy.health--;
        }
      }
    }

    // --- COLLECTIBLES ---
    for (const collectible of collectiblesRef.current) {
      if (!collectible.collected && checkCollision(player, collectible)) {
        collectible.collected = true;
        scoreRef.current += collectible.value;
      }
    }

    // --- VICTORY CHECK ---
    if (checkCollision(player, LEVEL.victoryZone)) {
      gameStateRef.current = "victory";
    }

    // Update React state
    setGameState(gameStateRef.current);
    setScore(scoreRef.current);
    onScoreChange?.(scoreRef.current);
    onHealthChange?.(playerRef.current.health);
  };

  // Rendering
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#1a0f2e";
    ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight);

    // Grid background
    ctx.strokeStyle = "rgba(147, 51, 234, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GAME_CONFIG.canvasWidth; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, GAME_CONFIG.canvasHeight);
      ctx.stroke();
    }
    for (let i = 0; i <= GAME_CONFIG.canvasHeight; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(GAME_CONFIG.canvasWidth, i);
      ctx.stroke();
    }

    // Draw platforms
    for (const platform of LEVEL.platforms) {
      if (!platform.broken) {
        ctx.fillStyle = platform.type === "moving" ? "#ff6b6b" : "#2d5a2d";
        ctx.strokeStyle = "#52b788";
        ctx.lineWidth = 2;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
      }
    }

    // Draw victory zone
    ctx.fillStyle = "rgba(255, 215, 0, 0.3)";
    ctx.fillRect(LEVEL.victoryZone.x, LEVEL.victoryZone.y, LEVEL.victoryZone.width, LEVEL.victoryZone.height);
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 3;
    ctx.strokeRect(LEVEL.victoryZone.x, LEVEL.victoryZone.y, LEVEL.victoryZone.width, LEVEL.victoryZone.height);
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("PRINCESS", LEVEL.victoryZone.x + LEVEL.victoryZone.width / 2, LEVEL.victoryZone.y + 30);

    // Draw collectibles
    for (const collectible of collectiblesRef.current) {
      if (!collectible.collected) {
        if (collectible.type === "coin") {
          ctx.fillStyle = "#ffd700";
          ctx.beginPath();
          ctx.arc(collectible.x + 7.5, collectible.y + 7.5, 7.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ffed4e";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Crest
          ctx.fillStyle = "#ff6b9d";
          ctx.beginPath();
          ctx.moveTo(collectible.x + 9, collectible.y);
          ctx.lineTo(collectible.x + 18, collectible.y + 9);
          ctx.lineTo(collectible.x + 13.5, collectible.y + 13.5);
          ctx.lineTo(collectible.x + 18, collectible.y + 18);
          ctx.lineTo(collectible.x + 9, collectible.y + 9);
          ctx.lineTo(collectible.x, collectible.y + 18);
          ctx.lineTo(collectible.x + 4.5, collectible.y + 13.5);
          ctx.lineTo(collectible.x, collectible.y + 9);
          ctx.closePath();
          ctx.fill();
        }
      }
    }

    // Draw enemies
    for (const enemy of enemiesRef.current) {
      if (enemy.health > 0) {
        ctx.fillStyle = "#c92a2a";
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        // Enemy helmet
        ctx.fillStyle = "#862e2e";
        ctx.fillRect(enemy.x + 4, enemy.y, enemy.width - 8, 10);
        // Eyes
        ctx.fillStyle = "#fff";
        ctx.fillRect(enemy.x + 6, enemy.y + 2, 4, 4);
        ctx.fillRect(enemy.x + 14, enemy.y + 2, 4, 4);
      }
    }

    // Draw player (Rai the Samurai)
    const player = playerRef.current;
    const scale = player.direction === "left" ? -1 : 1;
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y);
    ctx.scale(scale, 1);

    // Body
    ctx.fillStyle = "#1a472a";
    ctx.fillRect(-12, 10, 24, 18);

    // Head
    ctx.fillStyle = "#d4a574";
    ctx.beginPath();
    ctx.arc(0, 5, 6, 0, Math.PI * 2);
    ctx.fill();

    // Helmet top
    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(-8, -2, 16, 6);

    // Katana (when attacking)
    if (player.isAttacking) {
      ctx.strokeStyle = "#c0c0c0";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(12, 5);
      ctx.lineTo(35, -15);
      ctx.stroke();
    }

    ctx.restore();

    // Draw attack hitbox (debug)
    if (player.attackHitboxActive) {
      ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
      ctx.lineWidth = 2;
      const attackRange = 40;
      const attackX = player.direction === "right" ? player.x + player.width : player.x - attackRange;
      ctx.strokeRect(attackX, player.y, attackRange, player.height);
    }
  };

  // Game loop
  useEffect(() => {
    let isRunning = true;

    const gameLoop = () => {
      if (!isRunning) return;

      if (gameStateRef.current === "playing") {
        updateGame();
      }

      renderGame();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    if (gameStateRef.current === "playing") {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      isRunning = false;
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState]);

  // Start game
  const startGame = () => {
    gameStateRef.current = "playing";
    playerRef.current = {
      x: LEVEL.playerStart.x,
      y: LEVEL.playerStart.y,
      width: 25,
      height: 35,
      velocityX: 0,
      velocityY: 0,
      isGrounded: false,
      isJumping: false,
      direction: "right",
      health: 3,
      isAttacking: false,
      attackCooldown: 0,
      attackHitboxActive: false,
    };
    scoreRef.current = 0;
    enemiesRef.current = JSON.parse(JSON.stringify(LEVEL.enemies));
    collectiblesRef.current = JSON.parse(JSON.stringify(LEVEL.collectibles));
    setGameState("playing");
    setScore(0);
  };

  // Reset game
  const resetGame = () => {
    startGame();
  };

  // Handle mouse click for attack
  useEffect(() => {
    const handleMouseDown = () => {
      keysRef.current["click"] = true;
    };
    const handleMouseUp = () => {
      keysRef.current["click"] = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <canvas
        ref={canvasRef}
        width={GAME_CONFIG.canvasWidth}
        height={GAME_CONFIG.canvasHeight}
        className="border-4 border-violet-500 rounded-lg bg-black shadow-2xl shadow-violet-500/50"
      />

      {gameState === "menu" && (
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Ready to Start?</h2>
          <button
            onClick={startGame}
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition"
          >
            🎮 Start Game
          </button>
        </div>
      )}

      {gameState === "gameOver" && (
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-red-500">GAME OVER</h2>
          <p className="text-white text-lg">Final Score: {score}</p>
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {gameState === "victory" && (
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-yellow-400">VICTORY!</h2>
          <p className="text-white text-xl">You saved the Princess!</p>
          <p className="text-white text-lg">Final Score: {score}</p>
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
