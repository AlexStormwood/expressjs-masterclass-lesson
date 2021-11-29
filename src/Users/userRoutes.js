const express = require('express');

const routes = express.Router();

const {signUpUser} = require("./userFunctions");

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

    response.json(signUpResult);
});


module.exports = routes;