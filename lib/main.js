'use strict';

// AJAX functions
var getVenues = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var city, urlToFetch, response, jsonResponse, venues;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            city = $input.val();
            urlToFetch = url + city + '&venuePhotos=1&limit=10&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20171215';
            _context.prev = 2;
            _context.next = 5;
            return fetch(urlToFetch);

          case 5:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return response.json();

          case 9:
            jsonResponse = _context.sent;

            //console.log(jsonResponse);
            venues = jsonResponse.response.groups[0].items.map(function (location) {
              return location.venue;
            });
            return _context.abrupt('return', venues);

          case 12:
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](2);

            console.log(_context.t0);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 14]]);
  }));

  return function getVenues() {
    return _ref.apply(this, arguments);
  };
}();

var getForecast = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var city, urlToFetch, response, jsonResponse, days;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            city = $input.val();
            urlToFetch = forecastUrl + apiKey + '&q=' + city + '&days=4&hour=12';
            _context2.prev = 2;
            _context2.next = 5;
            return fetch(urlToFetch);

          case 5:
            response = _context2.sent;

            if (!response.ok) {
              _context2.next = 12;
              break;
            }

            _context2.next = 9;
            return response.json();

          case 9:
            jsonResponse = _context2.sent;

            //console.log(jsonResponse);
            days = jsonResponse.forecast.forecastday;
            return _context2.abrupt('return', days);

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2['catch'](2);

            console.log(_context2.t0);

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 14]]);
  }));

  return function getForecast() {
    return _ref2.apply(this, arguments);
  };
}();

// Render functions


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Foursquare API Info
var clientId = 'FS45GKSEWV2LJDOTW25TSGCIEZ0OFOBKONXSKJ0PJEQO3DSQ';
// PU3IY1PZEOOANTPSHKNMS5HFSMEGEQ1IAVJYGYM4YVZP3NGD
var clientSecret = 'MBR4MNUDTO5VFDKSFZIJ5AW3QD14TJKWC2WF14IZTEKPJOZ0';
// 0V21IXU0EETE3SZJGGCP4T4R13NUTBJ0LMI5WQY45IMDPEKY
var url = 'https://api.foursquare.com/v2/venues/explore?near=';
var imgPrefix = 'https://igx.4sqi.net/img/general/150x200';

// APIXU Info
var apiKey = 'a43783b78e244802871223110171412';
var forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
var $input = $('#city');
var $submit = $('#button');
var $destination = $('#destination');
var $container = $('.container');
var $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
var $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
var weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];function renderVenues(venues) {
  $venueDivs.forEach(function ($venue, index) {
    var venueContent = '<h2>' + venues[index].name + '</h2>' + '<img class="venueimage" src="' + imgPrefix + venues[index].photos.groups[0].items[0].suffix + '"/>' + '<h3>Address:</h3>' + '<p>' + venues[index].location.address + '</p>' + '<p>' + venues[index].location.city + '</p>' + '<p>' + venues[index].location.country + '</p>';
    $venue.append(venueContent);
  });
  $destination.append('<h2>' + venues[0].location.city + '</h2>');
}

function renderForecast(days) {
  $weatherDivs.forEach(function ($day, index) {
    var weatherContent = '<h2> High: ' + days[index].day.maxtemp_f + '</h2>' + '<h2> Low: ' + days[index].day.mintemp_f + '</h2>' + '<img src="http://' + days[index].hour[0].condition.icon + '" class="weathericon" />' + '<h2>' + weekDays[new Date(days[index].date).getDay()] + '</h2>';
    $day.append(weatherContent);
  });
}

function executeSearch() {
  $venueDivs.forEach(function (venue) {
    return venue.empty();
  });
  $weatherDivs.forEach(function (day) {
    return day.empty();
  });
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(function (venues) {
    return renderVenues(venues);
  });
  getForecast().then(function (forecast) {
    return renderForecast(forecast);
  });
  return false;
}

$submit.click(executeSearch);