var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var lat = 54.656639;
var lon = -1.676810;

var zoom = 1;
var earthquakes;

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    `?access_token=pk.eyJ1IjoiZ3JleWhvdW5kaXQiLCJhIjoiY2p0Ym8xNmthMGh1eTQ0cGZzMTBtc253NCJ9.AOlt3TNM7rkrTVD2Lec1Xw`);

    // earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv");
    // earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv");
    earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");

  }

function setup() {
  createCanvas(1024, 512);
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  //make everything relitivet to the center
  var cx = mercX(clon);
  var cy = mercY(clat);

  for ( var i = 0; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    var lat = data[1];
    var lon = data[2];
    var mag = data[4];

    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;

    mag = pow(10, mag);
    mag = sqrt(mag);
    var magmax = sqrt(pow(10, 10));
    var d = map(mag, 0, magmax, 0, 180);

    switch(true) {
      case d >=10:
        stroke(255, 0, 0, 200);
        fill(255, 0, 0, 200);
        break;
      case d>=7:
        stroke(255, 140, 0, 200);
        fill(255, 140, 0, 200);
        break;
      case d>=5:
        stroke(255, 255, 0, 200);
        fill(255, 255, 0, 200);
        break;
      case d>=2:
        stroke(0, 255, 0, 200);
        fill(0, 255, 0, 200);
        break;
      case d>=1:
        stroke(255, 255, 255, 200);
        fill(255, 255, 255, 200);
        break;
      default:
        stroke(255, 255, 255, 200);
        fill(255, 255, 255, 200);
    }

    ellipse(x, y, d, d);
  }


}

function mercX(lon) {
  lon = radians(lon);
  var a = (258 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a*b;
}

function mercY(lat) {
  lat = radians(lat)
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI/4 + lat / 2);
  var c = PI - log(b)
  return a*c;
}

function sortNumber(a,b) {
  return a - b;
}