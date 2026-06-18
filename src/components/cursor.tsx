"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {

    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        const elasticCursor = cursorRef.current;
        if (!elasticCursor) return;
        
        const getScale = (diffX: number, diffY: number) => {
            const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
            return Math.min(distance / 100, 0.25);
        };
        
        const getAngle = (diffX: number, diffY: number) => {
            return (Math.atan2(diffY, diffX) * 180) / Math.PI;
        };
        
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const vel = { x: 0, y: 0 };
        const targetPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        let isHoveringClickable = false;
        let isFirstMove = true;
        
        const setX = gsap.quickSetter(elasticCursor, "x", "px");
        const setY = gsap.quickSetter(elasticCursor, "y", "px");
        const setRotation = gsap.quickSetter(elasticCursor, "rotate", "deg");
        const setScaleX = gsap.quickSetter(elasticCursor, "scaleX");
        const setScaleY = gsap.quickSetter(elasticCursor, "scaleY");
        
        gsap.set(elasticCursor, { xPercent: -50, yPercent: -50, opacity: 0 });
        
        const update = () => {
            const rotation = getAngle(vel.x, vel.y);
            const scale = getScale(vel.x, vel.y);
            setX(pos.x);
            setY(pos.y);
            setRotation(rotation);
            if (!isHoveringClickable) {
                setScaleX(1 + scale);
                setScaleY(1 - scale);
            }
        };
        
        let rafId: number;

        const animate = () => {
            const speed = 0.25;
            pos.x += (targetPos.x - pos.x) * speed;
            pos.y += (targetPos.y - pos.y) * speed;
            vel.x = targetPos.x - pos.x;
            vel.y = targetPos.y - pos.y;
            update();
            rafId = requestAnimationFrame(animate);
        };

        const onMouseMove = (e: MouseEvent) => {
            if (isFirstMove) {
                isFirstMove = false;
                gsap.to(elasticCursor, { opacity: 1, duration: 0.3 });
            }
            targetPos.x = e.clientX;
            targetPos.y = e.clientY;
        };

        const handleCursorHover = (isHovering: boolean) => {
            isHoveringClickable = isHovering;
            gsap.to(elasticCursor, {
                scale: isHovering ? 0.5 : 1,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target && target.closest("a, button, [role='button'], input, textarea, select")) {
                handleCursorHover(true);
            } else {
                handleCursorHover(false);
            }
        };

        const hideCursor = () => {
            gsap.to(elasticCursor, { opacity: 0, duration: 0.4, ease: "power2.out" });
        };

        const showCursor = () => {
            gsap.to(elasticCursor, { opacity: 1, duration: 0.4, ease: "power2.out" });
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseleave", hideCursor);
        document.addEventListener("mouseenter", showCursor);

        const iframes = document.querySelectorAll("iframe");
        iframes.forEach((iframe) => {
            iframe.addEventListener("mouseenter", hideCursor);
            iframe.addEventListener("mouseleave", showCursor);
        });

        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseleave", hideCursor);
            document.removeEventListener("mouseenter", showCursor);
            cancelAnimationFrame(rafId);
            iframes.forEach((iframe) => {
                iframe.removeEventListener("mouseenter", hideCursor);
                iframe.removeEventListener("mouseleave", showCursor);
            });
        };

    }, []);

    return (
        <div ref={cursorRef} className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference pointer-device-only will-change-transform" />
    );
}
