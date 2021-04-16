// Skal printe det første og sidste bagstav i ordet.
// Skal virke med alle ord uanset længde
// Hint: Brug 'ord.length' og substring.
function førsteOgSidst(ord) {
  return ord.substring(0,1) + ord.substring((ord.length - 1), (ord.length));
}
console.log("førsteOgSidst", forbogstaver("Banankage"), "\n");