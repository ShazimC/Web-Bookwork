function max1020(a, b){
  let ainc = a >= 10 && a <= 20;
  let binc = b >= 10 && b <= 20;
  if(!ainc && !binc) return 0;
  if(ainc && binc) return Math.max(a, b);
  return ainc ? a : b;
}