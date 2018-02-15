const Orders = [
	{
		id: "1",
		OrderInfo: {
			createdAt	: "10.08.1991",
			customer	: "Alfreds Futterkiste",
			status		: "Accepted",
			shippedAt	: "8.09.1991"
		},
		ShipTo: {
			name: "Maria Anders",
			Address: "Obere Str. 57",
			ZIP: "12209",
			Region: "Germany",
			Country: "Germany"
		},
		CustomerInfo: {
			firstName: "Maria",
			lastName: "Anders",
			address: "Obere Str. 57",
			phone: "030-0074321",
			email: "Maria.Anders@company.com"
		},
		products: [
			{
				id			: "1",
				name		: "Chai",
				price		: "18",
				currency	: "EUR",
				quantity	: "2",
				totalPrice	: "36"
			},
			{
				id			: "2",
				name		: "Aniseed Syrup",
				price		: "10",
				currency	: "USD",
				quantity	: "3",
				totalPrice	: "30"
			},
			{
				id			: "3",
				name		: "Chef Anton's Cajun Seasoning",
				price		: "22",
				currency	: "USD",
				quantity	: "2",
				totalPrice	: "44"
			},
			{
				id			: "4",
				name		: "Chef Anton's Gumbo Mix",
				price		: "36",
				currency	: "EUR",
				quantity	: "21",
				totalPrice	: "756"
			},
			{
				id			: "5",
				name		: "Grandma's Boysenberry Spread",
				price		: "25",
				currency	: "USD",
				quantity	: "5",
				totalPrice	: "125"
			}
		]
	},
	{
		id: "2",
		OrderInfo: {
			createdAt	: "23.12.2006",
			customer	: "Bon app",
			status		: "Pending",
			shippedAt	: "13.02.2007"
		},
		ShipTo: {
			name: "Laurence Lebihan",
			Address: "12, rue des Bouchers",
			ZIP: "13008",
			Region: "France",
			Country: "France"
		},
		CustomerInfo: {
			firstName: "Laurence",
			lastName: "Lebihan",
			address: "12, rue des Bouchers",
			phone: "91.24.45.40",
			email: "Laurence.Lebihan@company.com"
		},
		products: [
			{
				id			: "1",
				name		: "Queso Cabrales",
				price		: "21",
				currency	: "EUR",
				quantity	: "5",
				totalPrice	: "105"
			},
			{
				id			: "2",
				name		: "Queso Manchego La Pastora",
				price		: "38",
				currency	: "EUR",
				quantity	: "3",
				totalPrice	: "114"
			},
			{
				id			: "3",
				name		: "Pavlova",
				price		: "120",
				currency	: "RUB",
				quantity	: "5",
				totalPrice	: "600"
			},
			{
				id			: "4",
				name		: "Sir Rodney's Marmalade",
				price		: "5",
				currency	: "BYN",
				quantity	: "3",
				totalPrice	: "15"
			},
			{
				id			: "5",
				name		: "Genen Shouyu",
				price		: "40",
				currency	: "USD",
				quantity	: "7",
				totalPrice	: "280"
			},
			{
				id			: "6",
				name		: "Tofu",
				price		: "23.25",
				currency	: "USD",
				quantity	: "1",
				totalPrice	: "23.25"
			},
			{
				id			: "7",
				name		: "Alice Mutton",
				price		: "32",
				currency	: "UAH",
				quantity	: "39",
				totalPrice	: "1248"
			}
		]
	}
];

const input = document.querySelector('.search-form__ipt.search-form__ipt_search'),
		  ul_aside = document.querySelector('.orders-list'),
		  items = ul_aside.getElementsByTagName('li'),
		  ul_sectionInfo = document.querySelector('.section-info'),
		  ul_postInfo = document.querySelector('.full-info__post-info.postinfo'),
		  table = document.querySelector('.section-table__table'),
      customers = Orders;

let arrOfSerchItems = [];
customers.forEach(createLI);
/*не работает нормально searchMatch()*/

input.addEventListener(`keyup`, (event)=>{
  const val = event.target.value.toUpperCase();
  for (let elem in customers) {
    searchList(customers[elem], val);
  }
	for (let i = 0; i < items.length; i++) {
		let search_js = items[i].querySelectorAll('.search_js');
		searchMatch(items[i]);

	}
  if (arrOfSerchItems.length >= 0) {
    arrOfSerchItems = [];
  }else{
    console.error(`Array of searching items(arrOfSerchItems) is overflown`);
    console.log(arrOfSerchItems.length);
  }
});
ul_aside.addEventListener('click', (event)=>{
  for (let i = 0; i < event.path.length; i++) {
    if (event.path[i].className == 'orders-list__item') {
      let li = event.path[i];
			let data_number = li.getAttribute('data-number');
			customers.forEach((order)=>{
				for (let key in order) {
					if (order.id === data_number) {
						renderTable(order);
						renderPostInfo(order);
						renderSectionInfo(order);

					}
				}
			});
    }
	}
});


/*-------------------DOEST WORK-------------------*/
function searchMatch(item_for_check) {
	// let li =	item_to_check[0].parentNode.parentNode;
	let text_for_match = item_for_check.innerText;
	// arrOfSerchItems.forEach((text)=>{
	// 	// if (item_to_check[0].innerText.includes(text) ||
	// 	// 		item_to_check[1].innerText.includes(text) ||
	// 	// 		item_to_check[2].innerText.includes(text) ||
	// 	// 		item_to_check[3].innerText.includes(text)) {
	// 	// 	li.style.display = "";
	// 	// }else{
	// 	// 	li.style.display = "none";
	// 	// 	console.log(text);
	// 	// }
	//
	// });
	let stringToCheck = text_for_match.replace(/\n/gi, "").replace(/\s/gi,"");
	console.log(stringToCheck);
	let stringForCheck = arrOfSerchItems.join(' ').slice(2).split(" ");
	console.log(stringForCheck);

	while (stringForCheck) {

	}

	// console.log(stringForCheck);
}
/*===================END NOTICE===================*/
function searchList(obj, inptValue){
   for(let key in obj ){
    if (key == `OrderInfo`) {
      let OrderInfo = obj[key];
      // рекурсия
      searchList(OrderInfo, inptValue)
    }else{
      // запускается когда идет поиск
      let localProp = obj[key];
      if (typeof(localProp) !== `object` && localProp.toUpperCase().includes(inptValue)) {
        arrOfSerchItems.push(localProp);
      }
    }
  }
}
function createLI (obj) {
  const orderInfo = obj.OrderInfo;
  const li = `<li class="orders-list__item" data-number="${obj.id}">
            <div class="orders-list__row orders-list__row_first">
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
            </div>
          </li>`;
  ul_aside.innerHTML += li;
}
function renderTable(obj) {
	const products = obj.products;
	let myTable= `<tbody class="section-table__table-body"><tr class="section-table__table-row"><td class="section-table__table-column">Products</td>`;
    myTable+= `<td class="section-table__table-column">Unit Price</td>`;
    myTable+=`<td class="section-table__table-column">Quanitity</td>`;
    myTable+=`<td class="section-table__table-column">Total</td></tr>`;

  for (var i = 0; i < products.length; i++) {
    myTable+=`<tr class="section-table__table-row"><td class="section-table__table-column">${products[i].name}</td>`;
    myTable+=`<td class="section-table__table-column">${products[i].price} ${products[i].currency}</td>`;
    myTable+=`<td class="section-table__table-column">${products[i].quantity}</td>`;
    myTable+=`<td class="section-table__table-column"> ${products[i].totalPrice}</td></tr>`;
  }
   myTable+=`</tbody>`;

   table.innerHTML = myTable;
}
function renderPostInfo(obj) {
	const shipTo = obj.ShipTo;
	const li_postInfo = ` <li class="postinfo__item"><span class="postinfo__span">Name: ${shipTo.name}</span></li>
                        <li class="postinfo__item"><span class="postinfo__span">Street: ${shipTo.Address}</span></li>
                        <li class="postinfo__item"><span class="postinfo__span">ZIP Code/City: ${shipTo.ZIP}</span></li>
                        <li class="postinfo__item"><span class="postinfo__span">Region: ${shipTo.Region}</span></li>
                        <li class="postinfo__item"><span class="postinfo__span">${shipTo.Country}</span></li>`;
  ul_postInfo.innerHTML = li_postInfo;
}
function renderSectionInfo(obj) {
	const orderInfo = obj.OrderInfo;
	const li_sectionInfo = `<li class="section-info__customer section-info__item">Customer: ${orderInfo.customer}</li>
                          <li class="section-info__ordered section-info__item">Ordered: ${orderInfo.createdAt}</li>
                          <li class="section-info__shipped section-info__item">Shipped: ${orderInfo.shippedAt}</li>`;
  ul_sectionInfo.innerHTML = li_sectionInfo;
}
