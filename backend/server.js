// server.js
const cors = require("cors");
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 5000; // Choose a port for your server

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors());

// Route to fetch movie data from OMDB API
app.get("/movies/:title", async (req, res) => {
  try {
    const { title } = req.params;
    console.log("Received request for title:", title);

    require("dotenv").config(); // Load environment variables from .env file
    const apiKey = process.env.OMDB_API_KEY;

    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`
    );
    // const response = await axios.get(
    //   `http://www.omdbapi.com/?apikey=53e45db6&s=batman`
    // );
    const data = response.data;
    console.log("Sending response:", data);
    res.json(data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Something is going wrong" });
  }
});

// Start the server
app.listen(PORT, () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
