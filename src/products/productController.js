const connection = require('../../src/db');
const xlsx = require('xlsx');

const getProduct = async (req, res) => {
    try {
        const query = `SELECT * FROM producttable WHERE product_id`;
        await connection.query(query, (err, result) => {
            if (err) throw err;
            res.status(200).json({ Status: 200, Data: result });
        });
    } catch (e) {
        res.status(500).json({ Status: 500, Message: 'Internal Server Error' });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM producttable WHERE product_id = ${id} LIMIT 1`;
        await connection.query(query, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                return res.status(404).json({ Message: "No product found" });
            }
            res.status(200).json({ Status: 200, Data: result[0] });
        });
    } catch (e) {
        res.status(500).json({ Status: 500, Message: 'Internal Server Error' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { product_id, product_name, product_description, product_cost, product_color, product_brand } = req.body;
        const { id } = req.params;
        if (product_id !== undefined && product_name !== undefined && product_description !== undefined && product_cost !== undefined && product_color !== undefined && product_brand !== undefined) {
            const query = `UPDATE producttable SET product_id = '${product_id}', product_name = '${product_name}',product_description = '${product_description}',product_cost = '${product_cost}',product_color = '${product_color}',product_brand = '${product_brand}' WHERE product_id = '${id}'`;
            await connection.query(query, (err, result) => {
                if (err) throw err;
                res.status(200).json({ Status: 200, Message: 'Product updated successfully' });
            });
        }
    } catch (e) {
        res.status(500).json({ Status: 500, Message: 'Internal Server Error' });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM producttable WHERE product_id = ${id}`;
        await connection.query(query, (err, result) => {
            if (err) throw err;
            res.status(200).json({ Status: 200, Message: 'Product deleted successfully' });
        });
    } catch (e) {
        res.status(500).json({ Status: 500, Message: 'Internal Server Error' });
    }
}

const uploadProducts = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ Message: 'No file uploaded' });
        }
        const file = req.files.file;
        const workbook = xlsx.read(file.data, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        const query = `INSERT INTO producttable (product_name,product_description,product_cost,product_color,product_brand) VALUES ?`;
        const values = data.map((row) => [row.product_name, row.product_description, row.product_cost, row.product_color, row.product_brand]);
        await connection.query(query, [values]);
        res.status(200).json({ Message: 'File uploaded successfully' });
    } catch (e) {
        res.status(500).json({ Status: 500, Message: 'Internal Server Error' });
    }
}

module.exports = {
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadProducts
}