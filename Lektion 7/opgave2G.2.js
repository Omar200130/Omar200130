// Funktionen skal printe det længste ord.
function længsteOrd(ord1, ord2, ord3) {
  if (ord1.length > ord2.length && ord2.length > ord3.length) {
    return ord1;

  } else if (ord1.length < ord2.length && ord2.length < ord3.length){
    return ord3;
  } else {
    return ord2;
  }
}
console.log("længsteOrd", længsteOrd("Is", "Tomat", "Æble"));