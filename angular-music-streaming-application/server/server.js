const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');

const server = jsonServer.create();
const router = jsonServer.router('db.json'); 
const db = router.db; 

const jwtSecret = process.env.JWT_SECRET_KEY || 'defaultsecretkey';
const expiresIn = '1h';

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/api/users/:id', express.json());

server.put('/api/users/:id', (req, res) => {
    try {
        const user = req.body;
        const id = Number(req.params.id);
        const users = db.get('users');
        
        const existingUser = users.find({ id }).value();

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        users.find({ id }).assign(user).write();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
});

server.post('/api/auth/register', async (req, res) => {
    const { email, username, password, role } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);

        const users = db.get('users');
        const lastUserObjectId = users.value().length > 0 ? users.value()[users.value().length - 1].id : 0;

        users.push({ id: lastUserObjectId + 1, email, username, password: hashedPassword, role }).write();

        const token = createToken({ username });

        res.status(200).json({ token, username, role });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

server.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body; 

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = db.get('users').find({ username }).value();

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = createToken({ username, id: user.id });
            return res.status(200).json({ token, username: user.username, role: user.role });
        } else {
            return res.status(400).json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.error('Error during login:', error); 
        return res.status(500).json({ message: 'Internal server error' });
    }
});

server.post('/api/auth/reauthenticate', (req, res) => {
    try {
        const token = req.body.authToken;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const decodedToken = jwt.verify(token, jwtSecret);
        const user = db.get('users').find({ username: decodedToken.username }).value();
        
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Reauthentication failed:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running and listening on port 3000');
});

const createToken = (payload) => {
    return jwt.sign(payload, jwtSecret, { expiresIn });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        throw new Error('Token verification failed');
    }
};