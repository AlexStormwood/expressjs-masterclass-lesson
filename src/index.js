// Setup .env variables
require('dotenv').config()

console.log(`Env variable message was:\n${process.env.NICE_MESSAGE}`);

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';


const {databaseConnector} = require('./database');

const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/expressmongolesson'

databaseConnector(DATABASE_URI).then(() => {

    console.log('Database connected, yay!');
}).catch(error => {
    console.log(`
    Some error occured connecting to the database. It was:
    ${error}
    `)
})





const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))
});


// We can receive JSON data from POST/PUT/PATCH/etc requests
app.use(express.json());
// Same as above but for form data
app.use(express.urlencoded({extended:true}));

app.get('/', (request, response) => {

    response.json({message:"It is a great Tuesday, my dudes"});
});

const importedPostRouting = require('./Posts/postsRoutes');
app.use('/posts', importedPostRouting);

const importedUserRouting = require('./Users/userRoutes');
app.use('/users', importedUserRouting);

app.listen(PORT, HOST, () => {
    console.log("Server is running!")
});