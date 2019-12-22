let text = 'Данил это Данил'.split('');
const frequency = text.reduce( (telly, letter) => {
  telly[letter] = (telly[letter] || 0) + 1;
  return telly;
} , {} ) //https://clck.ru/LLoWE - кто такой этот ваш reduce
let dictionary = Object.entries(frequency); // превращаем объект в массив!
let sortDictionary = sort(dictionary); // сортируем по возрастанию
function sort (dictionary){
  return dictionary.sort((a, b) => a[1] - b[1])
}
function createTree (i) {
  if (i.length == 1){
    return i[0]
  } else {
    return (createTree(sort([[i.slice(0, 2), i[0][1]+ i [1][1]]].concat(i.slice(2)))))
  }
}
let tree = createTree(sortDictionary); // создаем дерево. Советую остановиться, написать console.log и посмотреть как оно выглядит.

const codes = (tree, code = "") =>
  tree[0] instanceof Array
    ? Object.assign(codes(tree[0][0], code + "0"),// условно говоря левая ветка. Object.assign соединяет два объекта в один.
                    codes(tree[0][1], code + "1")) // правая ветка
    : {[tree[0]]: code}; // спустились до конца дерева, дальше только null. Поэтому создаем объект.
let table = codes(tree);
function coding01 (table, text) { // кодируем текст в двоичный вид.
    let result = '';
    for (let i = 0; i < text.length; i++){ // глобальный цикл. Бежим по самому тексту.
      for (key in table){ // внутренний цикл. Бежим по свойствам объекта table.
        if (text[i] == key){
          result += table[key] + ' '; //Если что, то key - свойство(в нашем случае буква), а table[key] - значение(в нашем случае двоичный код)
          break; // чтобы не бежать дальше, собственно. Мы же нашли значение.
        }
      }
    }
    return result;
}
console.log(coding01(table, text))
console.log(table)
