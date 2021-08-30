class WordSearch {
  constructor (wordTable) {
    this.wordTable = wordTable;
  }

  getVerticalWord (x, y, length) {
    let word = '';

    for (let i = 0; i < length; i++) {
      word += this.wordTable[y + i][x];
    }

    return word;
  }

  getLeftToRightDiagonalWord (x, y, length) {
    let word = '';

    for (let i = 0; i < length; i++) {
      word += this.wordTable[y + i][x + i];
    }

    return word;
  }

  getRightToLeftDiagonalWord (x, y, length) {
    let word = '';

    for (let i = 0; i < length; i++) {
      word += this.wordTable[y + i][x - i];
    }

    return word;
  }

  findWord (word) {
    const tableWidth = this.wordTable[0].length;
    const tableHeight = this.wordTable.length
    const wordOffset = word.length - 1;
    let result = {};

    for (let x = 0; x < tableWidth; x++) {
      for (let y = 0; y < tableHeight; y++) {
        // horizontal
        if (x + wordOffset < tableWidth) {
          let checkedWord = this.wordTable[y].substring(x, x + word.length);
          if (checkedWord === word) {
            result[word] = {
              "start": [x, y],
              "end": [x + wordOffset, y]
            }
            return result;
          }
          //reverse word
          checkedWord = checkedWord.split('').reverse().join('');
          if (checkedWord === word) {
            result[word] = {
              "start": [x + wordOffset, y],
              "end": [x, y]
            }
            return result;
          }
        }

        //vertical
        if (y + wordOffset < tableHeight) {
          let checkedWord = this.getVerticalWord(x, y, word.length);
          if (checkedWord === word) {
            result[word] = {
              "start": [x, y],
              "end": [x, y + wordOffset]
            }
            return result;
          }
          //reverse word
          checkedWord = checkedWord.split('').reverse().join('');
          if (checkedWord === word) {
            result[word] = {
              "start": [x, y + wordOffset],
              "end": [x, y]
            }
            return result;
          }
        }

        //diagonal left to right
        if (x + wordOffset < tableWidth && y + wordOffset < tableHeight) {
          let checkedWord = this.getLeftToRightDiagonalWord(x, y, word.length);
          if (checkedWord === word) {
            result[word] = {
              "start": [x, y],
              "end": [x + wordOffset, y + wordOffset]
            }
            return result;
          }
          //reverse word
          checkedWord = checkedWord.split('').reverse().join('');
          if (checkedWord === word) {
            result[word] = {
              "start": [x + wordOffset, y + wordOffset],
              "end": [x, y]
            }
            return result;
          }
        }
        //diagonal right to left
        if (x - wordOffset >= 0 && y + wordOffset < tableHeight) {
          let checkedWord = this.getRightToLeftDiagonalWord(x, y, word.length);
          if (checkedWord === word) {
            result[word] = {
              "start": [x, y],
              "end": [x - wordOffset, y + wordOffset]
            }
            return result;
          }
          //reverse word
          checkedWord = checkedWord.split('').reverse().join('');
          if (checkedWord === word) {
            result[word] = {
              "start": [x - wordOffset, y + wordOffset],
              "end": [x, y]
            }
            return result;
          }
        }
      }
    }

    result[word] = undefined;
    return result;
  }
}

export default WordSearch;
