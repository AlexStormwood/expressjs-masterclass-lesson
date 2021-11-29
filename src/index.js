// Setup .env variables
require('dotenv').config()

console.log(`Env variable message was:\n${process.env.NICE_MESSAGE}`);

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';



// We can receive JSON data from POST/PUT/PATCH/etc requests
app.use(express.json());
// Same as above but for form data
app.use(express.urlencoded({extended:true}));

app.get('/', (request, response) => {

    response.json({message:"It is a great Tuesday, my dudes"});
});

const importedPostRouting = require('./Posts/postsRoutes');
app.use('/posts', importedPostRouting);

app.listen(PORT, HOST, () => {
    console.log("Server is running!")
});