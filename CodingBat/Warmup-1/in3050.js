function in3050(a, b){
  let aLower = a >= 30 && a <= 40;
  let bLower = b >= 30 && b <= 40;
  let aHigher = a >= 40 && a <= 50;
  let bHigher = b >= 40 && b <= 50;
  let lower = aLower && bLower;
  let higher = aHigher && bHigher;
  return lower || higher;
}