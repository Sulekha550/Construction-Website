import { useGLTF } from "@react-three/drei";

export default function BuildingModel() {
  // Add a verified Vardha GLB at /models/vardha-building.glb when available.
  const { scene } = useGLTF("/models/vardha-building.glb");
  return <primitive object={scene} scale={1} />;
}