// Skal returnerer true hvis ord1 indgår i ord2, eller omvendt.
// Ellers false.
// Hint: https://mzl.la/3tmnFwI
function ordIOrd(ord1, ord2) {
  return (ord1.toLowerCase().includes(ord2.toLowerCase()) || ord2.toLowerCase().includes(ord1.toLowerCase()));
}
console.log("ordIOrd", ordIOrd("Banankage", "kage"));
console.log("ordIOrd", ordIOrd("Banankage", "tærte"));