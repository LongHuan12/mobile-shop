const express = require('express');
const router = express.Router();
var path = require('path');

const con = require('./dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

/** Upload FIles: Multer */
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {
        /** Rename file upload */
        cb(null, 'product' + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage });
/** End Upload FIles: Multer */

router.use(cookieParser());
router.post('/register', signupValidation, (req, res, next) => {
    con.query(
        `SELECT * FROM users WHERE LOWER(email) = LOWER(${con.escape(
            req.body.email
        )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'This user is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    console.log(req.body.password);
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {

                        // has hashed pw => add to database
                        con.query(
                            `INSERT INTO users (name, email, password) VALUES ('${req.body.name}', ${con.escape(
                                req.body.email
                            )}, ${con.escape(hash)})`,
                            (err, result) => {
                                if (err) {
                                    throw err;
                                    return res.status(400).send({
                                        msg: err
                                    });
                                }
                                return res.redirect('signupresult')
                            }
                        );
                    }
                });
            }
        }
    );
});
router.post('/login', loginValidation, (req, res, next) => {
    con.query(
        `SELECT * FROM users WHERE email = ${con.escape(req.body.email)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                throw err;
                return res.redirect('login?error=1');
            }
            if (!result.length) {
                return res.redirect('login?error=1');
            }
            // check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        throw bErr;
                        return res.redirect('login?error=1');
                    }
                    if (bResult) {
                        const maxAge = 3 * 60 * 60;
                        const token = jwt.sign({ id: result[0].id }, 'the-super-strong-secrect', { expiresIn: maxAge });
                        res.cookie("jwt", token, {
                            httpOnly: true,
                            maxAge: maxAge * 1000, // 3hrs in ms
                        });
                        con.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.redirect('productlist');
                    }
                    return res.redirect('login?error=1');
                }
            );
        }
    );
});
router.post('/get-user', signupValidation, (req, res, next) => {

    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        return res.status(422).json({
            message: "Please provide the token",
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
    con.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
    });
});

router.get('/signup', function (req, res) {
    res.render('admin/signup');
});
router.get('/signupresult', function (req, res) {
    res.render('admin/signupresult');
});
router.get('/login', function (req, res) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'the-super-strong-secrect', (err, decodedToken) => {
            if (err) {
            } else {
                res.redirect('../admin/orderlist');
            }
        })
    }else
    res.render('admin/login');
});
router.all('*', function (req, res, next) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'the-super-strong-secrect', (err, decodedToken) => {
            if (err) {
                res.redirect('../admin/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('../admin/login');
    }
});

router.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("login")
})

router.get('/addproduct', function (req, res) {
    res.render('admin/addproduct');
});

router.get('/orderlist', function (req, res) {
    res.render('admin/orderlist');
});


router.get('', function (req, res) {
    res.render('admin/orderlist');
});

//Get Product Details add show on Edit Product Page
router.get('/editproduct', function (req, res) {
    var sql = 'SELECT * FROM tb_product WHERE ID = ' + req.query.ID

    con.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            var images = JSON.parse(results[0].ImageUrl)
            var pro = results[0];
            pro.ImageUrl = images;
            res.render('admin/editproduct', { pro: pro });
        }
        else
            res.redirect('productlist');
    });
});

//Slider
router.get('/slider', function (req, res) {

    res.render('admin/slider');

});

router.post("/addslider", upload.single("file"), function (req, res) {
    console.log(req.file)
    var imageUrl = "";
    if (req.file != undefined && req.file != null)
        imageUrl = req.file.filename;
    var sql = `INSERT INTO tb_slider (SliderTitle, SliderSubTitle, Description, ImageUrl) VALUES ('${req.body.title}', '${req.body.subtitle}', '${req.body.description}', '${imageUrl}')`;
    if (req.body.id != undefined && req.body.id != null && parseInt(req.body.id) > 0) {
        if (imageUrl.length > 0)
            sql = `UPDATE tb_slider SET SliderTitle = '${req.body.title}', SliderSubTitle = '${req.body.subtitle}', Description = '${req.body.description}', ImageUrl = '${imageUrl}' WHERE ID='${req.body.id}'`;
        else
            sql = `UPDATE tb_slider SET SliderTitle = '${req.body.title}', SliderSubTitle = '${req.body.subtitle}', Description = '${req.body.description}' WHERE ID='${req.body.id}'`;
    }
    con.query(sql, (err, results) => {
        if (err) throw err;
        return res.send('1');
    });
});

//API - get list of Slider
router.get('/getSlider', function (req, res) {
    var sql = `SELECT * FROM tb_slider`;
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});

//get slider details by ID
router.get('/sliderDetails', function (req, res) {
    var sql = 'SELECT * FROM tb_slider WHERE ID = ' + req.query.ID

    console.log(sql)
    con.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            var slider = results[0];
            res.end(JSON.stringify(slider));
        }
        else
            res.redirect('slider');
    });
});

//API - Delete Slider By ID
router.get("/deleteslider", function (req, res) {
    var sql = `DELETE FROM tb_slider WHERE ID ='${req.query.id}';`;
    console.log(sql)
    con.query(sql, (err, results) => {
        if (err) throw err;
        return res.send('1');
    });
});

//Brand
//Generate link to get view of Brand
router.get('/brand', function (req, res) {
    res.render('admin/brand');
});

//API - Insert, Update Brand to Database. If link has id parameter - Update, none - Insert
router.get('/addbrand', function (req, res) {

    var brandName = req.query.name;
    var id = req.query.id;
    var sql = `INSERT INTO tb_brand (BrandName, IsShow) VALUES ("${brandName}", "${req.query.isShow}")`;
    if (id != undefined && id.length > 0 && parseInt(id) > 0) {
        sql = `UPDATE tb_brand SET BrandName = "${brandName}", IsShow = "${req.query.isShow}" WHERE tb_brand.ID = "${id}"`;
    }
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

//API - get list of Brand
router.get('/getBrand', function (req, res) {
    var sql = `SELECT * FROM tb_Brand`;
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});

//API - Delete Brand By ID
router.get("/deletebrand", function (req, res) {
    var sql = `DELETE FROM tb_brand WHERE ID ='${req.query.id}';`;
    console.log(sql)
    con.query(sql, (err, results) => {
        if (err) throw err;
        return res.send('1');
    });
});

//Category
//Generate link to get view of Category
router.get('/category', function (req, res) {
    res.render('admin/category');
});

//API - Insert, Update Category to Database. If link has id parameter - Update, none - Insert
router.get('/addcategory', function (req, res) {

    var categoryName = req.query.name;
    var id = req.query.id;
    var sql = `INSERT INTO tb_category (CategoryName) VALUES ("${categoryName}")`;
    if (id != undefined && id.length > 0 && parseInt(id) > 0) {
        sql = `UPDATE tb_category SET CategoryName = "${categoryName}" WHERE tb_category.ID = "${id}"`;
    }
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

//API - get list of Category
router.get('/getCategory', function (req, res) {
    var sql = `SELECT * FROM tb_category`;
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});

//API - Delete Category By ID
router.get("/deletecategory", function (req, res) {
    var sql = `DELETE FROM tb_category WHERE ID ='${req.query.id}';`;
    console.log(sql)
    con.query(sql, (err, results) => {
        if (err) throw err;
        return res.send('1');
    });
});

//List Product
router.get('/productlist', function (req, res) {
    res.render('admin/productlist');
});

//API - get list of Product for DataTable
router.get('/getProduct', function (req, res) {
    var sql = `SELECT tb_product.ID, tb_product.ProductName,tb_product.Description,tb_product.Price,tb_product.ImageUrl, tb_brand.BrandName, tb_category.CategoryName FROM tb_product INNER JOIN tb_category ON tb_product.CategoryID = tb_category.ID INNER JOIN tb_brand ON tb_product.BrandID = tb_brand.ID;`;
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});


/** Add product, method: post. If query has ID - Update statement, none ID - Insert statement */
router.post("/addproduct", upload.array("files"), function (req, res) {
    var imageUrl = [];
    for (var i = 0; i < req.files.length; i++) {
        imageUrl.push({ image: req.files[i].filename });
    }
    var sql = `INSERT INTO tb_product (ProductName, Description, Price, ImageUrl, BrandID, CategoryID) VALUES ('${req.body.name}', '${req.body.description}', '${req.body.price}', '${JSON.stringify(imageUrl)}', '${req.body.brand}', '${req.body.category}')`;
    if (req.body.id != undefined && req.body.id != null && parseInt(req.body.id) > 0) {
        var imgRemain = JSON.parse(req.body.remainImage);
        imageUrl = imageUrl.concat(imgRemain);
        sql = `UPDATE tb_product SET ProductName = '${req.body.name}', Description = '${req.body.description}', Price = '${req.body.price}', ImageUrl = '${JSON.stringify(imageUrl)}', BrandID = '${req.body.brand}', CategoryID = '${req.body.category}' WHERE ID='${req.body.id}'`;
    }
    con.query(sql, (err, results) => {
        if (err) throw err;
        return res.send('1');
    });
});

router.post("/deleteproduct", function (req, res) {
    var sql = `DELETE FROM tb_product WHERE ID ='${req.body.id}';`;
    console.log(sql)
    con.query(sql, (err, results) => {
        if (err) throw err;
        return res.send('1');
    });
});

router.get('/getOrderList', function (req, res) {
    con.query('SELECT * FROM tb_cart', (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results));
    });
});

router.get('/getOrderDetails', function (req, res) {
    if (req.query.id != undefined && req.query.id.length > 0) {
        con.query(`SELECT * FROM tb_cart WHERE ID ='${req.query.id}';`, (err, results) => {
            if (err) throw err;
            if (results.length > 0)
                res.send(JSON.stringify(results[0]));
        });
    }
});

router.get('/changeOrderStatus', function (req, res) {
    if (req.query.id != undefined && req.query.id.length > 0 && req.query.status < 4 && req.query.status >= 0) {
        con.query(`UPDATE tb_cart SET Status =(Status+1) WHERE ID ='${req.query.id}';`, (err, results) => {
            if (err) throw err;
            if (results.changedRows > 0)
                con.query(`SELECT Status FROM tb_cart WHERE ID ='${req.query.id}';`, (errupdate, resultsupdate) => {
                    if (errupdate) throw errupdate;
                    if (resultsupdate.length > 0) {
                        res.end(''+resultsupdate[0].Status);
                    }
                })
        });
    }
});

router.get('/cancelOrder', function (req, res) {
    if (req.query.id != undefined && req.query.id.length > 0) {
        con.query(`UPDATE tb_cart SET Status = 4 WHERE ID ='${req.query.id}';`, (err, results) => {
            if (err) throw err;
            if (results.changedRows > 0)
                res.end('1');
        });
    }
});

module.exports = router;