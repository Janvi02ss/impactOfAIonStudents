import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from '../ThemeContext';

interface ClickPulse {
  id: number;
  x: number;
  y: number;
}

export const RobotCompanion: React.FC = () => {
  const { robotCursor, theme, isSimulatedMobile } = useTheme();

  // Mouse & Position state
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [clickPulses, setClickPulses] = useState<ClickPulse[]>([]);
  const [tilt, setTilt] = useState(0);

  // References for smooth animation loop
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const prevPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);
  const scrollTimeout = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const pulseCounter = useRef(0);

  // Calculate scroll progress percentage
  const updateScrollProgress = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
      setScrollProgress(progress);
    }
  }, []);

  // Set up mouse and scroll listeners
  useEffect(() => {
    if (!robotCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('summary') ||
          target.classList.contains('cursor-pointer') ||
          window.getComputedStyle(target).cursor === 'pointer'
        );
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const newPulse: ClickPulse = {
        id: ++pulseCounter.current,
        x: e.clientX,
        y: e.clientY,
      };
      setClickPulses((prev) => [...prev.slice(-4), newPulse]);
      setTimeout(() => {
        setClickPulses((prev) => prev.filter((p) => p.id !== newPulse.id));
      }, 700);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleScroll = () => {
      updateScrollProgress();
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Temporary tilt boost when scrolling
      if (Math.abs(scrollDiff) > 1) {
        const scrollTilt = Math.max(-18, Math.min(18, scrollDiff * 0.45));
        setTilt(scrollTilt);
      }
    };

    // Touch event handlers for mobile devices & tablets
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetPos.current = { x: touch.clientX, y: touch.clientY };
        setIsVisible(true);
        setIsMouseDown(true);

        const newPulse: ClickPulse = {
          id: ++pulseCounter.current,
          x: touch.clientX,
          y: touch.clientY,
        };
        setClickPulses((prev) => [...prev.slice(-4), newPulse]);
        setTimeout(() => {
          setClickPulses((prev) => prev.filter((p) => p.id !== newPulse.id));
        }, 700);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetPos.current = { x: touch.clientX, y: touch.clientY };
        setIsScrolling(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = window.setTimeout(() => {
          setIsScrolling(false);
        }, 180);
      }
    };

    const handleTouchEnd = () => {
      setIsMouseDown(false);
      // Keep visible on touch device for a moment then fade out gently if idle
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    updateScrollProgress();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [robotCursor, isVisible, updateScrollProgress]);

  // Smooth position lerp & physics tilt animation loop
  useEffect(() => {
    if (!robotCursor) return;

    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      // Smooth lerp (0.22 creates snappy yet organic drone-like fluid tracking)
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      currentPos.current.x += dx * 0.22;
      currentPos.current.y += dy * 0.22;

      // Dynamic physics banking angle based on movement speed
      const vx = currentPos.current.x - prevPos.current.x;
      const targetTilt = Math.max(-20, Math.min(20, vx * 1.2));
      
      setPos({ x: currentPos.current.x, y: currentPos.current.y });
      setTilt((prev) => prev + (targetTilt - prev) * 0.15);

      prevPos.current = { x: currentPos.current.x, y: currentPos.current.y };

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [robotCursor]);

  if (!robotCursor || (!isVisible && pos.x === -100)) {
    return null;
  }

  // Calculate LED lights based on progress (0 to 4 dots)
  const ledLitCount = Math.min(4, Math.floor((scrollProgress / 100) * 4) + 1);

  return (
    <>
      {/* Click / Tap Energy Shockwave Rings */}
      {clickPulses.map((pulse) => (
        <div
          key={pulse.id}
          className="fixed pointer-events-none z-99999"
          style={{
            left: `${pulse.x}px`,
            top: `${pulse.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-[#C7F36B] bg-[#6C3BFF]/20 animate-wave-ring" />
          <div className="w-4 h-4 rounded-full bg-[#C7F36B]/60 animate-ping absolute inset-0 m-auto" />
        </div>
      ))}

      {/* Floating Robot Cursor Body */}
      <div
        id="robot-cursor-companion"
        aria-hidden="true"
        className="fixed pointer-events-none z-99999 transition-opacity duration-200 select-none will-change-transform"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          // Offset so the glowing antenna tip acts as the precise pointer coordinate
          transform: `translate(-12px, -6px) rotate(${tilt}deg) scale(${isMouseDown ? 0.9 : isHoveringClickable ? 1.15 : 1})`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="relative flex flex-col items-center">
          {/* Micro Precision Target Reticle (Click Hotspot under antenna tip) */}
          <div className="absolute top-[5px] left-[11px] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[#C7F36B] bg-[#24113F]/80 shadow-[0_0_6px_#C7F36B] flex items-center justify-center">
            <div className="w-0.5 h-0.5 bg-[#C7F36B] rounded-full" />
          </div>

          {/* Adorable Vector Robot SVG Mascot */}
          <svg
            width="44"
            height="48"
            viewBox="0 0 44 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md overflow-visible"
          >
            {/* Thruster Flames (Flickering Plasma Jets) */}
            <g className={`${isScrolling ? 'animate-thruster' : ''}`}>
              {/* Left Jet */}
              <path
                d="M15 39 C15 44, 17 47, 17 47 C17 47, 19 44, 19 39 Z"
                fill={isScrolling ? '#C7F36B' : '#6C3BFF'}
                opacity={isScrolling ? '0.95' : '0.7'}
                className="transition-colors duration-150"
              />
              <path
                d="M16 39 C16 42, 17 44, 17 44 C17 44, 18 42, 18 39 Z"
                fill="#FFFFFF"
                opacity="0.8"
              />
              {/* Right Jet */}
              <path
                d="M25 39 C25 44, 27 47, 27 47 C27 47, 29 44, 29 39 Z"
                fill={isScrolling ? '#C7F36B' : '#6C3BFF'}
                opacity={isScrolling ? '0.95' : '0.7'}
                className="transition-colors duration-150"
              />
              <path
                d="M26 39 C26 42, 27 44, 27 44 C27 44, 28 42, 28 39 Z"
                fill="#FFFFFF"
                opacity="0.8"
              />
            </g>

            {/* Jetpack Nozzles */}
            <rect x="14" y="36" width="6" height="4" rx="1.5" fill="#24113F" />
            <rect x="24" y="36" width="6" height="4" rx="1.5" fill="#24113F" />

            {/* Left Magnetic Hovering Hand */}
            <g
              style={{
                transform: `translate(${isHoveringClickable ? '-3px' : '0px'}, ${isScrolling ? '-1px' : '0px'}) rotate(${isHoveringClickable ? '-15deg' : '0deg'})`,
                transformOrigin: '7px 27px',
                transition: 'transform 0.15s ease',
              }}
            >
              <circle cx="6" cy="27" r="3.5" fill="#6C3BFF" stroke="#24113F" strokeWidth="1.2" />
              <circle cx="6" cy="27" r="1.2" fill="#C7F36B" />
            </g>

            {/* Right Magnetic Hovering Hand */}
            <g
              style={{
                transform: `translate(${isHoveringClickable ? '3px' : '0px'}, ${isScrolling ? '-1px' : '0px'}) rotate(${isHoveringClickable ? '15deg' : '0deg'})`,
                transformOrigin: '37px 27px',
                transition: 'transform 0.15s ease',
              }}
            >
              <circle cx="38" cy="27" r="3.5" fill="#6C3BFF" stroke="#24113F" strokeWidth="1.2" />
              <circle cx="38" cy="27" r="1.2" fill="#C7F36B" />
            </g>

            {/* Antenna with Pointer LED Beacon (Pointer Hotspot Tip) */}
            <path d="M14 13 L11 6" stroke="#24113F" strokeWidth="2" strokeLinecap="round" />
            {/* Glowing Pointer Sphere */}
            <circle
              cx="11"
              cy="5"
              r="3.2"
              fill={isHoveringClickable ? '#C7F36B' : '#6C3BFF'}
              stroke="#24113F"
              strokeWidth="1.2"
              className="animate-antenna-pulse"
            />
            <circle cx="10" cy="4" r="1" fill="#FFFFFF" />

            {/* Robot Chassis Body */}
            <rect
              x="12"
              y="26"
              width="20"
              height="12"
              rx="4"
              fill="#24113F"
              stroke={theme === 'dark' ? '#6C3BFF' : '#DCCEFF'}
              strokeWidth="1.2"
            />

            {/* Chest Energy Meter / Reading Depth LED Matrix */}
            <g transform="translate(14, 30)">
              {[0, 1, 2, 3].map((idx) => {
                const isLit = idx < ledLitCount;
                return (
                  <rect
                    key={idx}
                    x={idx * 4}
                    y="0"
                    width="2.6"
                    height="4"
                    rx="0.8"
                    fill={isLit ? '#C7F36B' : '#3D2266'}
                    opacity={isLit ? '1' : '0.4'}
                  />
                );
              })}
            </g>

            {/* Head Unit & Helmet */}
            <rect
              x="10"
              y="11"
              width="24"
              height="17"
              rx="6"
              fill="#24113F"
              stroke={theme === 'dark' ? '#6C3BFF' : '#DCCEFF'}
              strokeWidth="1.4"
            />

            {/* Curved Visor Screen Glass */}
            <rect
              x="13"
              y="14"
              width="18"
              height="11"
              rx="3.5"
              fill="#0F071D"
              stroke="#3D2266"
              strokeWidth="0.8"
            />

            {/* Glowing Digital Eyes (Expressions: Normal, Hover, Clicking) */}
            {isMouseDown ? (
              // Clicking: Wink/Squeeze expression (><)
              <g stroke="#C7F36B" strokeWidth="1.8" strokeLinecap="round">
                <path d="M16 18 L19 19.5 L16 21" />
                <path d="M28 18 L25 19.5 L28 21" />
              </g>
            ) : isHoveringClickable ? (
              // Hovering Clickable: Excited Happy Eyes (^^)
              <g stroke="#C7F36B" strokeWidth="2" strokeLinecap="round">
                <path d="M16 20 Q18 16.5 20 20" fill="none" />
                <path d="M24 20 Q26 16.5 28 20" fill="none" />
              </g>
            ) : isScrolling ? (
              // Scrolling: Wide Wind-Focus Eyes
              <g fill="#C7F36B">
                <circle cx="18" cy="19" r="2.2" />
                <circle cx="26" cy="19" r="2.2" />
                <circle cx="19" cy="18" r="0.8" fill="#FFFFFF" />
                <circle cx="27" cy="18" r="0.8" fill="#FFFFFF" />
              </g>
            ) : (
              // Normal Browsing: Friendly Glowing Cyan-Lime Oval Eyes
              <g fill="#C7F36B">
                <rect x="16.5" y="17" width="3" height="4.5" rx="1.5" />
                <rect x="24.5" y="17" width="3" height="4.5" rx="1.5" />
                {/* Catchlight reflection */}
                <circle cx="17.8" cy="18" r="0.8" fill="#FFFFFF" />
                <circle cx="25.8" cy="18" r="0.8" fill="#FFFFFF" />
              </g>
            )}

            {/* Glass Helmet Highlight */}
            <path
              d="M13 13 C16 12, 28 12, 31 13"
              stroke="#FFFFFF"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.35"
            />
          </svg>

          {/* Mini Scroll Progress Pill (Fades in when scrolling) */}
          <div
            className={`mt-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-mono-stat font-bold tracking-tight border shadow-xs transition-all duration-200 flex items-center space-x-1 ${
              isScrolling || isHoveringClickable
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-90 -translate-y-1'
            } ${
              theme === 'dark'
                ? 'bg-[#1A0D31]/95 text-[#C7F36B] border-[#6C3BFF]/50'
                : 'bg-[#24113F]/95 text-[#C7F36B] border-[#DCCEFF]/50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7F36B] animate-pulse" />
            <span>{isHoveringClickable ? 'CLICK' : `${scrollProgress}%`}</span>
          </div>
        </div>
      </div>
    </>
  );
};
