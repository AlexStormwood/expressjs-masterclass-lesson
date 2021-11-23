const express = require('express');
const { randomNumberGenerator } = require('./postsFunctions');

const routes = express.Router();


routes.get('/', (request, response) => {

    response.json(`Received a request on ${request.originalUrl}`);

});

routes.get('/randomNumber',(request,response)=>{

    response.send(`<h1>${randomNumberGenerator()}</h1>`); 
 });
 

routes.get('/:postID', (request, response) => {

    response.json(`Route param was ${request.params.postID}`)

});

routes.post('/:postID', (request, response) => {

    let submittedData = request.body;

    console.log(JSON.stringify(submittedData));

    let submittedName = request.body.name.toUpperCase();
    submittedName += submittedName;

    // for form urlencoded submission
    //let submittedPokemon = JSON.parse(request.body.favouritePokemon).name;

    // for raw json submission
    let submittedPokemon = request.body.favouritePokemon.name;

    response.json(`Received fave Pokemon of ${submittedPokemon} `)
});


// routes.get('/:username/status/:postID', (request, response) => {

//     response.json(`Route param was ${request.params}`)

// });

module.exports = routes;