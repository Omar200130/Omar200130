// En funktion der returnerer true hvis talene er sorteret
// enten i stigende eller faldende orden. Ellers false.
// Fx er 3,2,1 true, 1,2,3 er også true, men 1,3,2 er false. 
function erSorteret(a, b, c) {
  return ((a > b && b > c) || (a > b && b > c)); 
  
}
console.log("erSorteret", erSorteret(1,2,3));
console.log("erSorteret", erSorteret(3,2,3));
console.log("erSorteret", erSorteret(3,2,1), "\n");