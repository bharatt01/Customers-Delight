import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed?: number;
  distort?: number;
}

const FloatingShape = ({ position, scale = 1, color, speed = 1, distort = 0.3 }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.1;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.5}
          metalness={0.1}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const RoundedBlock = ({ position, scale = 1, color, speed = 1 }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const shape = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
    return shape;
  }, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.05;
      meshRef.current.rotation.y += 0.002 * speed;
    }
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
};

export const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#faf8f5" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#d4a574" />
        
        {/* Main shapes - warm copper and earthy tones */}
        <FloatingShape position={[-3.5, 1, 0]} scale={0.8} color="#c87941" speed={0.8} distort={0.4} />
        <FloatingShape position={[3, -0.5, -1]} scale={0.6} color="#8b7355" speed={1.2} distort={0.3} />
        <RoundedBlock position={[2.5, 2, -2]} scale={0.5} color="#2d2a26" speed={0.6} />
        <RoundedBlock position={[-2, -1.5, -1]} scale={0.4} color="#6b705c" speed={0.9} />
        <FloatingShape position={[0, 2.5, -2]} scale={0.4} color="#d4a574" speed={1} distort={0.5} />
        
        {/* Subtle background elements */}
        <FloatingShape position={[-4, -2, -3]} scale={0.3} color="#a98467" speed={0.5} distort={0.2} />
        <RoundedBlock position={[4, 1, -3]} scale={0.3} color="#4a4a48" speed={0.7} />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
