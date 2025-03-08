// src/Home.js
import React, { useEffect, useState } from "react";
import FloorPlan from "./components/FloorPlan";
import Sidebar from "./components/Sidebar";
import { Loader2 } from "lucide-react";

function Home() {
  const [floorPlanData, setFloorPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1); // For zooming (passed to FloorPlan)

  useEffect(() => {
    const fetchFloorPlan = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/floorplan");
        if (!response.ok) {
          throw new Error("Failed to fetch floor plan data");
        }
        const data = await response.json();
        setFloorPlanData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFloorPlan();
  }, []);

  const handleUpdateRoom = (roomId, updates) => {
    if (!floorPlanData) return;
    const updatedRooms = floorPlanData.rooms.map((room) =>
      room.id === roomId ? { ...room, ...updates } : room
    );
    setFloorPlanData({ ...floorPlanData, rooms: updatedRooms });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading floor plan...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col md:flex-row h-screen">
      <Sidebar floorPlanData={floorPlanData} onUpdateRoom={handleUpdateRoom} />
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        <FloorPlan
          floorPlanData={floorPlanData}
          onUpdateRoom={handleUpdateRoom}
          scale={scale}
          setScale={setScale}
        />
      </div>
    </main>
  );
}

export default Home;
