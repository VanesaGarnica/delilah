const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO \`user\` VALUES (null, ?, ?, null, ?, ?, ?, ?, ?, ?, ?);`,
            [
                data.username,
                data.password,
                data.email,
                data.name,
                data.last_name,
                data.address,
                data.phone,
                data.id_rol,
                data.id_city
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAllUsers: (callBack) => {
        pool.query(
            `SELECT id_user, username, email, \`user\`.name, last_name, adress, phone, \`rol\`.descrip rol, \`city\`.name city FROM \`user\` JOIN \`rol\` ON \`user\`.id_rol=\`rol\`.id_rol JOIN \`city\` ON \`user\`.id_city=\`city\`.id_city`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByID: (data, callBack) => {
        pool.query(
            `SELECT id_user, username, email, \`user\`.name, last_name, adress, phone, \`rol\`.descrip rol, \`city\`.name city FROM \`user\` JOIN \`rol\` ON \`user\`.id_rol=\`rol\`.id_rol JOIN \`city\` ON \`user\`.id_city=\`city\`.id_city WHERE id_user=?`,
            [
                data.id_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};