let gameOptions = {
  gemSize: 100,
  fallSpeed: 100,
  destroySpeed: 200,
  offsetX: 50,
  offsetY: 250,
  gameMode: 'time', //moves, challenge
  defaultTime: 60,



}
const shuffle = str => [...str].sort(() => Math.random() - .5).join('');

let puzzles = [
  {
    title: 'Forest',
    words: ['leaf', 'tree', 'bird', 'cone'],
    hints: ['food factory', 'tall', 'nest', 'seed pod']
  },
  {
    title: 'Star Wars',
    words: ['hansolo', 'bobafett', 'jawa', 'luke', 'blaster', 'star', 'wars', 'falcon', 'milk'],
    hints: ['Scoundral', 'No disintegrations', 'utini', 'chosen one?', 'gun', 'title I', 'title II', 'hunk of junk', 'blue...']
  },
  
]
let onPuzzle = 0;
let gameSettings;
var defaultValues = {
  mostDotsMoves: 0,
  mostDotsTime: 0,
  levelStatus: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  totalSquares: 0,
  group: 0,
  currentLevel: 0
}
