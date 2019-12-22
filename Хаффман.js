let text = 'Данил это Данил'.split('');
const frequency = text.reduce( (telly, letter) => {
  telly[letter] = (telly[letter] || 0) + 1;
  return telly;
} , {} )
let dictionary = Object.entries(frequency);
let sortDictionary = sort(dictionary);
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
let tree = createTree(sortDictionary);

const codes = (tree, code = "") =>
  tree[0] instanceof Array
    ? Object.assign(codes(tree[0][0], code + "0"),// условно говоря левая ветка
                    codes(tree[0][1], code + "1")) // правая ветка
    : {[tree[0]]: code};
let table = codes(tree);
function coding01 (table, text) {
    let result = '';
    for (let i = 0; i < text.length; i++){
      for (key in table){
        if (text[i] == key){
          result += table[key] + ' ';
        }
      }
    }
    return result;
}
console.log(coding01(table, text))
console.log(table)
