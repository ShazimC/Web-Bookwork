function notString(str){
  let hasNot = str.indexOf("not") === 0;
  return hasNot ? str : "not " + str;
}