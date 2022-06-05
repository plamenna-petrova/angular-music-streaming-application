const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req: any, res: any) => {
    const users = readUsers();

    const user = users.filter(
        (u: any) => u.username === req.body.username && u.password === req.body.password
    )[0];

    if (user) {
        res.send({ ...formatUser(user), token: checkIfAdmin(user) });
    } else {
        res.status(401).send('Incorrect username or password');
    }
});

server.post('/register', (req: any, res: any) => {
    const users = readUsers();
    const user = users.filter((u: { username: any; }) => u.username === req.body.username)[0];

    if (user === undefined || user === null) {
        res.send({
            ...formatUser(req.body),
            token: checkIfAdmin(req.body)
        });
        db.users.push(req.body);
    } else {
        res.status(500).send('User already exists');
    }
});

server.use('/users', (req: any, res: any, next: any) => {
    if (isAuthorized(req) || req.query.bypassAuth === 'true') {
        next();
    } else {
        res.sendStatus(401);
    }
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

function formatUser(user: any) {
    delete user.password;
    user.role = user.username === 'admin'
        ? 'admin'
        : 'user';
    return user;
}

function checkIfAdmin(user: any, bypassToken = false) {
    return user.username === 'admin' || bypassToken === true
        ? 'admin-token'
        : 'user-token';
}

function isAuthorized(req: any) {
    return req.headers.authorization === 'admin-token' ? true : false;
}

function readUsers() {
    const dbRaw = fs.readFileSync('./server/db.json');
    const users = JSON.parse(dbRaw).users
    return users;
}

function generateToken() {
    let charsForTokenConstruction = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    let tokenArray = [];
    for (let i: number = 0; i < 32; i++) {
        let randomCharacterIndex: number = (Math.random() * (charsForTokenConstruction.length - 1)).toFixed(0) as unknown as number;
        tokenArray[i] = charsForTokenConstruction[randomCharacterIndex];
    }
    return tokenArray.join("");
}