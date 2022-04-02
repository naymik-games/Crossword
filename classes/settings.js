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
//{"clue":"that which is established","answer":"standard"}
let puzzles = [
  [
    { clue: 'a scoundral', answer: 'hansolo' },
    { clue: 'arrrgggghhh', answer: 'wookie' },
    { clue: 'ball of death', answer: 'deathstar' },
    { clue: 'we would call it a gun', answer: 'blaster' },
    { clue: 'hocus pocus', answer: 'force' },
    { clue: 'hunk of junk', answer: 'falcon' },
    { clue: 'war over these', answer: 'stars' },
    { clue: 'food factory', answer: 'leaf' },
    { clue: '_ gully', answer: 'fern' },
    { clue: 'cone tree', answer: 'pinetree' },
    { clue: 'nest', answer: 'bird' },
    { clue: 'canopy', answer: 'canopy' },
    { clue: 'creepy crawlers', answer: 'insects' },
    { clue: 'path', answer: 'trail' }
  ],
  [
    { clue: 'food factory', answer: 'leaf' },
    { clue: '_ gully', answer: 'fern' },
    { clue: 'cone tree', answer: 'pinetree' },
    { clue: 'nest', answer: 'bird' },
    { clue: 'canopy', answer: 'canopy' },
    { clue: 'creepy crawlers', answer: 'insects' },
    { clue: 'path', answer: 'trail' }
  ],
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
