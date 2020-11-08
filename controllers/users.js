const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, response) => {
    const payload = request.body;

    if(!payload || (Object.keys(payload).length === 0 && payload.constructor === Object)){
        return response.status(400).json({
            error: 'payload is an empty object'
        });
    }

    if(payload.password && payload.password.length < 3){
        return response.status(400).json({
            error: 'password should be a min of 3 characters'
        });
    }
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(payload.password, saltRounds);

    const newUser = new User({
        username: payload.username,
        name: payload.name,
        passwordHash
    });

	const result = await newUser.save();
	response.status(201).json(result);
});

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { user: 0 });
	response.json(users);
});

module.exports = usersRouter;