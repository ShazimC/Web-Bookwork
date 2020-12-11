function close10(a, b){
  let aDiff = Math.abs(a - 10)
  let bDiff = Math.abs(b - 10);
  return aDiff === bDiff ? 0 : aDiff < bDiff ? a : b;
}