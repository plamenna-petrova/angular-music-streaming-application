const jsonServer = require('json-server');
const auth = require('json-server-auth');

const fs = require('fs');

const bodyParser = require('body-parser');

const express = require('express');

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('json-server-auth/dist/constants');

const server = jsonServer.create();
const router = jsonServer.router('server/db.json');

const bcrypt = require('bcrypt');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const expiresIn = '1h';

const db = JSON.parse(fs.readFileSync("./server/db.json", "utf-8"));

server.use('/api/users/:id', express.json());

server.put('/api/users/:id', (req: any, res: any) => {
    try {
        const user = req.body;
        const id = Number.parseInt(req.params.id);
        const index = db.users.findIndex({ id: id }).value();
        const users = db.users.value;
        users[index] = user;
        db.users.assign(users).write();
        res.status(200).send();
    } catch (exception) {
        res.status(400).send();
    }
});

server.post('/api/auth/register', (req: any, res: any) => {
    const { email, password } = req.body;

    if (isUserRegistrationAuthencticated({ email })) {
        const status = 401;
        const message = 'Email already exists';
        res.status(status).json({ status, message });
        return;
    }

    fs.readFile("./server/db.json", async (err: any, data: any) => {
        if (err) {
            const status = 401;
            const message = err;
            res.status(status).json({ status, message });
            return;
        }

        data = JSON.parse(data.toString());

        let lastUserObjectId = data.users[data.users.length - 1].id;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);

        data.users.push({ id: lastUserObjectId + 1, email: email, password: hashedPassword });

        console.log('data', data.users);

        await fs.writeFile(
            "./server/db.json",
            JSON.stringify(data),
            (err: any, result: any) => {
                console.log('writing in json db');
                if (err) {
                    console.log('error found');
                    const status = 401;
                    const message = err;
                    res.status(status).json({ status, message });
                    return;
                }
            }
        );
    });
    const access_token = createToken({ email, password });
    res.status(200).json({ access_token: access_token, user: { email: email } });
});

server.post('/api/auth/login', async (req: any, res: any) => {
    const { email, password } = req.body;
    
    if (!isUserLoginAuthenticated({ email })) {
        console.log('false');
        const status = 401;
        const message = 'Incorrect email';
        res.status(status).json({ status, message });
        return;
    }
    const user = db.users.find((user: any) => user.email === email);

    console.log('user');
    console.log(user);

    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const access_token = createToken({ email, password });
            res.status(200).json({ access_token: access_token, user: { email: email } });
        } else {
            res.status(400).json({ error: "Invalid password" });
        }
    } else {
        res.status(401).json({ error: "Such user doesn't exits" });
    }
});

server.post('/api/auth/reauthenticate', (req: any, res: any, next: any) => {
    try {
        const token = req.body.auth_token;
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const user = db.users.find({ email: decoded.email }).value();
        res.json(user);
    } catch (error) {
        res.status(401).send();
    }
});

server.use(/^(?!\/auth).*$/, (req: any, res: any, next: any) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Error in authorization format';
        res.status(status).json({ status, message });
        return;
    }
    try {
        verifyToken(req.headers.authorization.split(' ')[1]);
        next();
    } catch (err) {
        const status = 401;
        const message = 'Error - the access token is revoked';
        res.status(status).json({ status, message });
    }
});

server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running and listening');
});

const createToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
};

const verifyToken = (token: any) => {
    return jwt.verify(token, JWT_SECRET_KEY, (err: any, decode: any) => decode !== undefined ? decode : null);
};

function isUserRegistrationAuthencticated({ email }: any) {
    return db.users.findIndex((user: any) => user.email === email) !== -1;
}

const isUserLoginAuthenticated = ({ email }: any) => {
    return db.users.findIndex((user: any) => user.email === email) !== -1;
};
