
const http = require('http');
const fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');

const hostname = '127.0.0.1';
const port = 3000;
const url = require('url');

const createError = require('http-errors');
const { render } = require('ejs');
const express = require('express')
const flash = require('express-flash')
const session = require('express-session');
const exp = require('constants');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./Router.js');
const app = express(); 

const con = require('./dbConnection');

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: '123@123abc',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    }),
);

app.use(bodyParser.json());
 
app.use(cors());
 
app.use('/admin', indexRouter);

const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
 
// Handling Errors
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});


app.use(flash());

//set css
app.use(express.static(path.join(__dirname, 'public')));
//static file
app.use('/uploads', express.static('uploads'));

//set favi
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')));



/** Front-End */

/** Page link */
app.get('/', function (req, res) {    
    res.render('pages/index');
});
app.get('/index', function (req, res) {
    res.render('pages/index');
});

app.get('/shop', function (req, res) {
    res.render('pages/shop')
});

app.get('/about', function (req, res) {
    res.render('pages/about')
});

app.get('/cart', function (req, res) {
    res.render('pages/cart');
});

app.get('/ordersuccess', function (req, res) {
    res.render('pages/ordersuccess');
});

app.get('/orderdetails', function (req, res) {
    res.render('pages/orderdetails');
});


//Get Brand Display on Home Page
app.get('/getbrandhome', function (req, res) {
    var sql = 'SELECT * FROM tb_brand WHERE IsShow = 1'

    con.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.end(JSON.stringify(results));
        }
    });
});

//API - get list of Slider
app.get('/getSlider', function (req, res) {
    var sql = `SELECT * FROM tb_slider`;
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});

//Get Product by Brand
app.get('/getproductbybrand', function (req, res) {
    if (req.query.ID != undefined && req.query.ID.length > 0) {
        var sql = 'SELECT * FROM tb_product WHERE BrandID = ' + req.query.ID + ' LIMIT 3'

        con.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.end(JSON.stringify(results));
            }
        });
    }
});

//Get Brand List
app.get('/getbrandlist', function (req, res) {
    var sql = 'SELECT * FROM tb_brand'

    con.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.end(JSON.stringify(results));
        }
    });
});


//Get Category List
app.get('/getcategorylist', function (req, res) {
    var sql = 'SELECT * FROM tb_category'

    con.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.end(JSON.stringify(results));
        }
    });
});


// Get Product List with Brand-BrandID, Category-CategoryID, search key word-keyword
app.get('/getData', function (req, res) {
    var sql = 'SELECT * FROM tb_product';
    var isHasQuery = false
    if (req.query.brand !== undefined && req.query.brand.length > 0) {
        sql += " WHERE BrandID=" + req.query.brand;
        isHasQuery = true;
    }

    if (req.query.category !== undefined && req.query.category.length > 0) {
        if (isHasQuery)
            sql += " AND";
        else
            sql += " WHERE";
        sql += " CategoryID=" + req.query.category;
        isHasQuery = true;
    }

    if (req.query.keyword !== undefined && req.query.keyword.length > 0) {
        if (isHasQuery)
            sql += " AND";
        else
            sql += " WHERE";
        sql += " ProductName LIKE '%" + req.query.keyword + "%'";
    }

    con.query(sql, (err2, results) => {
        if (err2) throw err2;
        res.end(JSON.stringify(results));
    });
});


//Get Product details and show on detail page By Product ID
app.get('/detail', function (req, res) {
    var sql = 'SELECT tb_product.ID, tb_product.ProductName,tb_product.Description,tb_product.Price,tb_product.ImageUrl, tb_brand.BrandName FROM tb_product inner join tb_brand on tb_product.BrandID = tb_brand.ID';
    if (req.query.id !== undefined && req.query.id.length > 0) {
        sql += " WHERE tb_product.ID =" + req.query.id;
        con.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                var images = JSON.parse(results[0].ImageUrl)
                
                var imageShow = images[0].image; 
                images.forEach(iImage => {if (iImage.isThumb == 1) {imageShow = iImage.image;} })
                
                var pro = results[0];
                pro.ImageUrl = images;
                pro.ImageThumb = imageShow;
                res.render('pages/detail', { pro: results[0] });
            }
            else
                res.redirect('/shop');
        });
    } else {
        res.render('/');
    }

});

/** Cart Page */
// Get Product List By multi Product ID
app.get('/getDataInCart', function (req, res) {
    var sql = 'SELECT * FROM tb_product';
    if (req.query.id !== undefined && req.query.id.length > 0) {
        sql += " WHERE ID IN (" + req.query.id + ")";
        con.query(sql, (err, results) => {
            if (err) throw err;
            res.end(JSON.stringify(results));
        });
    } else {
        res.redirect('/index');
    }
});

// Insert Order to database
app.get('/checkOut', function (req, res) {
    var uniqueID=uuidv4();
    var sql = `INSERT INTO tb_cart (CustomerName, Address, PaymentMethod, TotalPrice, CartDetails, OrderCode) VALUES ('${req.query.cusName}', '${req.query.cusAddress}', '${req.query.payMethod}', '${req.query.totalPrice}', '${req.query.cartDetails}', '${uniqueID}')`;
    
    con.query(sql, (err, results) => {
        if (err) throw err;
        if (results.insertId > 0) {
            res.end(uniqueID);
        }
        else
            res.end('');
    });
});

app.get('/getOrderDetailsByCode', function (req, res) {
    var code = req.query.code;
    if(code!=undefined&&code!=null&&code.length>0){
        var sql = `SELECT * FROM tb_cart WHERE OrderCode = "${code}"`;
        con.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.end(JSON.stringify(results[0]));
            }else
                res.end('');
        });
    }
});


/** Back-End */



/** Admin System End */
console.log('--incomming request--');

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
module.exports = app;