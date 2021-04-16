// Skal printe de to første bogstaver af hvert ord
// Brug fx substring: https://mzl.la/38KrKCU
function forbogstaver(ord1, ord2, ord3) {
  return ord1.substring(0,2) + ord2.substring(0,2) + ord3.substring(0,2);

}
console.log("forbogstaver", forbogstaver("Is", "Tomat", "Æble"), "\n");