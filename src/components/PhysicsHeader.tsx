import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { HERO_PHYSICS_ITEMS } from '../constants';


interface PhysicsHeaderProps {
  isDarkMode: boolean;
}

const PhysicsHeader: React.FC<PhysicsHeaderProps> = ({ isDarkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);
  const requestRef = useRef<number | undefined>(undefined);
  // Ref to store pointer down position for click/tap detection
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  // Refs for static bodies to update them later
  const wallsRef = useRef<{ ground: Matter.Body; leftWall: Matter.Body; rightWall: Matter.Body } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Engine setup
    const Engine = Matter.Engine,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create({
      gravity: { x: 0, y: 1 },
      enableSleeping: false,
    });
    engineRef.current = engine;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // --- Static Bodies Setup ---
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
      friction: 1.0,
      restitution: 0
    };

    // Initial placeholder values, will be updated by updateWalls immediately
    const offset = 100; // Thickness
    const ground = Bodies.rectangle(width / 2, height + offset, width, offset, wallOptions);
    const leftWall = Bodies.rectangle(-offset, height / 2, offset, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + offset, height / 2, offset, height * 2, wallOptions);

    wallsRef.current = { ground, leftWall, rightWall };

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // --- makeBodies Logic ---
    setTimeout(() => {
      // Re-measure to ensure precise spawn location relative to text
      const textContainer = document.getElementById('hero-text-container');
      const textElement = textContainer?.querySelector('h1');

      // Force update walls before spawning to ensure boundaries are correct
      updateWalls();

      const currentWidth = container.clientWidth;
      const currentTextWidth = textElement ? textElement.offsetWidth : currentWidth;
      const spawnLeftBound = (currentWidth - currentTextWidth) / 2;

      const bodies = HERO_PHYSICS_ITEMS.map((item: any, index: number) => {
        const el = itemsRef.current[index];
        if (!el) return null;

        const w = el.offsetWidth;
        const h = el.offsetHeight;

        // Spawn within the text width bounds
        const safeWidth = Math.max(currentTextWidth, w);
        // Add a small buffer so they don't spawn exactly on the wall
        const x = Math.random() * (safeWidth - w - 20) + spawnLeftBound + w / 2 + 10;

        // Spawn relative to screen height
        const y = -Math.random() * (height * 0.8) - 100;

        let body;
        const commonOptions = {
          friction: 0.5,
          frictionAir: 0.02,
          restitution: 0.1,
          density: 0.003,
          angle: (item.rotation || Math.random() * 20 - 10) * (Math.PI / 180),
        };

        if (item.isCircle) {
          body = Bodies.circle(x, y, w / 2, commonOptions);
        } else {
          body = Bodies.rectangle(x, y, w, h, {
            ...commonOptions,
            chamfer: { radius: h / 2 }
          });
        }
        return body;
      }).filter((b: Matter.Body | null): b is Matter.Body => b !== null);

      Composite.add(engine.world, bodies);
    }, 100);

    // --- Mouse Control ---
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
        angularStiffness: 0,
      } as any,
    });

    const mouseAny = mouseConstraint.mouse as any;
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseAny.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseAny.mousewheel);

    Composite.add(engine.world, mouseConstraint);

    // --- Update Loop ---
    const runLoop = () => {
      const bodies = Composite.allBodies(engine.world).filter(b => !b.isStatic);

      if (bodies.length === HERO_PHYSICS_ITEMS.length) {
        bodies.forEach((body: Matter.Body, index: number) => {
          const el = itemsRef.current[index];
          if (!el) return;

          const { x, y } = body.position;
          const angle = body.angle;

          el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px) rotate(${angle}rad)`;
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        });
      }

      Engine.update(engine, 1000 / 60);
      requestRef.current = requestAnimationFrame(runLoop);
    }

    runLoop();

    // --- Update Walls Function ---
    const updateWalls = () => {
      if (!containerRef.current || !wallsRef.current) return;

      const currentWidth = containerRef.current.clientWidth;
      const currentHeight = containerRef.current.clientHeight;
      const offset = 100;
      const gap = 20;

      const textCont = document.getElementById('hero-text-container');
      const textEl = textCont?.querySelector('h1');

      const newTextHeight = textCont?.offsetHeight || 150;
      const newTextWidth = textEl ? textEl.offsetWidth : currentWidth;

      // Position Ground exactly above the text
      const newGroundY = currentHeight - newTextHeight - gap + (offset / 2);

      // Position Walls exactly at text edges
      const centerX = currentWidth / 2;
      const wallDist = newTextWidth / 2;

      // Update Ground
      Matter.Body.setPosition(wallsRef.current.ground, { x: centerX, y: newGroundY });
      // We need to ensure ground is wide enough to catch everything
      Matter.Body.setVertices(wallsRef.current.ground, Matter.Bodies.rectangle(centerX, newGroundY, currentWidth + 400, offset).vertices);

      // Update Walls
      Matter.Body.setPosition(wallsRef.current.leftWall, { x: centerX - wallDist - (offset / 2), y: currentHeight / 2 });
      Matter.Body.setPosition(wallsRef.current.rightWall, { x: centerX + wallDist + (offset / 2), y: currentHeight / 2 });
    };

    // --- Observers ---

    // 1. Window Resize
    window.addEventListener('resize', updateWalls);

    // 2. Element Resize (Specifically the text)
    // This is crucial for mobile/webfont loading where text width changes without window resize
    const textEl = document.getElementById('hero-text-container')?.querySelector('h1');
    const resizeObserver = new ResizeObserver(() => {
      updateWalls();
    });
    if (textEl) resizeObserver.observe(textEl);

    // Initial update
    updateWalls();

    return () => {
      window.removeEventListener('resize', updateWalls);
      resizeObserver.disconnect();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(engine.world, false);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
      style={{ touchAction: 'none' }}
    >
      {HERO_PHYSICS_ITEMS.map((item: any, index: number) => {
        // Determine styles based on dark mode
        let bgColor = item.bgColor;
        let textColor = item.textColor;
        let borderColor = '#18181b'; // Default dark border for light mode

        if (isDarkMode) {
          if (item.type === 'text') {
            // In dark mode, text bubbles become transparent/black with white text and border
            bgColor = '#18181B';
            textColor = '#FFFFFF';
            borderColor = '#FFFFFF';
          } else if (item.id === '6') {
            borderColor = '#FFFFFF';
          }
        }

        // Responsive Classes
        const responsiveClasses = item.isCircle
          ? "w-14 h-14 md:w-20 md:h-20 p-0"
          : "px-6 py-3 md:px-12 md:py-6 text-base md:text-2xl lg:text-[2rem]";

        return (
          <div
            key={item.id}
            ref={(el) => { itemsRef.current[index] = el; }}
            onPointerDown={(e) => {
              dragStartRef.current = { x: e.clientX, y: e.clientY };
            }}
            onPointerUp={(e) => {
              if (!item.url) return;
              const start = dragStartRef.current;
              if (!start) return;

              const dist = Math.hypot(e.clientX - start.x, e.clientY - start.y);
              if (dist < 10) {
                window.open(item.url, '_blank');
              }
              dragStartRef.current = null;
            }}
            className={`absolute top-0 left-0 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] cursor-grab active:cursor-grabbing select-none will-change-transform overflow-hidden transition-colors duration-300 rounded-full ${responsiveClasses}`}
            style={{
              backgroundColor: bgColor,
              color: textColor,
              border: `1px solid ${borderColor}`,
              fontFamily: '"Space Mono", monospace',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              visibility: 'hidden',
              whiteSpace: 'nowrap',
              zIndex: 10,
            }}
          >
            {/* Text Items */}
            {item.type === 'text' && <span>{item.text}</span>}

            {/* Green Asterisk */}
            {item.type === 'icon' && item.bgColor === '#a3e635' && !item.imageUrl && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter" className="w-5 h-5 md:w-10 md:h-10">
                <path d="M12 2 L12 12 M21.51 8.91 L12 12 M17.88 20.09 L12 12 M6.12 20.09 L12 12 M2.49 8.91 L12 12" />
              </svg>
            )}

            {/* Image Items (GitHub / LinkedIn) */}
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt="icon"
                className="w-[60%] h-[60%] object-contain pointer-events-none"
                style={{ filter: 'none' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PhysicsHeader;