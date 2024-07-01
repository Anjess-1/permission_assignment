const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/user', userRoutes); // Authentication routes
app.use('/login', authRoutes); // User routes (protected by JWT)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
