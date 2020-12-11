function front3(str){
  let len = str.length > 2 ? 3 : str.length;
  let f3 = str.substring(0, len);
  return f3 + f3 + f3;
}