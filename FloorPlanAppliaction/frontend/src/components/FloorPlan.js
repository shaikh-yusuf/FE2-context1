// src/components/FloorPlan.js
import React, { useEffect, useRef, useState } from "react";
import { Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
// import { cn } from "../lib/utils";

function FloorPlan({ floorPlanData, onUpdateRoom, scale, setScale }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);

  // Colors used for drawing
  const colors = {
    wall: "#333333",
    room: "#f5f5f5",
    roomHover: "#e0e0e0",
    door: "#8b4513",
    window: "#add8e6",
    grid: "#e5e5e5",
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to match container dimensions
    const resizeCanvas = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      drawFloorPlan();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [floorPlanData, scale, hoveredRoom]);

  const drawFloorPlan = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    drawGrid(ctx, canvas.width, canvas.height);
    floorPlanData.rooms.forEach((room) => {
      const isHovered = room.id === hoveredRoom;
      const x = centerX + room.position.x * scale;
      const y = centerY + room.position.y * scale;
      const width = room.dimensions.width * scale;
      const height = room.dimensions.height * scale;

      ctx.fillStyle = isHovered ? colors.roomHover : colors.room;
      ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = colors.wall;
      ctx.lineWidth = 5;
      ctx.strokeRect(x, y, width, height);

      // Draw room name
      ctx.fillStyle = "#000";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText(room.name, x + width / 2, y + height / 2);

      // Draw doors
      room.doors.forEach((door) => {
        drawDoor(ctx, door, room, x, y, width, height);
      });

      // Draw windows
      room.windows.forEach((win) => {
        drawWindow(ctx, win, room, x, y, width, height);
      });
    });
  };

  const drawGrid = (ctx, width, height) => {
    const gridSize = 20 * scale;
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawDoor = (ctx, door, room, roomX, roomY, roomWidth, roomHeight) => {
    const doorWidth = door.dimensions.width * scale;
    const doorHeight = door.dimensions.height * scale;
    let x = roomX;
    let y = roomY;
    switch (door.wall) {
      case "top":
        x += (roomWidth - doorWidth) * (door.position / 100);
        break;
      case "right":
        x += roomWidth - doorWidth;
        y += (roomHeight - doorHeight) * (door.position / 100);
        break;
      case "bottom":
        x += (roomWidth - doorWidth) * (door.position / 100);
        y += roomHeight - doorHeight;
        break;
      case "left":
        y += (roomHeight - doorHeight) * (door.position / 100);
        break;
      default:
        break;
    }
    ctx.fillStyle = colors.door;
    ctx.fillRect(x, y, doorWidth, doorHeight);
  };

  const drawWindow = (ctx, win, room, roomX, roomY, roomWidth, roomHeight) => {
    const windowWidth = win.dimensions.width * scale;
    const windowHeight = win.dimensions.height * scale;
    let x = roomX;
    let y = roomY;
    switch (win.wall) {
      case "top":
        x += (roomWidth - windowWidth) * (win.position / 100);
        break;
      case "right":
        x += roomWidth - windowWidth;
        y += (roomHeight - windowHeight) * (win.position / 100);
        break;
      case "bottom":
        x += (roomWidth - windowWidth) * (win.position / 100);
        y += roomHeight - windowHeight;
        break;
      case "left":
        y += (roomHeight - windowHeight) * (win.position / 100);
        break;
      default:
        break;
    }
    ctx.fillStyle = colors.window;
    ctx.fillRect(x, y, windowWidth, windowHeight);
  };

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if (dragging) {
      const dx = (mouseX - dragging.startX) / scale;
      const dy = (mouseY - dragging.startY) / scale;
      const room = floorPlanData.rooms.find((r) => r.id === dragging.roomId);
      if (room) {
        onUpdateRoom(dragging.roomId, {
          position: { x: room.position.x + dx, y: room.position.y + dy },
        });
        setDragging({ ...dragging, startX: mouseX, startY: mouseY });
      }
      return;
    }
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let hoveredRoomId = null;
    for (const room of floorPlanData.rooms) {
      const x = centerX + room.position.x * scale;
      const y = centerY + room.position.y * scale;
      const width = room.dimensions.width * scale;
      const height = room.dimensions.height * scale;
      if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
        hoveredRoomId = room.id;
        break;
      }
    }
    setHoveredRoom(hoveredRoomId);
    canvas.style.cursor = hoveredRoomId ? "move" : "default";
  };

  const handleMouseDown = (e) => {
    if (!canvasRef.current || !hoveredRoom) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    setDragging({ roomId: hoveredRoom, startX: mouseX, startY: mouseY });
  };

  const handleMouseUp = () => setDragging(null);
  const handleMouseLeave = () => {
    setDragging(null);
    setHoveredRoom(null);
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setScale(1);

  const handleExportImage = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "floor-plan.png";
    link.click();
  };

  useEffect(() => {
    drawFloorPlan();
  }, [floorPlanData, scale, hoveredRoom]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Floor Plan</h2>
        <div className="flex gap-2">
          <button onClick={handleZoomIn} title="Zoom In" className="p-2 border rounded">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button onClick={handleZoomOut} title="Zoom Out" className="p-2 border rounded">
            <ZoomOut className="h-4 w-4" />
          </button>
          <button onClick={handleResetZoom} title="Reset Zoom" className="p-2 border rounded">
            <RotateCw className="h-4 w-4" />
          </button>
          <button onClick={handleExportImage} title="Export as PNG" className="p-2 border rounded">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div ref={containerRef} className="flex-1 relative border border-gray-200 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full"
        />
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <p>Tip: Click and drag rooms to move them around</p>
      </div>
    </div>
  );
}

export default FloorPlan;


