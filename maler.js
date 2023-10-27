// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const path = require('path');

// Mailgun configuration
const api_key = 'c3b4fca235038f90208ef9a0b100aefe-324e0bb2-acf7934e';
const domain = 'sandboxe96976fb19ca48b9b28109967c125a34.mailgun.org';
const mail = mailgun({ apiKey: api_key, domain: domain });

// Create an Express application
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/subscribe', (req, res) => {
    const userEmail = req.body.Email;

    const emailContent = {
        from: 'Aditya <adityabharti528@gmail.com>',
        to: userEmail,
        subject: "Welcome to maler",
        text: "Welcome to our brand new software. You will be receiving regular emails regarding our latest launches."
    };

    mail.messages().send(emailContent, (error, body) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Failed to send email');
        }

        console.log(body);

        // Redirect to the success page
        res.redirect('/success.html');
    });
});

// Serve the success.html page
app.get('/success.html', (req, res) => {
    res.sendFile(path.join(__dirname, "success.html"));
});

// Start the server
app.listen(7200, () => {
    console.log("Server is running at port 7200");
});
