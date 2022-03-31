//---------------------------------//
//   GLOBAL VARIABLES              //
//---------------------------------//

var boardFull, wordArr, wordBank, wordsActive, mode;
var tempa = []

var Bounds = {
  top: 0, right: 0, bottom: 0, left: 0,

  Update: function (x, y) {
    this.top = Math.min(y, this.top);
    this.right = Math.max(x, this.right);
    this.bottom = Math.max(y, this.bottom);
    this.left = Math.min(x, this.left);
  },

  Clean: function () {
    this.top = 999;
    this.right = 0;
    this.bottom = 0;
    this.left = 999;
  }
};


//---------------------------------//
//   MAIN                          //
//---------------------------------//



function Create(words) {

  // GetWordsFromInput();
  wordArr = words
  //console.log(wordArr)
  for (var i = 0, isSuccess = false; i < wordArr.length && !isSuccess; i++) {
    CleanVars();
    isSuccess = PopulateBoard();
  }
  //console.log(boardFull)
  // document.getElementById("crossword").innerHTML = 
  //  (isSuccess) ? BoardToHtml(" ") : "Failed to find crossword." ;

  return BoardToArray("")
}





function GetWordsFromInput() {
  wordArr = ['CLOSETED', 'SET', 'CLOSE', 'LOSE', 'TOES', 'LOST', 'SEED', 'STOLE', 'ODES', 'DOLT'];

  /*for(var i=0,val,w=document.getElementsByClassName("word");i<w.length;i++){
    val = w[i].value.toUpperCase();
    if (val !== null && val.length > 1){wordArr.push(val);}
  }*/
}


function CleanVars() {
  Bounds.Clean();
  wordBank = [];
  wordsActive = [];
  boardFull = [];

  for (var i = 0; i < 24; i++) {
    boardFull.push([]);
    for (var j = 0; j < 24; j++) {
      boardFull[i].push(null);
    }
  }
}


function PopulateBoard() {
  PrepareBoard();

  for (var i = 0, isOk = true, len = wordBank.length; i < len && isOk; i++) {
    isOk = AddWordToBoard();
  }
  return isOk;
}


function PrepareBoard() {
  wordBank = [];

  for (var i = 0, len = wordArr.length; i < len; i++) {
    wordBank.push(new WordObj(wordArr[i]));
  }

  for (i = 0; i < wordBank.length; i++) {
    for (var j = 0, wA = wordBank[i]; j < wA.char.length; j++) {
      for (var k = 0, cA = wA.char[j]; k < wordBank.length; k++) {
        for (var l = 0, wB = wordBank[k]; k !== i && l < wB.char.length; l++) {
          wA.totalMatches += (cA === wB.char[l]) ? 1 : 0;
        }
      }
    }
  }

}


// TODO: Clean this guy up
function AddWordToBoard() {
  var i, len, curIndex, curWord, curChar, curMatch, testWord, testChar,
    minMatchDiff = 9999, curMatchDiff;

  if (wordsActive.length < 1) {
    curIndex = 0;
    for (i = 0, len = wordBank.length; i < len; i++) {
      if (wordBank[i].totalMatches < wordBank[curIndex].totalMatches) {
        curIndex = i;
      }
    }
    wordBank[curIndex].successfulMatches = [{ x: 12, y: 12, dir: 0 }];
  }
  else {
    curIndex = -1;

    for (i = 0, len = wordBank.length; i < len; i++) {
      curWord = wordBank[i];
      curWord.effectiveMatches = 0;
      curWord.successfulMatches = [];
      for (var j = 0, lenJ = curWord.char.length; j < lenJ; j++) {
        curChar = curWord.char[j];
        for (var k = 0, lenK = wordsActive.length; k < lenK; k++) {
          testWord = wordsActive[k];
          for (var l = 0, lenL = testWord.char.length; l < lenL; l++) {
            testChar = testWord.char[l];
            if (curChar === testChar) {
              curWord.effectiveMatches++;

              var curCross = { x: testWord.x, y: testWord.y, dir: 0 };
              //console.log(curCross)
              if (testWord.dir === 0) {
                curCross.dir = 1;
                curCross.x += l;
                curCross.y -= j;
              }
              else {
                curCross.dir = 0;
                curCross.y += l;
                curCross.x -= j;
              }

              var isMatch = true;

              for (var m = -1, lenM = curWord.char.length + 1; m < lenM; m++) {
                var crossVal = [];
                if (m !== j) {
                  if (curCross.dir === 0) {
                    var xIndex = curCross.x + m;

                    if (xIndex < 0 || xIndex > boardFull.length) {
                      isMatch = false;
                      break;
                    }

                    crossVal.push(boardFull[xIndex][curCross.y]);
                    crossVal.push(boardFull[xIndex][curCross.y + 1]);
                    crossVal.push(boardFull[xIndex][curCross.y - 1]);
                  }
                  else {
                    var yIndex = curCross.y + m;

                    if (yIndex < 0 || yIndex > boardFull[curCross.x].length) {
                      isMatch = false;
                      break;
                    }

                    crossVal.push(boardFull[curCross.x][yIndex]);
                    crossVal.push(boardFull[curCross.x + 1][yIndex]);
                    crossVal.push(boardFull[curCross.x - 1][yIndex]);
                  }

                  if (m > -1 && m < lenM - 1) {
                    if (crossVal[0] !== curWord.char[m]) {
                      if (crossVal[0] !== null) {
                        isMatch = false;
                        break;
                      }
                      else if (crossVal[1] !== null) {
                        isMatch = false;
                        break;
                      }
                      else if (crossVal[2] !== null) {
                        isMatch = false;
                        break;
                      }
                    }
                  }
                  else if (crossVal[0] !== null) {
                    isMatch = false;
                    break;
                  }
                }
              }

              if (isMatch === true) {
                curWord.successfulMatches.push(curCross);
              }
            }
          }
        }
      }

      curMatchDiff = curWord.totalMatches - curWord.effectiveMatches;

      if (curMatchDiff < minMatchDiff && curWord.successfulMatches.length > 0) {
        curMatchDiff = minMatchDiff;
        curIndex = i;
      }
      else if (curMatchDiff <= 0) {
        return false;
      }
    }
  }

  if (curIndex === -1) {
    return false;
  }

  var spliced = wordBank.splice(curIndex, 1);
  wordsActive.push(spliced[0]);

  var pushIndex = wordsActive.length - 1,
    rand = Math.random(),
    matchArr = wordsActive[pushIndex].successfulMatches,
    matchIndex = Math.floor(rand * matchArr.length),
    matchData = matchArr[matchIndex];
  //console.log(matchData)
  tempa.push(matchData)
  wordsActive[pushIndex].x = matchData.x;
  wordsActive[pushIndex].y = matchData.y;
  wordsActive[pushIndex].dir = matchData.dir;

  for (i = 0, len = wordsActive[pushIndex].char.length; i < len; i++) {
    var xIndex = matchData.x,
      yIndex = matchData.y;

    if (matchData.dir === 0) {
      xIndex += i;
      //tempa.push(wordsActive[pushIndex].char[i])
      //boardFull[xIndex][yIndex] = { letter: wordsActive[pushIndex].char[i], word: wordsActive[pushIndex].char.join('') };
      boardFull[xIndex][yIndex] = { wa: tempa, x: xIndex, y: yIndex, letter: wordsActive[pushIndex].char[i], word: wordsActive[pushIndex].string, dir: wordsActive[pushIndex].dir };

    }
    else {
      yIndex += i;
      //tempa.push(wordsActive[pushIndex].char[i])
      //boardFull[xIndex][yIndex] = { letter: wordsActive[pushIndex].char[i], word: wordsActive[pushIndex].char.join('') };
      boardFull[xIndex][yIndex] = { wa: tempa, x: xIndex, y: yIndex, letter: wordsActive[pushIndex].char[i], word: wordsActive[pushIndex].string, dir: wordsActive[pushIndex].dir };
    }

    Bounds.Update(xIndex, yIndex);
  }

  return true;
}



function BoardToArray(blank) {
  //console.log(wordsActive)
  // console.log(boardFull)
  // console.log(Bounds.top)
  var newBoard = []
  for (var i = Bounds.top - 1; i < Bounds.bottom + 2; i++) {
    var temp = []

    for (var j = Bounds.left - 1; j < Bounds.right + 2; j++) {
      temp.push(boardFull[j][i])
    }
    newBoard.push(temp)

  }
  //console.log(newBoard)
  return newBoard

}





//---------------------------------//
//   OBJECT DEFINITIONS            //
//---------------------------------//

function WordObj(stringValue) {
  this.string = stringValue;
  this.char = stringValue.split("");
  this.totalMatches = 0;
  this.effectiveMatches = 0;
  this.successfulMatches = [];
  this.answerArray = [];
}

