let data = require('./../data/product.json');

exports.getList = (req, res, next) => {
    let result = [...data];
    if (req.body.terms) {
        for (let term of req.body.terms) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(term.toLowerCase())
            )
        }
    }
    res.status(200).json({
        count: result.length,
        data: result.slice(20 * (req.params.page - 1), 20 * (req.params.page))
    });
}

exports.getById = (req, res, next) => {
    let product = data.find(product => product.id == req.params.id);
    res.status(200).json(product);
}

exports.delete = (req, res, next) => {
    data = data.filter(product => product.id !== req.params.id);
    res.status(200).json({success: true});
}