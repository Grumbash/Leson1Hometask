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
    table = document.querySelector('.section-table__table'),
    customers = Orders;

var arrOfSerchItems = [];
customers.forEach(createLI);
/*не работает нормально searchMatch()*/

input.addEventListener("keyup", function (event) {
	var val = event.target.value.toUpperCase();
	for (var elem in customers) {
		searchList(customers[elem], val);
	}
	for (var i = 0; i < items.length; i++) {
		var search_js = items[i].querySelectorAll('.search_js');
		searchMatch(items[i]);
	}
	if (arrOfSerchItems.length >= 0) {
		arrOfSerchItems = [];
	} else {
		console.error("Array of searching items(arrOfSerchItems) is overflown");
		console.log(arrOfSerchItems.length);
	}
});
ul_aside.addEventListener('click', function (event) {
	for (var i = 0; i < event.path.length; i++) {
		if (event.path[i].className == 'orders-list__item') {
			(function () {
				var li = event.path[i];
				var data_number = li.getAttribute('data-number');
				customers.forEach(function (order) {
					for (var key in order) {
						if (order.id === data_number) {
							renderTable(order);
							renderPostInfo(order);
							renderSectionInfo(order);
						}
					}
				});
			})();
		}
	}
});

/*-------------------DOEST WORK-------------------*/
function searchMatch(item_for_check) {
	// let li =	item_to_check[0].parentNode.parentNode;
	var text_for_match = item_for_check.innerText;
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
	var stringToCheck = text_for_match.replace(/\n/gi, "").replace(/\s/gi, "");
	console.log(stringToCheck);
	var stringForCheck = arrOfSerchItems.join(' ').slice(2).split(" ");
	console.log(stringForCheck);

	while (stringForCheck) {}

	// console.log(stringForCheck);
}
/*===================END NOTICE===================*/
function searchList(obj, inptValue) {
	for (var key in obj) {
		if (key == "OrderInfo") {
			var OrderInfo = obj[key];
			// рекурсия
			searchList(OrderInfo, inptValue);
		} else {
			// запускается когда идет поиск
			var localProp = obj[key];
			if (typeof localProp !== "object" && localProp.toUpperCase().includes(inptValue)) {
				arrOfSerchItems.push(localProp);
			}
		}
	}
}
function createLI(obj) {
	var orderInfo = obj.OrderInfo;
	var li = "<li class=\"orders-list__item\" data-number=\"" + obj.id + "\">\n            <div class=\"orders-list__row orders-list__row_first\">\n              <p class=\"orders-list__title\">Order 7991</p>\n              <p class=\"orders-list__data search_js\">" + orderInfo.createdAt + "</p>\n            </div>\n            <div class=\"orders-list__row orders-list__row_second\">\n              <span class=\"orders-list__desc search_js\">" + orderInfo.customer + "</span>\n              <span class=\"orders-list__status search_js\">" + orderInfo.status + "</span>\n            </div>\n            <div class=\"orders-list__row orders-list__row_third\">\n              <p class=\"orders-list__info search_js\">Shipped:\n                <span class=\"orders-list__shippedAt \"> " + orderInfo.shippedAt + "</span></p>\n            </div>\n          </li>";
	ul_aside.innerHTML += li;
}
function renderTable(obj) {
	var products = obj.products;
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
function renderPostInfo(obj) {
	var shipTo = obj.ShipTo;
	var li_postInfo = " <li class=\"postinfo__item\"><span class=\"postinfo__span\">Name: " + shipTo.name + "</span></li>\n                        <li class=\"postinfo__item\"><span class=\"postinfo__span\">Street: " + shipTo.Address + "</span></li>\n                        <li class=\"postinfo__item\"><span class=\"postinfo__span\">ZIP Code/City: " + shipTo.ZIP + "</span></li>\n                        <li class=\"postinfo__item\"><span class=\"postinfo__span\">Region: " + shipTo.Region + "</span></li>\n                        <li class=\"postinfo__item\"><span class=\"postinfo__span\">" + shipTo.Country + "</span></li>";
	ul_postInfo.innerHTML = li_postInfo;
}
function renderSectionInfo(obj) {
	var orderInfo = obj.OrderInfo;
	var li_sectionInfo = "<li class=\"section-info__customer section-info__item\">Customer: " + orderInfo.customer + "</li>\n                          <li class=\"section-info__ordered section-info__item\">Ordered: " + orderInfo.createdAt + "</li>\n                          <li class=\"section-info__shipped section-info__item\">Shipped: " + orderInfo.shippedAt + "</li>";
	ul_sectionInfo.innerHTML = li_sectionInfo;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk15cmVmYWN0LmpzIl0sIm5hbWVzIjpbIk9yZGVycyIsImlkIiwiT3JkZXJJbmZvIiwiY3JlYXRlZEF0IiwiY3VzdG9tZXIiLCJzdGF0dXMiLCJzaGlwcGVkQXQiLCJTaGlwVG8iLCJuYW1lIiwiQWRkcmVzcyIsIlpJUCIsIlJlZ2lvbiIsIkNvdW50cnkiLCJDdXN0b21lckluZm8iLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImFkZHJlc3MiLCJwaG9uZSIsImVtYWlsIiwicHJvZHVjdHMiLCJwcmljZSIsImN1cnJlbmN5IiwicXVhbnRpdHkiLCJ0b3RhbFByaWNlIiwiaW5wdXQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ1bF9hc2lkZSIsIml0ZW1zIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ1bF9zZWN0aW9uSW5mbyIsInVsX3Bvc3RJbmZvIiwidGFibGUiLCJjdXN0b21lcnMiLCJhcnJPZlNlcmNoSXRlbXMiLCJmb3JFYWNoIiwiY3JlYXRlTEkiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ2YWwiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRvVXBwZXJDYXNlIiwiZWxlbSIsInNlYXJjaExpc3QiLCJpIiwibGVuZ3RoIiwic2VhcmNoX2pzIiwicXVlcnlTZWxlY3RvckFsbCIsInNlYXJjaE1hdGNoIiwiY29uc29sZSIsImVycm9yIiwibG9nIiwicGF0aCIsImNsYXNzTmFtZSIsImxpIiwiZGF0YV9udW1iZXIiLCJnZXRBdHRyaWJ1dGUiLCJvcmRlciIsImtleSIsInJlbmRlclRhYmxlIiwicmVuZGVyUG9zdEluZm8iLCJyZW5kZXJTZWN0aW9uSW5mbyIsIml0ZW1fZm9yX2NoZWNrIiwidGV4dF9mb3JfbWF0Y2giLCJpbm5lclRleHQiLCJzdHJpbmdUb0NoZWNrIiwicmVwbGFjZSIsInN0cmluZ0ZvckNoZWNrIiwiam9pbiIsInNsaWNlIiwic3BsaXQiLCJvYmoiLCJpbnB0VmFsdWUiLCJsb2NhbFByb3AiLCJpbmNsdWRlcyIsInB1c2giLCJvcmRlckluZm8iLCJpbm5lckhUTUwiLCJteVRhYmxlIiwic2hpcFRvIiwibGlfcG9zdEluZm8iLCJsaV9zZWN0aW9uSW5mbyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxTQUFTLENBQ2Q7QUFDQ0MsS0FBSSxHQURMO0FBRUNDLFlBQVc7QUFDVkMsYUFBWSxZQURGO0FBRVZDLFlBQVcscUJBRkQ7QUFHVkMsVUFBVSxVQUhBO0FBSVZDLGFBQVk7QUFKRixFQUZaO0FBUUNDLFNBQVE7QUFDUEMsUUFBTSxjQURDO0FBRVBDLFdBQVMsZUFGRjtBQUdQQyxPQUFLLE9BSEU7QUFJUEMsVUFBUSxTQUpEO0FBS1BDLFdBQVM7QUFMRixFQVJUO0FBZUNDLGVBQWM7QUFDYkMsYUFBVyxPQURFO0FBRWJDLFlBQVUsUUFGRztBQUdiQyxXQUFTLGVBSEk7QUFJYkMsU0FBTyxhQUpNO0FBS2JDLFNBQU87QUFMTSxFQWZmO0FBc0JDQyxXQUFVLENBQ1Q7QUFDQ2xCLE1BQU8sR0FEUjtBQUVDTyxRQUFRLE1BRlQ7QUFHQ1ksU0FBUyxJQUhWO0FBSUNDLFlBQVcsS0FKWjtBQUtDQyxZQUFXLEdBTFo7QUFNQ0MsY0FBYTtBQU5kLEVBRFMsRUFTVDtBQUNDdEIsTUFBTyxHQURSO0FBRUNPLFFBQVEsZUFGVDtBQUdDWSxTQUFTLElBSFY7QUFJQ0MsWUFBVyxLQUpaO0FBS0NDLFlBQVcsR0FMWjtBQU1DQyxjQUFhO0FBTmQsRUFUUyxFQWlCVDtBQUNDdEIsTUFBTyxHQURSO0FBRUNPLFFBQVEsOEJBRlQ7QUFHQ1ksU0FBUyxJQUhWO0FBSUNDLFlBQVcsS0FKWjtBQUtDQyxZQUFXLEdBTFo7QUFNQ0MsY0FBYTtBQU5kLEVBakJTLEVBeUJUO0FBQ0N0QixNQUFPLEdBRFI7QUFFQ08sUUFBUSx3QkFGVDtBQUdDWSxTQUFTLElBSFY7QUFJQ0MsWUFBVyxLQUpaO0FBS0NDLFlBQVcsSUFMWjtBQU1DQyxjQUFhO0FBTmQsRUF6QlMsRUFpQ1Q7QUFDQ3RCLE1BQU8sR0FEUjtBQUVDTyxRQUFRLDhCQUZUO0FBR0NZLFNBQVMsSUFIVjtB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XG5cdHtcblx0XHRpZDogXCIxXCIsXG5cdFx0T3JkZXJJbmZvOiB7XG5cdFx0XHRjcmVhdGVkQXRcdDogXCIxMC4wOC4xOTkxXCIsXG5cdFx0XHRjdXN0b21lclx0OiBcIkFsZnJlZHMgRnV0dGVya2lzdGVcIixcblx0XHRcdHN0YXR1c1x0XHQ6IFwiQWNjZXB0ZWRcIixcblx0XHRcdHNoaXBwZWRBdFx0OiBcIjguMDkuMTk5MVwiXG5cdFx0fSxcblx0XHRTaGlwVG86IHtcblx0XHRcdG5hbWU6IFwiTWFyaWEgQW5kZXJzXCIsXG5cdFx0XHRBZGRyZXNzOiBcIk9iZXJlIFN0ci4gNTdcIixcblx0XHRcdFpJUDogXCIxMjIwOVwiLFxuXHRcdFx0UmVnaW9uOiBcIkdlcm1hbnlcIixcblx0XHRcdENvdW50cnk6IFwiR2VybWFueVwiXG5cdFx0fSxcblx0XHRDdXN0b21lckluZm86IHtcblx0XHRcdGZpcnN0TmFtZTogXCJNYXJpYVwiLFxuXHRcdFx0bGFzdE5hbWU6IFwiQW5kZXJzXCIsXG5cdFx0XHRhZGRyZXNzOiBcIk9iZXJlIFN0ci4gNTdcIixcblx0XHRcdHBob25lOiBcIjAzMC0wMDc0MzIxXCIsXG5cdFx0XHRlbWFpbDogXCJNYXJpYS5BbmRlcnNAY29tcGFueS5jb21cIlxuXHRcdH0sXG5cdFx0cHJvZHVjdHM6IFtcblx0XHRcdHtcblx0XHRcdFx0aWRcdFx0XHQ6IFwiMVwiLFxuXHRcdFx0XHRuYW1lXHRcdDogXCJDaGFpXCIsXG5cdFx0XHRcdHByaWNlXHRcdDogXCIxOFwiLFxuXHRcdFx0XHRjdXJyZW5jeVx0OiBcIkVVUlwiLFxuXHRcdFx0XHRxdWFudGl0eVx0OiBcIjJcIixcblx0XHRcdFx0dG90YWxQcmljZVx0OiBcIjM2XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGlkXHRcdFx0OiBcIjJcIixcblx0XHRcdFx0bmFtZVx0XHQ6IFwiQW5pc2VlZCBTeXJ1cFwiLFxuXHRcdFx0XHRwcmljZVx0XHQ6IFwiMTBcIixcblx0XHRcdFx0Y3VycmVuY3lcdDogXCJVU0RcIixcblx0XHRcdFx0cXVhbnRpdHlcdDogXCIzXCIsXG5cdFx0XHRcdHRvdGFsUHJpY2VcdDogXCIzMFwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpZFx0XHRcdDogXCIzXCIsXG5cdFx0XHRcdG5hbWVcdFx0OiBcIkNoZWYgQW50b24ncyBDYWp1biBTZWFzb25pbmdcIixcblx0XHRcdFx0cHJpY2VcdFx0OiBcIjIyXCIsXG5cdFx0XHRcdGN1cnJlbmN5XHQ6IFwiVVNEXCIsXG5cdFx0XHRcdHF1YW50aXR5XHQ6IFwiMlwiLFxuXHRcdFx0XHR0b3RhbFByaWNlXHQ6IFwiNDRcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWRcdFx0XHQ6IFwiNFwiLFxuXHRcdFx0XHRuYW1lXHRcdDogXCJDaGVmIEFudG9uJ3MgR3VtYm8gTWl4XCIsXG5cdFx0XHRcdHByaWNlXHRcdDogXCIzNlwiLFxuXHRcdFx0XHRjdXJyZW5jeVx0OiBcIkVVUlwiLFxuXHRcdFx0XHRxdWFudGl0eVx0OiBcIjIxXCIsXG5cdFx0XHRcdHRvdGFsUHJpY2VcdDogXCI3NTZcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWRcdFx0XHQ6IFwiNVwiLFxuXHRcdFx0XHRuYW1lXHRcdDogXCJHcmFuZG1hJ3MgQm95c2VuYmVycnkgU3ByZWFkXCIsXG5cdFx0XHRcdHByaWNlXHRcdDogXCIyNVwiLFxuXHRcdFx0XHRjdXJyZW5jeVx0OiBcIlVTRFwiLFxuXHRcdFx0XHRxdWFudGl0eVx0OiBcIjVcIixcblx0XHRcdFx0dG90YWxQcmljZVx0OiBcIjEyNVwiXG5cdFx0XHR9XG5cdFx0XVxuXHR9LFxuXHR7XG5cdFx0aWQ6IFwiMlwiLFxuXHRcdE9yZGVySW5mbzoge1xuXHRcdFx0Y3JlYXRlZEF0XHQ6IFwiMjMuMTIuMjAwNlwiLFxuXHRcdFx0Y3VzdG9tZXJcdDogXCJCb24gYXBwXCIsXG5cdFx0XHRzdGF0dXNcdFx0OiBcIlBlbmRpbmdcIixcblx0XHRcdHNoaXBwZWRBdFx0OiBcIjEzLjAyLjIwMDdcIlxuXHRcdH0sXG5cdFx0U2hpcFRvOiB7XG5cdFx0XHRuYW1lOiBcIkxhdXJlbmNlIExlYmloYW5cIixcblx0XHRcdEFkZHJlc3M6IFwiMTIsIHJ1ZSBkZXMgQm91Y2hlcnNcIixcblx0XHRcdFpJUDogXCIxMzAwOFwiLFxuXHRcdFx0UmVnaW9uOiBcIkZyYW5jZVwiLFxuXHRcdFx0Q291bnRyeTogXCJGcmFuY2VcIlxuXHRcdH0sXG5cdFx0Q3VzdG9tZXJJbmZvOiB7XG5cdFx0XHRmaXJzdE5hbWU6IFwiTGF1cmVuY2VcIixcblx0XHRcdGxhc3ROYW1lOiBcIkxlYmloYW5cIixcblx0XHRcdGFkZHJlc3M6IFwiMTIsIHJ1ZSBkZXMgQm91Y2hlcnNcIixcblx0XHRcdHBob25lOiBcIjkxLjI0LjQ1LjQwXCIsXG5cdFx0XHRlbWFpbDogXCJMYXVyZW5jZS5MZWJpaGFuQGNvbXBhbnkuY29tXCJcblx0XHR9LFxuXHRcdHByb2R1Y3RzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGlkXHRcdFx0OiBcIjFcIixcblx0XHRcdFx0bmFtZVx0XHQ6IFwiUXVlc28gQ2FicmFsZXNcIixcblx0XHRcdFx0cHJpY2VcdFx0OiBcIjIxXCIsXG5cdFx0XHRcdGN1cnJlbmN5XHQ6IFwiRVVSXCIsXG5cdFx0XHRcdHF1YW50aXR5XHQ6IFwiNVwiLFxuXHRcdFx0XHR0b3RhbFByaWNlXHQ6IFwiMTA1XCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGlkXHRcdFx0OiBcIjJcIixcblx0XHRcdFx0bmFtZVx0XHQ6IFwiUXVlc28gTWFuY2hlZ28gTGEgUGFzdG9yYVwiLFxuXHRcdFx0XHRwcmljZVx0XHQ6IFwiMzhcIixcblx0XHRcdFx0Y3VycmVuY3lcdDogXCJFVVJcIixcblx0XHRcdFx0cXVhbnRpdHlcdDogXCIzXCIsXG5cdFx0XHRcdHRvdGFsUHJpY2VcdDogXCIxMTRcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWRcdFx0XHQ6IFwiM1wiLFxuXHRcdFx0XHRuYW1lXHRcdDogXCJQYXZsb3ZhXCIsXG5cdFx0XHRcdHByaWNlXHRcdDogXCIxMjBcIixcblx0XHRcdFx0Y3VycmVuY3lcdDogXCJSVUJcIixcblx0XHRcdFx0cXVhbnRpdHlcdDogXCI1XCIsXG5cdFx0XHRcdHRvdGFsUHJpY2VcdDogXCI2MDBcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWRcdFx0XHQ6IFwiNFwiLFxuXHRcdFx0XHRuYW1lXHRcdDogXCJTaXIgUm9kbmV5J3MgTWFybWFsYWRlXCIsXG5cdFx0XHRcdHByaWNlXHRcdDogXCI1XCIsXG5cdFx0XHRcdGN1cnJlbmN5XHQ6IFwiQllOXCIsXG5cdFx0XHRcdHF1YW50aXR5XHQ6IFwiM1wiLFxuXHRcdFx0XHR0b3RhbFByaWNlXHQ6IFwiMTVcIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0aWRcdFx0XHQ6IFwiNVwiLFxuXHRcdFx0XHRuYW1lXHRcdDogXCJHZW5lbiBTaG91eXVcIixcblx0XHRcdFx0cHJpY2VcdFx0OiBcIjQwXCIsXG5cdFx0XHRcdGN1cnJlbmN5XHQ6IFwiVVNEXCIsXG5cdFx0XHRcdHF1YW50aXR5XHQ6IFwiN1wiLFxuXHRcdFx0XHR0b3RhbFByaWNlXHQ6IFwiMjgwXCJcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGlkXHRcdFx0OiBcIjZcIixcblx0XHRcdFx0bmFtZVx0XHQ6IFwiVG9mdVwiLFxuXHRcdFx0XHRwcmljZVx0XHQ6IFwiMjMuMjVcIixcblx0XHRcdFx0Y3VycmVuY3lcdDogXCJVU0RcIixcblx0XHRcdFx0cXVhbnRpdHlcdDogXCIxXCIsXG5cdFx0XHRcdHRvdGFsUHJpY2VcdDogXCIyMy4yNVwiXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRpZFx0XHRcdDogXCI3XCIsXG5cdFx0XHRcdG5hbWVcdFx0OiBcIkFsaWNlIE11dHRvblwiLFxuXHRcdFx0XHRwcmljZVx0XHQ6IFwiMzJcIixcblx0XHRcdFx0Y3VycmVuY3lcdDogXCJVQUhcIixcblx0XHRcdFx0cXVhbnRpdHlcdDogXCIzOVwiLFxuXHRcdFx0XHR0b3RhbFByaWNlXHQ6IFwiMTI0OFwiXG5cdFx0XHR9XG5cdFx0XVxuXHR9XG5dO1xuXG5jb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtZm9ybV9faXB0LnNlYXJjaC1mb3JtX19pcHRfc2VhcmNoJyksXG5cdFx0ICB1bF9hc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlcnMtbGlzdCcpLFxuXHRcdCAgaXRlbXMgPSB1bF9hc2lkZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSxcblx0XHQgIHVsX3NlY3Rpb25JbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24taW5mbycpLFxuXHRcdCAgdWxfcG9zdEluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVsbC1pbmZvX19wb3N0LWluZm8ucG9zdGluZm8nKSxcblx0XHQgIHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tdGFibGVfX3RhYmxlJyksXG4gICAgICBjdXN0b21lcnMgPSBPcmRlcnM7XG5cbmxldCBhcnJPZlNlcmNoSXRlbXMgPSBbXTtcbmN1c3RvbWVycy5mb3JFYWNoKGNyZWF0ZUxJKTtcbi8q0L3QtSDRgNCw0LHQvtGC0LDQtdGCINC90L7RgNC80LDQu9GM0L3QviBzZWFyY2hNYXRjaCgpKi9cblxuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihga2V5dXBgLCAoZXZlbnQpPT57XG4gIGNvbnN0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICBmb3IgKGxldCBlbGVtIGluIGN1c3RvbWVycykge1xuICAgIHNlYXJjaExpc3QoY3VzdG9tZXJzW2VsZW1dLCB2YWwpO1xuICB9XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgc2VhcmNoX2pzID0gaXRlbXNbaV0ucXVlcnlTZWxlY3RvckFsbCgnLnNlYXJjaF9qcycpO1xuXHRcdHNlYXJjaE1hdGNoKGl0ZW1zW2ldKTtcblxuXHR9XG4gIGlmIChhcnJPZlNlcmNoSXRlbXMubGVuZ3RoID49IDApIHtcbiAgICBhcnJPZlNlcmNoSXRlbXMgPSBbXTtcbiAgfWVsc2V7XG4gICAgY29uc29sZS5lcnJvcihgQXJyYXkgb2Ygc2VhcmNoaW5nIGl0ZW1zKGFyck9mU2VyY2hJdGVtcykgaXMgb3ZlcmZsb3duYCk7XG4gICAgY29uc29sZS5sb2coYXJyT2ZTZXJjaEl0ZW1zLmxlbmd0aCk7XG4gIH1cbn0pO1xudWxfYXNpZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpPT57XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQucGF0aC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChldmVudC5wYXRoW2ldLmNsYXNzTmFtZSA9PSAnb3JkZXJzLWxpc3RfX2l0ZW0nKSB7XG4gICAgICBsZXQgbGkgPSBldmVudC5wYXRoW2ldO1xuXHRcdFx0bGV0IGRhdGFfbnVtYmVyID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLW51bWJlcicpO1xuXHRcdFx0Y3VzdG9tZXJzLmZvckVhY2goKG9yZGVyKT0+e1xuXHRcdFx0XHRmb3IgKGxldCBrZXkgaW4gb3JkZXIpIHtcblx0XHRcdFx0XHRpZiAob3JkZXIuaWQgPT09IGRhdGFfbnVtYmVyKSB7XG5cdFx0XHRcdFx0XHRyZW5kZXJUYWJsZShvcmRlcik7XG5cdFx0XHRcdFx0XHRyZW5kZXJQb3N0SW5mbyhvcmRlcik7XG5cdFx0XHRcdFx0XHRyZW5kZXJTZWN0aW9uSW5mbyhvcmRlcik7XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuICAgIH1cblx0fVxufSk7XG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tRE9FU1QgV09SSy0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuZnVuY3Rpb24gc2VhcmNoTWF0Y2goaXRlbV9mb3JfY2hlY2spIHtcblx0Ly8gbGV0IGxpID1cdGl0ZW1fdG9fY2hlY2tbMF0ucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuXHRsZXQgdGV4dF9mb3JfbWF0Y2ggPSBpdGVtX2Zvcl9jaGVjay5pbm5lclRleHQ7XG5cdC8vIGFyck9mU2VyY2hJdGVtcy5mb3JFYWNoKCh0ZXh0KT0+e1xuXHQvLyBcdC8vIGlmIChpdGVtX3RvX2NoZWNrWzBdLmlubmVyVGV4dC5pbmNsdWRlcyh0ZXh0KSB8fFxuXHQvLyBcdC8vIFx0XHRpdGVtX3RvX2NoZWNrWzFdLmlubmVyVGV4dC5pbmNsdWRlcyh0ZXh0KSB8fFxuXHQvLyBcdC8vIFx0XHRpdGVtX3RvX2NoZWNrWzJdLmlubmVyVGV4dC5pbmNsdWRlcyh0ZXh0KSB8fFxuXHQvLyBcdC8vIFx0XHRpdGVtX3RvX2NoZWNrWzNdLmlubmVyVGV4dC5pbmNsdWRlcyh0ZXh0KSkge1xuXHQvLyBcdC8vIFx0bGkuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cdC8vIFx0Ly8gfWVsc2V7XG5cdC8vIFx0Ly8gXHRsaS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdC8vIFx0Ly8gXHRjb25zb2xlLmxvZyh0ZXh0KTtcblx0Ly8gXHQvLyB9XG5cdC8vXG5cdC8vIH0pO1xuXHRsZXQgc3RyaW5nVG9DaGVjayA9IHRleHRfZm9yX21hdGNoLnJlcGxhY2UoL1xcbi9naSwgXCJcIikucmVwbGFjZSgvXFxzL2dpLFwiXCIpO1xuXHRjb25zb2xlLmxvZyhzdHJpbmdUb0NoZWNrKTtcblx0bGV0IHN0cmluZ0ZvckNoZWNrID0gYXJyT2ZTZXJjaEl0ZW1zLmpvaW4oJyAnKS5zbGljZSgyKS5zcGxpdChcIiBcIik7XG5cdGNvbnNvbGUubG9nKHN0cmluZ0ZvckNoZWNrKTtcblxuXHR3aGlsZSAoc3RyaW5nRm9yQ2hlY2spIHtcblxuXHR9XG5cblx0Ly8gY29uc29sZS5sb2coc3RyaW5nRm9yQ2hlY2spO1xufVxuLyo9PT09PT09PT09PT09PT09PT09RU5EIE5PVElDRT09PT09PT09PT09PT09PT09PT0qL1xuZnVuY3Rpb24gc2VhcmNoTGlzdChvYmosIGlucHRWYWx1ZSl7XG4gICBmb3IobGV0IGtleSBpbiBvYmogKXtcbiAgICBpZiAoa2V5ID09IGBPcmRlckluZm9gKSB7XG4gICAgICBsZXQgT3JkZXJJbmZvID0gb2JqW2tleV07XG4gICAgICAvLyDRgNC10LrRg9GA0YHQuNGPXG4gICAgICBzZWFyY2hMaXN0KE9yZGVySW5mbywgaW5wdFZhbHVlKVxuICAgIH1lbHNle1xuICAgICAgLy8g0LfQsNC/0YPRgdC60LDQtdGC0YHRjyDQutC+0LPQtNCwINC40LTQtdGCINC/0L7QuNGB0LpcbiAgICAgIGxldCBsb2NhbFByb3AgPSBvYmpba2V5XTtcbiAgICAgIGlmICh0eXBlb2YobG9jYWxQcm9wKSAhPT0gYG9iamVjdGAgJiYgbG9jYWxQcm9wLnRvVXBwZXJDYXNlKCkuaW5jbHVkZXMoaW5wdFZhbHVlKSkge1xuICAgICAgICBhcnJPZlNlcmNoSXRlbXMucHVzaChsb2NhbFByb3ApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gY3JlYXRlTEkgKG9iaikge1xuICBjb25zdCBvcmRlckluZm8gPSBvYmouT3JkZXJJbmZvO1xuICBjb25zdCBsaSA9IGA8bGkgY2xhc3M9XCJvcmRlcnMtbGlzdF9faXRlbVwiIGRhdGEtbnVtYmVyPVwiJHtvYmouaWR9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3JkZXJzLWxpc3RfX3JvdyBvcmRlcnMtbGlzdF9fcm93X2ZpcnN0XCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwib3JkZXJzLWxpc3RfX3RpdGxlXCI+T3JkZXIgNzk5MTwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJvcmRlcnMtbGlzdF9fZGF0YSBzZWFyY2hfanNcIj4ke29yZGVySW5mby5jcmVhdGVkQXR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3JkZXJzLWxpc3RfX3JvdyBvcmRlcnMtbGlzdF9fcm93X3NlY29uZFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm9yZGVycy1saXN0X19kZXNjIHNlYXJjaF9qc1wiPiR7b3JkZXJJbmZvLmN1c3RvbWVyfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJvcmRlcnMtbGlzdF9fc3RhdHVzIHNlYXJjaF9qc1wiPiR7b3JkZXJJbmZvLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcmRlcnMtbGlzdF9fcm93IG9yZGVycy1saXN0X19yb3dfdGhpcmRcIj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJvcmRlcnMtbGlzdF9faW5mbyBzZWFyY2hfanNcIj5TaGlwcGVkOlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwib3JkZXJzLWxpc3RfX3NoaXBwZWRBdCBcIj4gJHtvcmRlckluZm8uc2hpcHBlZEF0fTwvc3Bhbj48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2xpPmA7XG4gIHVsX2FzaWRlLmlubmVySFRNTCArPSBsaTtcbn1cbmZ1bmN0aW9uIHJlbmRlclRhYmxlKG9iaikge1xuXHRjb25zdCBwcm9kdWN0cyA9IG9iai5wcm9kdWN0cztcblx0bGV0IG15VGFibGU9IGA8dGJvZHkgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1ib2R5XCI+PHRyIGNsYXNzPVwic2VjdGlvbi10YWJsZV9fdGFibGUtcm93XCI+PHRkIGNsYXNzPVwic2VjdGlvbi10YWJsZV9fdGFibGUtY29sdW1uXCI+UHJvZHVjdHM8L3RkPmA7XG4gICAgbXlUYWJsZSs9IGA8dGQgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1jb2x1bW5cIj5Vbml0IFByaWNlPC90ZD5gO1xuICAgIG15VGFibGUrPWA8dGQgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1jb2x1bW5cIj5RdWFuaXRpdHk8L3RkPmA7XG4gICAgbXlUYWJsZSs9YDx0ZCBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLWNvbHVtblwiPlRvdGFsPC90ZD48L3RyPmA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrKykge1xuICAgIG15VGFibGUrPWA8dHIgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1yb3dcIj48dGQgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1jb2x1bW5cIj4ke3Byb2R1Y3RzW2ldLm5hbWV9PC90ZD5gO1xuICAgIG15VGFibGUrPWA8dGQgY2xhc3M9XCJzZWN0aW9uLXRhYmxlX190YWJsZS1jb2x1bW5cIj4ke3Byb2R1Y3RzW2ldLnByaWNlfSAke3Byb2R1Y3RzW2ldLmN1cnJlbmN5fTwvdGQ+YDtcbiAgICBteVRhYmxlKz1gPHRkIGNsYXNzPVwic2VjdGlvbi10YWJsZV9fdGFibGUtY29sdW1uXCI+JHtwcm9kdWN0c1tpXS5xdWFudGl0eX08L3RkPmA7XG4gICAgbXlUYWJsZSs9YDx0ZCBjbGFzcz1cInNlY3Rpb24tdGFibGVfX3RhYmxlLWNvbHVtblwiPiAke3Byb2R1Y3RzW2ldLnRvdGFsUHJpY2V9PC90ZD48L3RyPmA7XG4gIH1cbiAgIG15VGFibGUrPWA8L3Rib2R5PmA7XG5cbiAgIHRhYmxlLmlubmVySFRNTCA9IG15VGFibGU7XG59XG5mdW5jdGlvbiByZW5kZXJQb3N0SW5mbyhvYmopIHtcblx0Y29uc3Qgc2hpcFRvID0gb2JqLlNoaXBUbztcblx0Y29uc3QgbGlfcG9zdEluZm8gPSBgIDxsaSBjbGFzcz1cInBvc3RpbmZvX19pdGVtXCI+PHNwYW4gY2xhc3M9XCJwb3N0aW5mb19fc3BhblwiPk5hbWU6ICR7c2hpcFRvLm5hbWV9PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwb3N0aW5mb19faXRlbVwiPjxzcGFuIGNsYXNzPVwicG9zdGluZm9fX3NwYW5cIj5TdHJlZXQ6ICR7c2hpcFRvLkFkZHJlc3N9PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwb3N0aW5mb19faXRlbVwiPjxzcGFuIGNsYXNzPVwicG9zdGluZm9fX3NwYW5cIj5aSVAgQ29kZS9DaXR5OiAke3NoaXBUby5aSVB9PC9zcGFuPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwb3N0aW5mb19faXRlbVwiPjxzcGFuIGNsYXNzPVwicG9zdGluZm9fX3NwYW5cIj5SZWdpb246ICR7c2hpcFRvLlJlZ2lvbn08L3NwYW4+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInBvc3RpbmZvX19pdGVtXCI+PHNwYW4gY2xhc3M9XCJwb3N0aW5mb19fc3BhblwiPiR7c2hpcFRvLkNvdW50cnl9PC9zcGFuPjwvbGk+YDtcbiAgdWxfcG9zdEluZm8uaW5uZXJIVE1MID0gbGlfcG9zdEluZm87XG59XG5mdW5jdGlvbiByZW5kZXJTZWN0aW9uSW5mbyhvYmopIHtcblx0Y29uc3Qgb3JkZXJJbmZvID0gb2JqLk9yZGVySW5mbztcblx0Y29uc3QgbGlfc2VjdGlvbkluZm8gPSBgPGxpIGNsYXNzPVwic2VjdGlvbi1pbmZvX19jdXN0b21lciBzZWN0aW9uLWluZm9fX2l0ZW1cIj5DdXN0b21lcjogJHtvcmRlckluZm8uY3VzdG9tZXJ9PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwic2VjdGlvbi1pbmZvX19vcmRlcmVkIHNlY3Rpb24taW5mb19faXRlbVwiPk9yZGVyZWQ6ICR7b3JkZXJJbmZvLmNyZWF0ZWRBdH08L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJzZWN0aW9uLWluZm9fX3NoaXBwZWQgc2VjdGlvbi1pbmZvX19pdGVtXCI+U2hpcHBlZDogJHtvcmRlckluZm8uc2hpcHBlZEF0fTwvbGk+YDtcbiAgdWxfc2VjdGlvbkluZm8uaW5uZXJIVE1MID0gbGlfc2VjdGlvbkluZm87XG59XG4iXX0=
