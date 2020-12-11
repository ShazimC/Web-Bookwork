function loneTeen(a, b){
  let aIs = a >= 13 && a <= 19;
  let bIs = b >= 13 && b <= 19;
  let notA = !aIs && bIs;
  let notB = aIs && !bIs;
  return notA || notB;
}