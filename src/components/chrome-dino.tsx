"use client";

import { useEffect, useRef, useState } from "react";
import dinoAssets from "@/lib/dino-assets.json";

interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
    type: "small" | "large";
    spriteX: number;
}

interface Cloud {
    x: number;
    y: number;
}

export function ChromeDino() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const trexImg = new Image();
        trexImg.src = dinoAssets["1x-trex"];

        const horizonImg = new Image();
        horizonImg.src = dinoAssets["1x-horizon"];

        const obstacleSmallImg = new Image();
        obstacleSmallImg.src = dinoAssets["1x-obstacle-small"];

        const obstacleLargeImg = new Image();
        obstacleLargeImg.src = dinoAssets["1x-obstacle-large"];

        const cloudImg = new Image();
        cloudImg.src = dinoAssets["1x-cloud"];

        const restartImg = new Image();
        restartImg.src = dinoAssets["1x-restart"];

        let jumpAudio: HTMLAudioElement | null = null;
        let hitAudio: HTMLAudioElement | null = null;
        let scoreAudio: HTMLAudioElement | null = null;
        try {
            jumpAudio = new Audio(dinoAssets["offline-sound-press"]);
            hitAudio = new Audio(dinoAssets["offline-sound-hit"]);
            scoreAudio = new Audio(dinoAssets["offline-sound-reached"]);
        } catch {}

        const playSound = (audio: HTMLAudioElement | null) => {
            if (!audio) return;
            try {
                audio.currentTime = 0;
                audio.play().catch(() => {});
            } catch {}
        };

        const GROUND_Y = 118;
        const DINO_WIDTH = 44;
        const DINO_HEIGHT = 47;
        const DINO_X = 24;
        const GRAVITY = 0.52;
        const JUMP_VELOCITY = -8.2;

        let width = container.clientWidth || 800;
        const height = 140;

        let dpr = window.devicePixelRatio || 1;
        const resizeCanvas = () => {
            if (!container || !canvas) return;
            width = container.clientWidth || 800;
            dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        };
        resizeCanvas();

        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });
        resizeObserver.observe(container);

        let gameState: "IDLE" | "RUNNING" | "CRASHED" = "IDLE";
        let dinoY = GROUND_Y - DINO_HEIGHT + 4;
        let dinoVy = 0;
        let isJumping = false;
        let animTimer = 0;
        let animFrame = 0;

        let horizonX = 0;
        let speed = 6;
        let distance = 0;
        let highScore = 0;
        let lastScoreMilestone = 0;

        let obstacles: Obstacle[] = [];
        let nextObstacleDistance = 0;
        let clouds: Cloud[] = [
            { x: width * 0.3, y: 20 },
            { x: width * 0.7, y: 35 },
        ];

        let animationFrameId: number;
        let lastTime = performance.now();

        const spawnObstacle = () => {
            const isLarge = Math.random() > 0.4;
            if (isLarge) {
                const count = Math.floor(Math.random() * 2) + 1;
                const w = count * 25;
                const h = 50;
                obstacles.push({
                    x: width + 20,
                    y: GROUND_Y - h + 4,
                    width: w,
                    height: h,
                    type: "large",
                    spriteX: (count - 1) * 25,
                });
            } else {
                const count = Math.floor(Math.random() * 3) + 1;
                const w = count * 17;
                const h = 35;
                obstacles.push({
                    x: width + 20,
                    y: GROUND_Y - h + 4,
                    width: w,
                    height: h,
                    type: "small",
                    spriteX: (count - 1) * 17,
                });
            }
            nextObstacleDistance = Math.floor(Math.random() * 200) + 250 + speed * 15;
        };

        const jump = () => {
            if (gameState === "IDLE") {
                gameState = "RUNNING";
                setIsStarted(true);
                dinoVy = JUMP_VELOCITY;
                isJumping = true;
                playSound(jumpAudio);
                return;
            }

            if (gameState === "CRASHED") {
                gameState = "RUNNING";
                dinoY = GROUND_Y - DINO_HEIGHT + 4;
                dinoVy = 0;
                isJumping = false;
                distance = 0;
                speed = 6;
                obstacles = [];
                nextObstacleDistance = 200;
                lastScoreMilestone = 0;
                return;
            }

            if (!isJumping) {
                dinoVy = JUMP_VELOCITY;
                isJumping = true;
                playSound(jumpAudio);
            }
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space" || e.code === "ArrowUp" || e.key === " " || e.key === "ArrowUp") {
                const rect = container.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    e.preventDefault();
                    jump();
                }
            }
        };

        const onClick = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            jump();
        };

        window.addEventListener("keydown", onKeyDown, { passive: false });
        canvas.addEventListener("click", onClick);
        canvas.addEventListener("touchstart", onClick, { passive: false });

        const loop = (currentTime: number) => {
            const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
            lastTime = currentTime;

            ctx.save();
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, width, height);

            if (gameState === "RUNNING") {
                speed = Math.min(6 + distance * 0.002, 13);
                distance += speed * dt * 8;

                const currentMilestone = Math.floor(distance / 100);
                if (currentMilestone > lastScoreMilestone) {
                    lastScoreMilestone = currentMilestone;
                    playSound(scoreAudio);
                }

                if (distance > highScore) {
                    highScore = Math.floor(distance);
                }

                horizonX = (horizonX + speed) % 1200;

                if (isJumping) {
                    dinoY += dinoVy;
                    dinoVy += GRAVITY;
                    if (dinoY >= GROUND_Y - DINO_HEIGHT + 4) {
                        dinoY = GROUND_Y - DINO_HEIGHT + 4;
                        dinoVy = 0;
                        isJumping = false;
                    }
                }

                animTimer += dt;
                if (animTimer > 0.08) {
                    animTimer = 0;
                    animFrame = animFrame === 0 ? 1 : 0;
                }

                nextObstacleDistance -= speed;
                if (nextObstacleDistance <= 0) {
                    spawnObstacle();
                }

                for (let i = obstacles.length - 1; i >= 0; i--) {
                    const obs = obstacles[i];
                    obs.x -= speed;

                    const dinoHitBox = {
                        left: DINO_X + 10,
                        right: DINO_X + DINO_WIDTH - 8,
                        top: dinoY + 6,
                        bottom: dinoY + DINO_HEIGHT - 2,
                    };
                    const obsHitBox = {
                        left: obs.x + 4,
                        right: obs.x + obs.width - 4,
                        top: obs.y + 4,
                        bottom: obs.y + obs.height,
                    };

                    if (
                        dinoHitBox.left < obsHitBox.right &&
                        dinoHitBox.right > obsHitBox.left &&
                        dinoHitBox.top < obsHitBox.bottom &&
                        dinoHitBox.bottom > obsHitBox.top
                    ) {
                        gameState = "CRASHED";
                        playSound(hitAudio);
                    }

                    if (obs.x + obs.width < -50) {
                        obstacles.splice(i, 1);
                    }
                }

                for (const cloud of clouds) {
                    cloud.x -= speed * 0.2;
                    if (cloud.x < -60) {
                        cloud.x = width + Math.random() * 100;
                        cloud.y = 15 + Math.random() * 30;
                    }
                }
            }

            for (const cloud of clouds) {
                if (cloudImg.complete) {
                    ctx.drawImage(cloudImg, cloud.x, cloud.y, 46, 14);
                }
            }

            if (horizonImg.complete) {
                for (let x = -horizonX; x < width + 1200; x += 1200) {
                    ctx.drawImage(horizonImg, x, GROUND_Y, 1200, 12);
                }
            }

            for (const obs of obstacles) {
                const img = obs.type === "large" ? obstacleLargeImg : obstacleSmallImg;
                if (img.complete) {
                    ctx.drawImage(img, obs.spriteX, 0, obs.width, obs.height, obs.x, obs.y, obs.width, obs.height);
                }
            }

            if (trexImg.complete) {
                let frameX = 44;
                if (gameState === "RUNNING") {
                    if (isJumping) {
                        frameX = 0;
                    } else {
                        frameX = animFrame === 0 ? 88 : 132;
                    }
                } else if (gameState === "CRASHED") {
                    frameX = 176;
                }

                ctx.drawImage(trexImg, frameX, 0, DINO_WIDTH, DINO_HEIGHT, DINO_X, dinoY, DINO_WIDTH, DINO_HEIGHT);
            }

            const currentScoreStr = String(Math.floor(distance)).padStart(5, "0");
            ctx.fillStyle = "#535353";
            ctx.font = "bold 12px monospace";
            ctx.textAlign = "center";

            if (highScore > 0) {
                const hiScoreStr = String(highScore).padStart(5, "0");
                ctx.fillText(`HI ${hiScoreStr}  ${currentScoreStr}`, width / 2, 25);
            } else {
                ctx.fillText(currentScoreStr, width / 2, 25);
            }

            if (gameState === "CRASHED" && restartImg.complete) {
                ctx.drawImage(restartImg, width / 2 - 18, 45, 36, 32);
            }

            ctx.restore();
            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            window.removeEventListener("keydown", onKeyDown);
            canvas.removeEventListener("click", onClick);
            canvas.removeEventListener("touchstart", onClick);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full relative h-[140px] select-none cursor-pointer">
            <canvas ref={canvasRef} className="w-full h-[140px] block dino-canvas" />
            {!isStarted && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-neutral-400 opacity-60 pointer-events-none hidden sm:block">
                    Press Space / Click to play
                </div>
            )}
        </div>
    );
}
