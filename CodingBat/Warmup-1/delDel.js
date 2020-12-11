function delDel(str){
  let del_i = str.indexOf('del');
  let result = str;
  if(del_i === 1){
    let start = str.substring(0, del_i);
    let end = str.substring(del_i + 'del'.length);
    result = start + end;
  }
  return result;
}