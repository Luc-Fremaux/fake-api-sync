let data = require('./../data/users.json');

exports.getList = (req, res, next) => {
    let result = [...data];
    if (req.body.terms) {
        for (let term of req.body.terms) {
            result = result.filter(user =>
                user.firstName.toLowerCase().includes(term.toLowerCase()) ||
                user.lastName.toLowerCase().includes(term.toLowerCase()) ||
                user.jobTitle.toLowerCase().includes(term.toLowerCase())
            )
        }
    }
    res.status(200).json({
        count: result.length,
        data: result.slice(20 * (req.params.page - 1), 20 * (req.params.page))
    });
}

exports.getById = (req, res, next) => {
    let user = data.find(user => user.id == req.params.id);
    res.status(200).json(user);
}

exports.delete = (req, res, next) => {
    data = data.filter(user => user.id !== req.params.id);
    res.status(200).json({success: true});
}