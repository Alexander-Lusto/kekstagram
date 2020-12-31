// var data = window.data;
var numbers = [10, 55, 40, 99, 235, -500];
var letters = ['g', 'f', 'v', 'd', 'q', 'a'];

console.log(letters.sort());
console.log(numbers.sort( function (left, right) {
  console.log(right - left);
  return right - left; // сортировка по убыванию
}))

console.log(numbers.sort( function (left, right) {
  return left - right; // сортировка по возрастанию
}))

