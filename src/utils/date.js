var DATE_STRING = /^\d\d\d\d-\d{1,2}-\d{1,2}(?:T\d\d:\d\d:\d\d\.?\d?\d?(?:Z|[+-]\d\d:\d\d)|.*)?$/;

function dateToDays(d, rounded) {
  var temp = null;
  if(d.indexOf('T') > 0) {
    temp = new Date(d);
  } else {
    temp = d.split('-');
    temp = new Date(temp[0], temp[1]-1, temp[2]);
  }
  var r = (temp.getTime()) / (1000 * 60 * 60 * 24);
  return rounded === false ? r : Math.round(r*100000)/100000;
}

module.exports = {
  DATE_STRING,
  dateToDays
}
