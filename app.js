import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (if needed)
app.use(express.static('public'));

// Render the initial form page
app.get('/', (req, res) => {
    res.send('index.html');
});


app.post('/get-jokes', async (req, res) => {
    const { language, type, amount, id } = req.body;
    const apiUrl = `https://v2.jokeapi.dev/joke/${type}?lang=${language}&amount=${amount}&idRange=${id}`;

    try {
        const response = await axios.get(apiUrl);
        const jokes = response.data;
        res.render('jokes', { jokes });
        // console.log(jokes);  // Log the fetched jokes data to the console
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching jokes');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
