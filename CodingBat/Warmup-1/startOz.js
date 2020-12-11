function startOz(str){
  let o = str.charAt(0) === 'o';
  let z = str.charAt(1) === 'z';
  return o && z ? 'oz' : o ? 'o' : z ? 'z' : '';
}