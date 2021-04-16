// Skal returnere true hvis hvert tal er større end det foregående
// Dvs. a > b > c. Ellers returneres false.
function erStigende(a, b, c) {
  if (a < b && b < c) {
    return true;
  }
  else {
    return false;
  }
}
console.log("erStigende", erStigende(1,2,3));
console.log("erStigende", erStigende(1,3,2));