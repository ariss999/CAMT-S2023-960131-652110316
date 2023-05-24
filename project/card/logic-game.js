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
// var focusPlayer = document.getElementById("player");
// var focusBot1 = document.getElementById("bot1");
// var focusBot2 = document.getElementById("bot2");
// var focusBot3 = document.getElementById("bot3");

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
  var cardInHandbot1 = cardInHand[1];
  var cardInHandbot2 = cardInHand[2];
  var cardInHandbot3 = cardInHand[3];

  for (var idx = 0; idx < cardInHandPlayer.length; idx++) {
    var card = cardInHandPlayer[idx];
    var cardElmPlayer;

    if (card.value[0] === "♥" || card.value[0] === "♦") {
      cardElmPlayer = htmlToElem(
        [
          '<div class="card">',
          '<div class="card-title red">',
          card.value[0],
          '<div class="card-body" >',
          '<div class="card-title2 red">',
          card.value[1],
          "</div>",
          "</div>",
        ].join("")
      );
    } else {
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
    }

    index++;
    cardElmPlayer.setAttribute("id", card.id);
    cardPlayerZoneElm.append(cardElmPlayer);
  }

  for (var idx = 0; idx < cardInHandbot1.length; idx++) {
    var card = cardInHandbot1[idx];
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
  for (var idx = 0; idx < cardInHandbot2.length; idx++) {
    var card = cardInHandbot2[idx];
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

  for (var idx = 0; idx < cardInHandbot3.length; idx++) {
    var card = cardInHandbot3[idx];
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
          element.style.transform = "translateY(-60px)";
          // element.card.add("show");
        } else if (clickCount === 2) {
          console.log("Clicked card id for match:", currentCardValue);
          element.style.transform = "translateY(-60px)";
          // element.card.add("show");
          if (clickedCardValue[0] === clickedCardValue[1]) {
            element.style.transform = "translateY(0px)";
            console.log("you click the same card");
            console.log("array ckeck card match reset");
            clickedCardValue = [];
          }
        }
      } else {
        console.log("array ckeck card match reset");
        clickedCardValue = [];
      }
    });
  });

  // var focusPlayer = document.getElementById("player");
  // focusPlayer.setAttribute("class","focus-player play")

  window.localStorage.setItem("game-state", JSON.stringify(cardInHand));
  window.localStorage.setItem("game-draw", JSON.stringify(click));
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
  window.localStorage.setItem("game-state", JSON.stringify(cardInHand));
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

// function matchCards(player) {
//   var matchedCards = [];
//   var playerHand = cardInHand[player];

//   for (var i = 0; i < playerHand.length; i++) {
//     for (var j = 0; j < playerHand.length; j++) {
//       if (i != j) {
//         if (playerHand[i].value[1] === playerHand[j].value[1]) {
//           // Matching condition, adjust as per your game rules
//           matchedCards.push(playerHand[i]);
//           matchedCards.push(playerHand[j]);
//           removeCardFromHand(player, playerHand[j].id); // เรียกใช้ฟังก์ชัน removeCardFromHand เพื่อลบการ์ดที่ตำแหน่ง j
//           removeCardFromHand(player, playerHand[i].id); // เรียกใช้ฟังก์ชัน removeCardFromHand เพื่อลบการ์ดที่ตำแหน่ง i
//            // ลดค่าตัวแปร j เนื่องจากเราลบการ์ดออกจาก playerHand
//         }else{
//           console.log("same card")
//         }
//       }
//     }
//   }
//   console.log(matchedCards);
//   return matchedCards;
// }

function matchCards(player) {
  var matchedCards = [];
  var playerHand = cardInHand[player];

  for (var i = 0; i < playerHand.length; i++) {
    for (var j = i + 1; j < playerHand.length; j++) {
      if (playerHand[i].value[1] === playerHand[j].value[1]) {
        matchedCards.push(playerHand[i]);
        matchedCards.push(playerHand[j]);
      }
    }
  }

  for (var k = 0; k < matchedCards.length; k++) {
    var matchedCardId = matchedCards[k].id;
    removeCardFromHand(player, matchedCardId);
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

function rank() {
  var cardCount = [];
  for (var player = 0; player < CARD_PLAYER.length; player++) {
    cardCount.push({
      player: CARD_PLAYER[player],
      count: cardInHand[player].length,
      cardListPlayer: cardInHand[player],
    });
  }

  cardCount.sort(function (a, b) {
    return a.count - b.count;
  });

  var ranks = [];
  var rank = 1;
  for (var i = 0; i < cardCount.length; i++) {
    var player = cardCount[i].player;
    var playerr = cardCount[i].cardListPlayer;

    // Check if the card ID is 52
    for (var j = 0; j < cardCount[i].count; j++) {
      if (playerr[j].id === 52) {
        ranks[player] = 4; // Assign the rank as 4 for the player with card ID 52
      } else {
        ranks[player] = rank;
      }
    }
    rank++; // Increment the rank after assigning
  }
  console.log(cardCount);
  console.log("Ranks:", ranks);
}

function checkGameEnd() {
  for (var player = 0; player < CARD_PLAYER.length; player++) {
    if (cardInHand[player].length === 0) {
      console.log(
        "winner",
        CARD_PLAYER[player],
        "has no cards left. Game ends."
      );
      rank();
      //navigateToRank()
      return;
    }
  }
}

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

// function playerDraw() {
//   const elements = document.querySelectorAll(".card");
//   console.log("playyer draw");
//   elements.forEach((element, index) => {
//     element.addEventListener("click", (event) => {
//       var currentCardElm = event.currentTarget;
//       var currentCardId = currentCardElm.getAttribute("id");
//       console.log("Clicked card id:", currentCardId);
//       var playerIndex = getPlayerIndex(currentCardElm); // หาค่าดัชนีของผู้เล่นจากการ์ดที่ถูกคลิก
//       playerIndex = parseInt(playerIndex);
//       currentCardId = parseInt(currentCardId);
//       if (playerIndex == 1) {
//         drawCard(0, currentCardId);
//         removeCardFromHand(playerIndex, currentCardId); // เรียกใช้ฟังก์ชัน removeCardFromHand() เพื่อลบการ์ดที่ถูกคลิก
//         renderCardList(); // รีเรนเดอร์การ์ดใหม่หลังจากการ์ดถูกลบ
//       } else {
//         playerDraw();
//       }
//     });
//   });
// }

// function playerPlay() {
//   console.log("playyer play");
//   const elements = document.querySelectorAll(".card");
//   let clickCount = 0;
//   let clickedCardValue = []; // ตัวแปรสำหรับเก็บค่าการ์ดที่ถูกคลิก

//   elements.forEach((element, index) => {
//     element.addEventListener("click", (event) => {
//       var currentCardElm = event.currentTarget;
//       var currentCardValue = currentCardElm.getAttribute("value");
//       console.log("Clicked card value:", currentCardValue);
//       var playerIndex = getPlayerIndex(currentCardElm);
//       playerIndex = parseInt(playerIndex);
//       currentCardValue = parseInt(currentCardValue);

//       if (playerIndex == 0) {
//         clickCount++;
//         clickedCardValue.push(currentCardValue); // เพิ่มค่าการ์ดที่ถูกคลิกเข้าในอาร์เรย์ clickedCardIds

//         if (clickCount === 1) {
//           setTimeout(() => {
//             clickCount = 0;
//             clickedCardValue = []; // รีเซ็ตค่าการ์ดที่ถูกคลิก
//           }, 1000);
//         } else if (clickCount === 2) {
//           // กระทำหลังจากคลิกครั้งที่สอง

//           if (clickedCardValue[0] === clickedCardValue[1]) {
//             removeCardFromHand(playerIndex, clickedCardValue[0]);
//             removeCardFromHand(playerIndex, clickedCardValue[1]);
//           }
//           clickCount = 0;
//           clickedCardValue = [];
//         }
//       } else {
//         playerPlay();
//       }
//     });
//   });
// }

// function playerTurn() {
//   playerDraw();
//   playerPlay();
// }

function botTurn() {
  var focusPlayer = document.getElementById("player");
  var focusBot1 = document.getElementById("bot1");
  var focusBot2 = document.getElementById("bot2");
  var focusBot3 = document.getElementById("bot3");
  focusPlayer.setAttribute("class", "focus-player");

  console.log("bot play");
  for (var player = 1; player < CARD_PLAYER.length + 1; player++) {
    setTimeout(
      (player) => {
        console.log("bot :" + player);
        if (player == 1) {
          focusBot1.setAttribute("class", "focus-bot1 play");
          var card = cardInHand[player + 1];
          var randomCard = Math.floor(Math.random() * card.length);
          var id = parseInt(card[randomCard].id);
          // if (player != 3) {
          drawCard(player, id);
          removeCardFromHand(player + 1, id);
          matchCards(player);
          checkGameEnd();
          renderCardList();
        } else if (player == 2) {
          focusBot2.setAttribute("class", "focus-bot2 play");
          focusBot1.setAttribute("class", "focus-bot1");
          var card = cardInHand[player + 1];
          var randomCard = Math.floor(Math.random() * card.length);
          var id = parseInt(card[randomCard].id);
          // if (player != 3) {
          drawCard(player, id);
          removeCardFromHand(player + 1, id);
          matchCards(player);
          checkGameEnd();
          renderCardList();
        } else if (player == 3) {
          focusBot3.setAttribute("class", "focus-bot3 play");
          focusBot2.setAttribute("class", "focus-bot2");
          var card = cardInHand[0];
          var randomCard = Math.floor(Math.random() * card.length);
          id = parseInt(card[randomCard].id);
          drawCard(player, id);
          removeCardFromHand(0, id);
          matchCards(player);
          checkGameEnd();
          renderCardList();
        } else {
          focusBot3.setAttribute("class", "focus-bot3");
          focusPlayer.setAttribute("class", "focus-player play");
        }
      },
      player * 2000,
      player
    ); // เวลาล่าช้าในการทำงานของแต่ละเสต็บ (player * 1000 มิลลิวินาที)
  }
}

// function playGame() {
//   // Game loop
//   while (!checkGameEnd()) {
//     playerTurn();

//     var nextTrunButton = document.getElementsByClassName("button")[0];
//     nextTrunButton.addEventListener("click", function () {
//       botTurn();
//     });
//     console.log(checkGameEnd());
//     checkGameEnd();
//   }
// }

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
  var previousGameState = window.localStorage.getItem("game-state");
  var previousGameDraw = window.localStorage.getItem("game-draw");
  console.log(previousGameState);
  console.log(previousGameDraw);

  var focusPlayer = document.getElementById("player");
  focusPlayer.setAttribute("class", "focus-player play");

  if (previousGameState === null) {
    generateCards();
    printCart();
    console.log("shuffleCardList");
    shuffleCardList();
    printCart();
    shuffleNumberOfCard();
    dealCard();
    renderCardList();
    matchCards(0);
    matchCards(1);
    matchCards(2);
    matchCards(3);
    printCartInHand();
    console.log("start play game");
  } else {
    // renderCardList();
    cardInHand = JSON.parse(previousGameState);
    click = JSON.parse(previousGameDraw);
  }

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

  var reGameButton = document.getElementsByClassName("button-reGame")[0];
  reGameButton.addEventListener("click", function () {
    localStorage.removeItem("game-state");
    localStorage.removeItem("game-draw");
    generateCards();
    printCart();
    console.log("shuffleCardList");
    shuffleCardList();
    printCart();
    shuffleNumberOfCard();
    dealCard();
    renderCardList();
    matchCards(0);
    matchCards(1);
    matchCards(2);
    matchCards(3);
    printCartInHand();
    console.log("start play game");
    renderCardList();
    console.log("Regame Click");
    console.log("start play new game");
  });
};
