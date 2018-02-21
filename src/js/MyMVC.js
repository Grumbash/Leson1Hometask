function Model() {
	const _apiPrefix = `http://0.0.0.0:3000/api/`;
	let _ORDERS = `${_apiPrefix}Orders/`;
	let _currentOrder = null;
	let _curentProducts = null;

	this.getOrderId = (id) => id;
	this.setOrderId = (id) => this.getOrderId(id);
	this.getCurrentOrders = () => _currentOrder;
	this.getUrlOrder = function () {
		return _ORDERS;
	}
	this.getUrlProduct = (id) =>{
		const url = `${_apiPrefix}Orders/${id}/products`;
		return url;
	}
	this.getProductsById = (id) =>{
		const PRODUCTS = `${_apiPrefix}Orders/${id}/products`;
		const readyProducts = this.fetchOrderProducts(PRODUCTS);
		return readyProducts;
	}

	this.sendProduct = (id) =>{
		const PRODUCTS = `${_apiPrefix}Orders/${id}/products`;
	}

  this.fetchAllOrders = (url) => {
    return this
				.fetchData(url)
				.then(this.parse)
				.then(function (orderData) {
					_currentOrder = orderData;
					return orderData;
				})
				.catch(error => console.error(error));
  }

	this.fetchOrderProducts = url =>{
		return this
				.fetchData(url)
				.then(this.parse)
				.then(function(orderData){
					_curentProducts  = orderData;
					return orderData;
				})
				.catch(error => console.error(error));

	}

	this.parse = (xhttp) => {
		const parseJSON = JSON.parse(xhttp, (key, value) => {
			if (key == 'createdAt' || key =='shippedAt'){
				let time_temp = new Date(value);
				return time_temp.toLocaleDateString();
			}
			return value;
			});
			return parseJSON;
	}

	this.deleteProduct = (order_id, prod_id)=>{
		const PRODUCTS = `${_apiPrefix}OrderProducts/${prod_id}`;
		 return this
				.DELETE_DATA(PRODUCTS)
				.then((text)=>{
					const PRODUCTS_LOC = `${_apiPrefix}Orders/${order_id}/products`;
					const getProd = this.fetchOrderProducts(PRODUCTS_LOC);
					return getProd;
				})
				.catch(error => console.error(error));
	}

	this.deleteFullOrder = (order_id) =>{
		const order = `${_ORDERS}${order_id}`

		return this
			 .DELETE_DATA(order)
			 .then(text => text)
			 .catch(error => console.error(error));
	}

	this.fetchData = function (url) {
		const promise = new Promise(function (resolve, reject) {
			const xhr = new XMLHttpRequest();
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
	}

	this.sendData = function(url, data){
		const promise = new Promise(function(resolve, reject) {
			const xhr = new XMLHttpRequest();
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
	}
	this.patchData = function () {

	}

	this.DELETE_DATA = function(url){
		const promise = new Promise(function (resolve, reject) {
			const xhr = new XMLHttpRequest();
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
	}
}











function View() {
  const addOrderButton = `footer__btn_add-order`,
        searchOrdersInput = `search-form__ipt_search`,
        shippingAddresButton = `section-stages__btn_shippingAdress`,
        customerInfoButton = `section-stages__btn_customerInfo`,
        mapButton = `section-stages__btn_map`,
        addProductButton = `section-table__add-product`,
        deleteFullOrder = `footer__btn_trash`,
        ulAside = `orders-list`,
        ulSectionInfo = `section-info`,
        ulPostInfo = `full-info__post-info.postinfo`,
				ulCustomerInfo = `full-info__customer-info`,
        table = `section-table__table`,
        addOrderForm = `add-order-form`,
        closeAddOrderForm = `add-order-form__close`,
				ulSectionStages = `section-stages`,
				sectionPostInfo = `full-info_post-info`,
				sectionCustomerInfo = `full-info_customer-info`,
				sectionMap = `full-info_map`,
				sendForm = `submit`,
				productsTable = `section-table__table`,
				addProductBtn = `section-table__add-product`,
				addPruductForm = `add-product-form`,
				closeAddPruductFormButton = `poductCloses`,
				submitPruductForm = `poductSubmit`;

	this._getterOfVariables = variable => document.querySelector(`.${variable}`);

	this.getSendFormButton = () => document.querySelector(`#${sendForm}`)

	this.getUlSectionStages = () => document.querySelector(`.${ulSectionStages}`);

  this.getAddOrderButton =  () => document.querySelector(`.${addOrderButton}`);

  this.getCloseAddOrderForm = () => document.querySelector(`.${closeAddOrderForm}`);

	this.getUlAside = () => document.querySelector(`.${ulAside}`);

	this.getSearchOrdersInput = () => document.querySelector(`.${searchOrdersInput}`);

	this.getOrderForm = () => document.querySelector(`.${addOrderForm}`);

	this.getUlPostInfo = () => document.querySelector(`.${ulPostInfo}`);

	this.getProductsTable = () => document.querySelector(`.${productsTable}`);

	this.getCloseAddPruductFormButton = () => document.querySelector(`#${closeAddPruductFormButton}`);

	this.closePruductForm = () => this.getAddProductForm().classList.toggle("hide");

	this.showPruductForm = () => this.getAddProductForm().classList.toggle("hide");

	this.getSubmitPruductForm = () => document.querySelector(`#${submitPruductForm}`);

	this.getAllOrderFormInputsValue = () =>{
			const ipts = this.getOrderForm().querySelectorAll('input');
			let dataArr = [];
			for (let i = 0; i < ipts.length; i++) {
				dataArr.push(ipts[i].value);
			}
			return dataArr;
	}

	this.getAddProduct = () => document.querySelector(`.${addProductBtn}`);

	this.getAddProductForm = () => document.querySelector(`.${addPruductForm}`);

	this.getDeleteFullOrderBtn = () => document.querySelector(`.${deleteFullOrder}`);

	this.getAllProductFormInputsValue = () =>{
		const ipts = this.getAddProductForm().querySelectorAll('input');
		let dataArr = [];
		for (let i = 0; i < ipts.length; i++) {
			dataArr.push(ipts[i].value);
		}
		return dataArr;
	}

  this.showOrderForm = function () {
    const orderForm = document.querySelector(`.${addOrderForm}`);
    orderForm.classList.toggle("hide");
  };

  this.closeOrderForm = function () {
    const orderForm = document.querySelector(`.${addOrderForm}`);
    orderForm.classList.toggle('hide');
  }

	this.constructOrderOnPage = orderData => {
		for (let key in orderData) {
			if (key === `summary`) {
				this.createListItem(orderData);
				this.createSectionInfo(orderData[key]);
			}else if(key === `shipTo`){
				this.createShipToList(orderData[key]);
			}else if(key ===`customerInfo`){
				this.createCustomerInfoList(orderData[key]);
			}else{
				this.idOfOrder(orderData[key]);
			}
		}
	}

	this.buidFullOrder = orderData =>{
		for (let key in orderData) {
			if (key === `summary`) {
				this.createSectionInfo(orderData[key]);
			}else if(key === `shipTo`){
				this.createShipToList(orderData[key]);
			}else if(key ===`customerInfo`){
				this.createCustomerInfoList(orderData[key]);
			}else{
				this.idOfOrder(orderData[key]);
			}
		}

	}

	this.createListItem = orderData =>{
	  const orderInfo = orderData.summary;
		// orderInfo.status == `pending` ? <<color: red>> : <<color: green>>
	  const inner_li = `<div class="orders-list__row orders-list__row_first">
					              <p class="orders-list__title">Order 7991</p>
					              <p class="orders-list__data search_js">${orderInfo.createdAt}</p>
					            </div>
					            <div class="orders-list__row orders-list__row_second">
					              <span class="orders-list__desc search_js">${orderInfo.customer}</span>
					              <span class="orders-list__status search_js">${orderInfo.status}</span>
					            </div>
					            <div class="orders-list__row orders-list__row_third">
					              <p class="orders-list__info search_js">Shipped:
					                <span class="orders-list__shippedAt "> ${orderInfo.shippedAt}</span></p>
					            </div>`;
		let li = document.createElement('li');
		li.setAttribute('data-order-id', `${orderData.id}`);
		li.className = 'orders-list__item';
		li.innerHTML = inner_li;
 		this.getUlAside().appendChild(li);
	}

	this.createSectionInfo = summary =>{
			const orderInfo = summary;
			const li_sectionInfo = `<li class="section-info__customer section-info__item">Customer: ${orderInfo.customer}</li>
		                          <li class="section-info__ordered section-info__item">Ordered: ${orderInfo.createdAt}</li>
		                          <li class="section-info__shipped section-info__item">Shipped: ${orderInfo.shippedAt}</li>`;
		  this._getterOfVariables(ulSectionInfo).innerHTML = li_sectionInfo;
	}

	this.createShipToList = shipTo =>{
		const li_postInfo = ` <li class="postinfo__item"><span class="postinfo__span">Name: ${shipTo.name}</span></li>
	                        <li class="postinfo__item"><span class="postinfo__span">Street: ${shipTo.address}</span></li>
	                        <li class="postinfo__item"><span class="postinfo__span">ZIP Code/City: ${shipTo.ZIP}</span></li>
	                        <li class="postinfo__item"><span class="postinfo__span">Region: ${shipTo.region}</span></li>
	                        <li class="postinfo__item"><span class="postinfo__span">${shipTo.country}</span></li>`;
	  this._getterOfVariables(ulPostInfo).innerHTML = li_postInfo;
	}

	this.createCustomerInfoList = customerInfo =>{
		const customerInfoList = `<li class="postinfo__item">First Name: ${customerInfo.firstName}</li>
															<li class="postinfo__item">Last Name: ${customerInfo.lastName}</li>
															<li class="postinfo__item">Address: ${customerInfo.address}</li>
															<li class="postinfo__item">Phone: ${customerInfo.phone}</li>
															<li class="postinfo__item">E-mail: ${customerInfo.email}</li>`;
		this._getterOfVariables(ulCustomerInfo).innerHTML = customerInfoList;
	}

	this.buildProductsTable = products =>{
		const table  = this.getProductsTable();
		let myTable= `<tbody class="section-table__table-body"><tr class="section-table__table-row"><td class="section-table__table-column">Products</td>`;
			myTable+= `<td class="section-table__table-column">Unit Price</td>`;
			myTable+=`<td class="section-table__table-column">Quanitity</td>`;
			myTable+=`<td class="section-table__table-column">Total</td>`;
			myTable+=`<td class="section-table__table-column">Delete</td></tr>`;

		for (let i = 0; i < products.length; i++) {
			myTable+=`<tr data-product-id="${products[i].id}" class="section-table__table-row"><td class="section-table__table-column">${products[i].name}</td>`;
			myTable+=`<td class="section-table__table-column">${products[i].price} ${products[i].currency}</td>`;
			myTable+=`<td class="section-table__table-column">${products[i].quantity}</td>`;
			myTable+=`<td class="section-table__table-column"> ${products[i].totalPrice}</td>`;
			myTable+=`<td class="section-table__table-column">
									<button class="section-table__button data-product-id="${products[i].id}">
									<i class="fa fa-trash"></i>
									</button>
								</td></tr>`;
		}
		 myTable+=`</tbody>`;

		 table.innerHTML = myTable;
	}

	this.idOfOrder = id => {
		this.getAddProduct().setAttribute('data-order-id', `${id}`);
		this.getDeleteFullOrderBtn().setAttribute('data-order-id', `${id}`);
	};


	this.getOrderId = () => this.getAddProduct().getAttribute('data-order-id');



	this.clearOrderList = () =>{
		this.getUlAside().innerHTML = '';
	}

	this.showFullInfo = function(button){
		const POSTINFO = this._getterOfVariables(sectionPostInfo);
		const CUSTOMER_INFO = this._getterOfVariables(sectionCustomerInfo);
		const YA_MAP= this._getterOfVariables(sectionMap);

		if (button.classList.contains(`section-stages__btn_shippingAdress`)) {
			POSTINFO.classList.remove(`hide`);
			CUSTOMER_INFO.classList.add(`hide`);
			YA_MAP.classList.add(`hide`);
		}else if (button.classList.contains(`section-stages__btn_customerInfo`)) {
			POSTINFO.classList.add(`hide`);
			CUSTOMER_INFO.classList.remove(`hide`);
			YA_MAP.classList.add(`hide`);
		}else if (button.classList.contains(`section-stages__btn_map`)) {
			POSTINFO.classList.add(`hide`);
			CUSTOMER_INFO.classList.add(`hide`);
			YA_MAP.classList.remove(`hide`);
		}
	}

	this.deleteProduct = (btn) =>{
		const table_row = btn.parentNode.parentNode;
		table_row.classList.toggle('hide');
	}
}









function Controller(view, model) {
  /**
   * Initialize controller.
   *
   * @public
   */
  this.init = function() {
    const addOrderButton						= view.getAddOrderButton(),
          closeAddOrderForm 				= view.getCloseAddOrderForm(),
					ordersList 								= view.getUlAside(),
					sectionStagesList 				= view.getUlSectionStages(),
					searchOrdersInput 				= view.getSearchOrdersInput(),
					allInrustOrdersForm 			= view.getAllOrderFormInputsValue(),
					sendFormButton 						= view.getSendFormButton(),
					productsTable 						= view.getProductsTable(),
					addPruductBtn 						= view.getAddProduct(),
					addPruductForm 						= view.getAddProductForm(),
					closeAddPruductFormButton = view.getCloseAddPruductFormButton(),
					submitPruductForm 				= view.getSubmitPruductForm(),
					ulPostInfo 								= view.getUlPostInfo(),
					deleteFullOrderBtn 				= view.getDeleteFullOrderBtn();

		window.addEventListener('load', this._onOrdersListLoad);
    addOrderButton.addEventListener("click", this._onAddOrderClick);
    closeAddOrderForm .addEventListener("click", this._onCloseAddOrderFormClick);
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
  this._onAddOrderClick = function(e) {
    view.showOrderForm();
  }

  this._onCloseAddOrderFormClick = function (e) {
    view.closeOrderForm()
  }
	// спросить как доделать
	this._searchMatch = (obj, ipn_tvalue) =>{
		for(let key in obj ){
		if (key == `summary`) {
			let summary = obj[key];
			for (let summary_prop in summary) {
				let localProp = summary[summary_prop].toString();
				if (typeof(localProp) !== `object` && localProp.toUpperCase().includes(ipn_tvalue)) {
					view.clearOrderList(obj);
				}else{
					view.createListItem(obj);
				}
				 }
			 }
		 }
	 }


	this._onSearchOrdersInputKeyUp = (e) =>{
		const inptValue = e.target.value.toUpperCase()
		const ordersArray = model.getCurrentOrders();
		for (let index in ordersArray) {
			this._searchMatch(ordersArray[index], inptValue);
		}
		// ordersArray.forEach(this._searchMatch);
	}

	this._onOrdersListClick = (e) => {
		let target = e.target;
		while (target != view.getUlAside()) {
			if (target.tagName == 'LI') {
				let li = target;
				let data_number = li.getAttribute('data-order-id');
				const ordersLIST = model.getCurrentOrders();
				ordersLIST.forEach((value)=>{
					if (data_number == value.id) {
						model.setOrderId(data_number);
						model
								.getProductsById(data_number)
								.then(view.buildProductsTable)
								.catch(error => console.error(error));
						view.buidFullOrder(value);
					}
				});
				return;
			}
			target = target.parentNode;
		}
	}

	this._onOrdersListLoad = function (e) {
		while (view.getUlAside().firstChild) {
			view.getUlAside().removeChild(view.getUlAside().firstChild);
		}
		const url = model.getUrlOrder();
		model
				.fetchAllOrders(url)
				.then(function(orderData){
					orderData.forEach(view.constructOrderOnPage);
					return orderData;
				})
				.catch(error => console.error(error));
	}

	this._onSectionStagesListClick = function(e){
		let target = e.target;
		if (target.tagName == `BUTTON`) {
			view.showFullInfo(target);
		}else if(target.tagName == `I`){
			view.showFullInfo(target.parentNode);
		}
	}

	this._onUlPostInfoClick = (e) =>{
		const trgt = e.target;
		if (trgt.tagName == 'LI') {
			const li = trgt.lastChild;
		}
	}

	this.strigifyUserData = (dataArr) =>{
		const nowDate = new Date;
		const temp_obj = {
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
											}
		const stringifyData = JSON.stringify(temp_obj);
		return stringifyData;

	}

	this._onSendFormButtonClick = (e) =>{
		const srting_data = this.strigifyUserData(view.getAllOrderFormInputsValue());
		view.closeOrderForm();
		model.sendData(model.getUrlOrder(), srting_data);
	}

	this._onProductsTableClick = (e) =>{
		let target = e.target;
		while (target != view.getProductsTable()) {
			if (target.tagName == 'BUTTON') {
				let btn = target;
				let table_row = btn.parentNode.parentNode;
				let order_id = view.getOrderId();
				let prod_id = table_row.getAttribute('data-product-id');
				model.deleteProduct(order_id, prod_id)
					.then((products)=>{
						view.buildProductsTable(products);
						return products;
					})
					.catch(error => console.error(error));
				return;
			}
			target = target.parentNode;
		}
	}

	this.stingifyProduct = (product)=>{
		const order_id = view.getOrderId();
		const temp_obj = {
												name: product[0],
												price: product[1],
												currency: product[2],
												quantity: product[3],
												totalPrice: product[4],
												orderId: order_id,
											};
		const stringifyData = JSON.stringify(temp_obj);
		return stringifyData;
	}

	this._onSubmitPruductFormClick = (e) =>{
		const product = view.getAllProductFormInputsValue();
		const stringifyProduct = this.stingifyProduct(product);
		const url = model.getUrlProduct(view.getOrderId())
		view.closePruductForm();
		model.sendData(url, stringifyProduct);
	}

	this._onDeleteFullOrderBtnClick = (e) =>{
		const order_id = view.getOrderId();
		model
			.deleteFullOrder(order_id)
			.then(this._onOrdersListLoad)
			.catch(error => console.error(error));
	}

	this._onAddPruductBtnClick = (e) =>{
		view.showPruductForm();
	}

	this._onCloseAddPruductFormButtonClick =(e)=>{
		view.closePruductForm();
	}

}



(new Controller(new View, new Model)).init();
