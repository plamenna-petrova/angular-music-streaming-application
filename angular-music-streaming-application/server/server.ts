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
        res.send({ ...formatUser(user), token: user.token });
    } else {
        res.status(401).send('Incorrect username or password');
    }
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

function formatUser(user: any) {
    delete user.password;
    return user;
}

function readUsers() {
    const dbRaw = fs.readFileSync('./server/db.json');
    const users = JSON.parse(dbRaw).users
    return users;
}