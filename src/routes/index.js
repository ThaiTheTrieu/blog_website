const course = require('./course');
const site = require('./site');
const me = require('./me');
const user = require('./user');

function routes(app) {
    app.use('/me', me);
    app.use('/course', course);
    app.use('/user', user);
    app.use('/', site);
}

module.exports = routes