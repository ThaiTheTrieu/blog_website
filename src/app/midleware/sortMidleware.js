module.exports = function sortMidleWare(req, res, next) {
    res.locals._sort = {
        enable: false,
        type: 'default',
    }

    if (req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enabel = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.name = req.query.column;

        Object.assign(res.locals._sort, {
            enable: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
}