function hasTeen(a, b, c){
  let aTeen = a >= 13 && a <= 19;
  let bTeen = b >= 13 && b <= 19;
  let cTeen = c >= 13 && c <= 19;
  return aTeen || bTeen || cTeen;
}