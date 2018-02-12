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
  table = document.querySelector('.section-table__table');


Orders.forEach(createLI);

input.addEventListener('keyup', (event)=>{
  for (let i = 0; i < items.length; i++) {
      const filter = event.target.value.toUpperCase(),
            a = items[i].getElementsByClassName("search_js");
      if (a[0].innerHTML.toUpperCase().indexOf(filter) > -1 ||
          a[1].innerHTML.toUpperCase().indexOf(filter) > -1 ||
          a[2].innerHTML.toUpperCase().indexOf(filter) > -1 ||
          a[3].innerHTML.toUpperCase().indexOf(filter) > -1 ) {
        items[i].style.display = "";
      } else {
        items[i].style.display = "none";
      }
  }
});

ul_aside.addEventListener('click', (event)=>{
  for (let i = 0; i < event.path.length; i++) {
    if (event.path[i].className == 'orders-list__item') {
      console.log(event.path[i]);
    }
  }

});

function createLI (obj) {
  const oi = obj.OrderInfo,
    st = obj.ShipTo,
    ci = obj.CustomerInfo,
    products = obj.products;

  const li = `<li class="orders-list__item">
            <div class="orders-list__row orders-list__row_first">
              <p class="orders-list__title">Order 7991</p>
              <p class="orders-list__data search_js">${oi.createdAt}</p>
            </div>
            <div class="orders-list__row orders-list__row_second">
              <span class="orders-list__desc search_js">${oi.customer}</span>
              <span class="orders-list__status search_js">${oi.status}</span>
            </div>
            <div class="orders-list__row orders-list__row_third">
              <p class="orders-list__info">Shipped:
                <span class="orders-list__shippedAt search_js"> ${oi.shippedAt}</p>
            </div>
          </li>`;
  ul_aside.innerHTML += li;

  const li_sectionInfo = `<li class="section-info__customer section-info__item">Customer: ${oi.customer}</li>
                          <li class="section-info__ordered section-info__item">Ordered: ${oi.createdAt}</li>
                          <li class="section-info__shipped section-info__item">Shipped: ${oi.shippedAt}</li>`;
  ul_sectionInfo.innerHTML = li_sectionInfo;

  const li_postInfo = ` <li class="postinfo__item"><span class="postinfo__span">Name: ${st.name}</span></li>
                        <li class="postinfo__item"><span class="postinfo__span">Street: ${st.Address}</span></li>
                        <li class="postinfo__item"><span class="postinfo__span">ZIP Code/City: ${st.ZIP}</span></li>
                        <li class="postinfo__item"><span class="postinfo__span">Region: ${st.Region}</span></li>
                        <li class="postinfo__item"><span class="postinfo__span">${st.Country}</span></li>`;
  ul_postInfo.innerHTML = li_postInfo;

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
