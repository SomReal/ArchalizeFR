import React, { useState, useRef } from "react";
import { Stage, Layer, Image as KonvaImage, Line, Text } from "react-konva";
import useImage from "use-image";
import { Link } from "react-router-dom";
import FinishModal from "./FinishModal";
import FloorPlan3DView from "./FloorPlan3DView";


function FloorPlanPage() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [zones, setZones] = useState([]);
    const [drawingPoints, setDrawingPoints] = useState([]);
    const stageRef = useRef();
    const [pendingZone, setPendingZone] = useState(null);
    const [selectedZoneIndex, setSelectedZoneIndex] = useState(null);



    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
        setUploadedImage(file);
    };
    const handleMouseDown = (e) => {
        if (!konvaImage) return;
        const stage = e.target.getStage();
        const pointer = stage.getPointerPosition();
        setDrawingPoints([...drawingPoints, pointer]);
    };

    const [konvaImage] = useImage(imageUrl);
    const targetWidth = 800;
    const scaledHeight = konvaImage
        ? (konvaImage.height / konvaImage.width) * targetWidth
        : 600;


    return (
        <div className="min-h-screen bg-[#1E293B] text-white font-sans p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Upload a Floor Plan</h1>
                <Link
                    to="/"
                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 font-semibold"
                >
                    Home
                </Link>
            </div>

            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
                className="mb-6 block w-full max-w-sm text-sm text-white file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-yellow-400 file:text-black
          hover:file:bg-yellow-300"
            />

            {konvaImage && (
                <div className="border-2 border-white rounded-lg overflow-hidden">
                    <Stage
                        width={targetWidth}
                        height={scaledHeight}
                        ref={stageRef}
                        onMouseDown={handleMouseDown}
                    >
                        <Layer>
                            <KonvaImage
                                image={konvaImage}
                                width={targetWidth}
                                height={scaledHeight}
                                listening={false}
                            />

                            {/* Live drawing in progress */}
                            {drawingPoints.length > 1 && (
                                <Line
                                    points={drawingPoints.flatMap(p => [p.x, p.y])}
                                    stroke="cyan"
                                    strokeWidth={2}
                                    lineJoin="round"
                                    closed={false}
                                />
                            )}

                            {/* Finalized zones */}
                            {zones.map((zone, i) => (
                                <React.Fragment key={i}>
                                    <Line
                                        points={zone.points.flatMap(p => [p.x, p.y])}
                                        stroke="yellow"
                                        strokeWidth={2}
                                        closed
                                        fill="rgba(255,255,0,0.3)"
                                        onClick={() => setSelectedZoneIndex(i)}
                                    />
                                    <Text
                                        x={zone.points[0].x + 5}
                                        y={zone.points[0].y + 5}
                                        text={`${zone.roomName}\n${zone.flooring} / ${zone.wallColor}`}
                                        fontSize={14}
                                        fill="black"
                                        fontStyle="bold"
                                    />
                                </React.Fragment>
                            ))}
                        </Layer>
                    </Stage>
                    {drawingPoints.length > 2 && (
                        <button
                            onClick={() => {
                                setPendingZone({ points: drawingPoints });
                                setDrawingPoints([]);
                            }}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                        >
                            Finish Room
                        </button>
                    )}

                    {zones.length > 0 && <FloorPlan3DView zones={zones} />}
                    {selectedZoneIndex !== null && (
                        <button
                            onClick={() => {
                                setZones(zones.filter((_, i) => i !== selectedZoneIndex));
                                setSelectedZoneIndex(null);
                            }}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                        >
                            Delete Selected Room
                        </button>
                    )}

                </div>
            )}
            {pendingZone && (
                <FinishModal
                    onCancel={() => setPendingZone(null)}
                    onSave={(finishData) => {
                        setZones((prev) => [
                            ...prev,
                            { ...pendingZone, ...finishData }
                        ]);
                        setPendingZone(null);
                    }}
                />
            )}

        </div>
    );
}

export default FloorPlanPage;
