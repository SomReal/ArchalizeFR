import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function RoomBox({ zone }) {
    const { points, wallColor } = zone;
    if (!points || points.length < 2) return null;

    const wallHeight = 20;
    const wallThickness = 2;

    const wallHex =
        wallColor === "Light Gray"
            ? "#d3d3d3"
            : wallColor === "White"
                ? "#ffffff"
                : wallColor === "Blue"
                    ? "#87CEEB"
                    : "#dddddd";
    const floorColor =
        zone.flooring === "Tile"
            ? "#cccccc"
            : zone.flooring === "Hardwood"
                ? "#8B4513"
                : zone.flooring === "Carpet"
                    ? "#999999"
                    : "#aaa";

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <shapeGeometry
                    args={[
                        (() => {
                            const shape = new THREE.Shape();
                            shape.moveTo(points[0].x, -points[0].y); // Flip Y
                            for (let i = 1; i < points.length; i++) {
                                shape.lineTo(points[i].x, -points[i].y);
                            }
                            shape.lineTo(points[0].x, -points[0].y);
                            return shape;
                        })(),
                    ]}
                />
                <meshStandardMaterial color={floorColor} side={THREE.DoubleSide} />
            </mesh>

            {points.map((start, i) => {
                const end = points[(i + 1) % points.length];
                const dx = end.x - start.x;
                const dy = end.y - start.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);

                return (
                    <mesh
                        key={i}
                        position={[
                            (start.x + end.x) / 2,
                            wallHeight / 2,
                            (start.y + end.y) / 2,
                        ]}
                        rotation={[0, -angle, 0]}
                    >
                        <boxGeometry args={[length, wallHeight, wallThickness]} />
                        <meshStandardMaterial color={wallHex} />
                    </mesh>
                );
            })}
        </group>
    );
}


export default function FloorPlan3DView({ zones }) {
    return (
        <div className="w-full h-[600px] bg-black rounded mt-6 overflow-hidden">
            <Canvas shadows camera={{ position: [0, 200, 300], fov: 60 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[100, 150, 100]} castShadow />
                <OrbitControls />
                {zones.map((zone, i) => (
                    <RoomBox key={i} zone={zone} />
                ))}
            </Canvas>

        </div>
    );
}
