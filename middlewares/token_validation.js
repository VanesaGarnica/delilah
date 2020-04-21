const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        success: 0,
                        message: "Invalid token"
                    })
                } else {
                    next();
                }
            })
        } else {
            res.status(401).json({
                success: 0,
                message: "Access denied! Unauthorized user."
            })
        }
    },
    checkUserIsAdmin: (req, res, next) => {
        let token = req.get('authorization');
        if (typeof token !== 'undefined') {
            try {
                const tokenArray = token.split(' ');
                token = tokenArray[1];
                const data = verify(token, process.env.JWT_SECRET);
                let result = data.result;
                
                if (result.id_rol === 1) {
                    next();
                } else {
                    res.status(401).json({
                        success: 0,
                        message: "User is not admin"
                    })
                }
            } catch (error) {
                console.log(error.message);
                res.status(500).json({
                    success: 0,
                    message: "Server error"
                })
            }
        } else {
            res.status(400).json({
                success: 0,
                message: "Should have authorization token"
            })
        }
    },
    checkUserHasAccess: (req, res, next) => {
        let token = req.get('authorization');
        if (typeof token !== 'undefined') {
            try {
                const tokenArray = token.split(' ');
                token = tokenArray[1];
                const data = verify(token, process.env.JWT_SECRET);
                let result = data.result;

                if (result.id_rol === 1 || result.id_user === req.body.id_user) {
                    next();
                } else {
                    res.status(401).json({
                        success: 0,
                        message: "User is not authorized."
                    })
                }
            } catch (error) {
                console.log(error.message);
                res.status(500).json({
                    success: 0,
                    message: "Server error"
                })
            }
        } else {
            res.status(400).json({
                success: 0,
                message: "Should have authorization token"
            })
        }
    }
}