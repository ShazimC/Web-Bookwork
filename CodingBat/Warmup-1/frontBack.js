function frontBack(str){
  let first = str.charAt(0);
  let middle = str.substring(1,str.length-1);
  let last = str.charAt(str.length-1);
  return str.length > 1 ? last + middle + first : str;
}