const connection = require('../../src/db');
const { generateToken, auth } = require('../jwt');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    try {
        const { userName, pswd, email } = req.body;
        const saltRounds = 10;
        const hashedPswd = await bcrypt.hash(pswd, saltRounds);
        const values = [userName, hashedPswd, email];
        const query = `INSERT INTO registertable (userName, pswd, email) VALUES ('${userName}', '${hashedPswd}', '${email}')`;
        await connection.query(query, values, (err, result) => {
            if (err) throw err;
            const token = generateToken({ userName, email });
            res.status(200).json({ Status: 200, Message: 'Login Successfully', token });
        });
    } catch (e) {
        res.status(500).json({ Status: 500, Message: 'Internal Server Error' });
    }
};

const logoutUser = (req, res) => {
    res.destroy('token');
    res.json({ message: 'User logged out successfully' });
};

module.exports = {
    loginUser,
    logoutUser,
    auth
};