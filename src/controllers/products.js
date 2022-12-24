export const getAllProductsStatic = async (req, res) => {
    throw new Error('testing async error package')
    res.status(200).json({msg: "products testing route"})
}

export const getAllProducts = async (req, res) => {
    res.status(200).json({msg: "products route"})
}
