const service = require("./product.service");

module.exports = {
    create: (req, res) => {
        service.create(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
    getAll: (req, res) => {
        service.getAll((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getByID: (req, res) => {
        service.getByID(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message
                })
            }
            return res.status(200).json({
                success: 1,
                data: results[0]
            })
        })
    },
    update: (req, res) => {
        service.update(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    delete: (req, res) => {
        service.delete(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    }

}