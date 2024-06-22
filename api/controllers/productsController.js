const Product = require('../models/productsModel')
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')

const createProduct =async (req, res) => {
    const newProduct = await Product.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct
        }
    })
}

class APIFeatuers {
    constructor(query, queryString) {
        this.query = query,
        this.queryString = queryString
    }

    filter() {
    const queryObj = {...this.queryString}
    const excludedFields = ["page", "limit", "sort", "fields"]
    excludedFields.forEach((el) => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))

    return this
    }

    sort() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this
    }
    limitFields() {
        if(this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }
        return this
    }
    paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit)

    return this
    }
}

const getAllProducts = catchAsync(async (req, res, next) => {

    const features = new APIFeatuers(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
        const products = await features.query
    
        if(!products) {
            return next(new AppError("No products found", 404))
        }

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        })  
    })

    const getProduct = catchAsync(async (req, res, next) => {
        const products = await Product.findById(req.params.id).populate('reviews')
        if(!products) {
            return next(new AppError("No product found with that ID", 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                products
            }
        })
    })

    const updateProduct = catchAsync(async (req, res, next) => {
        const product = await Product.findByIdAndUpdate(req.params.id)

        if(!product) {
            return next(new AppError("No product found with that ID", 404))
        }

       res.status(204).json({
        status: 'success',
        message: "updated successfully"
       })
    })

    const deleteProduct = catchAsync(async (req, res, next) => {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product) {
            return next(new AppError("No product found with that ID", 404))
        }

        res.status(200).json({
            status: 'success',
            data: null
        })
    })

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}