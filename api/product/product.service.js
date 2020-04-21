const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO product VALUES(null, ?, ?)`,
            [
                data.name,
                data.price
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAll: callBack => {
        pool.query(
            `SELECT id_product, name, price FROM \`product\``,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getByID: (data, callBack) => {
        pool.query(
            `SELECT id_product, name, price FROM product WHERE id_product=?`,
            [
                data.id_product
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    update: (data, callBack) => {
        pool.query(
            `UPDATE product SET name = ?, price = ? WHERE id_product = ?`,
            [
                data.name,
                data.price,
                data.id_product
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    delete: (data, callBack) => {
        pool.query(
            `DELETE FROM product WHERE id_product = ?`,
            [
                data.id_product
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }
};