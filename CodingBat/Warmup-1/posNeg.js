function posNeg(a, b, negative){
  if(negative)
    return a<0 && b<0
  let aNeg = a < 0 && b > 0;
  let bNeg = b < 0 && a > 0;
  return aNeg || bNeg;
}