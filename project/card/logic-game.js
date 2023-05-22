function random(max) {
  return parseInt(Math.random() * max) % max;
}

function shuffleCardList() {
  cardList.sort(function () {
    return 0.5 - Math.random();
  });
}

function shuffleNumberOfCard() {
  NUMBER_OF_CARD.sort(function () {
    return 0.5 - Math.random();
  });
}

function htmlToElem(html) {
  let temp = document.createElement("template");
  html = html.trim(); // Never return a space text node as a result
  temp.innerHTML = html;
  return temp.content.firstChild;
}

var CARD_TYPE = ["♣", "♦", "♥", "♠"];
var CARD_NUMBER = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
var CARD_PLAYER = ["player", "bot1", "bot2", "bot3"];
var NUMBER_OF_CARD = [14, 13, 13, 13];
var cardList = []; //arraycardlist
var cardInHand = new Array(4); //ar
var clickedCardValue = []; // ตัวแปรสำหรับเก็บค่าการ์ดที่ถูกคลิก
var clickCount = 0;
var click = 0;

function renderCardList() {
  var cardPlayerZoneElm = document.getElementsByClassName("player-zone")[0];
  var cardBot1ZoneElm = document.getElementsByClassName("bot1-zone")[0];
  var cardBot2ZoneElm = document.getElementsByClassName("bot2-zone")[0];
  var cardBot3ZoneElm = document.getElementsByClassName("bot3-zone")[0];

  cardPlayerZoneElm.innerHTML = "";
  cardBot1ZoneElm.innerHTML = "";
  cardBot2ZoneElm.innerHTML = "";
  cardBot3ZoneElm.innerHTML = "";

  index = 0;

  var cardInHandPlayer = cardInHand[0];
  for (var idx = 0; idx < cardInHand[0].length; idx++) {
    var card = cardInHand[0][idx];
    var cardElmPlayer;
    cardElmPlayer = htmlToElem(
      [
        '<div class="card">',
        '<div class="card-title">',
        card.value[0],
        '<div class="card-body" >',
        '<div class="card-title2">',
        card.value[1],
        "</div>",
        "</div>",
      ].join("")
    );
    index++;
    cardElmPlayer.setAttribute("id", card.id);
    cardPlayerZoneElm.append(cardElmPlayer);
  }

  for (var idx = 0; idx < cardInHand[1].length; idx++) {
    var card = cardInHand[1][idx];
    var cardElmBot1;

    cardElmBot1 = htmlToElem(
      [
        '<div class="card bot1">',
        '<img src="Moth in the Night - Copy - Copy.jpg" style="width: 150px">',
        '<div class="card-title"></div>',
        '<div class="card-body"></div>',
        '<div class="card-title2"></div>',
        "</div>",
      ].join("")
    );
    index++;
    cardElmBot1.setAttribute("id", card.id);
    cardBot1ZoneElm.append(cardElmBot1);
  }
  for (var idx = 0; idx < cardInHand[2].length; idx++) {
    var card = cardInHand[2][idx];
    var cardElmBot2;
    cardElmBot2 = htmlToElem(
      [
        '<div class="card bot2">',
        '<img src="Moth in the Night - Copy - Copy.jpg" style="width: 150px">',
        '<div class="card-title"></div>',
        '<div class="card-body"></div>',
        '<div class="card-title2"></div>',
        "</div>",
      ].join("")
    );
    index++;
    cardElmBot2.setAttribute("id", card.id);
    cardBot2ZoneElm.append(cardElmBot2);
  }

  for (var idx = 0; idx < cardInHand[3].length; idx++) {
    var card = cardInHand[3][idx];
    var cardElmBot3;
    cardElmBot3 = htmlToElem(
      [
        '<div class="card bot3">',
        '<img src="Moth in the Night - Copy - Copy.jpg" style="width: 150px">',
        '<div class="card-title"></div>',
        '<div class="card-body"></div>',
        '<div class="card-title2"></div>',
        "</div>",
      ].join("")
    );
    index++;
    cardElmBot3.setAttribute("id", card.id);
    cardBot3ZoneElm.append(cardElmBot3);
  }

  const elements = document.querySelectorAll(".card");
  console.log("player draw");
  elements.forEach((element, index) => {
    element.addEventListener("click", (event) => {
      var currentCardElm = event.currentTarget;
      var currentCardId = currentCardElm.getAttribute("id");
      // console.log("Clicked card id:", currentCardId);
      var playerIndex = getPlayerIndex(currentCardElm); // หาค่าดัชนีของผู้เล่นจากการ์ดที่ถูกคลิก
      playerIndex = parseInt(playerIndex);
      currentCardId = parseInt(currentCardId);
      if (playerIndex === 1) {
        if (click != 1) {
          click++;
          console.log("Clicked card id:", currentCardId);
          drawCard(0, currentCardId);
          removeCardFromHand(playerIndex, currentCardId); // เรียกใช้ฟังก์ชัน removeCardFromHand() เพื่อลบการ์ดที่ถูกคลิก
          currentCardId;
          renderCardList(); // รีเรนเดอร์การ์ดใหม่หลังจากการ์ดถูกลบ
          checkGameEnd();
          // matchCards(0);
          // checkGameEnd();
          // botTurn();
        } else {
          console.log("you can draw next turn");
        }
      } else {
        currentCardId = null;
      }
    });
  });

  const elementsMatch = document.querySelectorAll(".card");
  elementsMatch.forEach((element, index) => {
    element.addEventListener("click", (event) => {
      var currentCardElm = event.currentTarget;
      var currentCardValue = currentCardElm.getAttribute("id");
      // console.log("Clicked card id for match:", currentCardValue);
      var playerIndex = getPlayerIndex(currentCardElm);
      playerIndex = parseInt(playerIndex);
      currentCardValue = parseInt(currentCardValue);
      if (playerIndex === 0) {
        clickCount++;
        clickedCardValue.push(currentCardValue); // เพิ่มค่าการ์ดที่ถูกคลิกเข้าในอาร์เรย์ clickedCardIds

        if (clickCount === 1) {
          console.log("Clicked card id for match:", currentCardValue);
          // setTimeout(() => {
          //   clickCount = 0;
          //   clickedCardValue = []; // รีเซ็ตค่าการ์ดที่ถูกคลิก
          // }, 1000);
        } else if (clickCount === 2) {
          console.log("Clicked card id for match:", currentCardValue);
          // กระทำหลังจากคลิกครั้งที่สอง

          // var cardmatch = []
          // var test = cardInHand[0];
          // for(var idx=0; idx<test.length; idx++){
          //   if(test[idx].id === clickedCardValue[0]){
          //     cardmatch.push(test[idx].value[1]);
          //   }
          //   if(test[idx].id === clickedCardValue[1]){
          //     cardmatch.push(test[idx].value[1]);
          //   }

          // }

          // if (cardmatch[0] === cardmatch[1]) {
          //   removeCardFromHand(0, clickedCardValue[0]);
          //   removeCardFromHand(0, clickedCardValue[1]);
          // }
          // clickCount = 0;
          // clickedCardValue = [];
        }
      } else {
        console.log("array ckeck card match reset");
        clickedCardValue = [];
      }
    });
  });

  // window.localStorage.setItem("game-state0", JSON.stringify(cardInHand)[0]);
  // window.localStorage.setItem("game-state1", JSON.stringify(cardInHand)[1]);
  // window.localStorage.setItem("game-state2", JSON.stringify(cardInHand)[2]);
  // window.localStorage.setItem("game-state3", JSON.stringify(cardInHand)[3]);

  
}

function getPlayerIndex(cardElement) {
  var playerZoneElms = document.querySelectorAll(
    ".player-zone, .bot1-zone, .bot2-zone, .bot3-zone"
  );
  for (var i = 0; i < playerZoneElms.length; i++) {
    if (playerZoneElms[i].contains(cardElement)) {
      return i;
    }
  }
  return -1; // หากไม่พบดัชนีของผู้เล่น
}

function dealCard() {
  let index = 0;
  for (var player = 0; player < CARD_PLAYER.length; player++) {
    cardInHand[player] = [];
    if (player == 0) {
      for (var idx = 0; idx < NUMBER_OF_CARD[player]; idx++) {
        cardInHand[player].push({
          id: cardList[index].id,
          value: [cardList[index].value[0], cardList[index].value[1]],
          isFaceDown: false,
        });
        index++;
      }
    } else {
      for (var idx = 0; idx < NUMBER_OF_CARD[player]; idx++) {
        cardInHand[player].push({
          id: cardList[index].id,
          value: [cardList[index].value[0], cardList[index].value[1]],
          isFaceDown: cardList[index].isFaceDown,
        });
        index++;
      }
    }
  }
}

function generateCards() {
  let value = 0;

  for (let type = 0; type < CARD_TYPE.length; type++) {
    for (let number = 0; number < CARD_NUMBER.length; number++) {
      //cardList[value] = new Array(2);
      cardList.push({
        id: value,
        value: [CARD_TYPE[type], CARD_NUMBER[number]],
        isFaceDown: true,
      });
      value++;
    }
  }

  cardList.push({
    id: value,
    value: [777, 777],
    isFaceDown: true,
  });
}

function printCart() {
  for (var idx = 0; idx < cardList.length; idx++) {
    console.log(
      cardList[idx].id,
      cardList[idx].value[0],
      cardList[idx].value[1]
    );
  }
}

function printCartInHand() {
  for (var player = 0; player < CARD_PLAYER.length; player++) {
    console.log(player);
    for (
      var numberOfcard = 0;
      numberOfcard < NUMBER_OF_CARD[player];
      numberOfcard++
    ) {
      console.log();
    }
    console.log(cardInHand[player]);
  }
}

function removeCardFromHand(player, cardId) {
  var playerHand = cardInHand[player];
  for (var i = 0; i < playerHand.length; i++) {
    if (playerHand[i].id === cardId) {
      playerHand.splice(i, 1); // ลบการ์ดออกจากอาร์เรย์ cardInHand
      console.log("removed");
      var cardElement = document.getElementById(cardId);
      if (cardElement) {
        cardElement.parentNode.removeChild(cardElement); // ลบองค์ประกอบที่สอดคล้องออกจาก DOM
      }
      break; // หยุดการทำงานของลูป for เมื่อลบการ์ดและองค์ประกอบออกจาก DOM แล้ว
    }
  }
}

function drawCard(player, id) {
  console.log("draw card : ");
  var anotherPlayer;

  if (player < 3) {
    anotherPlayer = cardInHand[player + 1];
  } else {
    anotherPlayer = cardInHand[0];
  }

  if (player == 0) {
    for (var idx = 0; idx < anotherPlayer.length; idx++) {
      if (anotherPlayer[idx].id === id) {
        cardInHand[player].push({
          id: id,
          value: [anotherPlayer[idx].value[0], anotherPlayer[idx].value[1]],
          isFaceDown: false,
        });
        console.log(anotherPlayer[idx].value[0], anotherPlayer[idx].value[1]);
        break;
      }
    }
  } else {
    for (var idx = 0; idx < anotherPlayer.length; idx++) {
      if (anotherPlayer[idx].id === id) {
        cardInHand[player].push({
          id: id,
          value: [anotherPlayer[idx].value[0], anotherPlayer[idx].value[1]],
          isFaceDown: true,
        });
        console.log(anotherPlayer[idx].value[0], anotherPlayer[idx].value[1]);
        break;
      }
    }
  }
}

function matchCards(player) {
  var matchedCards = [];
  var playerHand = cardInHand[player];

  for (var i = 0; i < playerHand.length; i++) {
    for (var j = i + 1; j < playerHand.length; j++) {
      if (playerHand[i].value[1] === playerHand[j].value[1]) {
        // Matching condition, adjust as per your game rules
        matchedCards.push(playerHand[i]);
        matchedCards.push(playerHand[j]);
        removeCardFromHand(player, playerHand[j].id); // เรียกใช้ฟังก์ชัน removeCardFromHand เพื่อลบการ์ดที่ตำแหน่ง j
        removeCardFromHand(player, playerHand[i].id); // เรียกใช้ฟังก์ชัน removeCardFromHand เพื่อลบการ์ดที่ตำแหน่ง i
        j--; // ลดค่าตัวแปร j เนื่องจากเราลบการ์ดออกจาก playerHand
      }
    }
  }
  console.log(matchedCards);
  return matchedCards;
}

//check game end
function checkGameEnd() {
  console.log("check game end");
  for (let player = 0; player < CARD_PLAYER.length; player++) {
    const playerName = CARD_PLAYER[player];

    if (cardInHand[player].length === 0) {
      console.log(
        `${playerName} has an empty hand. They are eliminated from the game.`
      );
      rank(playerName);
      return true;
    }
  }

  return false;
}

function rank(winner) {
  console.log("1st: " + winner);

  var sortedPlayers = CARD_PLAYER.sort(
    (a, b) => cardInHand[a].length - cardInHand[b].length
  );
  for (let i = 0; i < sortedPlayers.length; i++) {
    const playerName = sortedPlayers[i];
    const oddCard = 777;

    if (cardInHand[playerName].includes(oddCard)) {
      console.log(
        `${playerName} has the odd card ("Old Maid"). They are eliminated from the game.`
      );
      console.log("4th: " + playerName);
    } else {
      switch (i) {
        case 1:
          console.log("2nd: " + playerName);
          break;
        case 2:
          console.log("3rd: " + playerName);
          break;
      }
    }
  }
}

// function checkGameEnd (){
//   for(var player = 0; player<CARD_PLAYER.length; player++ ){
//     const playerName = CARD_PLAYER[player];
//     var winner;
//       if(cardInHand[player].length === 0)
//       {
//         console.log(`winner`);
//         console.log(`${playerName} has an empty hand. They are eliminated from the game.`);
//         winner=playerName;
//         rank(winner);
//           return true;
//       }else{
//           console.log("continue")
//           return false;
//       }
//   }

// }

// function rank(winner)
// {
//   console.log('1st : '+winner);
//   let i = 0;
//   var fourth;
//   while(CARD_PLAYER[i] !== winner )
//   {

//     i++;
//   }
//   for(var player = 0; player<CARD_PLAYER.length; player++ ){
//     const playerName = CARD_PLAYER[player];
//     const oddCard = 777;

//   if (cardInHand[player].includes(oddCard)) {
//     console.log(`${playerName} has the odd card ("Old Maid"). They are eliminated from the game.`);
//     fourth = playerName;
//   }
//  }
// }

// function drawCard()
// {

// }
// cardElm.value = card
// cardElm.addEventListener('click', function(event) {

//   var currentCardValue = event.currentTarget.value
//   if (currentCardValue.isFaceDown === true) {

//     for(var cardIdx=0; cardIdx < cardList.length; cardIdx++) {
//       if (cardList[cardIdx].id === currentCardValue.id) {
//         cardList[cardIdx].isFaceDown = false
//       }
//     }
//     window.localStorage.setItem('game-state', JSON.stringify(cardList))
//     renderCardList()

//     // setTimeout(function() {
//     //   for(var cardIdx=0; cardIdx < cardList.length; cardIdx++) {
//     //     cardList[cardIdx].isFaceDown = true
//     //   }
//     //   renderCardList()
//     // }.bind(this), 2000)
//   }

// })

//

function playerDraw() {
  const elements = document.querySelectorAll(".card");
  console.log("playyer draw");
  elements.forEach((element, index) => {
    element.addEventListener("click", (event) => {
      var currentCardElm = event.currentTarget;
      var currentCardId = currentCardElm.getAttribute("id");
      console.log("Clicked card id:", currentCardId);
      var playerIndex = getPlayerIndex(currentCardElm); // หาค่าดัชนีของผู้เล่นจากการ์ดที่ถูกคลิก
      playerIndex = parseInt(playerIndex);
      currentCardId = parseInt(currentCardId);
      if (playerIndex == 1) {
        drawCard(0, currentCardId);
        removeCardFromHand(playerIndex, currentCardId); // เรียกใช้ฟังก์ชัน removeCardFromHand() เพื่อลบการ์ดที่ถูกคลิก
        renderCardList(); // รีเรนเดอร์การ์ดใหม่หลังจากการ์ดถูกลบ
      } else {
        playerDraw();
      }
    });
  });
}

function playerPlay() {
  console.log("playyer play");
  const elements = document.querySelectorAll(".card");
  let clickCount = 0;
  let clickedCardValue = []; // ตัวแปรสำหรับเก็บค่าการ์ดที่ถูกคลิก

  elements.forEach((element, index) => {
    element.addEventListener("click", (event) => {
      var currentCardElm = event.currentTarget;
      var currentCardValue = currentCardElm.getAttribute("value");
      console.log("Clicked card value:", currentCardValue);
      var playerIndex = getPlayerIndex(currentCardElm);
      playerIndex = parseInt(playerIndex);
      currentCardValue = parseInt(currentCardValue);

      if (playerIndex == 0) {
        clickCount++;
        clickedCardValue.push(currentCardValue); // เพิ่มค่าการ์ดที่ถูกคลิกเข้าในอาร์เรย์ clickedCardIds

        if (clickCount === 1) {
          setTimeout(() => {
            clickCount = 0;
            clickedCardValue = []; // รีเซ็ตค่าการ์ดที่ถูกคลิก
          }, 1000);
        } else if (clickCount === 2) {
          // กระทำหลังจากคลิกครั้งที่สอง

          if (clickedCardValue[0] === clickedCardValue[1]) {
            removeCardFromHand(playerIndex, clickedCardValue[0]);
            removeCardFromHand(playerIndex, clickedCardValue[1]);
          }
          clickCount = 0;
          clickedCardValue = [];
        }
      } else {
        playerPlay();
      }
    });
  });
}

function playerTurn() {
  playerDraw();
  playerPlay();
}

function botTurn() {
  console.log("bot play");
  for (var player = 1; player < CARD_PLAYER.length; player++) {
    console.log("bot :" + player);
    if (player < 3) {
      var card = cardInHand[player + 1];
      var randomCard = Math.floor(Math.random() * card.length);
      id = parseInt(card[randomCard].id);
      if (player != 3) {
        drawCard(player, id);
        removeCardFromHand(player + 1, id);
        matchCards(player);
        checkGameEnd();
        renderCardList();
      } else {
        drawCard(player, id);
        removeCardFromHand(0, id);
        matchCards(player);
        checkGameEnd();
        renderCardList();
      }
    } else {
      var card = cardInHand[0];
      var randomCard = Math.floor(Math.random() * card.length);
      id = parseInt(card[randomCard].id);
      if (player != 3) {
        drawCard(player, id);
        removeCardFromHand(player + 1, id);
        matchCards(player);
        checkGameEnd();
        renderCardList();
      } else {
        drawCard(player, id);
        removeCardFromHand(0, id);
        matchCards(player);
        checkGameEnd();
        renderCardList();
      }
    }
  }
}

function playGame() {
  // Game loop
  while (!checkGameEnd()) {
    playerTurn();

    var nextTrunButton = document.getElementsByClassName("button")[0];
    nextTrunButton.addEventListener("click", function () {
      botTurn();
    });
    console.log(checkGameEnd());
    checkGameEnd();
  }
}

function match(clickedCardValue) {
  var cardmatch = [];
  var test = cardInHand[0];
  for (var idx = 0; idx < test.length; idx++) {
    if (test[idx].id === clickedCardValue[0]) {
      cardmatch.push(test[idx].value[1]);
    }
    if (test[idx].id === clickedCardValue[1]) {
      cardmatch.push(test[idx].value[1]);
    }
  }

  if (cardmatch[0] === cardmatch[1]) {
    console.log("match");
    removeCardFromHand(0, clickedCardValue[0]);
    removeCardFromHand(0, clickedCardValue[1]);
  } else {
    console.log("not match");
  }
  clickCount = 0;
  clickedCardValue = [];
}

window.onload = function () {
  // var previousGameState0 = window.localStorage.getItem("game-state0");
  // var previousGameState1 = window.localStorage.getItem("game-state1");
  // var previousGameState2 = window.localStorage.getItem("game-state2");
  // var previousGameState3 = window.localStorage.getItem("game-state3");

  // console.log(previousGameState0);
  // console.log(previousGameState1);
  // console.log(previousGameState2);
  // console.log(previousGameState3);

  // if (previousGameState0 === null && previousGameState1 === null && previousGameState2 === null && previousGameState3 === null) {
  //   generateCards();
  //   printCart();
  //   console.log("shuffleCardList");
  //   shuffleCardList();
  //   printCart();
  //   shuffleNumberOfCard();
  //   dealCard();
  //   renderCardList();
  //   //setInterval(function() {
  //   matchCards(0);
  //   matchCards(1);
  //   matchCards(2);
  //   matchCards(3);
  //   //}, 2000); // ค่าที่ระบุระยะเวลาในมิลลิวินาที (ในที่นี้คือ 2000 มิลลิวินาที = 2 วินาที)

  //   renderCardList();
  //   printCartInHand();
  //   console.log("start play game");
  // } else {
  //   renderCardList();
  //   window.localStorage.setItem("game-state0", JSON.stringify(cardInHand)[0]);
  //   window.localStorage.setItem("game-state1", JSON.stringify(cardInHand)[1]);
  //   window.localStorage.setItem("game-state2", JSON.stringify(cardInHand)[2]);
  //   window.localStorage.setItem("game-state3", JSON.stringify(cardInHand)[3]);
  // }

  generateCards();
  printCart();
  console.log("shuffleCardList");
  shuffleCardList();
  printCart();
  shuffleNumberOfCard();
  dealCard();
  renderCardList();
  //setInterval(function() {
  matchCards(0);
  matchCards(1);
  matchCards(2);
  matchCards(3);
  //}, 2000); // ค่าที่ระบุระยะเวลาในมิลลิวินาที (ในที่นี้คือ 2000 มิลลิวินาที = 2 วินาที)

  renderCardList();
  printCartInHand();
  console.log("start play game");
  renderCardList();

  var nexturnButton = document.getElementsByClassName("button")[0];
  nexturnButton.addEventListener("click", function () {
    if (click == 1) {
      botTurn();
      click = 0;
    } else {
      console.log("you must draw card before click this button");
    }
  });

  var matchButton = document.getElementsByClassName("button-match")[0];
  matchButton.addEventListener("click", function () {
    match(clickedCardValue);
    renderCardList();
    checkGameEnd();
  });
};
