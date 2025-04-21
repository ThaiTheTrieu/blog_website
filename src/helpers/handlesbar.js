const handlebars = require('handlebars');
module.exports = {
    sum: (a, b) => a + b,
    sortabel: (feild, sort) => {
        const sortType = feild === sort.column ? sort.type : 'default';
        let typeIcons = {
            default: "bx bxs-sort-alt",
            desc: "bx bx-sort-up",
            asc: "bx bx-sort-down",
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };

        const typeIcon = typeIcons[sortType];
        const type = types[sortType];
        const href = handlebars.escapeExpression(`?_sort&column=${feild}&type=${type}`)

        const result = `<a href=${href}> <i class='${typeIcon}'></i></a>`;
        return new handlebars.SafeString(result);
    },
}