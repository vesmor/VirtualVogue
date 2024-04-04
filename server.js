const express = require('express');
var nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require("path");
const PORT = process.env.PORT || 5001;

// Allow ".env" to be used
require("dotenv").config();

const cloudinary = require("./utils/cloudinary");
const upload = require("./middleware/multer");

// Connect to MongoDB
const { MongoClient } = require("mongodb");
const url = process.env.ATLAS_URI;
console.log(url);
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(console.log("mongodb connected"));
const db = client.db("VirtualCloset");
const ObjectId = require('mongodb').ObjectId;   // Get ObjectId type

// Run Server
app.listen(PORT, () =>
{
    console.log(`Server is running on port: ${PORT}`);
});

// Headers
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Login API Endpoint
app.post('/api/Login', async (req, res, next) =>
{
    // incoming: login, password
    // outgoing: userId, firstName, lastName, email, verified (isVerified), error

    var error = '';
    var id = -1;
    var fn = '';
    var ln = '';
    var em = '';
    var vr = false;

    try {
        const { login, password } = req.body;
        const results = await db.collection('Users').find({Login:login,Password:password}).toArray();
    
        if( results.length > 0 )
        {
            id = results[0]._id;
            fn = results[0].FirstName;
            ln = results[0].LastName;
            em = results[0].Email;
            vr = results[0].isVerified;
        }

        if ( id == -1 ) {
            error = "User or password is incorrect"
        }
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { userId:id, firstName:fn, lastName:ln, email:em, verified:vr, error:error };
    res.status(200).json(ret);
});

// Register API Endpoint
app.post('/api/Register', async (req, res, next) =>
{
    // incoming: login, password, firstName, lastName, email
    // outgoing: userId, error

    const { login, password, firstName, lastName, email } = req.body;

    const newUser = {Login:login,Password:password,FirstName:firstName,LastName:lastName,Email:email,isVerified:false};
    var error = '';
    var id = -1;

    try
    {
        // check if username exists
        var results = await db.collection('Users').find({Login:login}).toArray();

        if ( results.length == 0 )
        {

            // check if email is already being used
            results = await db.collection('Users').find({Email:(email.toLowerCase())}).toArray();

            if ( results.length == 0 ) 
            {

                // insert user and retrive id
                results = await db.collection('Users').insertOne(newUser);
                if (results.acknowledged) 
                {
                    id = results.insertedId;
                }
            }
            else
            {
                error = "An account is already associated with this email";
            }
        }
        else 
        {
            error = "Username already exists";
        }
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { userId:id, error:error };
    if(!error) sendVerificationEmail(email, ret.userId);
    res.status(200).json(ret);
});

// Update Password API Endpoint
app.post('/api/UpdatePass', async (req, res, next) =>
{
    // incoming: userId, newPassword
    // outgoing: error

    const { userId, newPassword } = req.body;

    const filter = { _id: new ObjectId(userId) };
    const updateDoc = {
        $set: {
            Password: newPassword
        },
    };
    const options = { upsert: false }

    var error = '';

    try
    {
        const results = await db.collection('Users').updateOne(filter, updateDoc, options);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

// Update isVerified API Endpoint
app.post('/api/UpdateVerification', async (req, res, next) =>
{
    // incoming: userId
    // outgoing: error
    const userId = req.body.userId;
    console.log("UserId: " + userId);
    const filter = { _id: new ObjectId(userId) };
    const updateDoc = {
        $set: {
            isVerified: true
        },
    };
    const options = { upsert: false }

    var error = '';

    try
    {
        const results = await db.collection('Users').updateOne(filter, updateDoc, options);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);});

// Delete User API Endpoint
// app.delete('/api/DeleteUser', async (req, res, next) =>
// {

// });

// Update Settings API Endpoint
app.post('/api/UpdateSettings/', async (req, res, next) =>
{
    // incoming: userId, firstName, lastName, email, login, password
    // outgoing: error

    const { userId,firstName,lastName,email,login,password } = req.body;

    const filter = { _id: new ObjectId(userId) };
    const updateDoc = {
        $set: {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Login: login,
            Password: password
        },
    };
    const options = { upsert: false }

    var error = '';

    try
    {
        // check if username and email exists already
        const result1 = await db.collection('Users').find({Login:login}).toArray();
        const result2 = await db.collection('Users').find({Email:(email.toLowerCase())}).toArray();
        var userExists = true;
        var emailExists = true;

        if ( result1.length == 0 || (result1.length > 0 && result1[0]._id == userId) ) 
        {
            userExists = false;
        }

        if ( result2.length == 0 || (result2.length > 0 && result2[0]._id == userId) ) 
        {
            emailExists = false;
        }

        // Update error messages
        if (userExists == true && emailExists == true)
        {
            error = "Username and email are already in use";
        }
        else if (userExists == true) 
        {
            error = "Username already exists";
        }
        else if (emailExists == true) 
        {
            error = "An account is already associated with this email";
        }

        // Update settings
        else 
        {
            const results = await db.collection('Users').updateOne(filter, updateDoc, options);
        }
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

const sendVerificationEmail = (email, userId) =>{
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user: process.env.emailSender,
            pass: process.env.emailPassword
        }
    });

    var mailOptions;
    let sender = "Virtual Vogue Team";
    mailOptions = {
        from: sender,
        to: email,
        subject: "Email Verification",
        html: `Click of the following link to verify your email. <a href=http://localhost:3000/verification-check?userId=${userId}> here </a>`
    };

    Transport.sendMail(mailOptions, function(error, respose){
        if(error){
            console.log(error);
        }
        else{
            console.log("Message sent");
        }
    });
}

const sendResetPasswodnEmail = (email, userId) =>{
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth:{
          user: process.env.emailSender,
          pass: process.env.emailPassword
        }
    });

    var mailOptions;
    let sender = "Virtual Vogue Team";
    mailOptions = {
        from: sender,
        to: email,
        subject: "Reset Password",
        html: `Click of the following link to change your password. <a href=http://localhost:3000/resetpassword?userId=${userId}> here </a>`
    };

    Transport.sendMail(mailOptions, function(error, respose){
        if(error){
            console.log(error);
        }
        else{
            console.log("Message sent");
        }
    });
}

app.post('/api/findUser', async (req, res, next) =>
{
    // incoming: email
    // outgoing: boolean found or not

    var error = '';
    var found = false;

    try {
        const email = req.body.email;
        const results = await db.collection('Users').find({Email: email.toLowerCase()}).toArray();
        console.log(email);
        console.log(results.length);
        if( results.length > 0 )
        {
            found = true;
            sendResetPasswodnEmail(email,results[0]._id);
        }
        else {
            error = "User with this email doesn't exist";
        }
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { found: found, error:error };
    res.status(200).json(ret);
});

// Heroku Deployment
if (process.env.NODE_ENV === 'production')
{
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}