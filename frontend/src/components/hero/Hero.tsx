import { Suspense, useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Move3D } from "lucide-react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   3D ARCHITECTURAL BUILDING
========================================================= */

function ArchitecturalBuilding() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    const time = state.clock.getElapsedTime();

    group.current.rotation.y =
      Math.sin(time * 0.16) * 0.08;

    group.current.position.y =
      Math.sin(time * 0.35) * 0.035;
  });

  return (
    <group ref={group}>
      {/* Main tower */}
      <mesh position={[0, 1.7, 0]}>
        <boxGeometry args={[3.8, 3.4, 2.8]} />

        <meshStandardMaterial
          color="#242424"
          roughness={0.72}
          metalness={0.18}
        />
      </mesh>

      {/* Central glass section */}
      <mesh position={[0, 1.75, 1.43]}>
        <boxGeometry args={[2.7, 3.05, 0.08]} />

        <meshStandardMaterial
          color="#172127"
          roughness={0.18}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Left wing */}
      <mesh position={[-3.05, 1.05, 0]}>
        <boxGeometry args={[1.7, 2.1, 2.5]} />

        <meshStandardMaterial
          color="#303030"
          roughness={0.75}
          metalness={0.12}
        />
      </mesh>

      {/* Right wing */}
      <mesh position={[3.05, 1.05, 0]}>
        <boxGeometry args={[1.7, 2.1, 2.5]} />

        <meshStandardMaterial
          color="#303030"
          roughness={0.75}
          metalness={0.12}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 3.48, 0]}>
        <boxGeometry args={[4.15, 0.16, 3.1]} />

        <meshStandardMaterial
          color="#151515"
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Entrance */}
      <mesh position={[0, 0.55, 1.47]}>
        <boxGeometry args={[1.15, 1.25, 0.12]} />

        <meshStandardMaterial
          color="#111111"
          roughness={0.15}
          metalness={0.45}
        />
      </mesh>

      {/* Horizontal architectural slabs */}
      {[0.55, 1.25, 1.95, 2.65].map((y) => (
        <mesh
          key={y}
          position={[0, y, 1.53]}
        >
          <boxGeometry args={[3.65, 0.035, 0.08]} />

          <meshStandardMaterial
            color="#b99a4a"
            roughness={0.45}
            metalness={0.5}
          />
        </mesh>
      ))}

      {/* Window lights */}
      {[-1.2, 0, 1.2].map((x) =>
        [0.85, 1.55, 2.25].map((y) => (
          <mesh
            key={`${x}-${y}`}
            position={[x, y, 1.5]}
          >
            <boxGeometry args={[0.55, 0.34, 0.035]} />

            <meshStandardMaterial
              color="#d8b85a"
              emissive="#b88c22"
              emissiveIntensity={0.35}
              roughness={0.2}
            />
          </mesh>
        ))
      )}

      {/* Base */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[8.2, 0.3, 5.8]} />

        <meshStandardMaterial
          color="#171717"
          roughness={0.8}
        />
      </mesh>

      {/* Entrance lights */}
      <pointLight
        position={[0, 1, 2.2]}
        intensity={2.2}
        distance={5}
        color="#d6ad48"
      />
    </group>
  );
}

/* =========================================================
   THREE.JS SCENE
========================================================= */

function Scene() {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[8, 5.5, 11]}
        fov={42}
      />

      <ambientLight intensity={0.45} />

      <directionalLight
        position={[5, 9, 6]}
        intensity={2.5}
      />

      <directionalLight
        position={[-5, 4, -3]}
        intensity={1}
      />

      <Float
        speed={0.8}
        rotationIntensity={0.08}
        floatIntensity={0.2}
      >
        <ArchitecturalBuilding />
      </Float>

      <Sparkles
        count={80}
        scale={[14, 8, 12]}
        size={0.6}
        speed={0.15}
        opacity={0.22}
      />

      <Environment preset="city" />
    </>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  /* Cinematic scroll refs */
  const backgroundRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const modelFrameRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sideIndexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         INTRO ANIMATION
      ===================================================== */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .fromTo(
          eyebrowRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
          }
        )

        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 80,
            clipPath: "inset(100% 0 0 0)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
          },
          "-=0.65"
        )

        .fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.55"
        )

        .fromTo(
          buttonsRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.5"
        )

        .fromTo(
          modelRef.current,
          {
            opacity: 0,
            scale: 0.88,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "-=1"
        );

      /* =====================================================
         CINEMATIC SCROLL EXPERIENCE
      ===================================================== */

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      /* Background movement */
      scrollTimeline.to(
        backgroundRef.current,
        {
          scale: 1.18,
          yPercent: 12,
          ease: "none",
        },
        0
      );

      /* Architectural grid depth */
      scrollTimeline.to(
        gridRef.current,
        {
          yPercent: 20,
          scale: 1.08,
          opacity: 0.015,
          ease: "none",
        },
        0
      );

      /* Gold atmosphere movement */
      scrollTimeline.to(
        atmosphereRef.current,
        {
          xPercent: -25,
          yPercent: 30,
          scale: 1.35,
          opacity: 0.025,
          ease: "none",
        },
        0
      );

      /* Main content rises */
      scrollTimeline.to(
        contentRef.current,
        {
          yPercent: -18,
          ease: "none",
        },
        0
      );

      /* Title becomes more subtle */
      scrollTimeline.to(
        titleRef.current,
        {
          yPercent: -22,
          opacity: 0.25,
          ease: "none",
        },
        0
      );

      /* 3D model moves independently */
      scrollTimeline.to(
        modelRef.current,
        {
          yPercent: -10,
          scale: 1.08,
          ease: "none",
        },
        0
      );

      /* Model frame fades */
      scrollTimeline.to(
        modelFrameRef.current,
        {
          scale: 1.12,
          opacity: 0.2,
          ease: "none",
        },
        0
      );

      /* Side index moves away */
      scrollTimeline.to(
        sideIndexRef.current,
        {
          xPercent: 80,
          opacity: 0,
          ease: "none",
        },
        0
      );

      /* =====================================================
         GOLD SCROLL PROGRESS
      ===================================================== */

      gsap.fromTo(
        progressRef.current,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /* =========================================================
     SCROLL TO EXPLORE
  ========================================================= */

  const scrollToExplore = () => {
    window.scrollTo({
      top: window.innerHeight * 1.05,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={heroRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#090909]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        ref={backgroundRef}
        className="
          absolute
          inset-[-8%]
          bg-cover
          bg-center
          opacity-[0.13]
          will-change-transform
        "
        style={{
          backgroundImage:
            "url(/images/ai/ai-residence-signature.jpg)",
        }}
      />

      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[#090909]/75
        "
      />

      {/* =====================================================
          ARCHITECTURAL GRID
      ===================================================== */}

      <div
        ref={gridRef}
        className="
          absolute
          inset-[-10%]
          opacity-[0.055]
          will-change-transform
          [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]
          [background-size:100px_100px]
        "
      />

      {/* =====================================================
          GOLD ATMOSPHERE
      ===================================================== */}

      <div
        ref={atmosphereRef}
        className="
          absolute
          right-[8%]
          top-[15%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-vardha-gold/[0.08]
          blur-[150px]
          will-change-transform
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        ref={contentRef}
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-[1600px]
          flex-col
          justify-center
          px-6
          pb-24
          pt-32
          sm:px-10
          lg:px-16
          will-change-transform
        "
      >
        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="relative z-20 max-w-3xl">
            <p
              ref={eyebrowRef}
              className="
                flex
                items-center
                gap-3
                text-[9px]
                font-medium
                uppercase
                tracking-[0.4em]
                text-vardha-gold
              "
            >
              <span className="h-px w-10 bg-vardha-gold" />

              Building Dreams Since 2014
            </p>

            <h1
              ref={titleRef}
              className="
                mt-7
                font-display
                text-[4.5rem]
                leading-[0.82]
                tracking-[-0.055em]
                will-change-transform
                sm:text-[6.5rem]
                lg:text-[8.5rem]
                xl:text-[9.5rem]
              "
            >
              Building

              <br />

              <span className="text-white/35">
                Dreams.
              </span>

              <br />

              <span className="text-vardha-gold">
                Landmarks.
              </span>
            </h1>

            <p
              ref={descriptionRef}
              className="
                mt-8
                max-w-lg
                text-sm
                leading-7
                text-white/50
                sm:text-[15px]
              "
            >
              Premium residential and commercial spaces shaped
              through thoughtful architecture, modern design and
              uncompromising attention to detail.
            </p>

            <div
              ref={buttonsRef}
              className="
                mt-9
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <Link
                to="/projects"
                className="
                  group
                  inline-flex
                  items-center
                  gap-4
                  bg-vardha-gold
                  px-6
                  py-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-black
                  transition-all
                  duration-300
                  hover:bg-white
                "
              >
                Explore Projects

                <ArrowUpRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <Link
                to="/floor-plans"
                className="
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-white/15
                  bg-white/[0.03]
                  px-6
                  py-4
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-white/70
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-white/40
                  hover:text-white
                "
              >
                View Floor Plans
              </Link>
            </div>
          </div>

          {/* =================================================
              RIGHT / 3D MODEL
          ================================================= */}

          <div
            ref={modelRef}
            className="
              relative
              h-[500px]
              will-change-transform
              sm:h-[600px]
              lg:h-[720px]
            "
          >
            {/* Model label */}

            <div
              className="
                absolute
                left-2
                top-6
                z-20
                flex
                items-center
                gap-2
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-white/35
              "
            >
              <Move3D size={13} />

              Interactive Architecture
            </div>

            {/* 3D Canvas */}

            <Canvas
              dpr={[1, 1.5]}
              gl={{
                antialias: true,
                alpha: true,
              }}
            >
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>

            {/* Model frame */}

            <div
              ref={modelFrameRef}
              className="
                pointer-events-none
                absolute
                inset-[8%]
                border
                border-white/[0.08]
                will-change-transform
              "
            />

            {/* Corner markers */}

            <span
              className="
                absolute
                left-[8%]
                top-[8%]
                h-3
                w-3
                border-l
                border-t
                border-vardha-gold/50
              "
            />

            <span
              className="
                absolute
                right-[8%]
                top-[8%]
                h-3
                w-3
                border-r
                border-t
                border-vardha-gold/50
              "
            />

            <span
              className="
                absolute
                bottom-[8%]
                left-[8%]
                h-3
                w-3
                border-b
                border-l
                border-vardha-gold/50
              "
            />

            <span
              className="
                absolute
                bottom-[8%]
                right-[8%]
                h-3
                w-3
                border-b
                border-r
                border-vardha-gold/50
              "
            />

            {/* Coordinates */}

            <div
              className="
                absolute
                bottom-8
                left-3
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-white/25
              "
            >
              26°45'N / 83°22'E
            </div>

            <div
              className="
                absolute
                bottom-8
                right-3
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-white/25
              "
            >
              VDB / 001
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <button
        type="button"
        onClick={scrollToExplore}
        className="
          absolute
          bottom-8
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-3
          text-white/35
          transition-colors
          duration-300
          hover:text-vardha-gold
        "
      >
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.4em]
          "
        >
          Scroll To Explore
        </span>

        <span
          className="
            flex
            h-10
            w-px
            overflow-hidden
            bg-white/15
          "
        >
          <span
            className="
              h-1/2
              w-full
              animate-bounce
              bg-vardha-gold
            "
          />
        </span>

        <ArrowDown
          size={13}
          strokeWidth={1}
        />
      </button>

      {/* =====================================================
          SIDE INDEX
      ===================================================== */}

      <div
        ref={sideIndexRef}
        className="
          absolute
          bottom-10
          right-6
          z-20
          hidden
          items-center
          gap-3
          lg:flex
          will-change-transform
        "
      >
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/25
          "
        >
          Experience
        </span>

        <span
          className="
            font-display
            text-2xl
            text-white/70
          "
        >
          01
        </span>

        <span
          className="
            h-px
            w-12
            bg-vardha-gold/50
          "
        />
      </div>

      {/* =====================================================
          CINEMATIC SCROLL PROGRESS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-30
        "
      >
        <div className="h-px w-full bg-white/10">
          <div
            ref={progressRef}
            className="
              h-px
              w-full
              origin-left
              scale-x-0
              bg-vardha-gold
            "
          />
        </div>
      </div>
    </section>
  );
}