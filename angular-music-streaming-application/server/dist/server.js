var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('server/db.json');
var middlewares = jsonServer.defaults();
var db = require('./db.json');
var fs = require('fs');
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post('/login', function (req, res) {
    var users = readUsers();
    var user = users.filter(function (u) { return u.username === req.body.username && u.password === req.body.password; })[0];
    if (user) {
        res.send(__assign(__assign({}, formatUser(user)), { token: user.token }));
    }
    else {
        res.status(401).send('Incorrect username or password');
    }
});
server.use(router);
server.listen(3000, function () {
    console.log('JSON Server is running');
});
function formatUser(user) {
    delete user.password;
    return user;
}
function readUsers() {
    var dbRaw = fs.readFileSync('./server/db.json');
    var users = JSON.parse(dbRaw).users;
    return users;
}
