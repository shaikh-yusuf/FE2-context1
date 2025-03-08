// src/components/Sidebar.js
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useState } from "react";

function Sidebar({ floorPlanData, onUpdateRoom }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  if (!floorPlanData) return null;
  
  const handleRoomSelect = (roomId) => setSelectedRoom(roomId);
  const handleDimensionChange = (roomId, dimension, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) return;
    onUpdateRoom(roomId, {
      dimensions: {
        ...floorPlanData.rooms.find((r) => r.id === roomId)?.dimensions,
        [dimension]: numValue,
      },
    });
  };

  const selectedRoomData = selectedRoom ? floorPlanData.rooms.find((room) => room.id === selectedRoom) : null;

  return (
    <div className="w-full md:w-80 bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Floor Planner</h2>
      <Tabs defaultValue="rooms">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>
        <TabsContent value="rooms" className="space-y-4 mt-4">
          <div className="space-y-2">
            {floorPlanData.rooms.map((room) => (
              <Button
                key={room.id}
                className={`w-full text-left ${selectedRoom === room.id ? "bg-blue-100" : "bg-white"}`}
                onClick={() => handleRoomSelect(room.id)}
              >
                {room.name}
              </Button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="properties" className="space-y-4 mt-4">
          {selectedRoomData ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedRoomData.name}</CardTitle>
                <CardDescription>Edit room properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="width">Width (meters)</Label>
                  <Input
                    id="width"
                    type="number"
                    min="1"
                    step="0.1"
                    value={selectedRoomData.dimensions.width}
                    onChange={(e) => handleDimensionChange(selectedRoomData.id, "width", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (meters)</Label>
                  <Input
                    id="height"
                    type="number"
                    min="1"
                    step="0.1"
                    value={selectedRoomData.dimensions.height}
                    onChange={(e) => handleDimensionChange(selectedRoomData.id, "height", e.target.value)}
                  />
                </div>
                <Accordion>
                  <AccordionItem defaultOpen>
                    <AccordionTrigger>Doors ({selectedRoomData.doors.length})</AccordionTrigger>
                    <AccordionContent>
                      {selectedRoomData.doors.map((door, index) => (
                        <div key={index} className="p-2 border rounded mb-2">
                          <div className="flex justify-between">
                            <span>Door {index + 1}</span>
                            <span className="text-sm text-gray-500">{door.wall} wall</span>
                          </div>
                          <div className="text-sm text-gray-500">Position: {door.position}%</div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionTrigger>Windows ({selectedRoomData.windows.length})</AccordionTrigger>
                    <AccordionContent>
                      {selectedRoomData.windows.map((win, index) => (
                        <div key={index} className="p-2 border rounded mb-2">
                          <div className="flex justify-between">
                            <span>Window {index + 1}</span>
                            <span className="text-sm text-gray-500">{win.wall} wall</span>
                          </div>
                          <div className="text-sm text-gray-500">Position: {win.position}%</div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center p-4 text-gray-500">
              Select a room to view and edit its properties
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Sidebar;

