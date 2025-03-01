import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points } from '@react-three/drei';

function ParticleField({ count = 5000 }) {
  const points = useRef();
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 20;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  useFrame((state, delta) => {
    points.current.rotation.x -= delta / 10;
    points.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={points}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <pointsMaterial
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          transparent
          opacity={0.8}
          color="#8b5cf6"
        />
      </Points>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <ParticleField />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
} 