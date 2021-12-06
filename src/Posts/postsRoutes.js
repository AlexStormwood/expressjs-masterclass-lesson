const express = require('express');
const { randomNumberGenerator, someAsyncFunction, getAllPosts, createSpecificPost } = require('./postsFunctions');

const routes = express.Router();

// get all posts 
routes.get('/', async (request, response) => {
    let allPosts = await getAllPosts();
    response.json(allPosts);

    //response.json(`Received a request on ${request.originalUrl}`);

});

// create a new post 
routes.post('/', async (request, response) => {
    //let tempPostDetails = {}
    //let creationResult = await createSpecificPost(tempPostDetails)
    let creationResult = await createSpecificPost(
        {
            postTitle: request.body.postTitle,
            postContent: request.body.postContent,
            postAuthorID: request.body.postAuthorID,
            postRating: request.body.postRating
        }
    );

    response.json(creationResult);
});


routes.get('/randomNumber',async (request,response)=>{
    let asyncResult = await someAsyncFunction();
    response.send(`<h1>${randomNumberGenerator()}</h1>`); 
});
 

routes.get('/:postID', (request, response) => {

    response.json(`Route param was ${request.params.postID}`)

});

// routes.post('/:postID', (request, response) => {

//     let submittedData = request.body;

//     console.log(JSON.stringify(submittedData));

//     let submittedName = request.body.name.toUpperCase();
//     submittedName += submittedName;

//     // for form urlencoded submission
//     //let submittedPokemon = JSON.parse(request.body.favouritePokemon).name;

//     // for raw json submission
//     let submittedPokemon = request.body.favouritePokemon.name;

//     response.json(`Received fave Pokemon of ${submittedPokemon} `)
// });


// routes.get('/:username/status/:postID', (request, response) => {

//     response.json(`Route param was ${request.params}`)

// });

module.exports = routes;