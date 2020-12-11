function icyHot(temp1, temp2){
  let s1 = temp1 < 0 && temp2 > 100;
  let s2 = temp1 > 100 && temp2 < 0;
  return s1 || s2;
}