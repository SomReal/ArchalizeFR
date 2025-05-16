import React, { useState } from "react";

const finishOptions = {
  flooring: ["Hardwood", "Tile", "Carpet", "Concrete"],
  wallColor: ["White", "Light Gray", "Blue", "Beige"],
};

export default function FinishModal({ onSave, onCancel }) {
  const [roomName, setRoomName] = useState("");
  const [flooring, setFlooring] = useState(finishOptions.flooring[0]);
  const [wallColor, setWallColor] = useState(finishOptions.wallColor[0]);

  const handleSubmit = () => {
    if (!roomName.trim()) return;
    onSave({ roomName, flooring, wallColor });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 text-black">
        <h2 className="text-xl font-bold mb-4">Room Settings</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full border px-2 py-1 mt-1"
          />
        </label>

        <label className="block mb-2">
          Flooring:
          <select
            value={flooring}
            onChange={(e) => setFlooring(e.target.value)}
            className="w-full border px-2 py-1 mt-1"
          >
            {finishOptions.flooring.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          Wall Color:
          <select
            value={wallColor}
            onChange={(e) => setWallColor(e.target.value)}
            className="w-full border px-2 py-1 mt-1"
          >
            {finishOptions.wallColor.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="text-sm text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
