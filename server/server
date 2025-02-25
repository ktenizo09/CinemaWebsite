const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache'); // Importing NodeCache
const rateLimit = require('express-rate-limit'); // Importing express-rate-limit

const app = express(); // Create an express app
const apiKey = '2ca07079918fc4cc9398ada6f5671ac6'; // API Key for TMDB website 
const baseUrl = "https://api.themoviedb.org/3" // Base URL for TMDB API
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

// Apply rate limiting to all requests
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `windowMs` (15 minutes)
    message: "Too many requests from this IP, please try again later."
});

app.use(limiter); // Apply rate limiting to all requests

// GET API Endpoint for retrieving trending movies
app.get("/movies", async (req, res) => {
    try {
        const resp = await axios.get(`${baseUrl}/trending/movie/week?api_key=${apiKey}&media_type=movie`);
        const results = resp.data.results || [];

        console.log(21, results);
        res.json(results);
    }
    catch (error) {
        console.log("Error fetching movies: ", error);
        res.status(500).json({ error: 'Failed to fetch movies' });

    }
})

// GET API Endpoint for retrieving selected movie 
app.get("/movies/:movieId", async (req, res) => {
    try {
        const movieId = req.params.movieId;

        const resp = await axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
        console.log(21, resp.data);
        res.json(resp.data);
    }
    catch (error) {
        console.log("Error fetching movie data: ", error);
        res.status(500).json({ error: 'Failed to fetch movie data' });
    }
})

// GET API Endpoint for retrieving searched movie
app.get("/search", async (req, res) => {
    const { query, page = 1 } = req.query;
    const cacheKey = `search:${query}`; // Cache key for search query

    // Check if the data is already cached
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
        console.log('Returning cached data');
        return res.json(cachedResult);
    }

    try {
        const resp = await axios.get(`${baseUrl}/search/movie`, {
            params: {
                api_key: apiKey,
                query,
                page,
            },
        });
        const results = {
            results: resp.data.results,
            total_pages: resp.data.total_pages, // Use total_pages to match client code
            page: parseInt(page), // Use page to match client code
        };

        console.log(21, results);
        cache.set(cacheKey); // Store results in cache
        res.json(results);
    }
    catch (error) {
        console.log("Error fetching movies: ", error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
})

app.listen(5000, () => { console.log("Server started on port 5000") })