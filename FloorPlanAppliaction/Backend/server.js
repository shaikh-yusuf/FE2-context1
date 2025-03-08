const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS for all routes.
// Optionally, you can restrict the allowed origins, e.g.:
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());

// Sample floor plan data
const floorPlanData = {
  id: "fp1",
  name: "Sample Floor Plan",
  rooms: [
    {
      id: "room1",
      name: "Living Room",
      position: { x: -150, y: -100 },
      dimensions: { width: 300, height: 200 },
      doors: [
        {
          wall: "bottom",
          position: 50, // Center of the wall
          dimensions: { width: 40, height: 10 },
        },
        {
          wall: "right",
          position: 30,
          dimensions: { width: 10, height: 40 },
        },
      ],
      windows: [
        {
          wall: "top",
          position: 30,
          dimensions: { width: 60, height: 10 },
        },
        {
          wall: "top",
          position: 70,
          dimensions: { width: 60, height: 10 },
        },
      ],
    },
    {
      id: "room2",
      name: "Kitchen",
      position: { x: 150, y: -100 },
      dimensions: { width: 200, height: 150 },
      doors: [
        {
          wall: "left",
          position: 30,
          dimensions: { width: 10, height: 40 },
        },
      ],
      windows: [
        {
          wall: "right",
          position: 50,
          dimensions: { width: 10, height: 60 },
        },
      ],
    },
    {
      id: "room3",
      name: "Bedroom",
      position: { x: -150, y: 100 },
      dimensions: { width: 250, height: 180 },
      doors: [
        {
          wall: "top",
          position: 50,
          dimensions: { width: 40, height: 10 },
        },
      ],
      windows: [
        {
          wall: "bottom",
          position: 50,
          dimensions: { width: 60, height: 10 },
        },
      ],
    },
    {
      id: "room4",
      name: "Bathroom",
      position: { x: 150, y: 100 },
      dimensions: { width: 120, height: 150 },
      doors: [
        {
          wall: "left",
          position: 50,
          dimensions: { width: 10, height: 40 },
        },
      ],
      windows: [
        {
          wall: "right",
          position: 50,
          dimensions: { width: 10, height: 40 },
        },
      ],
    },
  ],
};

// Define a route that sends the floor plan data as JSON
app.get("/api/floorplan", (req, res) => {
  res.json(floorPlanData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
