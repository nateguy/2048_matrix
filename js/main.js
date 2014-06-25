// Generated by CoffeeScript 1.7.1
(function() {
  var addScore, boardFull, copyOldBoard, fillTable, generateTile, getColor, getColumn, getRandomCell, getRow, isLost, isValidMove, isWin, merge, ppArray, randomIndex, randomValue, removeZeros, score, setColumn, setRow, shift,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.board = [0, 1, 2, 3].map(function(x) {
    return [0, 1, 2, 3].map(function(y) {
      return 0;
    });
  });

  this.oldboard = [0, 1, 2, 3].map(function(x) {
    return [0, 1, 2, 3].map(function(y) {
      return 0;
    });
  });

  score = 0;

  $(function() {
    var initiate;
    initiate = function() {
      generateTile();
      fillTable();
      ppArray(board);
      return console.log("Score: " + score);
    };
    initiate();
    return $('body').keydown(function(e) {
      var key;
      e.preventDefault();
      key = e.which;
      if (isLost() === false) {
        switch (key) {
          case 37:
            if (isValidMove('left') === true) {
              console.log('Key left');
              shift('left');
              initiate();
              return console.log('Game lost: ' + isLost());
            }
            break;
          case 38:
            if (isValidMove('up') === true) {
              console.log('Key up');
              shift('up');
              initiate();
              return console.log('Game lost: ' + isLost());
            }
            break;
          case 39:
            if (isValidMove('right') === true) {
              console.log('Key right');
              shift('right');
              initiate();
              return console.log('Game lost: ' + isLost());
            }
            break;
          case 40:
            if (isValidMove('down') === true) {
              console.log('Key down');
              shift('down');
              initiate();
              return console.log('Game lost: ' + isLost());
            }
        }
      }
    });
  });

  ppArray = function(array) {
    var row, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      row = array[_i];
      _results.push(console.log(row));
    }
    return _results;
  };

  addScore = function(x) {
    score = score + x;
    return $('.scoreboard > h2').html("Score: " + score);
  };

  getRandomCell = function() {
    return [randomIndex(4), randomIndex(4)];
  };

  isWin = function(x) {
    if (x === 2048) {
      console.log("You won");
      return true;
    }
    return false;
  };

  isValidMove = function(direction) {
    var i, j, temp, _i, _j;
    temp = [];
    for (i = _i = 0; _i <= 3; i = ++_i) {
      switch (direction) {
        case 'up':
          temp = getColumn(i);
          break;
        case 'left':
          temp = getRow(i);
          break;
        case 'right':
          temp = getRow(i).reverse();
          break;
        case 'down':
          temp = getColumn(i).reverse();
      }
      for (j = _j = 3; _j >= 1; j = --_j) {
        if ((temp[j - 1] === temp[j]) && (temp[j - 1] + temp[j]) > 0) {
          return true;
        }
        if ((temp[j - 1] === 0) && (temp[j] > 0)) {
          return true;
        }
      }
    }
    return false;
  };

  isLost = function() {
    var i, j, _i, _j, _k, _l;
    if (boardFull() === true) {
      for (i = _i = 0; _i <= 3; i = ++_i) {
        for (j = _j = 0; _j <= 2; j = ++_j) {
          if (board[i][j] === board[i][j + 1]) {
            return false;
          }
        }
      }
      for (i = _k = 0; _k <= 2; i = ++_k) {
        for (j = _l = 0; _l <= 3; j = ++_l) {
          if (board[i][j] === board[i + 1][j]) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  };

  generateTile = function() {
    var val, x, y, _ref;
    if (!boardFull()) {
      val = randomValue();
      _ref = getRandomCell(), x = _ref[0], y = _ref[1];
      if (board[x][y] === 0) {
        return board[x][y] = val;
      } else {
        return generateTile();
      }
    }
  };

  randomIndex = function(x) {
    return Math.floor(Math.random() * x);
  };

  randomValue = function() {
    var val, values;
    values = [2, 2, 2, 4];
    return val = values[randomIndex(values.length)];
  };

  removeZeros = function(array, orientation) {
    var n, newArray, _i;
    newArray = [];
    array = array.filter(function(x) {
      return x !== 0;
    });
    if (orientation === 1) {
      array = array.reverse();
    }
    for (n = _i = 0; _i <= 3; n = ++_i) {
      newArray[n] = array[n] || 0;
    }
    if (orientation === 1) {
      newArray = newArray.reverse();
    }
    return newArray;
  };

  shift = function(direction) {
    var i, temp, _i, _results;
    temp = [];
    _results = [];
    for (i = _i = 0; _i <= 3; i = ++_i) {
      switch (direction) {
        case 'up':
          temp = removeZeros(getColumn(i), 0);
          temp = merge(temp);
          _results.push(setColumn(temp, i));
          break;
        case 'left':
          temp = removeZeros(getRow(i), 0);
          temp = merge(temp);
          _results.push(setRow(temp, i));
          break;
        case 'right':
          temp = removeZeros(getRow(i), 1).reverse();
          temp = (merge(temp)).reverse();
          _results.push(setRow(temp, i));
          break;
        case 'down':
          temp = removeZeros(getColumn(i), 1).reverse();
          temp = (merge(temp)).reverse();
          _results.push(setColumn(temp, i));
          break;
        default:
          _results.push(void 0);
      }
    }
    return _results;
  };

  merge = function(temp) {
    var j, _i;
    for (j = _i = 0; _i <= 2; j = ++_i) {
      if (temp[j] === temp[j + 1]) {
        temp[j] = parseInt(temp[j + 1]) * 2;
        addScore(temp[j]);
        isWin(temp[j]);
        temp[j + 1] = 0;
      }
    }
    temp = removeZeros(temp, 0);
    return temp;
  };

  setRow = function(row, rowID) {
    var colID, _i, _results;
    _results = [];
    for (colID = _i = 0; _i <= 3; colID = ++_i) {
      _results.push(board[rowID][colID] = row[colID]);
    }
    return _results;
  };

  setColumn = function(column, colID) {
    var rowID, _i, _results;
    _results = [];
    for (rowID = _i = 0; _i <= 3; rowID = ++_i) {
      _results.push(board[rowID][colID] = column[rowID]);
    }
    return _results;
  };

  getColumn = function(column) {
    return [board[0][column], board[1][column], board[2][column], board[3][column]];
  };

  getRow = function(row) {
    return [board[row][0], board[row][1], board[row][2], board[row][3]];
  };

  boardFull = function() {
    var n, _i;
    for (n = _i = 0; _i <= 3; n = ++_i) {
      if (__indexOf.call(board[n], 0) >= 0) {
        return false;
      }
    }
    return true;
  };

  fillTable = function() {
    var col, i, j, row, _i, _results;
    _results = [];
    for (row = _i = 0; _i <= 3; row = ++_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (col = _j = 0; _j <= 3; col = ++_j) {
          i = row + 1;
          j = col + 1;
          $("#" + i + "_" + j).css("background-color", getColor(board[row][col]));
          if (board[row][col] > 0) {
            _results1.push($("#" + i + "_" + j).html("<p>" + board[row][col] + "</p>"));
          } else {
            _results1.push($("#" + i + "_" + j).html(''));
          }
        }
        return _results1;
      })());
    }
    return _results;
  };

  copyOldBoard = function() {
    var column, row, _i, _results;
    _results = [];
    for (row = _i = 0; _i <= 3; row = ++_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (column = _j = 0; _j <= 3; column = ++_j) {
          _results1.push(oldboard[row][column] = board[row][column]);
        }
        return _results1;
      })());
    }
    return _results;
  };

  getColor = function(value) {
    var color;
    color = '';
    switch (value) {
      case 0:
        color = 'rgb(255,255,255)';
        break;
      case 2:
        color = 'rgb(200,255,200)';
        break;
      case 4:
        color = 'rgb(150,255,150)';
        break;
      case 8:
        color = 'rgb(100,255,100)';
        break;
      case 16:
        color = 'rgb(50,255,50)';
        break;
      case 32:
        color = 'rgb(0,255,0)';
        break;
      case 64:
        color = 'rgb(0,220,0)';
        break;
      case 128:
        color = 'rgb(0,190,0)';
        break;
      case 256:
        color = 'rgb(0,160,0)';
        break;
      case 1024:
        color = 'rgb(0,130,0)';
        break;
      default:
        color = 'rgb(0,100,0)';
    }
    return color;
  };

}).call(this);

//# sourceMappingURL=main.map