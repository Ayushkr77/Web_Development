// You have to create a middleware for rate limiting a users request based on their username passed in the header

const express = require('express');
const app = express();

// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};

// Reset the counter every second
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000);

// Global middleware using app.use
app.use((req, res, next) => {
    const userId = req.headers['user-id'];

    // If no user-id is provided
    if (!userId) {
        return res.status(400).json({ msg: 'user-id header missing' });
    }

    if (!numberOfRequestsForUser[userId]) {
        numberOfRequestsForUser[userId] = 1;
    } else {
        numberOfRequestsForUser[userId]++;
    }

    if (numberOfRequestsForUser[userId] > 5) {
        return res.status(404).json({ msg: 'Rate limit exceeded' });
    }

    next();
});

// Routes
app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
    res.status(200).json({ msg: 'created dummy user' });
});

// To run directly
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;



// Can see more these type of middleware files in https://github.com/100xdevs-cohort-3/assignments/tree/main/week-4/middlewares