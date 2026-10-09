import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

type ArchitecturalSceneProps = {
  interactive?: boolean;
  onHotspotSelect?: (id: string) => void;
  className?: string;
};

type HotspotData = {
  id: string;
  label: string;
  sublabel: string;
  position: [number, number, number];
};

const HOTSPOTS: HotspotData[] = [
  {
    id: "lobby",
    label: "GRAND LOBBY",
    sublabel: "Arrival experience",
    position: [0, 1.8, 5.25],
  },
  {
    id: "residences",
    label: "RESIDENCES",
    sublabel: "Private living",
    position: [2.8, 7.2, 1.8],
  },
  {
    id: "garden",
    label: "LANDSCAPE",
    sublabel: "Green courtyard",
    position: [-6.5, 0.9, 1.2],
  },
  {
    id: "rooftop",
    label: "ROOFTOP",
    sublabel: "Sky experience",
    position: [0, 13.8, 0],
  },
  {
    id: "parking",
    label: "PARKING",
    sublabel: "Arrival & mobility",
    position: [5.5, 0.4, 6],
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function GlassMaterial({
  opacity = 0.38,
  color = "#8ea0a8",
}: {
  opacity?: number;
  color?: string;
}) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.25}
      roughness={0.12}
      transmission={0.25}
      transparent
      opacity={opacity}
      thickness={0.6}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Animated Windows                                                            */
/* -------------------------------------------------------------------------- */

function BuildingWindows({ night }: { night: boolean }) {
  const refs = useRef<THREE.Mesh[]>([]);

  const windows = useMemo(() => {
    const items: [number, number, number][] = [];

    const floors = 11;
    const columns = 7;

    for (let floor = 0; floor < floors; floor++) {
      for (let col = 0; col < columns; col++) {
        const x = -4.1 + col * 1.36;
        const y = 2.25 + floor * 1.02;

        if ((floor + col) % 4 !== 0) {
          items.push([x, y, 2.86]);
        }
      }
    }

    return items;
  }, []);

  useFrame((state) => {
    refs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const material = mesh.material as THREE.MeshStandardMaterial;

      if (night) {
        const pulse =
          0.45 +
          Math.sin(state.clock.elapsedTime * 1.5 + index * 0.7) * 0.12;

        material.emissiveIntensity = pulse;
      } else {
        material.emissiveIntensity = 0.05;
      }
    });
  });

  return (
    <>
      {windows.map((position, index) => (
        <mesh
          key={index}
          position={position}
          ref={(el) => {
            if (el) refs.current[index] = el;
          }}
        >
          <boxGeometry args={[0.72, 0.52, 0.035]} />
          <meshStandardMaterial
            color={night ? "#f5d99b" : "#76919b"}
            emissive={night ? "#d9a94b" : "#263b42"}
            emissiveIntensity={night ? 0.5 : 0.05}
            metalness={0.35}
            roughness={0.25}
          />
        </mesh>
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Building                                                                    */
/* -------------------------------------------------------------------------- */

function Building({ night }: { night: boolean }) {
  return (
    <group>
      {/* Main tower */}
      <mesh position={[0, 7, 0]}>
        <boxGeometry args={[10, 14, 6]} />
        <meshStandardMaterial
          color={night ? "#252729" : "#d5d0c8"}
          roughness={0.72}
          metalness={0.08}
        />
      </mesh>

      {/* Central glass core */}
      <mesh position={[0, 7, 3.04]}>
        <boxGeometry args={[5.2, 13.4, 0.18]} />
        <GlassMaterial
          opacity={night ? 0.52 : 0.32}
          color={night ? "#172229" : "#8da3a9"}
        />
      </mesh>

      {/* Side glass sections */}
      <mesh position={[-4.25, 7, 3.04]}>
        <boxGeometry args={[0.7, 12.8, 0.18]} />
        <GlassMaterial opacity={0.42} />
      </mesh>

      <mesh position={[4.25, 7, 3.04]}>
        <boxGeometry args={[0.7, 12.8, 0.18]} />
        <GlassMaterial opacity={0.42} />
      </mesh>

      {/* Vertical architectural fins */}
      {[-4.7, -3.2, 3.2, 4.7].map((x) => (
        <mesh key={x} position={[x, 7, 3.22]}>
          <boxGeometry args={[0.16, 13.8, 0.25]} />
          <meshStandardMaterial
            color={night ? "#77726a" : "#5e5a53"}
            roughness={0.45}
            metalness={0.45}
          />
        </mesh>
      ))}

      {/* Podium */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[14, 1.8, 9]} />
        <meshStandardMaterial
          color={night ? "#17191a" : "#bcb6ad"}
          roughness={0.8}
        />
      </mesh>

      {/* Lobby glass */}
      <mesh position={[0, 2.2, 4.5]}>
        <boxGeometry args={[7.2, 2.5, 0.18]} />
        <GlassMaterial opacity={0.48} />
      </mesh>

      {/* Lobby canopy */}
      <mesh position={[0, 3.65, 5.1]}>
        <boxGeometry args={[8.2, 0.18, 2]} />
        <meshStandardMaterial
          color="#a98a55"
          metalness={0.75}
          roughness={0.24}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 14.2, 0]}>
        <boxGeometry args={[10.6, 0.5, 6.5]} />
        <meshStandardMaterial
          color={night ? "#151617" : "#3e3d3a"}
          roughness={0.52}
          metalness={0.35}
        />
      </mesh>

      {/* Rooftop crown */}
      <mesh position={[0, 15.25, 0]}>
        <boxGeometry args={[4.8, 1.5, 3]} />
        <meshStandardMaterial
          color={night ? "#222426" : "#d0cbc1"}
          roughness={0.6}
        />
      </mesh>

      {/* Balconies */}
      {Array.from({ length: 6 }).map((_, index) => {
        const y = 3.2 + index * 1.75;

        return (
          <group key={index}>
            <mesh position={[-5.15, y, 1.4]}>
              <boxGeometry args={[1.6, 0.12, 2.5]} />
              <meshStandardMaterial
                color="#6c665c"
                metalness={0.5}
                roughness={0.45}
              />
            </mesh>

            <mesh position={[5.15, y, 1.4]}>
              <boxGeometry args={[1.6, 0.12, 2.5]} />
              <meshStandardMaterial
                color="#6c665c"
                metalness={0.5}
                roughness={0.45}
              />
            </mesh>
          </group>
        );
      })}

      {/* Windows */}
      <BuildingWindows night={night} />

      {/* Entrance doors */}
      {[-1.1, 0, 1.1].map((x) => (
        <mesh key={x} position={[x, 2.25, 4.61]}>
          <boxGeometry args={[0.82, 2.05, 0.08]} />
          <GlassMaterial opacity={0.62} color="#26343a" />
        </mesh>
      ))}

      {/* Gold entrance columns */}
      {[-4, 4].map((x) => (
        <mesh key={x} position={[x, 2.4, 4.65]}>
          <boxGeometry args={[0.16, 2.8, 0.2]} />
          <meshStandardMaterial
            color="#b49661"
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Trees                                                                       */
/* -------------------------------------------------------------------------- */

function Tree({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 2.6, 8]} />
        <meshStandardMaterial color="#5a4634" roughness={0.85} />
      </mesh>

      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[1.15, 12, 12]} />
        <meshStandardMaterial color="#4e6250" roughness={0.9} />
      </mesh>

      <mesh position={[-0.55, 2.55, 0.15]}>
        <sphereGeometry args={[0.7, 10, 10]} />
        <meshStandardMaterial color="#60705a" roughness={0.9} />
      </mesh>

      <mesh position={[0.55, 2.6, -0.15]}>
        <sphereGeometry args={[0.75, 10, 10]} />
        <meshStandardMaterial color="#455a49" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Landscape({ night }: { night: boolean }) {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial
          color={night ? "#111414" : "#8e9489"}
          roughness={1}
        />
      </mesh>

      {/* Garden */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-10, 0.03, 0]}>
        <planeGeometry args={[12, 24]} />
        <meshStandardMaterial
          color={night ? "#1c3024" : "#62755d"}
          roughness={1}
        />
      </mesh>

      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 12]}>
        <planeGeometry args={[60, 7]} />
        <meshStandardMaterial
          color={night ? "#202224" : "#444643"}
          roughness={0.92}
        />
      </mesh>

      {/* Road marking */}
      {Array.from({ length: 12 }).map((_, index) => (
        <mesh
          key={index}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-25 + index * 4.5, 0.07, 12]}
        >
          <planeGeometry args={[2.5, 0.08]} />
          <meshBasicMaterial color="#d2c8a8" />
        </mesh>
      ))}

      {/* Trees */}
      <Tree position={[-10, 0, -5]} scale={1.25} />
      <Tree position={[-12, 0, 4]} scale={1.05} />
      <Tree position={[-8, 0, 8]} scale={0.9} />
      <Tree position={[9, 0, -5]} scale={1.1} />
      <Tree position={[12, 0, 2]} scale={0.85} />
      <Tree position={[9, 0, 7]} scale={1.2} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Cars                                                                        */
/* -------------------------------------------------------------------------- */

function Car({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={0.85}>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[2.6, 0.55, 1.25]} />
        <meshStandardMaterial
          color="#252729"
          metalness={0.55}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[1.35, 0.45, 1.05]} />
        <meshStandardMaterial
          color="#30383b"
          metalness={0.25}
          roughness={0.18}
          transparent
          opacity={0.78}
        />
      </mesh>

      {[-0.82, 0.82].map((x) =>
        [-0.5, 0.5].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.18, z]}>
            <cylinderGeometry args={[0.23, 0.23, 0.16, 16]} />
            <meshStandardMaterial color="#161718" roughness={0.9} />
          </mesh>
        ))
      )}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* People                                                                      */
/* -------------------------------------------------------------------------- */

function Person({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#8f806e" />
      </mesh>

      <mesh position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.2, 0.75, 5, 10]} />
        <meshStandardMaterial color="#3d4244" roughness={0.7} />
      </mesh>

      <mesh position={[-0.13, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.7, 8]} />
        <meshStandardMaterial color="#252525" />
      </mesh>

      <mesh position={[0.13, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.7, 8]} />
        <meshStandardMaterial color="#252525" />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Hotspot                                                                     */
/* -------------------------------------------------------------------------- */

function Hotspot({
  item,
  active,
  onClick,
}: {
  item: HotspotData;
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={item.position}>
      <mesh
        scale={hovered || active ? 1.35 : 1}
        onClick={onClick}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial
          color="#d5b06a"
          emissive="#c18d36"
          emissiveIntensity={hovered || active ? 1.8 : 0.7}
        />
      </mesh>

      <mesh scale={hovered || active ? 1.8 : 1.25}>
        <ringGeometry args={[0.27, 0.31, 32]} />
        <meshBasicMaterial
          color="#d7b675"
          transparent
          opacity={hovered || active ? 0.8 : 0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {(hovered || active) && (
        <Html
          distanceFactor={8}
          position={[0.35, 0.15, 0]}
          style={{
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              padding: "10px 13px",
              background: "rgba(12,13,13,.9)",
              border: "1px solid rgba(212,177,105,.45)",
              color: "#f4efe5",
              backdropFilter: "blur(10px)",
              minWidth: 150,
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "2px",
                color: "#d5b06a",
                marginBottom: 4,
              }}
            >
              EXPLORE
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              {item.label}
            </div>

            <div
              style={{
                marginTop: 3,
                fontSize: 10,
                color: "#9b988f",
              }}
            >
              {item.sublabel}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Camera                                                                      */
/* -------------------------------------------------------------------------- */

function CameraController({
  target,
  night,
}: {
  target: [number, number, number] | null;
  night: boolean;
}) {
  const { camera } = useThree();

  const destination = useRef(new THREE.Vector3(18, 11, 24));
  const lookAt = useRef(new THREE.Vector3(0, 6, 0));

  useEffect(() => {
    if (!target) {
      destination.current.set(18, 11, 24);
      lookAt.current.set(0, 6, 0);
      return;
    }

    const [x, y, z] = target;

    destination.current.set(x + 7, y + 3, z + 9);
    lookAt.current.set(x, y, z);
  }, [target]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    const targetPosition = destination.current.clone();

    if (!target) {
      targetPosition.x += Math.sin(t * 0.15) * 0.7;
      targetPosition.y += Math.sin(t * 0.2) * 0.18;
    }

    if (night) {
      targetPosition.z += 0.25;
    }

    camera.position.lerp(targetPosition, 0.025);

    const currentLook = new THREE.Vector3();
    currentLook.copy(lookAt.current);

    camera.lookAt(currentLook);
  });

  return null;
}

/* -------------------------------------------------------------------------- */
/* Scene                                                                       */
/* -------------------------------------------------------------------------- */

function Scene({
  interactive,
  onHotspotSelect,
  activeHotspot,
  setActiveHotspot,
  night,
}: {
  interactive: boolean;
  onHotspotSelect?: (id: string) => void;
  activeHotspot: string | null;
  setActiveHotspot: React.Dispatch<React.SetStateAction<string | null>>;
  night: boolean;
}) {
  const [cameraTarget, setCameraTarget] =
    useState<[number, number, number] | null>(null);

  const handleHotspot = (item: HotspotData) => {
    setActiveHotspot(item.id);
    setCameraTarget(item.position);
    onHotspotSelect?.(item.id);
  };

  return (
    <>
      <color attach="background" args={[night ? "#07090a" : "#bfc4c1"]} />

      <PerspectiveCamera
        makeDefault
        position={[18, 11, 24]}
        fov={42}
        near={0.1}
        far={200}
      />

      <CameraController target={cameraTarget} night={night} />

      <ambientLight
        intensity={night ? 0.24 : 1.3}
        color={night ? "#7b8fa8" : "#fff8e9"}
      />

      <directionalLight
        position={[-15, 25, 15]}
        intensity={night ? 0.45 : 3}
        color={night ? "#a9bbd5" : "#fff1d0"}
        castShadow
      />

      <pointLight
        position={[0, 8, 7]}
        intensity={night ? 8 : 2}
        distance={30}
        color={night ? "#d3a45d" : "#fff2d1"}
      />

      <Environment preset={night ? "night" : "city"} />

      <Landscape night={night} />

      <Float
        speed={0.25}
        rotationIntensity={0.04}
        floatIntensity={0.08}
      >
        <Building night={night} />
      </Float>

      {/* Vehicles */}
      <Car position={[-4, 0, 11.2]} rotation={Math.PI} />
      <Car position={[4, 0, 12.5]} rotation={Math.PI} />
      <Car position={[7, 0, 8]} rotation={Math.PI / 2} />

      {/* People */}
      <Person position={[-2.8, 0, 5.8]} scale={0.9} />
      <Person position={[2.7, 0, 5.9]} scale={0.85} />
      <Person position={[6.5, 0, 9]} scale={0.72} />

      {/* Architectural hotspots */}
      {interactive &&
        HOTSPOTS.map((item) => (
          <Hotspot
            key={item.id}
            item={item}
            active={activeHotspot === item.id}
            onClick={() => handleHotspot(item)}
          />
        ))}

      {night && (
        <Sparkles
          count={45}
          scale={[35, 18, 35]}
          size={1.4}
          speed={0.2}
          opacity={0.22}
        />
      )}

      <OrbitControls
        enablePan={false}
        enableZoom={interactive}
        minDistance={14}
        maxDistance={38}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.46}
        dampingFactor={0.04}
        enableDamping
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                              */
/* -------------------------------------------------------------------------- */

export default function ArchitecturalScene({
  interactive = true,
  onHotspotSelect,
  className = "",
}: ArchitecturalSceneProps) {
  const [night, setNight] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    const syncTheme = () => {
      setNight(
        document.documentElement.classList.contains("vardha-night")
      );
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`relative h-full min-h-[560px] w-full overflow-hidden ${className}`}
    >
      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <Scene
          interactive={interactive}
          onHotspotSelect={onHotspotSelect}
          activeHotspot={activeHotspot}
          setActiveHotspot={setActiveHotspot}
          night={night}
        />
      </Canvas>

      {/* Top architectural HUD */}
      <div className="pointer-events-none absolute left-5 top-5 md:left-8 md:top-8">
        <div className="border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-md">
          <div className="text-[9px] tracking-[0.28em] text-[#d5b06a]">
            VARDHA / ARCHITECTURE
          </div>

          <div className="mt-1 text-[11px] tracking-[0.18em] text-white/70">
            {night ? "NIGHT EXPERIENCE" : "DAY EXPERIENCE"}
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between md:bottom-8 md:left-8 md:right-8">
        <div>
          <div className="text-[9px] tracking-[0.3em] text-white/45">
            INTERACTIVE ARCHITECTURAL MODEL
          </div>

          <div className="mt-2 max-w-[320px] text-sm leading-6 text-white/70">
            Explore the building, discover architectural zones and move
            around the project.
          </div>
        </div>

        <div className="hidden text-right md:block">
          <div className="text-[9px] tracking-[0.3em] text-[#d5b06a]">
            DRAG TO EXPLORE
          </div>

          <div className="mt-1 text-[9px] tracking-[0.2em] text-white/35">
            SCROLL / ZOOM / DISCOVER
          </div>
        </div>
      </div>

      {/* Active hotspot indicator */}
      {activeHotspot && (
        <div className="absolute right-5 top-5 md:right-8 md:top-8">
          <button
            onClick={() => {
              setActiveHotspot(null);
              window.dispatchEvent(new Event("vardha-reset-camera"));
            }}
            className="border border-white/15 bg-black/40 px-4 py-3 text-[9px] tracking-[0.22em] text-white/70 backdrop-blur-md transition hover:border-[#d5b06a]/50 hover:text-[#d5b06a]"
          >
            RESET VIEW
          </button>
        </div>
      )}

      {/* Gold corner graphics */}
      <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l border-t border-[#d5b06a]/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b border-r border-[#d5b06a]/30" />
    </div>
  );
}