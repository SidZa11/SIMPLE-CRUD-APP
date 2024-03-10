const express = require('express');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controller/product.controller');

const router = express.Router();

/** Get Products */
router.get('/', getProducts);
router.get('/:id', getProduct);

/** Create Product */
router.post('/', createProduct);

/** Update Product */
router.put('/:id', updateProduct);


/** Delete Product */
router.delete('/:id', deleteProduct)

module.exports = router;