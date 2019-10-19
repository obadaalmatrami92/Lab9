'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm']; //14

var container = document.getElementById('content-area');

var footerRow;

var table = document.createElement('table');
container.appendChild(table);
table.setAttribute('cellspacing', '15px');

function addElement(tagName, container, text) {
    var element = document.createElement(tagName);
    container.appendChild(element);

    if (text) {
        element.textContent = text;
    }

    return element;
}


function Shop(location, min, max, avg) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.avgcookie = avg;
    this.cookNumArr = [];
    this.totalSale = 0;

    this.generateHourlySales();
}

Shop.prototype.avgNumCus = function() {
    var rang = this.max - this.min;
    var rand = Math.random() * rang + this.min;
    return Math.ceil(rand);
};

Shop.prototype.generateHourlySales = function() {
    for (var i = 0; i < hours.length; i++) {
        var cookEachHour = Math.ceil(this.avgNumCus() * this.avgcookie);

        this.cookNumArr.push(cookEachHour);
        this.totalSale += cookEachHour;
    }
    console.log(this.cookNumArr);
};

Shop.prototype.renderRow = function(table) {

    var shopRow = addElement('tr', table);
    addElement('td', shopRow, this.location);

    for (var i = 0; i < this.cookNumArr.length; i++) {
        var currentHourlySales = this.cookNumArr[i];
        addElement('td', shopRow, currentHourlySales);
    }

    addElement('td', shopRow, this.totalSale);
};

function headerRow() {


    var hourRow = addElement('tr', table);

    addElement('th', hourRow);

    for (var i = 0; i < hours.length; i++) {
        addElement('th', hourRow, hours[i]);
    }

    addElement('th', hourRow, 'Daily Location Totals');
}


function createFooterRow() {

    console.log('footerRow');

    var tr = document.createElement('tr');

    footerRow = tr;

    table.appendChild(tr);

    var td = document.createElement('td');

    tr.appendChild(td);

    td.textContent = 'Totals';

    var megaTotal = 0;


    for (var hourIndex = 0; hourIndex < hours.length; hourIndex++) {

        td = document.createElement('td');

        tr.appendChild(td);

        var totalHourSales = 0;
        for (var shopIndex = 0; shopIndex < shops.length; shopIndex++) {
            var shop = shops[shopIndex];
            totalHourSales += shop.cookNumArr[hourIndex];
        }

        td.textContent = totalHourSales;

        megaTotal += totalHourSales;
    }

    td = document.createElement('td');

    tr.appendChild(td);

    td.textContent = megaTotal;
}


var shops = [];
shops.push(new Shop('seattle', 23, 65, 6.3));
shops.push(new Shop('tokyo', 3, 24, 1.2));
shops.push(new Shop('dubai', 11, 38, 3.7));
shops.push(new Shop('paris', 20, 38, 2.3));
shops.push(new Shop('lima', 2, 16, 4.6));


headerRow();

for (var i = 0; i < shops.length; i++) {
    var currentShop = shops[i];
    currentShop.renderRow(table);
}

createFooterRow();

function submitHandler(event) {
    event.preventDefault();

    var locationName = event.target.location.value;
    var min = parseInt(event.target.min.value);
    var max = parseInt(event.target.max.value);
    var avgSales = parseFloat(event.target.avgSales.value);

    var newShop = new Shop(locationName, min, max, avgSales);

    shops.push(newShop);

    table.removeChild(footerRow);

    newShop.renderRow(table);

    createFooterRow();

}
var form = document.getElementById('addShopForm');
form.addEventListener('submit', submitHandler);