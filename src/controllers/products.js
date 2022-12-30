import Product from "../models/products.js";

export const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .select("name")
    .sort("name")
    .limit(10)
    .skip(5);
  return res.status(200).json({ products, nbHits: products.length });
};

export const getAllProducts = async (req, res) => {
  // use a query object to store the necessary query we want to have functionality for
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // filter options
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // numric filter
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g //reges to replace symbols

    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
    const options = ['price', 'rating']

    filters = filters.split(',').forEach((item) => {
        const [field, operator,value] = item.split('-')
        if (options.includes(field)){
            queryObject[field] = {[operator]: Number(value)}
        }
    })
    console.log(queryObject);
  }
  // the returned result
  // QUERY OBJECT THEN PASS RESULT To CHAINING FUNCTIONS
  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // selecting specific fields

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  // pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23 products total
  // limit 7 products = 4 pages

  // {{URL}}/products?sort=name,&fields=name,price&limit=2&page=2&company=ikea

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};
