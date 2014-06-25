@board = [0..3].map (x) -> [0..3].map (y) -> 0
@oldboard = [0..3].map (x) -> [0..3].map (y) -> 0
score = 0


$ ->
  initiate = ->
    generateTile()
    fillTable()
    ppArray(board)
    console.log "Score: "+ score
  initiate()

#  $('.overlay').css({"display":"block"});
#  $('.msg').css({"display":"block"});

  $('body').keydown (e)->
    e.preventDefault()

    key = e.which
    if isLost() == false
      switch key
        when 37
          if isValidMove('left') == true
            console.log 'Key left'
            shift ('left')
            initiate()
            #generateTile()
            #fillTable()
            #ppArray(board)
            console.log 'Game lost: '+ isLost()
        when 38
          if isValidMove('up') == true
            console.log 'Key up'
            shift ('up')
            initiate()
            console.log 'Game lost: '+ isLost()
        when 39
          if isValidMove('right') == true
            console.log 'Key right'
            shift ('right')
            initiate()
            console.log 'Game lost: '+ isLost()
        when 40
          if isValidMove('down') == true
            console.log 'Key down'
            shift ('down')
            initiate()
            console.log 'Game lost: '+ isLost()



#    $('.cell').animate({
#      marginLeft: "110px"
#        1000

#      })
#  $('.cell').html('<h2>2</h2>')


ppArray = (array) ->
  for row in array
    console.log row

addScore = (x) ->
  score = score + x
  $('.scoreboard > h2').html("Score: #{score}")

getRandomCell = ->
  [randomIndex(4), randomIndex(4)]

isWin = (x) ->
  if x == 2048
    console.log "You won"
    $('.overlay').css({"display":"block"});
    $('.msg').css({"display":"block"});
    $('.msg > h2').html("You Won!")
    return true
  false

isValidMove = (direction) ->
  temp = [
  ]
  for i in [0..3]
    switch direction
      when 'up' then temp = getColumn(i)
      when 'left' then temp = getRow(i)
      when 'right' then temp = getRow(i).reverse() #right (39)
      when 'down' then temp = getColumn(i).reverse() #down (40)

    for j in [3..1]
      if (temp[j-1]==temp[j]) and (temp[j-1]+temp[j]) > 0
        return true
      if (temp[j-1]==0) and (temp[j]>0)
        return true

  return false




isLost = ->
  if boardFull() == true
    for i in [0..3]
      for j in [0..2]
        if board[i][j]==board[i][j+1]
            return false

    for i in [0..2]
      for j in [0..3]
        if board[i][j]==board[i+1][j]
            return false
    $('.overlay').css({"display":"block"});
    $('.msg').css({"display":"block"});
    $('.msg > h2').html("You Lost!")
    return true

  return false

generateTile = ->
  unless boardFull()
    val = randomValue()

    [x, y] = getRandomCell()

    if board[x][y] == 0
      board[x][y]=val
    else

        generateTile()

randomIndex = (x) ->
  Math.floor(Math.random() * x)

randomValue = ->
      values = [2, 2, 2, 4]
      val = values[randomIndex(values.length)]

#collapse
removeZeros = (array, orientation) -> # orientation 0 = left/up, 1 = right/down
  newArray = [
  ]
  array = array.filter (x) -> x != 0

  if orientation == 1
    array = array.reverse()
  for n in [0..3]
    newArray[n] = array[n] || 0
  if orientation == 1
    newArray = newArray.reverse()
  newArray

#merge
shift = (direction) ->
  temp = []

  for i in [0..3]
    switch direction
      when 'up'
        temp = removeZeros(getColumn(i), 0) #up (38)
        temp = merge (temp)
        setColumn(temp,i)
      when 'left'
        temp = removeZeros(getRow(i), 0) #left (37)
        temp = merge (temp)
        setRow(temp,i)
      when 'right'
        temp = removeZeros(getRow(i), 1).reverse() #right (39)
        temp = (merge(temp)).reverse()
        setRow(temp,i)
      when 'down'
        temp = removeZeros(getColumn(i), 1).reverse() #down (40)
        temp = (merge (temp)).reverse()
        setColumn(temp,i)
    #temp = merge (temp)

    #for j in [0..2]
    #  if temp[j] == temp[j+1]
    #    temp[j] = parseInt(temp[j+1]) * 2
    #    addScore(temp[j])
    #    isWin(temp[j])
    #    temp[j+1] = 0
    #temp = removeZeros(temp, 0)

    #switch direction
    #  when 'up' then setColumn(temp,i)
    #  when 'left' then setRow(temp,i)
    #  when 'right' then setRow(temp.reverse(),i)
    #  when 'down' then setColumn(temp.reverse(),i)

merge = (temp) ->
  for j in [0..2]
      if temp[j] == temp[j+1]
        #copyOldBoard()
        temp[j] = parseInt(temp[j+1]) * 2
        addScore(temp[j])
        isWin(temp[j])
        temp[j+1] = 0
    temp = removeZeros(temp, 0)
  temp

setRow = (row, rowID) ->
  for colID in [0..3]
    board[rowID][colID] = row[colID]

setColumn = (column, colID) ->
  for rowID in [0..3]
    board[rowID][colID] = column[rowID]


getColumn = (column) ->
  [ board[0][column], board[1][column], board[2][column], board[3][column] ]

getRow = (row) ->
  [ board[row][0], board[row][1], board[row][2], board[row][3] ]



boardFull = ->
    #if board is full return true
    for n in [0..3]
      if 0 in board[n]
        return false
    true


fillTable = ->
  for row in [0..3]
    for col in [0..3]

        i = row+1
        j = col+1
        $("##{i}_#{j}").css( "background-color", getColor(board[row][col]) );
        if board[row][col] > 0
          $("##{i}_#{j}").html("<p>#{board[row][col]}</p>")
        else
          $("##{i}_#{j}").html('')
#     $('.cell').animate {width: 150}, 2000
#     $("##{i}_#{j}").animate({marginLeft:'+150px'}, 2000)
#      $('.cell').animate({
#          marginLeft: "110px"
#          })



copyOldBoard = ->
  for row in [0..3]
    for column in [0..3]
      oldboard[row][column] = board[row][column]


getColor = (value) ->
  color = ''
  switch value
    when 0 then color = 'rgb(255,255,255)'
    when 2 then color = 'rgb(200,255,200)'
    when 4 then color = 'rgb(150,255,150)'
    when 8 then color = 'rgb(100,255,100)'
    when 16 then color = 'rgb(50,255,50)'
    when 32 then color = 'rgb(0,255,0)'
    when 64 then color = 'rgb(0,220,0)'
    when 128 then color = 'rgb(0,190,0)'
    when 256 then color = 'rgb(0,160,0)'
    when 1024 then color = 'rgb(0,130,0)'
    else color = 'rgb(0,100,0)'

  color
