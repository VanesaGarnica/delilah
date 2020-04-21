const pool = require("../../config/database");

module.exports = {
    createOrder: (data, callBack) => {
        pool.query(
            `INSERT INTO \`order\` VALUES(default, ?, ?, default, 1)`,
            [
                data.id_user,
                data.id_payment
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProductPrice: (id_product, callBack) => {
        pool.query(
            `SELECT id_product, price FROM product WHERE id_product=?`,
            [
                id_product
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0].price);
            }
        )
    },
    addDetail: (id_order, id_product, quantity, price, callBack) => {
        pool.query(
            `INSERT INTO \`order_detail\` VALUES(null, ?, ?, ?, ?)`,
            [
                id_product,
                quantity,
                price * quantity,
                id_order
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateOrderStatus: (id_order, id_state, callBack) => {
        pool.query(
            `UPDATE \`order\` SET id_state = ? WHERE id_order = ?`,
            [
                id_state,
                id_order
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAllOrders: (callBack) => {
        pool.query(
            `SELECT o.id_order, o.time, s.descrip, p.descrip, u.username, u.adress FROM \`order\` o JOIN order_state s ON o.id_state=s.id_state JOIN payment p ON o.id_payment=p.id_payment JOIN user u ON o.id_user=u.id_user ORDER BY o.time`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};