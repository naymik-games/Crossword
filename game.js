let game;
// keyboard layout, as a string array, each item is a row of keys
// > represents Enter
// < represents Backspace
const keyboardLayout = ['QWERTYUIOP', 'ASDFGHJKL', '>ZXCVBNM<'];


window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },

    scene: [preloadGame, startGame, playGame]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {


  }
  create() {


    this.cameras.main.setBackgroundColor(0xcccccc);


    this.tileLetters = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
      'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
      'w', 'x', 'y', 'z', 'e', 'a', 'r', 's'
    ];

    this.tileLettersValues = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10, 1, 1, 1, 1];


    this.tiles = this.add.group({
      defaultKey: "tiles",
      // defaultFrame: 1,
      maxSize: 10,
      visible: false,
      active: false
    });

    this.answerTiles = this.add.group({
      defaultKey: "tiles",
      defaultFrame: 26,
      maxSize: 150,
      visible: false,
      active: false
    });

    this.board = [];
    this.revealLetters = false;
    this.hintCount = 0;
    this.words = puzzles[onPuzzle].words
    this.lettersUsed = this.unique()
    console.log(this.numberCharacters)
    this.foundWords = [];
    var board = Create(this.words);
    var extraCol = 0
    if (board.length > board[0].length) {
      this.blockSize = game.config.width / (board.length + extraCol)
    } else {
      this.blockSize = game.config.width / (board[0].length + extraCol)
    }

    this.createBoard(board);

    this.title = this.add.bitmapText(game.config.width / 2, 75, 'topaz', puzzles[onPuzzle].title, 60).setOrigin(.5).setTint(0x000000);


    this.inputContent = '';

    this.input = this.add.image(game.config.width / 2, 1200, 'blank')
    this.input.displayWidth = 800;
    this.input.displayHeight = 80;
    this.inputText = this.add.bitmapText(game.config.width / 2, 1200, 'font', ' ', 60).setOrigin(.5);


    this.virtualKeyboard = [];
    keyboardLayout.forEach((row, index) => {

      // initialize virtual keyboard row
      this.virtualKeyboard[index] = [];

      // determine position of key sprites
      // some values are still hardcoded, and need to be optimized
      let rowWidth = 70 * row.length;
      let firstKeyPosition = (this.game.config.width - rowWidth) / 2;

      // loop through string
      for (let i = 0; i < row.length; i++) {

        // get the i-th character
        let letter = row.charAt(i);

        // add the keyboard key
        if (letter == '>') {
          var off = 20
        } else if (letter == '<') {
          var off = -20
        } else {
          var off = 0
        }
        this.virtualKeyboard[index][i] = new KeyboardKey(this, firstKeyPosition + i * 70 - off, 1300 + index * 100, row.charAt(i), this.lettersUsed);
      }
    });

    this.revealButton = this.add.image(850, 1000, 'tiles', 26).setInteractive();
    this.revealButton.on('pointerdown', function () {
      this.revealLetters = true;
      this.input.setAlpha(0)
      this.revealButton.setTint(0xf7ebcb)
    }, this)

    this.hintText = this.add.bitmapText(game.config.width / 2, 1100, 'topaz', '', 60).setOrigin(.5).setTint(0x000000);

    this.hintButton = this.add.image(850, 1100, 'tiles', 26).setInteractive();
    this.hintButton.on('pointerdown', function () {
      this.hintText.setText(puzzles[onPuzzle].hints[this.hintCount])
      this.hintCount++

    }, this)
    for (var i = 0; i < this.lettersUsed.length; i++) {
      this.title = this.add.bitmapText(50 + i * 35, 1575, 'topaz', this.lettersUsed[i], 60).setOrigin(.5).setTint(0x000000);
    }



    /* this.input.on("pointerdown", this.gemSelect, this);
     this.input.on("pointermove", this.drawPath, this);
     this.input.on("pointerup", this.removeGems, this);
    */
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
  }
  update() {

  }
  updateWord(letter) {
    if (letter == '>') {
      if (this.inputContent.length > 0) {
        let result = this.inputContent.toLowerCase();
        console.log(result)
        if (this.foundWords.indexOf(result) > -1) {
          this.revealAnswer(result)
          this.inputContent = '';
          this.inputText.setText(this.inputContent)

        } else if (this.words.indexOf(result) > -1) {
          console.log('match')
          this.revealAnswer(result)
          this.foundWords.push(result)
          this.inputContent = '';
          this.inputText.setText(this.inputContent)
        } else {
          this.inputContent = '';
          this.inputText.setText(this.inputContent)
        }

      }
    } else if (letter == '<') {
      if (this.inputContent.length > 0) {
        this.inputContent = this.inputContent.slice(0, -1)
      }

    } else {
      if (this.revealLetters) {
        this.revealLetter(letter.toLowerCase())
        this.revealLetters = false
        this.input.setAlpha(1)
        this.revealButton.clearTint()
      } else {
        console.log(letter)
        this.inputContent += letter
      }


    }

    this.inputText.setText(this.inputContent)
  }
  createBoard(board) {
    //console.log(board)
    this.grid = []
    for (var i = 0; i < board.length; i++) {
      var gridT = []
      for (var j = 0; j < board[0].length; j++) {
        if (board[i][j] != null) {
          var xpos = 25 + j * this.blockSize
          var ypos = 150 + i * this.blockSize
          var tileAnswer = this.answerTiles.get();
          tileAnswer.displayWidth = this.blockSize
          tileAnswer.displayHeight = this.blockSize
          tileAnswer.setPosition(xpos, ypos)
          tileAnswer.word = board[i][j].word
          tileAnswer.direction = board[i][j].dir
          var ind = this.tileLetters.indexOf(board[i][j].letter)
          tileAnswer.index = ind
          tileAnswer.setInteractive()
          tileAnswer.type = 'answer'
          tileAnswer.letter = board[i][j].letter
          board[i][j].tile = tileAnswer
          gridT.push(board[i][j].letter)
          //tileAnswer.setFrame(ind)
          //console.log(tileAnswer.word)

        } else {
          gridT.push('-')
        }


      }
      this.grid.push(gridT)
    }
    this.board = board
    console.log(this.grid)

    //this.patternSearch(this.grid, this.words[1])
  }
  revealLetter(letter) {
    console.log(this.board)
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[0].length; col++) {
        if (this.board[row][col] != null) {
          if (this.board[row][col].letter == letter) {
            this.board[row][col].tile.setFrame(this.board[row][col].tile.index);
          }
        }
      }
    }
  }
  revealAnswer(answer) {
    var coo = this.patternSearch(this.grid, answer)
    //console.log(coo)
    for (var i = 0; i < answer.length; i++) {
      var letter = coo[i]
      this.board[letter.y][letter.x].tile.setFrame(this.board[letter.y][letter.x].tile.index);
      var tween = this.tweens.add({
        targets: this.board[letter.y][letter.x].tile,
        scale: 1.3,
        yoyo: true,
        duration: 200,
        delay: i * 50
      })
    }
  }
  patternSearch(grid, word) {
    // Consider every point as starting
    // console.log(word)
    // point and search given word
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        var result = this.search2D(grid, row, col, word)
        if (result) {
          //console.log(result)
          return result
        }
      }
    }
  }
  search2D(grid, row, col, word, dir) {

    let y = [0, 1];

    let x = [1, 0];
    for (let dir = 0; dir < 2; dir++) {
      var coo = []
      // If first character of word
      // doesn't match with
      // given starting point in grid.
      if (grid[row][col] != word[0])
        //return false;
        break;
      coo.push({ x: col, y: row })
      //console.log('start ' + col + ',' + row)
      let len = word.length;

      // Search word in all 8 directions
      // starting from (row, col)
      // 
      // Initialize starting point
      // for current direction
      let k, rd = row + y[dir], cd = col + x[dir];

      // First character is already checked,
      // match remaining characters
      for (k = 1; k < len; k++) {
        // If out of bound break
        if (rd >= grid.length || rd < 0 || cd >= grid[0].length || cd < 0)
          //return false;
          break;
        // If not matched, break
        if (grid[rd][cd] != word[k])
          //return false;
          break;
        //console.log('next ' + cd + ',' + rd)
        coo.push({ x: cd, y: rd })
        // Moving in particular direction
        rd += y[dir];
        cd += x[dir];
      }

      // If all character matched,
      // then value of must
      // be equal to length of word
      if (k == len) {
        // console.log('dir' + dir)
        if (dir == 0) {
          if (grid[row][col - 1] != '-') {
            //return false;
            break;
          }
          if (grid[row][col + len] != '-') {
            //return false;
            break;
          }
        } else {
          if (grid[row - 1][col] != '-') {
            //return false;
            break;
          }
          if (grid[row + len][col] != '-') {
            //return false;
            break;
          }
        }
        //console.log(coo)

        return coo
      }
    }
    //return false;
  }
  unique() {
    var temp = this.words.join('')
    this.numberCharacters = temp.length
    var result = '';
    for (var i = 0; i < temp.length; i++) {
      if (result.indexOf(temp[i]) < 0) {
        result += temp[i];
      }
    }
    var temp2 = shuffle(result).split('');
    return temp2;
  }
  addScore() {
    this.events.emit('score');
  }
}
