function nearHundred(n){
  let n100 = Math.abs(n-100) <= 10;
  let n200 = Math.abs(n-200) <= 10;
  return n100 || n200;
}