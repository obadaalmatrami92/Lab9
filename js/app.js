`use strict`;

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

$('#cookies').html('<table></table>')
let tableRwo = $(`<tr></tr>`);
let tableHeader = $(`<th></th>`);
let tableCell = $(`<td></td>`);

function City(name, min, max, avg) {
    this.name = name;
    this.minimum = min;
    this.maximum = max;
    this.average = avg;

    this.totalhourslaesarr = [];
    this.cookiearr = [];
    this.totalcookiessales = 0;
    this.assignRandomCookies();
    this.generateHourlySales();
}

City.prototype.assignRandomCookies = function() {
    for (let i = 0; i < hours.length; i++) {
        var randomCookies = Math.ceil(Math.random() * (this.maximum - this.minimum) + this.minimum);
        this.cookiearr.push(randomCookies);
    }
}

City.prototype.generateHourlySales = function() {
    for (let i = 0; i < hours.length; i++) {
        var hourCookies = Math.ceil(this.cookiearr[i] * this.average);
        this.totalhourslaesarr.push(hourCookies);
        this.totalcookiessales += hourCookies;
    }
}

City.prototype.row = function() {
    $('table').append($(`<tr id= "${this.name}"><td>${this.name}</td></tr>`));

    for (let i = 0; i < this.totalhourslaesarr.length; i++) {
        $(`#${this.name}`).append($(`<td>${this.totalhourslaesarr[i]}</td>`))
    }

    $(`#${this.name}`).append($(`<td>${this.totalcookiessales}</td>`))

}



function headerRow() {
    $('table').append(tableRwo.append(tableHeader.text('***')));

    for (let i = 0; i < hours.length; i++) {
        $('tr').append($(`<th>${hours[i]}</th>`));
    }

    $('tr').append($(`<th>Daily Location Total</th>`));
};


City.prototype.render = function() {

    $('table').append($(`<tr class= "${this.name}"><td>${this.name}</td></tr>`));

    for (let i = 0; i < this.totalhourslaesarr.length; i++) {
        $(`.${this.name}`).append($(`<td>${this.totalhourslaesarr[i]}</td>`))
    }

    $(`.${this.name}`).append($(`<td>${this.totalcookiessales}</td>`))

}


function footerRow() {

    $('table').append($(`<tr class="foot"><td>Total</td></tr>`));

    let alltotal = 0;

    for (let i = 0; i < hours.length; i++) {

        var hourlyTotal = 0;
        for (let j = 0; j < newcitydata.length; j++) {
            hourlyTotal += newcitydata[j].totalhourslaesarr[i];
        }

        $(`.foot`).append($(`<td>${hourlyTotal}</td>`))

        alltotal += hourlyTotal
    }

    $(`.foot`).append($(`<td>${alltotal}</td>`))
};

var newcitydata = []
newcitydata.push(new City('Seattle', 23, 65, 6.3));
newcitydata.push(new City('Tokyo', 3, 24, 1.2));
newcitydata.push(new City('Dubai', 11, 38, 3.7));
newcitydata.push(new City('Paris', 20, 38, 2.8));
newcitydata.push(new City('Lima', 2, 16, 4.6));

headerRow();

for (let i = 0; i < newcitydata.length; i++) {
    let cityone = newcitydata[i];
    cityone.render();
}

footerRow();

let foundname = {};

$('#thenewcity').submit(function(e) {
    e.preventDefault();

    let name = event.target.cityName.value;
    let min = parseInt(event.target.minNum.value);
    let max = parseInt(event.target.maxNum.value);
    let avg = parseFloat(event.target.avgNum.value);

    let thenewcity = new City(name, min, max, avg);

    newcitydata.push(thenewcity);

    if (!foundname[name]) {
        foundname[name] = true;
        $('.foot').remove();
        thenewcity.row();
        footerRow();
    } else {
        alert('becarful you enter this city name before ???')
    }
});