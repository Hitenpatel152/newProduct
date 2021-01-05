const mongoose = require('mongoose');

const productmodel = new mongoose.Schema({
	FU_ProductImage: {
        type: String,
        required: true,
    },
    ProductName: {
        type: String,
        required: true,
    },
    ProductPrice: {
        type: Number,
        required: true,
    },
    ProductQty: {
        type: Number,
        required: true,
    },
    ProductCategory: {
        type: String,
        required: true,
    }

});
const product = mongoose.model("product",productmodel,'product');
module.exports = product;