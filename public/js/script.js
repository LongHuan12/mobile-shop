$(document).ready(function () {
    getBrandList();
    $('#spanCartNum').text(countItemInCart());
})

function getProductInPage(e) {
    history.replaceState(null, '', location.pathname + replaceQueryParam('proInPage', e.value, window.location.search));
    BindData();
}

function searchProduct() {
    var kw = document.getElementById('inputModalSearch').value;
    console.log('asd')

    window.location.replace("shop?keyword=" + kw);
}

function replaceQueryParam(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function removeParam(key, sourceURL = window.location.href) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


/** Home Page Script */
//Get all slider and show top of home page
function getSlider() {
    var link = "/getSlider"
    $.get(link, function (data, status) {
        var _data = JSON.parse(data)
        var htmlInner = '';
        if (_data != undefined && _data.length > 0) {
            var tempHtml = $('#slider-template').html();
            var html = '';
            for (var i = 0; i < _data.length; i++) {
                if (i == 0) _data[i].isActive = 'active'
                _data[i].SliderTitle = unescape(_data[i].SliderTitle)
                _data[i].SliderSubTitle = unescape(_data[i].SliderSubTitle)
                _data[i].Description = unescape(_data[i].Description)
                let rendered = Mustache.render(tempHtml, _data[i]);
                html += rendered;
            }
            $("#divSlider").html(html);
        }
    });
}

//Get all brand display on home page
function getBrandHome() {
    var link = "/getbrandhome"
    $.get(link, function (data, status) {
        var _data = JSON.parse(data)
        var htmlInner = '';
        if (_data != undefined && _data.length > 0) {
            var tempHtml = $('#productCat-template').html();
            var html = '';
            for (var i = 0; i < _data.length; i++) {

                let rendered = Mustache.render(tempHtml, _data[i]);
                html += rendered;
            }
            $("#homeProductShow").html(html);
            showProductByBrandHome();
        }
    });
}

//Show Product by Brand in HomePage
function showProductByBrandHome() {
    $.each($('.productShowByBrand'), function (index, item) {
        var id = $(item).attr('data-id');
        if (id != undefined && id.length > 0) {
            var link = "/getproductbybrand?ID=" + id
            $.get(link, function (data, status) {
                var _data = JSON.parse(data)
                if (_data != undefined && _data.length > 0) {
                    var tempHtml = $('#productItem-template').html();
                    var html = '';
                    for (var i = 0; i < _data.length; i++) {
                        var imageUrl = JSON.parse(_data[i].ImageUrl)
                        if (imageUrl != undefined && imageUrl.length > 0)
                            _data[i].ImageUrl = imageUrl[0].image
                        _data[i].ProductName = unescape(_data[i].ProductName)
                        var des = unescape(_data[i].Description);
                        if (des.length > 200)
                            des = des.substring(0, 200) + '...';
                        _data[i].Description = des
                        let rendered = Mustache.render(tempHtml, _data[i]);
                        html += rendered;
                    }
                    $(item).html(html);
                }
            });
        }
    })


}

/** End Home Page Script */

/** Shop Page Script */
//Get Product By Brand ID
function getProductByBrand(id) {
    var link = "/getproductbybrand?ID=" + id
    $.get(link, function (data, status) {
        var _data = JSON.parse(data)
        if (_data != undefined && _data.length > 0) {
            return _data;
        }
    });
}

//Get All Brand In Shop Page
function getBrandList() {
    $('#liBrandFooter').html('');
    var link = "/getbrandlist";
    $.get(link, function (data, status) {
        var _data = JSON.parse(data)
        if (_data != undefined && _data.length > 0) {
            var tempHtml = $('#category-template').html();
            var html = '';
            var htmlFooter = '';
            // If current is Shop Page. Fill data to Brand of shop Page
            if (location.pathname == '/shop')
                _data.unshift({ Name: 'All', ID: 0, FunctionGen: 'getProductByBrand(0)' })
            for (var i = 0; i < _data.length; i++) {
                // If current is Shop Page. Fill data to Brand of shop Page
                if (location.pathname == '/shop') {
                    if (i > 0)
                        _data[i].Name = unescape(_data[i].BrandName);
                    _data[i].FunctionGen = 'getProductByBrand(' + _data[i].ID + ')'
                    let rendered = Mustache.render(tempHtml, _data[i]);
                    html += rendered;
                }
                // Fill brand data on Footer (All page)
                if (location.pathname == '/shop' && i != 0 || location.pathname != '/shop')
                    htmlFooter += '<li><a class="text-decoration-none" href="shop?brand=' + _data[i].ID + '">' + _data[i].BrandName + '</a></li>';

            }
            // If current is Shop Page. Fill data to Brand of shop Page
            if (location.pathname == '/shop')
                $('#liBrandShop').html(html);
            // Fill brand data on Footer (All page)
            $('#liBrandFooter').html(htmlFooter);
            // If current is Shop Page. Set active brand
            if (location.pathname == '/shop')
                changeFocusBrand();
        }
    });
}

function getProductByBrand(id) {
    history.replaceState(null, '', location.pathname + replaceQueryParam('page', 1, window.location.search));
    if (id != '0') {
        history.replaceState(null, '', location.pathname + replaceQueryParam('brand', id, window.location.search));
    } else
        history.replaceState(null, '', removeParam('brand'));

    BindData();
}
function getProductByCategory(id) {
    history.replaceState(null, '', location.pathname + replaceQueryParam('page', 1, window.location.search));
    if (id != '0') {
        history.replaceState(null, '', location.pathname + replaceQueryParam('category', id, window.location.search));
    } else
        history.replaceState(null, '', removeParam('category'));
    BindData();
}

//Get All Category In Shop Page
function getCategoryList() {
    var link = "/getcategorylist"
    $.get(link, function (data, status) {
        var _data = JSON.parse(data)
        if (_data != undefined && _data.length > 0) {
            var tempHtml = $('#category-template').html();
            var html = '';
            _data.unshift({ Name: 'All', ID: 0, FunctionGen: 'getProductByCategory(0)' })
            for (var i = 0; i < _data.length; i++) {
                if (i > 0)
                    _data[i].Name = unescape(_data[i].CategoryName)
                _data[i].FunctionGen = 'getProductByCategory(' + _data[i].ID + ')'
                let rendered = Mustache.render(tempHtml, _data[i]);
                html += rendered;
            }
            $('#liCategoryShop').html(html);
            changeFocusCategory();
        }
    });
}

function changeFocusCategory() {
    var curCategory = 0;
    if (getParameterByName('category') != null && getParameterByName('category').length > 0) curCategory = getParameterByName('category');
    $.each($('#liCategoryShop li a'), function (index, item) {
        $(item).removeClass('fw-bold');
        if (curCategory == $(item).attr('data-id')) $(item).addClass('fw-bold');
    })
}

function changeFocusBrand() {
    var curBrand = 0;
    if (getParameterByName('brand') != null && getParameterByName('brand').length > 0) curBrand = getParameterByName('brand');
    $.each($('#liBrandShop li a'), function (index, item) {
        $(item).removeClass('fw-bold');
        if (curBrand == $(item).attr('data-id')) $(item).addClass('fw-bold');
    })
}

function getProductByPage(e) {
    history.replaceState(null, '', location.pathname + replaceQueryParam('page', e, window.location.search));
    BindData();
}

function BindData() {
    changeFocusCategory();
    changeFocusBrand();
    var page = getParameterByName('page');
    var sort = getParameterByName('sortby');
    var brand = getParameterByName('brand');
    var category = getParameterByName('category');
    var keyword = getParameterByName('keyword');
    showLoading(1000);
    var request = new XMLHttpRequest();
    var link = "getData";
    var isHasQuery = false;

    if (sort != undefined && sort.length > 0) {
        link += ("?sort=" + sort);
        isHasQuery = true
    }

    if (brand != undefined && brand.length > 0) {
        link += ((isHasQuery ? "&" : "?") + "brand=" + brand);
        isHasQuery = true
    }

    if (category != undefined && category.length > 0) {
        link += ((isHasQuery ? "&" : "?") + "category=" + category);
        isHasQuery = true
    }

    if (keyword != undefined && keyword.length > 0) {
        link += ((isHasQuery ? "&" : "?") + "keyword=" + keyword);
        isHasQuery = true
    }

    request.open("GET", link);
    request.onreadystatechange = function () {
        // check request
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            BindDataHtml(data, page, sort);
        }
    };
    request.send();

}

function BindDataHtml(_data, page, sort) {
    var _sort = 1, _page = 1;
    if (sort != undefined && sort.length > 0)
        _sort = sort
    if (page != undefined && page.length > 0)
        _page = page
    else showLoading(1500);
    var tempHtml = $('#product-template').html();
    var temppagingHtml = $('#paging-template').html();
    var html = '';

    var totalRow = _data.length;
    var maxPage = (totalRow / 9) + 1;
    for (var j = 1; j <= maxPage; j++) {
        var pageFocus = '';
        if (_page == j) pageFocus = 'active';
        let rendered = Mustache.render(temppagingHtml, { page: j, PageFocus: pageFocus });
        html += rendered;
    }
    document.getElementById("pagingShop").innerHTML = html;
    html = '';
    for (var i = 0; i < _data.length; i++) {
        if (i >= ((_page - 1) * 9) && i < ((_page) * 9)) {
            _data[i].ImageUrl = getImageUrlInArray(_data[i].ImageUrl);
            _data[i].ProductName = unescape(_data[i].ProductName)
            var des = unescape(_data[i].Description);
            if (des.length > 200)
                des = des.substring(0, 200) + '...';
            _data[i].Description = des
            let rendered = Mustache.render(tempHtml, _data[i]);
            html += rendered;
        }
    }
    document.getElementById("containProduct").innerHTML = html;
}

/** End Shop Page Script */

/** Detail Page Script */

function addToCart(e) {
    showLoading(1500);
    var qty = $('#var-value').text();
    var price = document.getElementById('proPrice').value;
    var imageThumb = $('#product-detail').prop('src');
    var prodName = $('#productName').html();
    var cart = [];

    if (sessionStorage.getItem("myCart") != null && sessionStorage.getItem("myCart").length > 0)
        cart = JSON.parse(sessionStorage.getItem("myCart"));
    var isHas = false;
    cart.forEach(function (element, index) {
        if (element.ID == e.value) {
            isHas = true;
            element.num = parseInt(element.num) + parseInt(qty);
            cart[index] = element;
        }
    });
    if (!isHas)
        cart.push({ ID: e.value, name: prodName, image: imageThumb, num: qty, price: price })
    sessionStorage.setItem("myCart", JSON.stringify(cart));
    window.location.replace("cart");
}

function countItemInCart() {
    var cart = [];
    if (sessionStorage.getItem("myCart") != null && sessionStorage.getItem("myCart").length > 0) {
        cart = JSON.parse(sessionStorage.getItem("myCart"));
        var count = 0;
        $.each(cart, function (index, item) {
            count += parseInt(item.num);
        })
        return count;
    }
    return 0;

}

function showCartItem() {
    showLoading(1500);
    document.getElementById("cartBody").innerHTML = '';


    var cart = [];
    if (sessionStorage.getItem("myCart") != null && sessionStorage.getItem("myCart").length > 0)
        cart = JSON.parse(sessionStorage.getItem("myCart"));
    if (cart.length > 0) {
        var ids = '';
        cart.forEach(function (element, index) {
            if (ids.length > 0) ids += ',';
            ids += element.ID;
        });

        var link = "getDataInCart?id=" + ids;
        var request = new XMLHttpRequest();
        request.open("GET", link);
        request.onreadystatechange = function () {
            // Kiểm tra xem yêu cầu đã hoàn thành và thành công chưa
            if (this.readyState === 4 && this.status === 200) {
                var data = JSON.parse(this.responseText);

                var tempHtml = $('#my-template').html();
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    cart.forEach(function (element, index) {
                        if (element.ID == data[i].ID) {
                            data[i].Qty = element.num;
                        }
                    });
                    data[i].ImageUrl = getImageUrlInArray(data[i].ImageUrl)
                    data[i].ProductName = unescape(data[i].ProductName)
                    let rendered = Mustache.render(tempHtml, data[i]);
                    html += rendered;
                }
                $("#cartBody").html(html);
                $.each($('.quantity'), function (index, item) {
                    $(item).find('button:last').remove();
                })
            }
        };
        request.send();
    }
}

function updateCart(e) {
    showLoading(500);
    var qty = e.value;
    var id = $(e).attr("data-id")
    var cart = [];

    if (sessionStorage.getItem("myCart") != null && sessionStorage.getItem("myCart").length > 0)
        cart = JSON.parse(sessionStorage.getItem("myCart"));
    cart.forEach(function (element, index) {
        if (element.ID == id) {
            isHas = true;
            element.num = qty;
            cart[index] = element;
        }
    });
    sessionStorage.setItem("myCart", JSON.stringify(cart));
    calculatePrice();
}
function deleteItem(e) {
    var cart = [];
    var id = e.value

    if (sessionStorage.getItem("myCart") != null && sessionStorage.getItem("myCart").length > 0)
        cart = JSON.parse(sessionStorage.getItem("myCart"));
    var indexDel = -1;
    cart.forEach(function (element, index) {
        if (element.ID == id) {
            indexDel = index;
        }
    });
    if (indexDel >= 0)
        cart.splice(indexDel, 1);
    sessionStorage.setItem("myCart", JSON.stringify(cart));
    showCartItem()
    calculatePrice();
}

function calculatePrice() {
    var cart = [];
    if (sessionStorage.getItem("myCart") != null && sessionStorage.getItem("myCart").length > 0)
        cart = JSON.parse(sessionStorage.getItem("myCart"));
    var totalPrice = 0;
    cart.forEach(function (element, index) {
        totalPrice += parseInt(element.num) * parseInt(element.price);

    });
    $('#spanSubTotal').text('$ ' + totalPrice)
    $('#spanTotal').text('$ ' + totalPrice)
    $('#mTotalPrice').val(totalPrice)
}

function checkOut() {
    if (sessionStorage.getItem("myCart") != null && sessionStorage.getItem("myCart").length > 0) {

        var cusName = $('#cusName').val();
        var cusAddress = $('#cusAddress').val();
        var payMethod = $('#payMethod').val();
        var totalPrice = $('#mTotalPrice').val();
        var cartDetails = sessionStorage.getItem("myCart");
        if (cartDetails != null && cartDetails.length > 0) {
            var request = new XMLHttpRequest();
            if (cusName !== undefined && cusName.length > 0
                && cusAddress !== undefined && cusAddress.length > 0
                && payMethod !== undefined && payMethod.length > 0)
                var link = "checkOut?cusName=" + cusName + "&cusAddress=" + cusAddress + "&payMethod=" + payMethod + "&totalPrice=" + totalPrice + "&cartDetails=" + cartDetails;
            request.open("GET", link);
            request.onreadystatechange = function () {
                // Kiểm tra xem yêu cầu đã hoàn thành và thành công chưa
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText.length>0) {
                        $('#cusName').val('')
                        $('#cusAddress').val('')
                        $('#spanSubTotal').text('$ ')
                        $('#spanTotal').text('$ ')
                        $('#mTotalPrice').val()
                        $("#myModal").modal("hide");
                        $('#loadingPage').show();
                        sessionStorage.setItem("myCart", '');
                        showCartItem();
                        code = this.responseText;
                        setTimeout(function () {
                            $('#loadingPage').hide();
                            window.location.replace("ordersuccess?code=" + code);
                        }, 1500);

                    }

                }
            };
            request.send();
        }
    } else
        $("#myModal").modal("hide");
}

function bindLinkSuccess(){
    var code=getParameterByName('code');
    $('#alinkSuccess').prop('href', "orderdetails?code=" + code)
    $('#spanOrderCode').text(code)
}

function getOrderDetailsByCode() {
    var code = getParameterByName('code');
    console.log('1st')
    if (code != null && code.length > 0) {
        $('#ipOrderCode').val(code)
        var link = "/getOrderDetailsByCode?code=" + code;
        $.get(link, function (data, status) {
            if (data != null && data.length > 0) {
                var _data = JSON.parse(data)
                $('#spanTotal').text(_data.TotalPrice)
                $('#orderStatus').text(orderStatus.find(x => x.id == _data.Status).name)
                var details = JSON.parse(_data.CartDetails)
                if (details != undefined && details.length > 0) {
                    var tempHtml = $('#order-product-template').html();
                    var html = '';
                    for (var i = 0; i < details.length; i++) {
                        let rendered = Mustache.render(tempHtml, details[i]);
                        html += rendered;
                    }
                    $('#tbOrderDetailBody').html(html);
                }
            } else {
                $('#divOrderDetails').hide()
                $('#divOrderNOtExist').show()
            }
        });
    }
}

function GetOder() {
    window.location.replace("orderdetails?code=" + $('#ipOrderCode').val());
}

$('.noti_close').on('click', function () {
    closeSuccess();
});

function getImageUrlInArray(imgs) {
    var res = '';
    if (isJsonString(imgs)) {
        var imageUrl = JSON.parse(imgs)
        if (imageUrl != undefined && imageUrl.length > 0) {
            res = imageUrl[0].image;
            $.each(imageUrl, function (index, itemi) {
                if (itemi.isThumb == '1')
                    res = itemi.image;
            })

        }
    }
    return res;
}

function showSuccess() {
    var alertBox = $('#noti_Success');
    alertBox.show();
    alertBox.removeClass('bounceOutRight');
    alertBox.addClass('bounceInRight');
    setTimeout(function () { closeSuccess(); }, 3000);
}
function closeSuccess() {
    var alertBox = $('#noti_Success');
    alertBox.removeClass('bounceInRight');
    alertBox.addClass('bounceOutRight');
    alertBox.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        alertBox.hide();
    });
}

function showLoading(time) {
    $('#loadingPage').show();
    setTimeout(function () { $('#loadingPage').hide(); }, time);
}

const orderStatus = [
    { id: 0, name: 'New', msg: 'This order has been paid?' },
    { id: 1, name: 'Payment Accept', msg: 'This Orders are being delivered?' },
    { id: 2, name: 'Shipping', msg: 'This order are delivered?' },
    { id: 3, name: 'Success', msg: '' },
    { id: 4, name: 'Canceled', msg: '' }
];

