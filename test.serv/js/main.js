'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Model() {
	var _this = this;

	var _apiPrefix = 'http://0.0.0.0:3000/api/';
	var _ORDERS = _apiPrefix + 'Orders/';
	var _currentOrder = null;
	var _curentProducts = null;

	this.getOrderId = function (id) {
		return id;
	};
	this.setOrderId = function (id) {
		return _this.getOrderId(id);
	};
	this.getCurrentOrders = function () {
		return _currentOrder;
	};
	this.getUrlOrder = function () {
		return _ORDERS;
	};
	this.getUrlProduct = function (id) {
		var url = _apiPrefix + 'Orders/' + id + '/products';
		return url;
	};
	this.getProductsById = function (id) {
		var PRODUCTS = _apiPrefix + 'Orders/' + id + '/products';
		var readyProducts = _this.fetchOrderProducts(PRODUCTS);
		return readyProducts;
	};

	this.sendProduct = function (id) {
		var PRODUCTS = _apiPrefix + 'Orders/' + id + '/products';
	};

	this.fetchAllOrders = function (url) {
		return _this.fetchData(url).then(_this.parse).then(function (orderData) {
			_currentOrder = orderData;
			return orderData;
		}).catch(function (error) {
			return console.error(error);
		});
	};

	this.fetchOrderProducts = function (url) {
		return _this.fetchData(url).then(_this.parse).then(function (orderData) {
			_curentProducts = orderData;
			return orderData;
		}).catch(function (error) {
			return console.error(error);
		});
	};

	this.parse = function (xhttp) {
		var parseJSON = JSON.parse(xhttp, function (key, value) {
			if (key == 'createdAt' || key == 'shippedAt') {
				var time_temp = new Date(value);
				return time_temp.toLocaleDateString();
			}
			return value;
		});
		return parseJSON;
	};

	this.deleteProduct = function (order_id, prod_id) {
		var PRODUCTS = _apiPrefix + 'OrderProducts/' + prod_id;
		return _this.DELETE_DATA(PRODUCTS).then(function (text) {
			var PRODUCTS_LOC = _apiPrefix + 'Orders/' + order_id + '/products';
			var getProd = _this.fetchOrderProducts(PRODUCTS_LOC);
			return getProd;
		}).catch(function (error) {
			return console.error(error);
		});
	};

	this.deleteFullOrder = function (order_id) {
		var order = '' + _ORDERS + order_id;

		return _this.DELETE_DATA(order).then(function (text) {
			return text;
		}).catch(function (error) {
			return console.error(error);
		});
	};

	this.fetchData = function (url) {
		var promise = new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);

			xhr.setRequestHeader("Cache-Control", "no-cache, no-store, must-revalidate");
			// listen to load event
			xhr.addEventListener("load", function () {
				if (xhr.status == 200 && xhr.readyState === 4) {
					resolve(xhr.responseText);
				} else {
					reject(new Error("Request failed: " + xhr.statusText));
				}
			});
			// listen to error event
			xhr.addEventListener("error", function () {
				reject(new Error("Network error"));
			});
			xhr.send();
		});
		return promise;
	};

	this.sendData = function (url, data) {
		var promise = new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.addEventListener("load", function () {
				if (xhr.status < 400 && xhr.readyState === 4) {
					resolve(url);
					console.log(url);
				}
			});
			xhr.addEventListener("error", function () {
				reject(new Error("Network error"));
			});
			xhr.send(data);
		});
		return promise;
	};
	this.patchData = function () {};

	this.DELETE_DATA = function (url) {
		var promise = new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			console.log();
			xhr.open("DELETE", url, true);

			xhr.addEventListener("load", function () {
				if (xhr.status < 400 && xhr.readyState === 4) {
					resolve(xhr.response);
				}
			});
			xhr.addEventListener("error", function () {
				reject(new Error("Network error"));
			});
			xhr.send();
		});
		return promise;
	};
}

function View() {
	var _this2 = this;

	var addOrderButton = 'footer__btn_add-order',
	    searchOrdersInput = 'search-form__ipt_search',
	    shippingAddresButton = 'section-stages__btn_shippingAdress',
	    customerInfoButton = 'section-stages__btn_customerInfo',
	    mapButton = 'section-stages__btn_map',
	    addProductButton = 'section-table__add-product',
	    deleteFullOrder = 'footer__btn_trash',
	    ulAside = 'orders-list',
	    ulSectionInfo = 'section-info',
	    ulPostInfo = 'full-info__post-info.postinfo',
	    ulCustomerInfo = 'full-info__customer-info',
	    table = 'section-table__table',
	    addOrderForm = 'add-order-form',
	    closeAddOrderForm = 'add-order-form__close',
	    ulSectionStages = 'section-stages',
	    sectionPostInfo = 'full-info_post-info',
	    sectionCustomerInfo = 'full-info_customer-info',
	    sectionMap = 'full-info_map',
	    sendForm = 'submit',
	    productsTable = 'section-table__table',
	    addProductBtn = 'section-table__add-product',
	    addPruductForm = 'add-product-form',
	    closeAddPruductFormButton = 'poductCloses',
	    submitPruductForm = 'poductSubmit';

	this._getterOfVariables = function (variable) {
		return document.querySelector('.' + variable);
	};

	this.getSendFormButton = function () {
		return document.querySelector('#' + sendForm);
	};

	this.getUlSectionStages = function () {
		return document.querySelector('.' + ulSectionStages);
	};

	this.getAddOrderButton = function () {
		return document.querySelector('.' + addOrderButton);
	};

	this.getCloseAddOrderForm = function () {
		return document.querySelector('.' + closeAddOrderForm);
	};

	this.getUlAside = function () {
		return document.querySelector('.' + ulAside);
	};

	this.getSearchOrdersInput = function () {
		return document.querySelector('.' + searchOrdersInput);
	};

	this.getOrderForm = function () {
		return document.querySelector('.' + addOrderForm);
	};

	this.getUlPostInfo = function () {
		return document.querySelector('.' + ulPostInfo);
	};

	this.getProductsTable = function () {
		return document.querySelector('.' + productsTable);
	};

	this.getCloseAddPruductFormButton = function () {
		return document.querySelector('#' + closeAddPruductFormButton);
	};

	this.closePruductForm = function () {
		return _this2.getAddProductForm().classList.toggle("hide");
	};

	this.showPruductForm = function () {
		return _this2.getAddProductForm().classList.toggle("hide");
	};

	this.getSubmitPruductForm = function () {
		return document.querySelector('#' + submitPruductForm);
	};

	this.getAllOrderFormInputsValue = function () {
		var ipts = _this2.getOrderForm().querySelectorAll('input');
		var dataArr = [];
		for (var i = 0; i < ipts.length; i++) {
			dataArr.push(ipts[i].value);
		}
		return dataArr;
	};

	this.getAddProduct = function () {
		return document.querySelector('.' + addProductBtn);
	};

	this.getAddProductForm = function () {
		return document.querySelector('.' + addPruductForm);
	};

	this.getDeleteFullOrderBtn = function () {
		return document.querySelector('.' + deleteFullOrder);
	};

	this.getAllProductFormInputsValue = function () {
		var ipts = _this2.getAddProductForm().querySelectorAll('input');
		var dataArr = [];
		for (var i = 0; i < ipts.length; i++) {
			dataArr.push(ipts[i].value);
		}
		return dataArr;
	};

	this.showOrderForm = function () {
		var orderForm = document.querySelector('.' + addOrderForm);
		orderForm.classList.toggle("hide");
	};

	this.closeOrderForm = function () {
		var orderForm = document.querySelector('.' + addOrderForm);
		orderForm.classList.toggle('hide');
	};

	this.constructOrderOnPage = function (orderData) {
		for (var key in orderData) {
			if (key === 'summary') {
				_this2.createListItem(orderData);
				_this2.createSectionInfo(orderData[key]);
			} else if (key === 'shipTo') {
				_this2.createShipToList(orderData[key]);
			} else if (key === 'customerInfo') {
				_this2.createCustomerInfoList(orderData[key]);
			} else {
				_this2.idOfOrder(orderData[key]);
			}
		}
	};

	this.buidFullOrder = function (orderData) {
		for (var key in orderData) {
			if (key === 'summary') {
				_this2.createSectionInfo(orderData[key]);
			} else if (key === 'shipTo') {
				_this2.createShipToList(orderData[key]);
			} else if (key === 'customerInfo') {
				_this2.createCustomerInfoList(orderData[key]);
			} else {
				_this2.idOfOrder(orderData[key]);
			}
		}
	};

	this.createListItem = function (orderData) {
		var orderInfo = orderData.summary;
		// orderInfo.status == `pending` ? <<color: red>> : <<color: green>>
		var inner_li = '<div class="orders-list__row orders-list__row_first">\n\t\t\t\t\t              <p class="orders-list__title">Order 7991</p>\n\t\t\t\t\t              <p class="orders-list__data search_js">' + orderInfo.createdAt + '</p>\n\t\t\t\t\t            </div>\n\t\t\t\t\t            <div class="orders-list__row orders-list__row_second">\n\t\t\t\t\t              <span class="orders-list__desc search_js">' + orderInfo.customer + '</span>\n\t\t\t\t\t              <span class="orders-list__status search_js">' + orderInfo.status + '</span>\n\t\t\t\t\t            </div>\n\t\t\t\t\t            <div class="orders-list__row orders-list__row_third">\n\t\t\t\t\t              <p class="orders-list__info search_js">Shipped:\n\t\t\t\t\t                <span class="orders-list__shippedAt "> ' + orderInfo.shippedAt + '</span></p>\n\t\t\t\t\t            </div>';
		var li = document.createElement('li');
		li.setAttribute('data-order-id', '' + orderData.id);
		li.className = 'orders-list__item';
		li.innerHTML = inner_li;
		_this2.getUlAside().appendChild(li);
	};

	this.createSectionInfo = function (summary) {
		var orderInfo = summary;
		var li_sectionInfo = '<li class="section-info__customer section-info__item">Customer: ' + orderInfo.customer + '</li>\n\t\t                          <li class="section-info__ordered section-info__item">Ordered: ' + orderInfo.createdAt + '</li>\n\t\t                          <li class="section-info__shipped section-info__item">Shipped: ' + orderInfo.shippedAt + '</li>';
		_this2._getterOfVariables(ulSectionInfo).innerHTML = li_sectionInfo;
	};

	this.createShipToList = function (shipTo) {
		var li_postInfo = ' <li class="postinfo__item"><span class="postinfo__span">Name: ' + shipTo.name + '</span></li>\n\t                        <li class="postinfo__item"><span class="postinfo__span">Street: ' + shipTo.address + '</span></li>\n\t                        <li class="postinfo__item"><span class="postinfo__span">ZIP Code/City: ' + shipTo.ZIP + '</span></li>\n\t                        <li class="postinfo__item"><span class="postinfo__span">Region: ' + shipTo.region + '</span></li>\n\t                        <li class="postinfo__item"><span class="postinfo__span">' + shipTo.country + '</span></li>';
		_this2._getterOfVariables(ulPostInfo).innerHTML = li_postInfo;
	};

	this.createCustomerInfoList = function (customerInfo) {
		var customerInfoList = '<li class="postinfo__item">First Name: ' + customerInfo.firstName + '</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="postinfo__item">Last Name: ' + customerInfo.lastName + '</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="postinfo__item">Address: ' + customerInfo.address + '</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="postinfo__item">Phone: ' + customerInfo.phone + '</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="postinfo__item">E-mail: ' + customerInfo.email + '</li>';
		_this2._getterOfVariables(ulCustomerInfo).innerHTML = customerInfoList;
	};

	this.buildProductsTable = function (products) {
		var table = _this2.getProductsTable();
		var myTable = '<tbody class="section-table__table-body"><tr class="section-table__table-row"><td class="section-table__table-column">Products</td>';
		myTable += '<td class="section-table__table-column">Unit Price</td>';
		myTable += '<td class="section-table__table-column">Quanitity</td>';
		myTable += '<td class="section-table__table-column">Total</td>';
		myTable += '<td class="section-table__table-column">Delete</td></tr>';

		for (var i = 0; i < products.length; i++) {
			myTable += '<tr data-product-id="' + products[i].id + '" class="section-table__table-row"><td class="section-table__table-column">' + products[i].name + '</td>';
			myTable += '<td class="section-table__table-column">' + products[i].price + ' ' + products[i].currency + '</td>';
			myTable += '<td class="section-table__table-column">' + products[i].quantity + '</td>';
			myTable += '<td class="section-table__table-column"> ' + products[i].totalPrice + '</td>';
			myTable += '<td class="section-table__table-column">\n\t\t\t\t\t\t\t\t\t<button class="section-table__button data-product-id="' + products[i].id + '">\n\t\t\t\t\t\t\t\t\t<i class="fa fa-trash"></i>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</td></tr>';
		}
		myTable += '</tbody>';

		table.innerHTML = myTable;
	};

	this.idOfOrder = function (id) {
		_this2.getAddProduct().setAttribute('data-order-id', '' + id);
		_this2.getDeleteFullOrderBtn().setAttribute('data-order-id', '' + id);
	};

	this.getOrderId = function () {
		return _this2.getAddProduct().getAttribute('data-order-id');
	};

	this.clearOrderList = function () {
		_this2.getUlAside().innerHTML = '';
	};

	this.showFullInfo = function (button) {
		var POSTINFO = this._getterOfVariables(sectionPostInfo);
		var CUSTOMER_INFO = this._getterOfVariables(sectionCustomerInfo);
		var YA_MAP = this._getterOfVariables(sectionMap);

		if (button.classList.contains('section-stages__btn_shippingAdress')) {
			POSTINFO.classList.remove('hide');
			CUSTOMER_INFO.classList.add('hide');
			YA_MAP.classList.add('hide');
		} else if (button.classList.contains('section-stages__btn_customerInfo')) {
			POSTINFO.classList.add('hide');
			CUSTOMER_INFO.classList.remove('hide');
			YA_MAP.classList.add('hide');
		} else if (button.classList.contains('section-stages__btn_map')) {
			POSTINFO.classList.add('hide');
			CUSTOMER_INFO.classList.add('hide');
			YA_MAP.classList.remove('hide');
		}
	};

	this.deleteProduct = function (btn) {
		var table_row = btn.parentNode.parentNode;
		table_row.classList.toggle('hide');
	};
}

function Controller(view, model) {
	var _this3 = this;

	/**
  * Initialize controller.
  *
  * @public
  */
	this.init = function () {
		var addOrderButton = view.getAddOrderButton(),
		    closeAddOrderForm = view.getCloseAddOrderForm(),
		    ordersList = view.getUlAside(),
		    sectionStagesList = view.getUlSectionStages(),
		    searchOrdersInput = view.getSearchOrdersInput(),
		    allInrustOrdersForm = view.getAllOrderFormInputsValue(),
		    sendFormButton = view.getSendFormButton(),
		    productsTable = view.getProductsTable(),
		    addPruductBtn = view.getAddProduct(),
		    addPruductForm = view.getAddProductForm(),
		    closeAddPruductFormButton = view.getCloseAddPruductFormButton(),
		    submitPruductForm = view.getSubmitPruductForm(),
		    ulPostInfo = view.getUlPostInfo(),
		    deleteFullOrderBtn = view.getDeleteFullOrderBtn();

		window.addEventListener('load', this._onOrdersListLoad);
		addOrderButton.addEventListener("click", this._onAddOrderClick);
		closeAddOrderForm.addEventListener("click", this._onCloseAddOrderFormClick);
		sectionStagesList.addEventListener('click', this._onSectionStagesListClick);
		ordersList.addEventListener('click', this._onOrdersListClick);
		searchOrdersInput.addEventListener('keyup', this._onSearchOrdersInputKeyUp);
		sendFormButton.addEventListener('click', this._onSendFormButtonClick);
		productsTable.addEventListener('click', this._onProductsTableClick);
		addPruductBtn.addEventListener('click', this._onAddPruductBtnClick);
		closeAddPruductFormButton.addEventListener('click', this._onCloseAddPruductFormButtonClick);
		submitPruductForm.addEventListener('click', this._onSubmitPruductFormClick);
		ulPostInfo.addEventListener('click', this._onUlPostInfoClick);
		deleteFullOrderBtn.addEventListener('click', this._onDeleteFullOrderBtnClick);
	};
	/**
  * Search order button click event handler.
  *
  * @listens click
  *
  * @param {Event} e the DOM event object.
  *
  * @private
  */
	this._onAddOrderClick = function (e) {
		view.showOrderForm();
	};

	this._onCloseAddOrderFormClick = function (e) {
		view.closeOrderForm();
	};
	// спросить как доделать
	this._searchMatch = function (obj, ipn_tvalue) {
		for (var key in obj) {
			if (key == 'summary') {
				var summary = obj[key];
				for (var summary_prop in summary) {
					var localProp = summary[summary_prop].toString();
					if (typeof localProp !== 'object' && localProp.toUpperCase().includes(ipn_tvalue)) {
						view.clearOrderList(obj);
					} else {
						view.createListItem(obj);
					}
				}
			}
		}
	};

	this._onSearchOrdersInputKeyUp = function (e) {
		var inptValue = e.target.value.toUpperCase();
		var ordersArray = model.getCurrentOrders();
		for (var index in ordersArray) {
			_this3._searchMatch(ordersArray[index], inptValue);
		}
		// ordersArray.forEach(this._searchMatch);
	};

	this._onOrdersListClick = function (e) {
		var target = e.target;
		while (target != view.getUlAside()) {
			if (target.tagName == 'LI') {
				var _ret = function () {
					var li = target;
					var data_number = li.getAttribute('data-order-id');
					var ordersLIST = model.getCurrentOrders();
					ordersLIST.forEach(function (value) {
						if (data_number == value.id) {
							model.setOrderId(data_number);
							model.getProductsById(data_number).then(view.buildProductsTable).catch(function (error) {
								return console.error(error);
							});
							view.buidFullOrder(value);
						}
					});
					return {
						v: void 0
					};
				}();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
			target = target.parentNode;
		}
	};

	this._onOrdersListLoad = function (e) {
		while (view.getUlAside().firstChild) {
			view.getUlAside().removeChild(view.getUlAside().firstChild);
		}
		var url = model.getUrlOrder();
		model.fetchAllOrders(url).then(function (orderData) {
			orderData.forEach(view.constructOrderOnPage);
			return orderData;
		}).catch(function (error) {
			return console.error(error);
		});
	};

	this._onSectionStagesListClick = function (e) {
		var target = e.target;
		if (target.tagName == 'BUTTON') {
			view.showFullInfo(target);
		} else if (target.tagName == 'I') {
			view.showFullInfo(target.parentNode);
		}
	};

	this._onUlPostInfoClick = function (e) {
		var trgt = e.target;
		if (trgt.tagName == 'LI') {
			var li = trgt.lastChild;
		}
	};

	this.strigifyUserData = function (dataArr) {
		var nowDate = new Date();
		var temp_obj = {
			summary: {
				createdAt: nowDate,
				customer: dataArr[0],
				status: "Pending",
				shippedAt: nowDate,
				totalPrice: 290,
				currency: "EUR"
			},
			shipTo: {
				name: dataArr[1],
				address: dataArr[2],
				ZIP: dataArr[3],
				region: dataArr[4],
				country: dataArr[5]
			},
			customerInfo: {
				firstName: dataArr[6],
				lastName: dataArr[7],
				address: dataArr[8],
				phone: dataArr[9],
				email: dataArr[10]
			}
		};
		var stringifyData = JSON.stringify(temp_obj);
		return stringifyData;
	};

	this._onSendFormButtonClick = function (e) {
		var srting_data = _this3.strigifyUserData(view.getAllOrderFormInputsValue());
		view.closeOrderForm();
		model.sendData(model.getUrlOrder(), srting_data);
	};

	this._onProductsTableClick = function (e) {
		var target = e.target;
		while (target != view.getProductsTable()) {
			if (target.tagName == 'BUTTON') {
				var btn = target;
				var table_row = btn.parentNode.parentNode;
				var order_id = view.getOrderId();
				var prod_id = table_row.getAttribute('data-product-id');
				model.deleteProduct(order_id, prod_id).then(function (products) {
					view.buildProductsTable(products);
					return products;
				}).catch(function (error) {
					return console.error(error);
				});
				return;
			}
			target = target.parentNode;
		}
	};

	this.stingifyProduct = function (product) {
		var order_id = view.getOrderId();
		var temp_obj = {
			name: product[0],
			price: product[1],
			currency: product[2],
			quantity: product[3],
			totalPrice: product[4],
			orderId: order_id
		};
		var stringifyData = JSON.stringify(temp_obj);
		return stringifyData;
	};

	this._onSubmitPruductFormClick = function (e) {
		var product = view.getAllProductFormInputsValue();
		var stringifyProduct = _this3.stingifyProduct(product);
		var url = model.getUrlProduct(view.getOrderId());
		view.closePruductForm();
		model.sendData(url, stringifyProduct);
	};

	this._onDeleteFullOrderBtnClick = function (e) {
		var order_id = view.getOrderId();
		model.deleteFullOrder(order_id).then(_this3._onOrdersListLoad).catch(function (error) {
			return console.error(error);
		});
	};

	this._onAddPruductBtnClick = function (e) {
		view.showPruductForm();
	};

	this._onCloseAddPruductFormButtonClick = function (e) {
		view.closePruductForm();
	};
}

new Controller(new View(), new Model()).init();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk15TVZDLmpzIl0sIm5hbWVzIjpbIk1vZGVsIiwiX2FwaVByZWZpeCIsIl9PUkRFUlMiLCJfY3VycmVudE9yZGVyIiwiX2N1cmVudFByb2R1Y3RzIiwiZ2V0T3JkZXJJZCIsImlkIiwic2V0T3JkZXJJZCIsImdldEN1cnJlbnRPcmRlcnMiLCJnZXRVcmxPcmRlciIsImdldFVybFByb2R1Y3QiLCJ1cmwiLCJnZXRQcm9kdWN0c0J5SWQiLCJQUk9EVUNUUyIsInJlYWR5UHJvZHVjdHMiLCJmZXRjaE9yZGVyUHJvZHVjdHMiLCJzZW5kUHJvZHVjdCIsImZldGNoQWxsT3JkZXJzIiwiZmV0Y2hEYXRhIiwidGhlbiIsInBhcnNlIiwib3JkZXJEYXRhIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJ4aHR0cCIsInBhcnNlSlNPTiIsIkpTT04iLCJrZXkiLCJ2YWx1ZSIsInRpbWVfdGVtcCIsIkRhdGUiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJkZWxldGVQcm9kdWN0Iiwib3JkZXJfaWQiLCJwcm9kX2lkIiwiREVMRVRFX0RBVEEiLCJ0ZXh0IiwiUFJPRFVDVFNfTE9DIiwiZ2V0UHJvZCIsImRlbGV0ZUZ1bGxPcmRlciIsIm9yZGVyIiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGF0dXMiLCJyZWFkeVN0YXRlIiwicmVzcG9uc2VUZXh0IiwiRXJyb3IiLCJzdGF0dXNUZXh0Iiwic2VuZCIsInNlbmREYXRhIiwiZGF0YSIsImxvZyIsInBhdGNoRGF0YSIsInJlc3BvbnNlIiwiVmlldyIsImFkZE9yZGVyQnV0dG9uIiwic2VhcmNoT3JkZXJzSW5wdXQiLCJzaGlwcGluZ0FkZHJlc0J1dHRvbiIsImN1c3RvbWVySW5mb0J1dHRvbiIsIm1hcEJ1dHRvbiIsImFkZFByb2R1Y3RCdXR0b24iLCJ1bEFzaWRlIiwidWxTZWN0aW9uSW5mbyIsInVsUG9zdEluZm8iLCJ1bEN1c3RvbWVySW5mbyIsInRhYmxlIiwiYWRkT3JkZXJGb3JtIiwiY2xvc2VBZGRPcmRlckZvcm0iLCJ1bFNlY3Rpb25TdGFnZXMiLCJzZWN0aW9uUG9zdEluZm8iLCJzZWN0aW9uQ3VzdG9tZXJJbmZvIiwic2VjdGlvbk1hcCIsInNlbmRGb3JtIiwicHJvZHVjdHNUYWJsZSIsImFkZFByb2R1Y3RCdG4iLCJhZGRQcnVkdWN0Rm9ybSIsImNsb3NlQWRkUHJ1ZHVjdEZvcm1CdXR0b24iLCJzdWJtaXRQcnVkdWN0Rm9ybSIsIl9nZXR0ZXJPZlZhcmlhYmxlcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInZhcmlhYmxlIiwiZ2V0U2VuZEZvcm1CdXR0b24iLCJnZXRVbFNlY3Rpb25TdGFnZXMiLCJnZXRBZGRPcmRlckJ1dHRvbiIsImdldENsb3NlQWRkT3JkZXJGb3JtIiwiZ2V0VWxBc2lkZSIsImdldFNlYXJjaE9yZGVyc0lucHV0IiwiZ2V0T3JkZXJGb3JtIiwiZ2V0VWxQb3N0SW5mbyIsImdldFByb2R1Y3RzVGFibGUiLCJnZXRDbG9zZUFkZFBydWR1Y3RGb3JtQnV0dG9uIiwiY2xvc2VQcnVkdWN0Rm9ybSIsImdldEFkZFByb2R1Y3RGb3JtIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwic2hvd1BydWR1Y3RGb3JtIiwiZ2V0U3VibWl0UHJ1ZHVjdEZvcm0iLCJnZXRBbGxPcmRlckZvcm1JbnB1dHNWYWx1ZSIsImlwdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YUFyciIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZ2V0QWRkUHJvZHVjdCIsImdldERlbGV0ZUZ1bGxPcmRlckJ0biIsImdldEFsbFByb2R1Y3RGb3JtSW5wdXRzVmFsdWUiLCJzaG93T3JkZXJGb3JtIiwib3JkZXJGb3JtIiwiY2xvc2VPcmRlckZvcm0iLCJjb25zdHJ1Y3RPcmRlck9uUGFnZSIsImNyZWF0ZUxpc3RJdGVtIiwiY3JlYXRlU2VjdGlvbkluZm8iLCJjcmVhdGVTaGlwVG9MaXN0IiwiY3JlYXRlQ3VzdG9tZXJJbmZvTGlzdCIsImlkT2ZPcmRlciIsImJ1aWRGdWxsT3JkZXIiLCJvcmRlckluZm8iLCJzdW1tYXJ5IiwiaW5uZXJfbGkiLCJjcmVhdGVkQXQiLCJjdXN0b21lciIsInNoaXBwZWRBdCIsImxpIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwibGlfc2VjdGlvbkluZm8iLCJsaV9wb3N0SW5mbyIsInNoaXBUbyIsIm5hbWUiLCJhZGRyZXNzIiwiWklQIiwicmVnaW9uIiwiY291bnRyeSIsImN1c3RvbWVySW5mb0xpc3QiLCJjdXN0b21lckluZm8iLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lIiwiZW1haWwiLCJidWlsZFByb2R1Y3RzVGFibGUiLCJteVRhYmxlIiwicHJvZHVjdHMiLCJwcmljZSIsImN1cnJlbmN5IiwicXVhbnRpdHkiLCJ0b3RhbFByaWNlIiwiZ2V0QXR0cmlidXRlIiwiY2xlYXJPcmRlckxpc3QiLCJzaG93RnVsbEluZm8iLCJidXR0b24iLCJQT1NUSU5GTyIsIkNVU1RPTUVSX0lORk8iLCJZQV9NQVAiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsImJ0biIsInRhYmxlX3JvdyIsInBhcmVudE5vZGUiLCJDb250cm9sbGVyIiwidmlldyIsIm1vZGVsIiwiaW5pdCIsIm9yZGVyc0xpc3QiLCJzZWN0aW9uU3RhZ2VzTGlzdCIsImFsbElucnVzdE9yZGVyc0Zvcm0iLCJzZW5kRm9ybUJ1dHRvbiIsImFkZFBydWR1Y3RCdG4iLCJkZWxldGVGdWxsT3JkZXJCdG4iLCJ3aW5kb3ciLCJfb25PcmRlcnNMaXN0TG9hZCIsIl9vbkFkZE9yZGVyQ2xpY2siLCJfb25DbG9zZUFkZE9yZGVyRm9ybUNsaWNrIiwiX29uU2VjdGlvblN0YWdlc0xpc3RDbGljayIsIl9vbk9yZGVyc0xpc3RDbGljayIsIl9vblNlYXJjaE9yZGVyc0lucHV0S2V5VXAiLCJfb25TZW5kRm9ybUJ1dHRvbkNsaWNrIiwiX29uUHJvZHVjdHNUYWJsZUNsaWNrIiwiX29uQWRkUHJ1ZHVjdEJ0bkNsaWNrIiwiX29uQ2xvc2VBZGRQcnVkdWN0Rm9ybUJ1dHRvbkNsaWNrIiwiX29uU3VibWl0UHJ1ZHVjdEZvcm1DbGljayIsIl9vblVsUG9zdEluZm9DbGljayIsIl9vbkRlbGV0ZUZ1bGxPcmRlckJ0bkNsaWNrIiwiZSIsIl9zZWFyY2hNYXRjaCIsIm9iaiIsImlwbl90dmFsdWUiLCJzdW1tYXJ5X3Byb3AiLCJsb2NhbFByb3AiLCJ0b1N0cmluZyIsInRvVXBwZXJDYXNlIiwiaW5jbHVkZXMiLCJpbnB0VmFsdWUiLCJ0YXJnZXQiLCJvcmRlcnNBcnJheSIsImluZGV4IiwidGFnTmFtZSIsImRhdGFfbnVtYmVyIiwib3JkZXJzTElTVCIsImZvckVhY2giLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJ0cmd0IiwibGFzdENoaWxkIiwic3RyaWdpZnlVc2VyRGF0YSIsIm5vd0RhdGUiLCJ0ZW1wX29iaiIsInN0cmluZ2lmeURhdGEiLCJzdHJpbmdpZnkiLCJzcnRpbmdfZGF0YSIsInN0aW5naWZ5UHJvZHVjdCIsInByb2R1Y3QiLCJvcmRlcklkIiwic3RyaW5naWZ5UHJvZHVjdCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLFNBQVNBLEtBQVQsR0FBaUI7QUFBQTs7QUFDaEIsS0FBTUMsdUNBQU47QUFDQSxLQUFJQyxVQUFhRCxVQUFiLFlBQUo7QUFDQSxLQUFJRSxnQkFBZ0IsSUFBcEI7QUFDQSxLQUFJQyxrQkFBa0IsSUFBdEI7O0FBRUEsTUFBS0MsVUFBTCxHQUFrQixVQUFDQyxFQUFEO0FBQUEsU0FBUUEsRUFBUjtBQUFBLEVBQWxCO0FBQ0EsTUFBS0MsVUFBTCxHQUFrQixVQUFDRCxFQUFEO0FBQUEsU0FBUSxNQUFLRCxVQUFMLENBQWdCQyxFQUFoQixDQUFSO0FBQUEsRUFBbEI7QUFDQSxNQUFLRSxnQkFBTCxHQUF3QjtBQUFBLFNBQU1MLGFBQU47QUFBQSxFQUF4QjtBQUNBLE1BQUtNLFdBQUwsR0FB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UTtBQUFBLFVBQVNDLFFBQVFDLEtBQVIsQ0FBY0EsS0FBZCxDQUFUO0FBQUEsR0FIUjtBQUlBLEVBTkQ7O0FBUUEsTUFBS3VLLHFCQUFMLEdBQTZCLFVBQUNLLENBQUQsRUFBTTtBQUNsQ3ZCLE9BQUtyRSxlQUFMO0FBQ0EsRUFGRDs7QUFJQSxNQUFLd0YsaUNBQUwsR0FBd0MsVUFBQ0ksQ0FBRCxFQUFLO0FBQzVDdkIsT0FBS3pFLGdCQUFMO0FBQ0EsRUFGRDtBQUlBOztBQUlBLElBQUl3RSxVQUFKLENBQWUsSUFBSTlHLElBQUosRUFBZixFQUF5QixJQUFJOUQsS0FBSixFQUF6QixDQUFELENBQXNDK0ssSUFBdEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIE1vZGVsKCkge1xuXHRjb25zdCBfYXBpUHJlZml4ID0gYGh0dHA6Ly8wLjAuMC4wOjMwMDAvYXBpL2A7XG5cdGxldCBfT1JERVJTID0gYCR7X2FwaVByZWZpeH1PcmRlcnMvYDtcblx0bGV0IF9jdXJyZW50T3JkZXIgPSBudWxsO1xuXHRsZXQgX2N1cmVudFByb2R1Y3RzID0gbnVsbDtcblxuXHR0aGlzLmdldE9yZGVySWQgPSAoaWQpID0+IGlkO1xuXHR0aGlzLnNldE9yZGVySWQgPSAoaWQpID0+IHRoaXMuZ2V0T3JkZXJJZChpZCk7XG5cdHRoaXMuZ2V0Q3VycmVudE9yZGVycyA9ICgpID0+IF9jdXJyZW50T3JkZXI7XG5cdHRoaXMuZ2V0VXJsT3JkZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIF9PUkRFUlM7XG5cdH1cblx0dGhpcy5nZXRVcmxQcm9kdWN0ID0gKGlkKSA9Pntcblx0XHRjb25zdCB1cmwgPSBgJHtfYXBpUHJlZml4fU9yZGVycy8ke2lkfS9wcm9kdWN0c2A7XG5cdFx0cmV0dXJuIHVybDtcblx0fVxuXHR0aGlzLmdldFByb2R1Y3RzQnlJZCA9IChpZCkgPT57XG5cdFx0Y29uc3QgUFJPRFVDVFMgPSBgJHtfYXBpUHJlZml4fU9yZGVycy8ke2lkfS9wcm9kdWN0c2A7XG5cdFx0Y29uc3QgcmVhZHlQcm9kdWN0cyA9IHRoaXMuZmV0Y2hPcmRlclByb2R1Y3RzKFBST0RVQ1RTKTtcblx0XHRyZXR1cm4gcmVhZHlQcm9kdWN0cztcblx0fVxuXG5cdHRoaXMuc2VuZFByb2R1Y3QgPSAoaWQpID0+e1xuXHRcdGNvbnN0IFBST0RVQ1RTID0gYCR7X2FwaVByZWZpeH1PcmRlcnMvJHtpZH0vcHJvZHVjdHNgO1xuXHR9XG5cbiAgdGhpcy5mZXRjaEFsbE9yZGVycyA9ICh1cmwpID0+IHtcbiAgICByZXR1cm4gdGhpc1xuXHRcdFx0XHQuZmV0Y2hEYXRhKHVybClcblx0XHRcdFx0LnRoZW4odGhpcy5wYXJzZSlcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKG9yZGVyRGF0YSkge1xuXHRcdFx0XHRcdF9jdXJyZW50T3JkZXIgPSBvcmRlckRhdGE7XG5cdFx0XHRcdFx0cmV0dXJuIG9yZGVyRGF0YTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAgfVxuXG5cdHRoaXMuZmV0Y2hPcmRlclByb2R1Y3RzID0gdXJsID0+e1xuXHRcdHJldHVybiB0aGlzXG5cdFx0XHRcdC5mZXRjaERhdGEodXJsKVxuXHRcdFx0XHQudGhlbih0aGlzLnBhcnNlKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbihvcmRlckRhdGEpe1xuXHRcdFx0XHRcdF9jdXJlbnRQcm9kdWN0cyAgPSBvcmRlckRhdGE7XG5cdFx0XHRcdFx0cmV0dXJuIG9yZGVyRGF0YTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcblxuXHR9XG5cblx0dGhpcy5wYXJzZSA9ICh4aHR0cCkgPT4ge1xuXHRcdGNvbnN0IHBhcnNlSlNPTiA9IEpTT04ucGFyc2UoeGh0dHAsIChrZXksIHZhbHVlKSA9PiB7XG5cdFx0XHRpZiAoa2V5ID09ICdjcmVhdGVkQXQnIHx8IGtleSA9PSdzaGlwcGVkQXQnKXtcblx0XHRcdFx0bGV0IHRpbWVfdGVtcCA9IG5ldyBEYXRlKHZhbHVlKTtcblx0XHRcdFx0cmV0dXJuIHRpbWVfdGVtcC50b0xvY2FsZURhdGVTdHJpbmcoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHBhcnNlSlNPTjtcblx0fVxuXG5cdHRoaXMuZGVsZXRlUHJvZHVjdCA9IChvcmRlcl9pZCwgcHJvZF9pZCk9Pntcblx0XHRjb25zdCBQUk9EVUNUUyA9IGAke19hcGlQcmVmaXh9T3JkZXJQcm9kdWN0cy8ke3Byb2RfaWR9YDtcblx0XHQgcmV0dXJuIHRoaXNcblx0XHRcdFx0LkRFTEVURV9EQVRBKFBST0RVQ1RTKVxuXHRcdFx0XHQudGhlbigodGV4dCk9Pntcblx0XHRcdFx0XHRjb25zdCBQUk9EVUNUU19MT0MgPSBgJHtfYXBpUHJlZml4fU9yZGVycy8ke29yZGVyX2lkfS9wcm9kdWN0c2A7XG5cdFx0XHRcdFx0Y29uc3QgZ2V0UHJvZCA9IHRoaXMuZmV0Y2hPcmRlclByb2R1Y3RzKFBST0RVQ1RTX0xPQyk7XG5cdFx0XHRcdFx0cmV0dXJuIGdldFByb2Q7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG5cdH1cblxuXHR0aGlzLmRlbGV0ZUZ1bGxPcmRlciA9IChvcmRlcl9pZCkgPT57XG5cdFx0Y29uc3Qgb3JkZXIgPSBgJHtfT1JERVJTfSR7b3JkZXJfaWR9YFxuXG5cdFx0cmV0dXJuIHRoaXNcblx0XHRcdCAuREVMRVRFX0RBVEEob3JkZXIpXG5cdFx0XHQgLnRoZW4odGV4dCA9PiB0ZXh0KVxuXHRcdFx0IC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG5cdH1cblxuXHR0aGlzLmZldGNoRGF0YSA9IGZ1bmN0aW9uICh1cmwpIHtcblx0XHRjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0Y29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuXG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNhY2hlLUNvbnRyb2xcIiwgXCJuby1jYWNoZSwgbm8tc3RvcmUsIG11c3QtcmV2YWxpZGF0ZVwiKTtcblx0XHRcdC8vIGxpc3RlbiB0byBsb2FkIGV2ZW50XG5cdFx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA9PSAyMDAgJiYgeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJSZXF1ZXN0IGZhaWxlZDogXCIgKyB4aHIuc3RhdHVzVGV4dCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdC8vIGxpc3RlbiB0byBlcnJvciBldmVudFxuXHRcdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJOZXR3b3JrIGVycm9yXCIpKTtcblx0XHRcdH0pO1xuXHRcdHhoci5zZW5kKCk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cblxuXHR0aGlzLnNlbmREYXRhID0gZnVuY3Rpb24odXJsLCBkYXRhKXtcblx0XHRjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXHRcdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPCA0MDAgJiYgeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcblx0XHRcdFx0XHRyZXNvbHZlKHVybCk7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2codXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk5ldHdvcmsgZXJyb3JcIikpO1xuXHRcdFx0fSk7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcHJvbWlzZTtcblx0fVxuXHR0aGlzLnBhdGNoRGF0YSA9IGZ1bmN0aW9uICgpIHtcblxuXHR9XG5cblx0dGhpcy5ERUxFVEVfREFUQSA9IGZ1bmN0aW9uKHVybCl7XG5cdFx0Y29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0Y29uc29sZS5sb2coKTtcblx0XHRcdHhoci5vcGVuKFwiREVMRVRFXCIsIHVybCwgdHJ1ZSk7XG5cblx0XHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzIDwgNDAwICYmIHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHhoci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTmV0d29yayBlcnJvclwiKSk7XG5cdFx0XHR9KTtcblx0XHRcdHhoci5zZW5kKCk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5mdW5jdGlvbiBWaWV3KCkge1xuICBjb25zdCBhZGRPcmRlckJ1dHRvbiA9IGBmb290ZXJfX2J0bl9hZGQtb3JkZXJgLFxuICAgICAgICBzZWFyY2hPcmRlcnNJbnB1dCA9IGBzZWFyY2gtZm9ybV9faXB0X3NlYXJjaGAsXG4gICAgICAgIHNoaXBwaW5nQWRkcmVzQnV0dG9uID0gYHNlY3Rpb24tc3RhZ2VzX19idG5fc2hpcHBpbmdBZHJlc3NgLFxuICAgICAgICBjdXN0b21lckluZm9CdXR0b24gPSBgc2VjdGlvbi1zdGFnZXNfX2J0bl9jdXN0b21lckluZm9gLFxuICAgICAgICBtYXBCdXR0b24gPSBgc2VjdGlvbi1zdGFnZXNfX2J0bl9tYXBgLFxuICAgICAgICBhZGRQcm9kdWN0QnV0dG9uID0gYHNlY3Rpb24tdGFibGVfX2FkZC1wcm9kdWN0YCxcbiAgICAgICAgZGVsZXRlRnVsbE9yZGVyID0gYGZvb3Rlcl9fYnRuX3RyYXNoYCxcbiAgICAgICAgdWxBc2lkZSA9IGBvcmRlcnMtbGlzdGAsXG4gICAgICAgIHVsU2VjdGlvbkluZm8gPSBgc2VjdGlvbi1pbmZvYCxcbiAgICAgICAgdWxQb3N0SW5mbyA9IGBmdWxsLWluZm9fX3Bvc3QtaW5mby5wb3N0aW5mb2AsXG5cdFx0XHRcdHVsQ3VzdG9tZXJJbmZvID0gYGZ1bGwtaW5mb19fY3VzdG9tZXItaW5mb2AsXG4gICAgICAgIHRhYmxlID0gYHNlY3Rpb24tdGFibGVfX3RhYmxlYCxcbiAgICAgICAgYWRkT3JkZXJGb3JtID0gYGFkZC1vcmRlci1mb3JtYCxcbiAgICAgICAgY2xvc2VBZGRPcmRlckZvcm0gPSBgYWRkLW9yZGVyLWZvcm1fX2Nsb3NlYCxcblx0XHRcdFx0dWxTZWN0aW9uU3RhZ2VzID0gYHNlY3Rpb24tc3RhZ2VzYCxcblx0XHRcdFx0c2VjdGlvblBvc3RJbmZvID0gYGZ1bGwtaW5mb19wb3N0LWluZm9gLFxuXHRcdFx0XHRzZWN0aW9uQ3VzdG9tZXJJbmZvID0gYGZ1bGwtaW5mb19jdXN0b21lci1pbmZvYCxcblx0XHRcdFx0c2VjdGlvbk1hcCA9IGBmdWxsLWluZm9fbWFwYCxcblx0XHRcdFx0c2VuZEZvcm0gPSBgc3VibWl0YCxcblx0XHRcdFx0cHJvZHVjdHNUYWJsZSA9IGBzZWN0aW9uLXRhYmxlX190YWJsZWAsXG5cdFx0XHRcdGFkZFByb2R1Y3RCdG4gPSBgc2VjdGlvbi10YWJsZV9fYWRkLXByb2R1Y3RgLFxuXHRcdFx0XHRhZGRQcnVkdWN0Rm9ybSA9IGBhZGQtcHJvZHVjdC1mb3JtYCxcblx0XHRcdFx0Y2xvc2VBZGRQcnVkdWN0Rm9ybUJ1dHRvbiA9IGBwb2R1Y3RDbG9zZXNgLFxuXHRcdFx0XHRzdWJtaXRQcnVkdWN0Rm9ybSA9IGBwb2R1Y3RTdWJtaXRgO1xuXG5cdHRoaXMuX2dldHRlck9mVmFyaWFibGVzID0gdmFyaWFibGUgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dmFyaWFibGV9YCk7XG5cblx0dGhpcy5nZXRTZW5kRm9ybUJ1dHRvbiA9ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NlbmRGb3JtfWApXG5cblx0dGhpcy5nZXRVbFNlY3Rpb25TdGFnZXMgPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHt1bFNlY3Rpb25TdGFnZXN9YCk7XG5cbiAgdGhpcy5nZXRBZGRPcmRlckJ1dHRvbiA9ICAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHthZGRPcmRlckJ1dHRvbn1gKTtcblxuICB0aGlzLmdldENsb3NlQWRkT3JkZXJGb3JtID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xvc2VBZGRPcmRlckZvcm19YCk7XG5cblx0dGhpcy5nZXRVbEFzaWRlID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dWxBc2lkZX1gKTtcblxuXHR0aGlzLmdldFNlYXJjaE9yZGVyc0lucHV0ID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c2VhcmNoT3JkZXJzSW5wdXR9YCk7XG5cblx0dGhpcy5nZXRPcmRlckZvcm0gPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHthZGRPcmRlckZvcm19YCk7XG5cblx0dGhpcy5nZXRVbFBvc3RJbmZvID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dWxQb3N0SW5mb31gKTtcblxuXHR0aGlzLmdldFByb2R1Y3RzVGFibGUgPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwcm9kdWN0c1RhYmxlfWApO1xuXG5cdHRoaXMuZ2V0Q2xvc2VBZGRQcnVkdWN0Rm9ybUJ1dHRvbiA9ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2Nsb3NlQWRkUHJ1ZHVjdEZvcm1CdXR0b259YCk7XG5cblx0dGhpcy5jbG9zZVBydWR1Y3RGb3JtID0gKCkgPT4gdGhpcy5nZXRBZGRQcm9kdWN0Rm9ybSgpLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuXG5cdHRoaXMuc2hvd1BydWR1Y3RGb3JtID0gKCkgPT4gdGhpcy5nZXRBZGRQcm9kdWN0Rm9ybSgpLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuXG5cdHRoaXMuZ2V0U3VibWl0UHJ1ZHVjdEZvcm0gPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtzdWJtaXRQcnVkdWN0Rm9ybX1gKTtcblxuXHR0aGlzLmdldEFsbE9yZGVyRm9ybUlucHV0c1ZhbHVlID0gKCkgPT57XG5cdFx0XHRjb25zdCBpcHRzID0gdGhpcy5nZXRPcmRlckZvcm0oKS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xuXHRcdFx0bGV0IGRhdGFBcnIgPSBbXTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRkYXRhQXJyLnB1c2goaXB0c1tpXS52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGF0YUFycjtcblx0fVxuXG5cdHRoaXMuZ2V0QWRkUHJvZHVjdCA9ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2FkZFByb2R1Y3RCdG59YCk7XG5cblx0dGhpcy5nZXRBZGRQcm9kdWN0Rm9ybSA9ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2FkZFBydWR1Y3RGb3JtfWApO1xuXG5cdHRoaXMuZ2V0RGVsZXRlRnVsbE9yZGVyQnRuID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7ZGVsZXRlRnVsbE9yZGVyfWApO1xuXG5cdHRoaXMuZ2V0QWxsUHJvZHVjdEZvcm1JbnB1dHNWYWx1ZSA9ICgpID0+e1xuXHRcdGNvbnN0IGlwdHMgPSB0aGlzLmdldEFkZFByb2R1Y3RGb3JtKCkucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcblx0XHRsZXQgZGF0YUFyciA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZGF0YUFyci5wdXNoKGlwdHNbaV0udmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YUFycjtcblx0fVxuXG4gIHRoaXMuc2hvd09yZGVyRm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBvcmRlckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHthZGRPcmRlckZvcm19YCk7XG4gICAgb3JkZXJGb3JtLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuICB9O1xuXG4gIHRoaXMuY2xvc2VPcmRlckZvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3Qgb3JkZXJGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7YWRkT3JkZXJGb3JtfWApO1xuICAgIG9yZGVyRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gIH1cblxuXHR0aGlzLmNvbnN0cnVjdE9yZGVyT25QYWdlID0gb3JkZXJEYXRhID0+IHtcblx0XHRmb3IgKGxldCBrZXkgaW4gb3JkZXJEYXRhKSB7XG5cdFx0XHRpZiAoa2V5ID09PSBgc3VtbWFyeWApIHtcblx0XHRcdFx0dGhpcy5jcmVhdGVMaXN0SXRlbShvcmRlckRhdGEpO1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVNlY3Rpb25JbmZvKG9yZGVyRGF0YVtrZXldKTtcblx0XHRcdH1lbHNlIGlmKGtleSA9PT0gYHNoaXBUb2Ape1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVNoaXBUb0xpc3Qob3JkZXJEYXRhW2tleV0pO1xuXHRcdFx0fWVsc2UgaWYoa2V5ID09PWBjdXN0b21lckluZm9gKXtcblx0XHRcdFx0dGhpcy5jcmVhdGVDdXN0b21lckluZm9MaXN0KG9yZGVyRGF0YVtrZXldKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLmlkT2ZPcmRlcihvcmRlckRhdGFba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dGhpcy5idWlkRnVsbE9yZGVyID0gb3JkZXJEYXRhID0+e1xuXHRcdGZvciAobGV0IGtleSBpbiBvcmRlckRhdGEpIHtcblx0XHRcdGlmIChrZXkgPT09IGBzdW1tYXJ5YCkge1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVNlY3Rpb25JbmZvKG9yZGVyRGF0YVtrZXldKTtcblx0XHRcdH1lbHNlIGlmKGtleSA9PT0gYHNoaXBUb2Ape1xuXHRcdFx0XHR0aGlzLmNyZWF0ZVNoaXBUb0xpc3Qob3JkZXJEYXRhW2tleV0pO1xuXHRcdFx0fWVsc2UgaWYoa2V5ID09PWBjdXN0b21lckluZm9gKXtcblx0XHRcdFx0dGhpcy5jcmVhdGVDdXN0b21lckluZm9MaXN0KG9yZGVyRGF0YVtrZXldKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLmlkT2ZPcmRlcihvcmRlckRhdGFba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH1cblxuXHR0aGlzLmNyZWF0ZUxpc3RJdGVtID0gb3JkZXJEYXRhID0+e1xuXHQgIGNvbnN0IG9yZGVySW5mbyA9IG9yZGVyRGF0YS5zdW1tYXJ5O1xuXHRcdC8vIG9yZGVySW5mby5zdGF0dXMgPT0gYHBlbmRpbmdgID8gPDxjb2xvcjogcmVkPj4gOiA8PGNvbG9yOiBncmVlbj4+XG5cdCAgY29uc3QgaW5uZXJfbGkgPSBgPGRpdiBjbGFzcz1cIm9yZGVycy1saXN0X19yb3cgb3JkZXJzLWxpc3RfX3Jvd19maXJzdFwiPlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgPHAgY2xhc3M9XCJvcmRlcnMtbGlzdF9fdGl0bGVcIj5PcmRlciA3OTkxPC9wPlxuXHRcdFx0XHRcdCAgICAgICAgICAgICAgPHAgY2xhc3M9XCJvcmRlcnMtbGlzdF9fZGF0YSBzZWFyY2hfanNcIj4ke29yZGVySW5mby5jcmVhdGVkQXR9PC9wPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcmRlcnMtbGlzdF9fcm93IG9yZGVycy1saXN0X19yb3dfc2Vjb25kXCI+XG5cdFx0XHRcdFx0ICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm9yZGVycy1saXN0X19kZXNjIHNlYXJjaF9qc1wiPiR7b3JkZXJJbmZvLmN1c3RvbWVyfTwvc3Bhbj5cblx0XHRcdFx0XHQgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwib3JkZXJzLWxpc3RfX3N0YXR1cyBzZWFyY2hfanNcIj4ke29yZGVySW5mby5zdGF0dXN9PC9zcGFuPlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHRcdCAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcmRlcnMtbGlzdF9fcm93IG9yZGVycy1saXN0X19yb3dfdGhpcmRcIj5cblx0XHRcdFx0XHQgICAgICAgICAgICAgIDxwIGNsYXNzPVwib3JkZXJzLWxpc3RfX2luZm8gc2VhcmNoX2pzXCI+U2hpcHBlZDpcblx0XHRcdFx0XHQgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJvcmRlcnMtbGlzdF9fc2hpcHBlZEF0IFwiPiAke29yZGVySW5mby5zaGlwcGVkQXR9PC9zcGFuPjwvcD5cblx0XHRcdFx0XHQgICAgICAgICAgICA8L2Rpdj5gO1xuXHRcdGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0bGkuc2V0QXR0cmlidXRlKCdkYXRhLW9yZGVyLWlkJywgYCR7b3JkZXJEYXRhLmlkfWApO1xuXHRcdGxpLmNsYXNzTmFtZSA9ICdvcmRlcnMtbGlzdF9faXRlbSc7XG5cdFx0bGkuaW5uZXJIVE1MID0gaW5uZXJfbGk7XG4gXHRcdHRoaXMuZ2V0VWxBc2lkZSgpLmFwcGVuZENoaWxkKGxpKTtcblx0fVxuXG5cdHRoaXMuY3JlYXRlU2VjdGlvbkluZm8gPSBzdW1tYXJ5ID0+e1xuXHRcdFx0Y29uc3Qgb3JkZXJJbmZvID0gc3VtbWFyeTtcblx0XHRcdGNvbnN0IGxpX3NlY3Rpb25JbmZvID0gYDxsaSBjbGFzcz1cInNlY3Rpb24taW5mb19fY3VzdG9tZXIgc2VjdGlvbi1pbmZvX19pdGVtXCI+Q3VzdG9tZXI6ICR7b3JkZXJJbmZvLmN1c3RvbWVyfTwvbGk+XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzZWN0aW9uLWluZm9fX29yZGVyZWQgc2VjdGlvbi1pbmZvX19pdGVtXCI+T3JkZXJlZDogJHtvcmRlckluZm8uY3JlYXRlZEF0fTwvbGk+XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzZWN0aW9uLWluZm9fX3NoaXBwZWQgc2VjdGlvbi1pbmZvX19pdGVtXCI+U2hpcHBlZDogJHtvcmRlckluZm8uc2hpcHBlZEF0fTwvbGk+YDtcblx0XHQgIHRoaXMuX2dldHRlck9mVmFyaWFibGVzKHVsU2VjdGlvbkluZm8pLmlubmVySFRNTCA9IGxpX3NlY3Rpb25JbmZvO1xuXHR9XG5cblx0dGhpcy5jcmVhdGVTaGlwVG9MaXN0ID0gc2hpcFRvID0+e1xuXHRcdGNvbnN0IGxpX3Bvc3RJbmZvID0gYCA8bGkgY2xhc3M9XCJwb3N0aW5mb19faXRlbVwiPjxzcGFuIGNsYXNzPVwicG9zdGluZm9fX3NwYW5cIj5OYW1lOiAke3NoaXBUby5uYW1lfTwvc3Bhbj48L2xpPlxuXHQgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwb3N0aW5mb19faXRlbVwiPjxzcGFuIGNsYXNzPVwicG9zdGluZm9fX3NwYW5cIj5TdHJlZXQ6ICR7c2hpcFRvLmFkZHJlc3N9PC9zcGFuPjwvbGk+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInBvc3RpbmZvX19pdGVtXCI+PHNwYW4gY2xhc3M9XCJwb3N0aW5mb19fc3BhblwiPlpJUCBDb2RlL0NpdHk6ICR7c2hpcFRvLlpJUH08L3NwYW4+PC9saT5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicG9zdGluZm9fX2l0ZW1cIj48c3BhbiBjbGFzcz1cInBvc3RpbmZvX19zcGFuXCI+UmVnaW9uOiAke3NoaXBUby5yZWdpb259PC9zcGFuPjwvbGk+XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInBvc3RpbmZvX19pdGVtXCI+PHNwYW4gY2xhc3M9XCJwb3N0aW5mb19fc3BhblwiPiR7c2hpcFRvLmNvdW50cnl9PC9zcGFuPjwvbGk+YDtcblx0ICB0aGlzLl9nZXR0ZXJPZlZhcmlhYmxlcyh1bFBvc3RJbmZvKS5pbm5lckhUTUwgPSBsaV9wb3N0SW5mbztcblx0fVxuXG5cdHRoaXMuY3JlYXRlQ3VzdG9tZXJJbmZvTGlzdCA9IGN1c3RvbWVySW5mbyA9Pntcblx0XHRjb25zdCBjdXN0b21lckluZm9MaXN0ID0gYDxsaSBjbGFzcz1cInBvc3RpbmZvX19pdGVtXCI+Rmlyc3QgTmFtZTogJHtjdXN0b21lckluZm8uZmlyc3ROYW1lfTwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJwb3N0aW5mb19faXRlbVwiPkxhc3QgTmFtZTogJHtjdXN0b21lckluZm8ubGFzdE5hbWV9PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cInBvc3RpbmZvX19pdGVtXCI+QWRkcmVzczogJHtjdXN0b21lckluZm8uYWRkcmVzc308L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwicG9zdGluZm9fX2l0ZW1cIj5QaG9uZTogJHtjdXN0b21lckluZm8ucGhvbmV9PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cInBvc3RpbmZvX19pdGVtXCI+RS1tYWlsOiAke2N1c3RvbWVySW5mby5lbWFpbH08L2xpPmA7XG5cdFx0dGhpcy5fZ2V0dGVyT2ZWYXJpYWJsZXModWxDdXN0b21lckluZm8pLmlubmVySFRNTCA9IGN1c3RvbWVySW5mb0xpc3Q7XG5cdH1cblxuXHR0aGlzLmJ1aWxkUHJvZHVjdHNUYWJsZSA9IHByb2R1Y3RzID0+e1xuXHRcdGNvbnN0IHRhYmxlICA9IHRoaXMuZ2V0UHJvZHVjdHNUYWJsZSgpO1xuXHRcdGxldCBteVRhYmxlPSBgPHRib2R5IGNsYXNzPVwic2VjdGlvbi10YWJsZV9fdGFibGUtYm9keVwiPjx0ciBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLXJvd1wiPjx0ZCBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLWNvbHVtblwiPlByb2R1Y3RzPC90ZD5gO1xuXHRcdFx0bXlUYWJsZSs9IGA8dGQgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1jb2x1bW5cIj5Vbml0IFByaWNlPC90ZD5gO1xuXHRcdFx0bXlUYWJsZSs9YDx0ZCBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLWNvbHVtblwiPlF1YW5pdGl0eTwvdGQ+YDtcblx0XHRcdG15VGFibGUrPWA8dGQgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1jb2x1bW5cIj5Ub3RhbDwvdGQ+YDtcblx0XHRcdG15VGFibGUrPWA8dGQgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1jb2x1bW5cIj5EZWxldGU8L3RkPjwvdHI+YDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZHVjdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdG15VGFibGUrPWA8dHIgZGF0YS1wcm9kdWN0LWlkPVwiJHtwcm9kdWN0c1tpXS5pZH1cIiBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLXJvd1wiPjx0ZCBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLWNvbHVtblwiPiR7cHJvZHVjdHNbaV0ubmFtZX08L3RkPmA7XG5cdFx0XHRteVRhYmxlKz1gPHRkIGNsYXNzPVwic2VjdGlvbi10YWJsZV9fdGFibGUtY29sdW1uXCI+JHtwcm9kdWN0c1tpXS5wcmljZX0gJHtwcm9kdWN0c1tpXS5jdXJyZW5jeX08L3RkPmA7XG5cdFx0XHRteVRhYmxlKz1gPHRkIGNsYXNzPVwic2VjdGlvbi10YWJsZV9fdGFibGUtY29sdW1uXCI+JHtwcm9kdWN0c1tpXS5xdWFudGl0eX08L3RkPmA7XG5cdFx0XHRteVRhYmxlKz1gPHRkIGNsYXNzPVwic2VjdGlvbi10YWJsZV9fdGFibGUtY29sdW1uXCI+ICR7cHJvZHVjdHNbaV0udG90YWxQcmljZX08L3RkPmA7XG5cdFx0XHRteVRhYmxlKz1gPHRkIGNsYXNzPVwic2VjdGlvbi10YWJsZV9fdGFibGUtY29sdW1uXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzPVwic2VjdGlvbi10YWJsZV9fYnV0dG9uIGRhdGEtcHJvZHVjdC1pZD1cIiR7cHJvZHVjdHNbaV0uaWR9XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9pPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0PC90ZD48L3RyPmA7XG5cdFx0fVxuXHRcdCBteVRhYmxlKz1gPC90Ym9keT5gO1xuXG5cdFx0IHRhYmxlLmlubmVySFRNTCA9IG15VGFibGU7XG5cdH1cblxuXHR0aGlzLmlkT2ZPcmRlciA9IGlkID0+IHtcblx0XHR0aGlzLmdldEFkZFByb2R1Y3QoKS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3JkZXItaWQnLCBgJHtpZH1gKTtcblx0XHR0aGlzLmdldERlbGV0ZUZ1bGxPcmRlckJ0bigpLnNldEF0dHJpYnV0ZSgnZGF0YS1vcmRlci1pZCcsIGAke2lkfWApO1xuXHR9O1xuXG5cblx0dGhpcy5nZXRPcmRlcklkID0gKCkgPT4gdGhpcy5nZXRBZGRQcm9kdWN0KCkuZ2V0QXR0cmlidXRlKCdkYXRhLW9yZGVyLWlkJyk7XG5cblxuXG5cdHRoaXMuY2xlYXJPcmRlckxpc3QgPSAoKSA9Pntcblx0XHR0aGlzLmdldFVsQXNpZGUoKS5pbm5lckhUTUwgPSAnJztcblx0fVxuXG5cdHRoaXMuc2hvd0Z1bGxJbmZvID0gZnVuY3Rpb24oYnV0dG9uKXtcblx0XHRjb25zdCBQT1NUSU5GTyA9IHRoaXMuX2dldHRlck9mVmFyaWFibGVzKHNlY3Rpb25Qb3N0SW5mbyk7XG5cdFx0Y29uc3QgQ1VTVE9NRVJfSU5GTyA9IHRoaXMuX2dldHRlck9mVmFyaWFibGVzKHNlY3Rpb25DdXN0b21lckluZm8pO1xuXHRcdGNvbnN0IFlBX01BUD0gdGhpcy5fZ2V0dGVyT2ZWYXJpYWJsZXMoc2VjdGlvbk1hcCk7XG5cblx0XHRpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhgc2VjdGlvbi1zdGFnZXNfX2J0bl9zaGlwcGluZ0FkcmVzc2ApKSB7XG5cdFx0XHRQT1NUSU5GTy5jbGFzc0xpc3QucmVtb3ZlKGBoaWRlYCk7XG5cdFx0XHRDVVNUT01FUl9JTkZPLmNsYXNzTGlzdC5hZGQoYGhpZGVgKTtcblx0XHRcdFlBX01BUC5jbGFzc0xpc3QuYWRkKGBoaWRlYCk7XG5cdFx0fWVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoYHNlY3Rpb24tc3RhZ2VzX19idG5fY3VzdG9tZXJJbmZvYCkpIHtcblx0XHRcdFBPU1RJTkZPLmNsYXNzTGlzdC5hZGQoYGhpZGVgKTtcblx0XHRcdENVU1RPTUVSX0lORk8uY2xhc3NMaXN0LnJlbW92ZShgaGlkZWApO1xuXHRcdFx0WUFfTUFQLmNsYXNzTGlzdC5hZGQoYGhpZGVgKTtcblx0XHR9ZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhgc2VjdGlvbi1zdGFnZXNfX2J0bl9tYXBgKSkge1xuXHRcdFx0UE9TVElORk8uY2xhc3NMaXN0LmFkZChgaGlkZWApO1xuXHRcdFx0Q1VTVE9NRVJfSU5GTy5jbGFzc0xpc3QuYWRkKGBoaWRlYCk7XG5cdFx0XHRZQV9NQVAuY2xhc3NMaXN0LnJlbW92ZShgaGlkZWApO1xuXHRcdH1cblx0fVxuXG5cdHRoaXMuZGVsZXRlUHJvZHVjdCA9IChidG4pID0+e1xuXHRcdGNvbnN0IHRhYmxlX3JvdyA9IGJ0bi5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG5cdFx0dGFibGVfcm93LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcblx0fVxufVxuXG5cblxuXG5cblxuXG5cblxuZnVuY3Rpb24gQ29udHJvbGxlcih2aWV3LCBtb2RlbCkge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZSBjb250cm9sbGVyLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICB0aGlzLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBhZGRPcmRlckJ1dHRvblx0XHRcdFx0XHRcdD0gdmlldy5nZXRBZGRPcmRlckJ1dHRvbigpLFxuICAgICAgICAgIGNsb3NlQWRkT3JkZXJGb3JtIFx0XHRcdFx0PSB2aWV3LmdldENsb3NlQWRkT3JkZXJGb3JtKCksXG5cdFx0XHRcdFx0b3JkZXJzTGlzdCBcdFx0XHRcdFx0XHRcdFx0PSB2aWV3LmdldFVsQXNpZGUoKSxcblx0XHRcdFx0XHRzZWN0aW9uU3RhZ2VzTGlzdCBcdFx0XHRcdD0gdmlldy5nZXRVbFNlY3Rpb25TdGFnZXMoKSxcblx0XHRcdFx0XHRzZWFyY2hPcmRlcnNJbnB1dCBcdFx0XHRcdD0gdmlldy5nZXRTZWFyY2hPcmRlcnNJbnB1dCgpLFxuXHRcdFx0XHRcdGFsbElucnVzdE9yZGVyc0Zvcm0gXHRcdFx0PSB2aWV3LmdldEFsbE9yZGVyRm9ybUlucHV0c1ZhbHVlKCksXG5cdFx0XHRcdFx0c2VuZEZvcm1CdXR0b24gXHRcdFx0XHRcdFx0PSB2aWV3LmdldFNlbmRGb3JtQnV0dG9uKCksXG5cdFx0XHRcdFx0cHJvZHVjdHNUYWJsZSBcdFx0XHRcdFx0XHQ9IHZpZXcuZ2V0UHJvZHVjdHNUYWJsZSgpLFxuXHRcdFx0XHRcdGFkZFBydWR1Y3RCdG4gXHRcdFx0XHRcdFx0PSB2aWV3LmdldEFkZFByb2R1Y3QoKSxcblx0XHRcdFx0XHRhZGRQcnVkdWN0Rm9ybSBcdFx0XHRcdFx0XHQ9IHZpZXcuZ2V0QWRkUHJvZHVjdEZvcm0oKSxcblx0XHRcdFx0XHRjbG9zZUFkZFBydWR1Y3RGb3JtQnV0dG9uID0gdmlldy5nZXRDbG9zZUFkZFBydWR1Y3RGb3JtQnV0dG9uKCksXG5cdFx0XHRcdFx0c3VibWl0UHJ1ZHVjdEZvcm0gXHRcdFx0XHQ9IHZpZXcuZ2V0U3VibWl0UHJ1ZHVjdEZvcm0oKSxcblx0XHRcdFx0XHR1bFBvc3RJbmZvIFx0XHRcdFx0XHRcdFx0XHQ9IHZpZXcuZ2V0VWxQb3N0SW5mbygpLFxuXHRcdFx0XHRcdGRlbGV0ZUZ1bGxPcmRlckJ0biBcdFx0XHRcdD0gdmlldy5nZXREZWxldGVGdWxsT3JkZXJCdG4oKTtcblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdGhpcy5fb25PcmRlcnNMaXN0TG9hZCk7XG4gICAgYWRkT3JkZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuX29uQWRkT3JkZXJDbGljayk7XG4gICAgY2xvc2VBZGRPcmRlckZvcm0gLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9vbkNsb3NlQWRkT3JkZXJGb3JtQ2xpY2spO1xuXHRcdHNlY3Rpb25TdGFnZXNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25TZWN0aW9uU3RhZ2VzTGlzdENsaWNrKTtcblx0XHRvcmRlcnNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25PcmRlcnNMaXN0Q2xpY2spO1xuXHRcdHNlYXJjaE9yZGVyc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5fb25TZWFyY2hPcmRlcnNJbnB1dEtleVVwKTtcblx0XHRzZW5kRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uU2VuZEZvcm1CdXR0b25DbGljayk7XG5cdFx0cHJvZHVjdHNUYWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uUHJvZHVjdHNUYWJsZUNsaWNrKTtcblx0XHRhZGRQcnVkdWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25BZGRQcnVkdWN0QnRuQ2xpY2spO1xuXHRcdGNsb3NlQWRkUHJ1ZHVjdEZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsb3NlQWRkUHJ1ZHVjdEZvcm1CdXR0b25DbGljayk7XG5cdFx0c3VibWl0UHJ1ZHVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vblN1Ym1pdFBydWR1Y3RGb3JtQ2xpY2spO1xuXHRcdHVsUG9zdEluZm8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vblVsUG9zdEluZm9DbGljayk7XG5cdFx0ZGVsZXRlRnVsbE9yZGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25EZWxldGVGdWxsT3JkZXJCdG5DbGljayk7XG4gIH07XG4gIC8qKlxuICAgKiBTZWFyY2ggb3JkZXIgYnV0dG9uIGNsaWNrIGV2ZW50IGhhbmRsZXIuXG4gICAqXG4gICAqIEBsaXN0ZW5zIGNsaWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGUgdGhlIERPTSBldmVudCBvYmplY3QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0aGlzLl9vbkFkZE9yZGVyQ2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgdmlldy5zaG93T3JkZXJGb3JtKCk7XG4gIH1cblxuICB0aGlzLl9vbkNsb3NlQWRkT3JkZXJGb3JtQ2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZpZXcuY2xvc2VPcmRlckZvcm0oKVxuICB9XG5cdC8vINGB0L/RgNC+0YHQuNGC0Ywg0LrQsNC6INC00L7QtNC10LvQsNGC0Yxcblx0dGhpcy5fc2VhcmNoTWF0Y2ggPSAob2JqLCBpcG5fdHZhbHVlKSA9Pntcblx0XHRmb3IobGV0IGtleSBpbiBvYmogKXtcblx0XHRpZiAoa2V5ID09IGBzdW1tYXJ5YCkge1xuXHRcdFx0bGV0IHN1bW1hcnkgPSBvYmpba2V5XTtcblx0XHRcdGZvciAobGV0IHN1bW1hcnlfcHJvcCBpbiBzdW1tYXJ5KSB7XG5cdFx0XHRcdGxldCBsb2NhbFByb3AgPSBzdW1tYXJ5W3N1bW1hcnlfcHJvcF0udG9TdHJpbmcoKTtcblx0XHRcdFx0aWYgKHR5cGVvZihsb2NhbFByb3ApICE9PSBgb2JqZWN0YCAmJiBsb2NhbFByb3AudG9VcHBlckNhc2UoKS5pbmNsdWRlcyhpcG5fdHZhbHVlKSkge1xuXHRcdFx0XHRcdHZpZXcuY2xlYXJPcmRlckxpc3Qob2JqKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dmlldy5jcmVhdGVMaXN0SXRlbShvYmopO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCB9XG5cdFx0XHQgfVxuXHRcdCB9XG5cdCB9XG5cblxuXHR0aGlzLl9vblNlYXJjaE9yZGVyc0lucHV0S2V5VXAgPSAoZSkgPT57XG5cdFx0Y29uc3QgaW5wdFZhbHVlID0gZS50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKVxuXHRcdGNvbnN0IG9yZGVyc0FycmF5ID0gbW9kZWwuZ2V0Q3VycmVudE9yZGVycygpO1xuXHRcdGZvciAobGV0IGluZGV4IGluIG9yZGVyc0FycmF5KSB7XG5cdFx0XHR0aGlzLl9zZWFyY2hNYXRjaChvcmRlcnNBcnJheVtpbmRleF0sIGlucHRWYWx1ZSk7XG5cdFx0fVxuXHRcdC8vIG9yZGVyc0FycmF5LmZvckVhY2godGhpcy5fc2VhcmNoTWF0Y2gpO1xuXHR9XG5cblx0dGhpcy5fb25PcmRlcnNMaXN0Q2xpY2sgPSAoZSkgPT4ge1xuXHRcdGxldCB0YXJnZXQgPSBlLnRhcmdldDtcblx0XHR3aGlsZSAodGFyZ2V0ICE9IHZpZXcuZ2V0VWxBc2lkZSgpKSB7XG5cdFx0XHRpZiAodGFyZ2V0LnRhZ05hbWUgPT0gJ0xJJykge1xuXHRcdFx0XHRsZXQgbGkgPSB0YXJnZXQ7XG5cdFx0XHRcdGxldCBkYXRhX251bWJlciA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1vcmRlci1pZCcpO1xuXHRcdFx0XHRjb25zdCBvcmRlcnNMSVNUID0gbW9kZWwuZ2V0Q3VycmVudE9yZGVycygpO1xuXHRcdFx0XHRvcmRlcnNMSVNULmZvckVhY2goKHZhbHVlKT0+e1xuXHRcdFx0XHRcdGlmIChkYXRhX251bWJlciA9PSB2YWx1ZS5pZCkge1xuXHRcdFx0XHRcdFx0bW9kZWwuc2V0T3JkZXJJZChkYXRhX251bWJlcik7XG5cdFx0XHRcdFx0XHRtb2RlbFxuXHRcdFx0XHRcdFx0XHRcdC5nZXRQcm9kdWN0c0J5SWQoZGF0YV9udW1iZXIpXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4odmlldy5idWlsZFByb2R1Y3RzVGFibGUpXG5cdFx0XHRcdFx0XHRcdFx0LmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcblx0XHRcdFx0XHRcdHZpZXcuYnVpZEZ1bGxPcmRlcih2YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0fVxuXHR9XG5cblx0dGhpcy5fb25PcmRlcnNMaXN0TG9hZCA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0d2hpbGUgKHZpZXcuZ2V0VWxBc2lkZSgpLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHZpZXcuZ2V0VWxBc2lkZSgpLnJlbW92ZUNoaWxkKHZpZXcuZ2V0VWxBc2lkZSgpLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblx0XHRjb25zdCB1cmwgPSBtb2RlbC5nZXRVcmxPcmRlcigpO1xuXHRcdG1vZGVsXG5cdFx0XHRcdC5mZXRjaEFsbE9yZGVycyh1cmwpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKG9yZGVyRGF0YSl7XG5cdFx0XHRcdFx0b3JkZXJEYXRhLmZvckVhY2godmlldy5jb25zdHJ1Y3RPcmRlck9uUGFnZSk7XG5cdFx0XHRcdFx0cmV0dXJuIG9yZGVyRGF0YTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcblx0fVxuXG5cdHRoaXMuX29uU2VjdGlvblN0YWdlc0xpc3RDbGljayA9IGZ1bmN0aW9uKGUpe1xuXHRcdGxldCB0YXJnZXQgPSBlLnRhcmdldDtcblx0XHRpZiAodGFyZ2V0LnRhZ05hbWUgPT0gYEJVVFRPTmApIHtcblx0XHRcdHZpZXcuc2hvd0Z1bGxJbmZvKHRhcmdldCk7XG5cdFx0fWVsc2UgaWYodGFyZ2V0LnRhZ05hbWUgPT0gYElgKXtcblx0XHRcdHZpZXcuc2hvd0Z1bGxJbmZvKHRhcmdldC5wYXJlbnROb2RlKTtcblx0XHR9XG5cdH1cblxuXHR0aGlzLl9vblVsUG9zdEluZm9DbGljayA9IChlKSA9Pntcblx0XHRjb25zdCB0cmd0ID0gZS50YXJnZXQ7XG5cdFx0aWYgKHRyZ3QudGFnTmFtZSA9PSAnTEknKSB7XG5cdFx0XHRjb25zdCBsaSA9IHRyZ3QubGFzdENoaWxkO1xuXHRcdH1cblx0fVxuXG5cdHRoaXMuc3RyaWdpZnlVc2VyRGF0YSA9IChkYXRhQXJyKSA9Pntcblx0XHRjb25zdCBub3dEYXRlID0gbmV3IERhdGU7XG5cdFx0Y29uc3QgdGVtcF9vYmogPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdW1tYXJ5OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgICAgICAgY3JlYXRlZEF0OiBub3dEYXRlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgICAgICAgIGN1c3RvbWVyOiBkYXRhQXJyWzBdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgICAgICAgIHN0YXR1czogXCJQZW5kaW5nXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgICAgICAgc2hpcHBlZEF0OiBub3dEYXRlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgICAgICAgIHRvdGFsUHJpY2U6IDI5MCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgICAgICBjdXJyZW5jeTogXCJFVVJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgICAgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgIHNoaXBUbzoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQgICAgICAgIG5hbWU6IGRhdGFBcnJbMV0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgICAgICAgYWRkcmVzczogZGF0YUFyclsyXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgICAgICBaSVA6IGRhdGFBcnJbM10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgICAgICAgcmVnaW9uOiBkYXRhQXJyWzRdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgICAgICAgIGNvdW50cnk6IGRhdGFBcnJbNV1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgICBjdXN0b21lckluZm86IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgICAgICBmaXJzdE5hbWU6IGRhdGFBcnJbNl0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgICAgICAgbGFzdE5hbWU6IGRhdGFBcnJbN10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgICAgICAgYWRkcmVzczogZGF0YUFycls4XSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgICAgICBwaG9uZTogZGF0YUFycls5XSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgICAgICBlbWFpbDogZGF0YUFyclsxMF1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0Y29uc3Qgc3RyaW5naWZ5RGF0YSA9IEpTT04uc3RyaW5naWZ5KHRlbXBfb2JqKTtcblx0XHRyZXR1cm4gc3RyaW5naWZ5RGF0YTtcblxuXHR9XG5cblx0dGhpcy5fb25TZW5kRm9ybUJ1dHRvbkNsaWNrID0gKGUpID0+e1xuXHRcdGNvbnN0IHNydGluZ19kYXRhID0gdGhpcy5zdHJpZ2lmeVVzZXJEYXRhKHZpZXcuZ2V0QWxsT3JkZXJGb3JtSW5wdXRzVmFsdWUoKSk7XG5cdFx0dmlldy5jbG9zZU9yZGVyRm9ybSgpO1xuXHRcdG1vZGVsLnNlbmREYXRhKG1vZGVsLmdldFVybE9yZGVyKCksIHNydGluZ19kYXRhKTtcblx0fVxuXG5cdHRoaXMuX29uUHJvZHVjdHNUYWJsZUNsaWNrID0gKGUpID0+e1xuXHRcdGxldCB0YXJnZXQgPSBlLnRhcmdldDtcblx0XHR3aGlsZSAodGFyZ2V0ICE9IHZpZXcuZ2V0UHJvZHVjdHNUYWJsZSgpKSB7XG5cdFx0XHRpZiAodGFyZ2V0LnRhZ05hbWUgPT0gJ0JVVFRPTicpIHtcblx0XHRcdFx0bGV0IGJ0biA9IHRhcmdldDtcblx0XHRcdFx0bGV0IHRhYmxlX3JvdyA9IGJ0bi5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG5cdFx0XHRcdGxldCBvcmRlcl9pZCA9IHZpZXcuZ2V0T3JkZXJJZCgpO1xuXHRcdFx0XHRsZXQgcHJvZF9pZCA9IHRhYmxlX3Jvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1pZCcpO1xuXHRcdFx0XHRtb2RlbC5kZWxldGVQcm9kdWN0KG9yZGVyX2lkLCBwcm9kX2lkKVxuXHRcdFx0XHRcdC50aGVuKChwcm9kdWN0cyk9Pntcblx0XHRcdFx0XHRcdHZpZXcuYnVpbGRQcm9kdWN0c1RhYmxlKHByb2R1Y3RzKTtcblx0XHRcdFx0XHRcdHJldHVybiBwcm9kdWN0cztcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuXHRcdH1cblx0fVxuXG5cdHRoaXMuc3RpbmdpZnlQcm9kdWN0ID0gKHByb2R1Y3QpPT57XG5cdFx0Y29uc3Qgb3JkZXJfaWQgPSB2aWV3LmdldE9yZGVySWQoKTtcblx0XHRjb25zdCB0ZW1wX29iaiA9IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6IHByb2R1Y3RbMF0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwcmljZTogcHJvZHVjdFsxXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGN1cnJlbmN5OiBwcm9kdWN0WzJdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cXVhbnRpdHk6IHByb2R1Y3RbM10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b3RhbFByaWNlOiBwcm9kdWN0WzRdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JkZXJJZDogb3JkZXJfaWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRjb25zdCBzdHJpbmdpZnlEYXRhID0gSlNPTi5zdHJpbmdpZnkodGVtcF9vYmopO1xuXHRcdHJldHVybiBzdHJpbmdpZnlEYXRhO1xuXHR9XG5cblx0dGhpcy5fb25TdWJtaXRQcnVkdWN0Rm9ybUNsaWNrID0gKGUpID0+e1xuXHRcdGNvbnN0IHByb2R1Y3QgPSB2aWV3LmdldEFsbFByb2R1Y3RGb3JtSW5wdXRzVmFsdWUoKTtcblx0XHRjb25zdCBzdHJpbmdpZnlQcm9kdWN0ID0gdGhpcy5zdGluZ2lmeVByb2R1Y3QocHJvZHVjdCk7XG5cdFx0Y29uc3QgdXJsID0gbW9kZWwuZ2V0VXJsUHJvZHVjdCh2aWV3LmdldE9yZGVySWQoKSlcblx0XHR2aWV3LmNsb3NlUHJ1ZHVjdEZvcm0oKTtcblx0XHRtb2RlbC5zZW5kRGF0YSh1cmwsIHN0cmluZ2lmeVByb2R1Y3QpO1xuXHR9XG5cblx0dGhpcy5fb25EZWxldGVGdWxsT3JkZXJCdG5DbGljayA9IChlKSA9Pntcblx0XHRjb25zdCBvcmRlcl9pZCA9IHZpZXcuZ2V0T3JkZXJJZCgpO1xuXHRcdG1vZGVsXG5cdFx0XHQuZGVsZXRlRnVsbE9yZGVyKG9yZGVyX2lkKVxuXHRcdFx0LnRoZW4odGhpcy5fb25PcmRlcnNMaXN0TG9hZClcblx0XHRcdC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XG5cdH1cblxuXHR0aGlzLl9vbkFkZFBydWR1Y3RCdG5DbGljayA9IChlKSA9Pntcblx0XHR2aWV3LnNob3dQcnVkdWN0Rm9ybSgpO1xuXHR9XG5cblx0dGhpcy5fb25DbG9zZUFkZFBydWR1Y3RGb3JtQnV0dG9uQ2xpY2sgPShlKT0+e1xuXHRcdHZpZXcuY2xvc2VQcnVkdWN0Rm9ybSgpO1xuXHR9XG5cbn1cblxuXG5cbihuZXcgQ29udHJvbGxlcihuZXcgVmlldywgbmV3IE1vZGVsKSkuaW5pdCgpO1xuIl19
