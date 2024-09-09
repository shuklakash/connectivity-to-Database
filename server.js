const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse incoming requests
// The method is used to parse URL-encoded data. URL-encoded data is what is submitted from HTML forms, where form fields are sent in the format of key-value pairs.
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/signup', (req, res) => {
    const { username, email, password, gender, mobile } = req.body;

    // Create a user object
    const newUser = {
        username,
        email,
        password,
        gender,
        mobile,
    };

    // Read the existing users from the JSON file
    const usersFilePath = path.join(__dirname, 'users.json');
    let users = [];

    if (fs.existsSync(usersFilePath)) {
        const usersData = fs.readFileSync(usersFilePath);
        users = JSON.parse(usersData);
    }

    // Add the new user to the users array
    users.push(newUser);

    // Save the updated users array back to the JSON file
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    // Send a response to the client
    res.send('congratulations Signup successful!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
