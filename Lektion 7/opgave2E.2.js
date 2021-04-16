// Returnerer true hvis forskellen imellem de to tal er mindre end 10,
// ellers false.
function erTætPåHinanden(a, b) {
  return (b - a < 10);
}
console.log("erTætPåHinanden", erTætPåHinanden(1,5));
console.log("erTætPåHinanden", erTætPåHinanden(5,25));