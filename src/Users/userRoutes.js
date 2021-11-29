const express = require('express');

const routes = express.Router();

const {signUpUser, signInUser} = require("./userFunctions");

routes.post("/sign-up", async (request, response) => {
    let newUserDetails = {
        email: request.body.email,
        password: request.body.password,
        username: request.body.username
    }

    if (newUserDetails.password.length < 8){
        console.log("Password too short!")
        response.json({error:"Password too short!"})
    }

    let signUpResult = await signUpUser(newUserDetails);

    if (signUpResult.error != null){
        console.log("Sign up failed, returning error to requester");
        response.json(signUpResult);
        return;
    }

    let signInResult = await signInUser(newUserDetails);

    if (signInResult.error != null){
        console.log("Sign in failed, returning error to requester");
        response.json(signInResult);
        return;
    }

    response.json(signInResult);

});


routes.post("/sign-in", async (request, response) => {
    let existingUserDetails = {
        email: request.body.email,
        password: request.body.password,
    }

    let signInResult = await signInUser(existingUserDetails);

    if (signInResult.error != null){
        console.log("Sign in failed, returning error to requester");
        response.json(signInResult);
        return;
    }
    response.json(signInResult);
});

module.exports = routes;