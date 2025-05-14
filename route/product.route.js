const express = require("express");
const router = express.Router();
const productController = require("./../controller/product.controller");


router.post('/:page/:term?', productController.getList);

router.get('/:id', productController.getById);

router.delete('/:id',productController.delete);

module.exports = router;