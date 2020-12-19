import React, { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three/src/Three";

const Stars = () => {
  let groupRef = useRef();
  let theta = 0;

  //red, green, yellow, blue, purple
  const colors = ["#ff0000", "#00ff00", "#fff000", "#00ffff", "#9400D3"];

  useFrame(() => {
    var r = 3.5 * Math.sin(THREE.Math.degToRad((theta += 0.1)));
    var s = Math.cos(THREE.Math.degToRad(theta * 2));
    groupRef.current.rotation.set(r, r, r);
    groupRef.current.scale.set(s, s, s);
  });

  const [geo, data] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 10, 10);
    const data = new Array(2000).fill().map((i) => [
      Math.random() * 800 - 400,
      Math.random() * 800 - 400,
      Math.random() * 800 - 400,
      new THREE.MeshBasicMaterial({
        color: colors[Math.round(Math.random() * (colors.length - 1))],
      }),
    ]);
    return [geo, data];
  });

  return (
    <group ref={groupRef}>
      {data.map(([p1, p2, p3, mat], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
};

export default Stars;
