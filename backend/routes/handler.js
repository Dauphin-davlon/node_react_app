const express = require('express');
const router = express.Router();
const Schemas = require('../models/schemas.js');

router.get('/addUser', async (req, res) => {
    const user = {username : 'eaglefang', fullname: 'Sensei Johnny'};
    const newUser = new Schemas.Users(user);

    try {
        const newUserResult = await newUser.save();
        console.log('New User Created');
        res.end('New user created');
    } catch(err) {
        console.error(err);
        res.end('User not added');
    }
});

// Define a new route to fetch data from the database
router.get('/getUsers', async (req, res) => {
    try {
        // Use the Users model to query the database and retrieve user data
        const users = await Schemas.Users.find();

        // Check if any users were found
        if (users.length === 0) {
            res.status(404).json({ message: 'No users found in the database.' });
        } else {
            // Send the user data as a JSON response
            res.status(200).json(users);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


router.get('/tweets', async (req,res) => {
    const tweets = Schemas.Tweets;

    try {
        const userTweets = await tweets.find({}).populate("user");
        res.end(JSON.stringify(userTweets));
    } catch (err) {
        console.error(err);
        res.end();
    }


    /*
    const userTweets = await tweets.find({}, (err, tweetData) => {
        if(err) throw err;
        if(tweetData) {
            res.end(JSON.stringify(tweetData));
        } else {
            res.end();
        }
    
    });
    */
});

router.post('/addTweet', async(req,res) => {
    const userTweet =  req.body.tweetInput;
    const user = Schemas.Users;
    const userId = await user.findOne({username :'eaglefang'}).exec();

    const newTweet = new Schemas.Tweets({
        tweet: userTweet,
        user:  userId._id
    });

    try{
        await newTweet.save();
    }
    catch(err){
        console.log(err);
    }
    res.redirect('/tweets');
    res.end;
});

module.exports = router;
