const service = require("./order.service");

module.exports = {
    create: (req, res) => {
        service.createOrder(req.body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "1. Error creating order."
                })
            }
            const id_order = results.insertId;
            console.log("LLEGO ACAAAA ID_ORDER: ", id_order);
            const details = req.body.details;
            details.forEach(element => {
                const { id_product, quantity } = element;
                service.getProductPrice(id_product, (err, price) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "2. Error searching for price."
                        });    
                    }
                    service.addDetail(id_order, id_product, quantity, price, (err, results) => {
                        if (err) {
                            return res.status(500).json({
                                success: 0,
                                message: "3. Error adding detail."
                            })
                        }
                    });
                });
            });
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
    updateStatus: (req, res) => {
        const body = req.body;
        const id_order = body.id_order;
        const id_state = body.id_state;
        service.updateOrderStatus(id_order, id_state, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Error updating status"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getAllOrders: (req, res) => {
        service.getAllOrders((err, results) => {
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
}