"use strict";

var Orders = [{
	id: "1",
	OrderInfo: {
		createdAt: "10.08.1991",
		customer: "Alfreds Futterkiste",
		status: "Accepted",
		shippedAt: "8.09.1991"
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
	products: [{
		id: "1",
		name: "Chai",
		price: "18",
		currency: "EUR",
		quantity: "2",
		totalPrice: "36"
	}, {
		id: "2",
		name: "Aniseed Syrup",
		price: "10",
		currency: "USD",
		quantity: "3",
		totalPrice: "30"
	}, {
		id: "3",
		name: "Chef Anton's Cajun Seasoning",
		price: "22",
		currency: "USD",
		quantity: "2",
		totalPrice: "44"
	}, {
		id: "4",
		name: "Chef Anton's Gumbo Mix",
		price: "36",
		currency: "EUR",
		quantity: "21",
		totalPrice: "756"
	}, {
		id: "5",
		name: "Grandma's Boysenberry Spread",
		price: "25",
		currency: "USD",
		quantity: "5",
		totalPrice: "125"
	}]
}, {
	id: "2",
	OrderInfo: {
		createdAt: "23.12.2006",
		customer: "Bon app",
		status: "Pending",
		shippedAt: "13.02.2007"
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
	products: [{
		id: "1",
		name: "Queso Cabrales",
		price: "21",
		currency: "EUR",
		quantity: "5",
		totalPrice: "105"
	}, {
		id: "2",
		name: "Queso Manchego La Pastora",
		price: "38",
		currency: "EUR",
		quantity: "3",
		totalPrice: "114"
	}, {
		id: "3",
		name: "Pavlova",
		price: "120",
		currency: "RUB",
		quantity: "5",
		totalPrice: "600"
	}, {
		id: "4",
		name: "Sir Rodney's Marmalade",
		price: "5",
		currency: "BYN",
		quantity: "3",
		totalPrice: "15"
	}, {
		id: "5",
		name: "Genen Shouyu",
		price: "40",
		currency: "USD",
		quantity: "7",
		totalPrice: "280"
	}, {
		id: "6",
		name: "Tofu",
		price: "23.25",
		currency: "USD",
		quantity: "1",
		totalPrice: "23.25"
	}, {
		id: "7",
		name: "Alice Mutton",
		price: "32",
		currency: "UAH",
		quantity: "39",
		totalPrice: "1248"
	}]
}];

var input = document.querySelector('.search-form__ipt.search-form__ipt_search'),
    ul_aside = document.querySelector('.orders-list'),
    items = ul_aside.getElementsByTagName('li'),
    ul_sectionInfo = document.querySelector('.section-info'),
    ul_postInfo = document.querySelector('.full-info__post-info.postinfo'),
    table = document.querySelector('.section-table__table');

Orders.forEach(createLI);

input.addEventListener('keyup', function (event) {
	for (var i = 0; i < items.length; i++) {
		var filter = event.target.value.toUpperCase(),
		    a = items[i].getElementsByClassName("search_js");
		if (a[0].innerHTML.toUpperCase().indexOf(filter) > -1 || a[1].innerHTML.toUpperCase().indexOf(filter) > -1 || a[2].innerHTML.toUpperCase().indexOf(filter) > -1 || a[3].innerHTML.toUpperCase().indexOf(filter) > -1) {
			items[i].style.display = "";
		} else {
			items[i].style.display = "none";
		}
	}
});

ul_aside.addEventListener('click', function (event) {
	for (var i = 0; i < event.path.length; i++) {
		if (event.path[i].className == 'orders-list__item') {
			console.log(event.path[i]);
		}
	}
});

function createLI(obj) {
	var oi = obj.OrderInfo,
	    st = obj.ShipTo,
	    ci = obj.CustomerInfo,
	    products = obj.products;

	var li = "<li class=\"orders-list__item\">\n            <div class=\"orders-list__row orders-list__row_first\">\n              <p class=\"orders-list__title\">Order 7991</p>\n              <p class=\"orders-list__data search_js\">" + oi.createdAt + "</p>\n            </div>\n            <div class=\"orders-list__row orders-list__row_second\">\n              <span class=\"orders-list__desc search_js\">" + oi.customer + "</span>\n              <span class=\"orders-list__status search_js\">" + oi.status + "</span>\n            </div>\n            <div class=\"orders-list__row orders-list__row_third\">\n              <p class=\"orders-list__info\">Shipped:\n                <span class=\"orders-list__shippedAt search_js\"> " + oi.shippedAt + "</p>\n            </div>\n          </li>";
	ul_aside.innerHTML += li;

	var li_sectionInfo = "<li class=\"section-info__customer section-info__item\">Customer: " + oi.customer + "</li>\n                          <li class=\"section-info__ordered section-info__item\">Ordered: " + oi.createdAt + "</li>\n                          <li class=\"section-info__shipped section-info__item\">Shipped: " + oi.shippedAt + "</li>";
	ul_sectionInfo.innerHTML = li_sectionInfo;

	var li_postInfo = " <li class=\"postinfo__item\"><span class=\"postinfo__span\">Name: " + st.name + "</span></li>\n                        <li class=\"postinfo__item\"><span class=\"postinfo__span\">Street: " + st.Address + "</span></li>\n                        <li class=\"postinfo__item\"><span class=\"postinfo__span\">ZIP Code/City: " + st.ZIP + "</span></li>\n                        <li class=\"postinfo__item\"><span class=\"postinfo__span\">Region: " + st.Region + "</span></li>\n                        <li class=\"postinfo__item\"><span class=\"postinfo__span\">" + st.Country + "</span></li>";
	ul_postInfo.innerHTML = li_postInfo;

	var myTable = "<tbody class=\"section-table__table-body\"><tr class=\"section-table__table-row\"><td class=\"section-table__table-column\">Products</td>";
	myTable += "<td class=\"section-table__table-column\">Unit Price</td>";
	myTable += "<td class=\"section-table__table-column\">Quanitity</td>";
	myTable += "<td class=\"section-table__table-column\">Total</td></tr>";

	for (var i = 0; i < products.length; i++) {
		myTable += "<tr class=\"section-table__table-row\"><td class=\"section-table__table-column\">" + products[i].name + "</td>";
		myTable += "<td class=\"section-table__table-column\">" + products[i].price + " " + products[i].currency + "</td>";
		myTable += "<td class=\"section-table__table-column\">" + products[i].quantity + "</td>";
		myTable += "<td class=\"section-table__table-column\"> " + products[i].totalPrice + "</td></tr>";
	}
	myTable += "</tbody>";

	table.innerHTML = myTable;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1iZW5kLmpzIl0sIm5hbWVzIjpbIk9yZGVycyIsImlkIiwiT3JkZXJJbmZvIiwiY3JlYXRlZEF0IiwiY3VzdG9tZXIiLCJzdGF0dXMiLCJzaGlwcGVkQXQiLCJTaGlwVG8iLCJuYW1lIiwiQWRkcmVzcyIsIlpJUCIsIlJlZ2lvbiIsIkNvdW50cnkiLCJDdXN0b21lckluZm8iLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImFkZHJlc3MiLCJwaG9uZSIsImVtYWlsIiwicHJvZHVjdHMiLCJwcmljZSIsImN1cnJlbmN5IiwicXVhbnRpdHkiLCJ0b3RhbFByaWNlIiwiaW5wdXQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ1bF9hc2lkZSIsIml0ZW1zIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ1bF9zZWN0aW9uSW5mbyIsInVsX3Bvc3RJbmZvIiwidGFibGUiLCJmb3JFYWNoIiwiY3JlYXRlTEkiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJpIiwibGVuZ3RoIiwiZmlsdGVyIiwidGFyZ2V0IiwidmFsdWUiLCJ0b1VwcGVyQ2FzZSIsImEiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwiaW5kZXhPZiIsInN0eWxlIiwiZGlzcGxheSIsInBhdGgiLCJjbGFzc05hbWUiLCJjb25zb2xlIiwibG9nIiwib2JqIiwib2kiLCJzdCIsImNpIiwibGkiLCJsaV9zZWN0aW9uSW5mbyIsImxpX3Bvc3RJbmZvIiwibXlUYWJsZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxTQUFTLENBQ2Q7QUFDQ0MsS0FBSSxHQURMO0FBRUNDLFlBQVc7QUFDVkMsYUFBWSxZQURGO0FBRVZDLFlBQVcscUJBRkQ7QUFHVkMsVUFBVSxVQUhBO0FBSVZDLGFBQVk7QUFKRixFQUZaO0FBUUNDLFNBQVE7QUFDUEMsUUFBTSxjQURDO0FBRVBDLFdBQVMsZUFGRjtBQUdQQyxPQUFLLE9BSEU7QUFJUEMsVUFBUSxTQUpEO0FBS1BDLFdBQVM7QUFMRixFQVJU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QUFaLEdBQXdCYyxXQUF4Qjs7QUFFQSxLQUFJQyxxSkFBSjtBQUNFQTtBQUNBQTtBQUNBQTs7QUFFRixNQUFLLElBQUl2QixJQUFJLENBQWIsRUFBZ0JBLElBQUlsQixTQUFTbUIsTUFBN0IsRUFBcUNELEdBQXJDLEVBQTBDO0FBQ3hDdUIsbUdBQXlGekMsU0FBU2tCLENBQVQsRUFBWTdCLElBQXJHO0FBQ0FvRCw0REFBb0R6QyxTQUFTa0IsQ0FBVCxFQUFZakIsS0FBaEUsU0FBeUVELFNBQVNrQixDQUFULEVBQVloQixRQUFyRjtBQUNBdUMsNERBQW9EekMsU0FBU2tCLENBQVQsRUFBWWYsUUFBaEU7QUFDQXNDLDZEQUFxRHpDLFNBQVNrQixDQUFULEVBQVlkLFVBQWpFO0FBQ0Q7QUFDQXFDOztBQUVBNUIsT0FBTWEsU0FBTixHQUFrQmUsT0FBbEI7QUFDRiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgT3JkZXJzID0gW1xuXHR7XG5cdFx0aWQ6IFwiMVwiLFxuXHRcdE9yZGVySW5mbzoge1xuXHRcdFx0Y3JlYXRlZEF0XHQ6IFwiMTAuMDguMTk5MVwiLFxuXHRcdFx0Y3VzdG9tZXJcdDogXCJBbGZyZWRzIEZ1dHRlcmtpc3RlXCIsXG5cdFx0XHRzdGF0dXNcdFx0OiBcIkFjY2VwdGVkXCIsXG5cdFx0XHRzaGlwcGVkQXRcdDogXCI4LjA5LjE5OTFcIlxuXHRcdH0sXG5cdFx0U2hpcFRvOiB7XG5cdFx0XHRuYW1lOiBcIk1hcmlhIEFuZGVyc1wiLFxuXHRcdFx0QWRkcmVzczogXCJPYmVyZSBTdHIuIDU3XCIsXG5cdFx0XHRaSVA6IFwiMTIyMDlcIixcblx0XHRcdFJlZ2lvbjogXCJHZXJtYW55XCIsXG5cdFx0XHRDb3VudHJ5OiBcIkdlcm1hbnlcIlxuXHRcdH0sXG5cdFx0Q3VzdG9tZXJJbmZvOiB7XG5cdFx0XHRmaXJzdE5hbWU6IFwiTWFyaWFcIixcblx0XHRcdGxhc3ROYW1lOiBcIkFuZGVyc1wiLFxuXHRcdFx0YWRkcmVzczogXCJPYmVyZSBTdHIuIDU3XCIsXG5cdFx0XHRwaG9uZTogXCIwMzAtMDA3NDMyMVwiLFxuXHRcdFx0ZW1haWw6IFwiTWFyaWEuQW5kZXJzQGNvbXBhbnkuY29tXCJcblx0XHR9LFxuXHRcdHByb2R1Y3RzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGlkXHRcdFx0OiBcIjFcIixcblx0XHRcdFx0bmFtZVx0XHQ6IFwiQ2hhaVwiLFxuXHRcdFx0XHRwcmljZVx0XHQ6IFwiMThcIixcblx0XHRcdFx0Y3VycmVuY3lcdDogXCJFVVJcIixcblx0XHRcdFx0cXVhbnRpdHlcdDogXCIyXCIsXG5cdFx0XHRcdHRvdGFsUHJpY2VcdDogXCIzNlwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpZFx0XHRcdDogXCIyXCIsXG5cdFx0XHRcdG5hbWVcdFx0OiBcIkFuaXNlZWQgU3lydXBcIixcblx0XHRcdFx0cHJpY2VcdFx0OiBcIjEwXCIsXG5cdFx0XHRcdGN1cnJlbmN5XHQ6IFwiVVNEXCIsXG5cdFx0XHRcdHF1YW50aXR5XHQ6IFwiM1wiLFxuXHRcdFx0XHR0b3RhbFByaWNlXHQ6IFwiMzBcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWRcdFx0XHQ6IFwiM1wiLFxuXHRcdFx0XHRuYW1lXHRcdDogXCJDaGVmIEFudG9uJ3MgQ2FqdW4gU2Vhc29uaW5nXCIsXG5cdFx0XHRcdHByaWNlXHRcdDogXCIyMlwiLFxuXHRcdFx0XHRjdXJyZW5jeVx0OiBcIlVTRFwiLFxuXHRcdFx0XHRxdWFudGl0eVx0OiBcIjJcIixcblx0XHRcdFx0dG90YWxQcmljZVx0OiBcIjQ0XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGlkXHRcdFx0OiBcIjRcIixcblx0XHRcdFx0bmFtZVx0XHQ6IFwiQ2hlZiBBbnRvbidzIEd1bWJvIE1peFwiLFxuXHRcdFx0XHRwcmljZVx0XHQ6IFwiMzZcIixcblx0XHRcdFx0Y3VycmVuY3lcdDogXCJFVVJcIixcblx0XHRcdFx0cXVhbnRpdHlcdDogXCIyMVwiLFxuXHRcdFx0XHR0b3RhbFByaWNlXHQ6IFwiNzU2XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGlkXHRcdFx0OiBcIjVcIixcblx0XHRcdFx0bmFtZVx0XHQ6IFwiR3JhbmRtYSdzIEJveXNlbmJlcnJ5IFNwcmVhZFwiLFxuXHRcdFx0XHRwcmljZVx0XHQ6IFwiMjVcIixcblx0XHRcdFx0Y3VycmVuY3lcdDogXCJVU0RcIixcblx0XHRcdFx0cXVhbnRpdHlcdDogXCI1XCIsXG5cdFx0XHRcdHRvdGFsUHJpY2VcdDogXCIxMjVcIlxuXHRcdFx0fVxuXHRcdF1cblx0fSxcblx0e1xuXHRcdGlkOiBcIjJcIixcblx0XHRPcmRlckluZm86IHtcblx0XHRcdGNyZWF0ZWRBdFx0OiBcIjIzLjEyLjIwMDZcIixcblx0XHRcdGN1c3RvbWVyXHQ6IFwiQm9uIGFwcFwiLFxuXHRcdFx0c3RhdHVzXHRcdDogXCJQZW5kaW5nXCIsXG5cdFx0XHRzaGlwcGVkQXRcdDogXCIxMy4wMi4yMDA3XCJcblx0XHR9LFxuXHRcdFNoaXBUbzoge1xuXHRcdFx0bmFtZTogXCJMYXVyZW5jZSBMZWJpaGFuXCIsXG5cdFx0XHRBZGRyZXNzOiBcIjEyLCBydWUgZGVzIEJvdWNoZXJzXCIsXG5cdFx0XHRaSVA6IFwiMTMwMDhcIixcblx0XHRcdFJlZ2lvbjogXCJGcmFuY2VcIixcblx0XHRcdENvdW50cnk6IFwiRnJhbmNlXCJcblx0XHR9LFxuXHRcdEN1c3RvbWVySW5mbzoge1xuXHRcdFx0Zmlyc3ROYW1lOiBcIkxhdXJlbmNlXCIsXG5cdFx0XHRsYXN0TmFtZTogXCJMZWJpaGFuXCIsXG5cdFx0XHRhZGRyZXNzOiBcIjEyLCBydWUgZGVzIEJvdWNoZXJzXCIsXG5cdFx0XHRwaG9uZTogXCI5MS4yNC40NS40MFwiLFxuXHRcdFx0ZW1haWw6IFwiTGF1cmVuY2UuTGViaWhhbkBjb21wYW55LmNvbVwiXG5cdFx0fSxcblx0XHRwcm9kdWN0czogW1xuXHRcdFx0e1xuXHRcdFx0XHRpZFx0XHRcdDogXCIxXCIsXG5cdFx0XHRcdG5hbWVcdFx0OiBcIlF1ZXNvIENhYnJhbGVzXCIsXG5cdFx0XHRcdHByaWNlXHRcdDogXCIyMVwiLFxuXHRcdFx0XHRjdXJyZW5jeVx0OiBcIkVVUlwiLFxuXHRcdFx0XHRxdWFudGl0eVx0OiBcIjVcIixcblx0XHRcdFx0dG90YWxQcmljZVx0OiBcIjEwNVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpZFx0XHRcdDogXCIyXCIsXG5cdFx0XHRcdG5hbWVcdFx0OiBcIlF1ZXNvIE1hbmNoZWdvIExhIFBhc3RvcmFcIixcblx0XHRcdFx0cHJpY2VcdFx0OiBcIjM4XCIsXG5cdFx0XHRcdGN1cnJlbmN5XHQ6IFwiRVVSXCIsXG5cdFx0XHRcdHF1YW50aXR5XHQ6IFwiM1wiLFxuXHRcdFx0XHR0b3RhbFByaWNlXHQ6IFwiMTE0XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGlkXHRcdFx0OiBcIjNcIixcblx0XHRcdFx0bmFtZVx0XHQ6IFwiUGF2bG92YVwiLFxuXHRcdFx0XHRwcmljZVx0XHQ6IFwiMTIwXCIsXG5cdFx0XHRcdGN1cnJlbmN5XHQ6IFwiUlVCXCIsXG5cdFx0XHRcdHF1YW50aXR5XHQ6IFwiNVwiLFxuXHRcdFx0XHR0b3RhbFByaWNlXHQ6IFwiNjAwXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGlkXHRcdFx0OiBcIjRcIixcblx0XHRcdFx0bmFtZVx0XHQ6IFwiU2lyIFJvZG5leSdzIE1hcm1hbGFkZVwiLFxuXHRcdFx0XHRwcmljZVx0XHQ6IFwiNVwiLFxuXHRcdFx0XHRjdXJyZW5jeVx0OiBcIkJZTlwiLFxuXHRcdFx0XHRxdWFudGl0eVx0OiBcIjNcIixcblx0XHRcdFx0dG90YWxQcmljZVx0OiBcIjE1XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGlkXHRcdFx0OiBcIjVcIixcblx0XHRcdFx0bmFtZVx0XHQ6IFwiR2VuZW4gU2hvdXl1XCIsXG5cdFx0XHRcdHByaWNlXHRcdDogXCI0MFwiLFxuXHRcdFx0XHRjdXJyZW5jeVx0OiBcIlVTRFwiLFxuXHRcdFx0XHRxdWFudGl0eVx0OiBcIjdcIixcblx0XHRcdFx0dG90YWxQcmljZVx0OiBcIjI4MFwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpZFx0XHRcdDogXCI2XCIsXG5cdFx0XHRcdG5hbWVcdFx0OiBcIlRvZnVcIixcblx0XHRcdFx0cHJpY2VcdFx0OiBcIjIzLjI1XCIsXG5cdFx0XHRcdGN1cnJlbmN5XHQ6IFwiVVNEXCIsXG5cdFx0XHRcdHF1YW50aXR5XHQ6IFwiMVwiLFxuXHRcdFx0XHR0b3RhbFByaWNlXHQ6IFwiMjMuMjVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWRcdFx0XHQ6IFwiN1wiLFxuXHRcdFx0XHRuYW1lXHRcdDogXCJBbGljZSBNdXR0b25cIixcblx0XHRcdFx0cHJpY2VcdFx0OiBcIjMyXCIsXG5cdFx0XHRcdGN1cnJlbmN5XHQ6IFwiVUFIXCIsXG5cdFx0XHRcdHF1YW50aXR5XHQ6IFwiMzlcIixcblx0XHRcdFx0dG90YWxQcmljZVx0OiBcIjEyNDhcIlxuXHRcdFx0fVxuXHRcdF1cblx0fVxuXTtcblxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWZvcm1fX2lwdC5zZWFyY2gtZm9ybV9faXB0X3NlYXJjaCcpLFxuICB1bF9hc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlcnMtbGlzdCcpLFxuICBpdGVtcyA9IHVsX2FzaWRlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpLFxuICB1bF9zZWN0aW9uSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWN0aW9uLWluZm8nKSxcbiAgdWxfcG9zdEluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVsbC1pbmZvX19wb3N0LWluZm8ucG9zdGluZm8nKSxcbiAgdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbi10YWJsZV9fdGFibGUnKTtcblxuXG5PcmRlcnMuZm9yRWFjaChjcmVhdGVMSSk7XG5cbmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KT0+e1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmaWx0ZXIgPSBldmVudC50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgIGEgPSBpdGVtc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VhcmNoX2pzXCIpO1xuICAgICAgaWYgKGFbMF0uaW5uZXJIVE1MLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIpID4gLTEgfHxcbiAgICAgICAgICBhWzFdLmlubmVySFRNTC50b1VwcGVyQ2FzZSgpLmluZGV4T2YoZmlsdGVyKSA+IC0xIHx8XG4gICAgICAgICAgYVsyXS5pbm5lckhUTUwudG9VcHBlckNhc2UoKS5pbmRleE9mKGZpbHRlcikgPiAtMSB8fFxuICAgICAgICAgIGFbM10uaW5uZXJIVE1MLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIpID4gLTEgKSB7XG4gICAgICAgIGl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfVxuICB9XG59KTtcblxudWxfYXNpZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQucGF0aC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChldmVudC5wYXRoW2ldLmNsYXNzTmFtZSA9PSAnb3JkZXJzLWxpc3RfX2l0ZW0nKSB7XG4gICAgICBjb25zb2xlLmxvZyhldmVudC5wYXRoW2ldKTtcbiAgICB9XG4gIH1cblxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxJIChvYmopIHtcbiAgY29uc3Qgb2kgPSBvYmouT3JkZXJJbmZvLFxuICAgIHN0ID0gb2JqLlNoaXBUbyxcbiAgICBjaSA9IG9iai5DdXN0b21lckluZm8sXG4gICAgcHJvZHVjdHMgPSBvYmoucHJvZHVjdHM7XG5cbiAgY29uc3QgbGkgPSBgPGxpIGNsYXNzPVwib3JkZXJzLWxpc3RfX2l0ZW1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcmRlcnMtbGlzdF9fcm93IG9yZGVycy1saXN0X19yb3dfZmlyc3RcIj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJvcmRlcnMtbGlzdF9fdGl0bGVcIj5PcmRlciA3OTkxPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cIm9yZGVycy1saXN0X19kYXRhIHNlYXJjaF9qc1wiPiR7b2kuY3JlYXRlZEF0fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9yZGVycy1saXN0X19yb3cgb3JkZXJzLWxpc3RfX3Jvd19zZWNvbmRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJvcmRlcnMtbGlzdF9fZGVzYyBzZWFyY2hfanNcIj4ke29pLmN1c3RvbWVyfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJvcmRlcnMtbGlzdF9fc3RhdHVzIHNlYXJjaF9qc1wiPiR7b2kuc3RhdHVzfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9yZGVycy1saXN0X19yb3cgb3JkZXJzLWxpc3RfX3Jvd190aGlyZFwiPlxuICAgICAgICAgICAgICA8cCBjbGFzcz1cIm9yZGVycy1saXN0X19pbmZvXCI+U2hpcHBlZDpcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm9yZGVycy1saXN0X19zaGlwcGVkQXQgc2VhcmNoX2pzXCI+ICR7b2kuc2hpcHBlZEF0fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbGk+YDtcbiAgdWxfYXNpZGUuaW5uZXJIVE1MICs9IGxpO1xuXG4gIGNvbnN0IGxpX3NlY3Rpb25JbmZvID0gYDxsaSBjbGFzcz1cInNlY3Rpb24taW5mb19fY3VzdG9tZXIgc2VjdGlvbi1pbmZvX19pdGVtXCI+Q3VzdG9tZXI6ICR7b2kuY3VzdG9tZXJ9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwic2VjdGlvbi1pbmZvX19vcmRlcmVkIHNlY3Rpb24taW5mb19faXRlbVwiPk9yZGVyZWQ6ICR7b2kuY3JlYXRlZEF0fTwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInNlY3Rpb24taW5mb19fc2hpcHBlZCBzZWN0aW9uLWluZm9fX2l0ZW1cIj5TaGlwcGVkOiAke29pLnNoaXBwZWRBdH08L2xpPmA7XG4gIHVsX3NlY3Rpb25JbmZvLmlubmVySFRNTCA9IGxpX3NlY3Rpb25JbmZvO1xuXG4gIGNvbnN0IGxpX3Bvc3RJbmZvID0gYCA8bGkgY2xhc3M9XCJwb3N0aW5mb19faXRlbVwiPjxzcGFuIGNsYXNzPVwicG9zdGluZm9fX3NwYW5cIj5OYW1lOiAke3N0Lm5hbWV9PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwb3N0aW5mb19faXRlbVwiPjxzcGFuIGNsYXNzPVwicG9zdGluZm9fX3NwYW5cIj5TdHJlZXQ6ICR7c3QuQWRkcmVzc308L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInBvc3RpbmZvX19pdGVtXCI+PHNwYW4gY2xhc3M9XCJwb3N0aW5mb19fc3BhblwiPlpJUCBDb2RlL0NpdHk6ICR7c3QuWklQfTwvc3Bhbj48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicG9zdGluZm9fX2l0ZW1cIj48c3BhbiBjbGFzcz1cInBvc3RpbmZvX19zcGFuXCI+UmVnaW9uOiAke3N0LlJlZ2lvbn08L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInBvc3RpbmZvX19pdGVtXCI+PHNwYW4gY2xhc3M9XCJwb3N0aW5mb19fc3BhblwiPiR7c3QuQ291bnRyeX08L3NwYW4+PC9saT5gO1xuICB1bF9wb3N0SW5mby5pbm5lckhUTUwgPSBsaV9wb3N0SW5mbztcblxuICBsZXQgbXlUYWJsZT0gYDx0Ym9keSBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLWJvZHlcIj48dHIgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1yb3dcIj48dGQgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1jb2x1bW5cIj5Qcm9kdWN0czwvdGQ+YDtcbiAgICBteVRhYmxlKz0gYDx0ZCBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLWNvbHVtblwiPlVuaXQgUHJpY2U8L3RkPmA7XG4gICAgbXlUYWJsZSs9YDx0ZCBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLWNvbHVtblwiPlF1YW5pdGl0eTwvdGQ+YDtcbiAgICBteVRhYmxlKz1gPHRkIGNsYXNzPVwic2VjdGlvbi10YWJsZV9fdGFibGUtY29sdW1uXCI+VG90YWw8L3RkPjwvdHI+YDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgbXlUYWJsZSs9YDx0ciBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLXJvd1wiPjx0ZCBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLWNvbHVtblwiPiR7cHJvZHVjdHNbaV0ubmFtZX08L3RkPmA7XG4gICAgbXlUYWJsZSs9YDx0ZCBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLWNvbHVtblwiPiR7cHJvZHVjdHNbaV0ucHJpY2V9ICR7cHJvZHVjdHNbaV0uY3VycmVuY3l9PC90ZD5gO1xuICAgIG15VGFibGUrPWA8dGQgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1jb2x1bW5cIj4ke3Byb2R1Y3RzW2ldLnF1YW50aXR5fTwvdGQ+YDtcbiAgICBteVRhYmxlKz1gPHRkIGNsYXNzPVwic2VjdGlvbi10YWJsZV9fdGFibGUtY29sdW1uXCI+ICR7cHJvZHVjdHNbaV0udG90YWxQcmljZX08L3RkPjwvdHI+YDtcbiAgfVxuICAgbXlUYWJsZSs9YDwvdGJvZHk+YDtcblxuICAgdGFibGUuaW5uZXJIVE1MID0gbXlUYWJsZTtcbn1cbiJdfQ==
