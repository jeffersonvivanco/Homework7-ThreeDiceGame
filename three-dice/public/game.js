/**
 * Created by jeffersonvivanco on 11/12/16.
 */



//Below: Returns an array with random dices according to the number of dices given
var rollFunction = function (numOfDie) {
    var rolledDices = [];
    for(var v=0; v<numOfDie; v++){
        var randomDie = Math.floor((Math.random()*5)+1);
        rolledDices.push(randomDie);
    }
    return rolledDices;
};

//Below: calculates user input and returns object with lowest elements chosen
var calculateUserInput = function (userInput) {

    var chooseSmallest = function (a, b) {
        return Math.min(a, b);
    };
    var dice = userInput.split(',');
    var fiveDie, fourDie, threeDie, twoDie, oneDie;
    if(dice.length === 15){
        fiveDie = parseInt(dice.slice(0,5).reduce(chooseSmallest));
        fourDie = parseInt(dice.slice(5,9).reduce(chooseSmallest));
        threeDie = parseInt(dice.slice(9,12).reduce(chooseSmallest));
        twoDie = parseInt(dice.slice(12,14).reduce(chooseSmallest));
        oneDie = parseInt(dice.slice(14,15).reduce(chooseSmallest));
        return {
            fiveDie : fiveDie,
            fourDie : fourDie,
            threeDie : threeDie,
            twoDie: twoDie,
            oneDie: oneDie,
            total : 0
        }
    }
    else{
        fiveDie = parseInt(rollFunction(5).reduce(chooseSmallest)); 
        fourDie = parseInt(rollFunction(4).reduce(chooseSmallest)); 
        threeDie = parseInt(rollFunction(3).reduce(chooseSmallest)); 
        twoDie = parseInt(rollFunction(2).reduce(chooseSmallest)); 
        oneDie = parseInt(rollFunction(1).reduce(chooseSmallest)); 
        return {
            fiveDie : fiveDie,
            fourDie : fourDie,
            threeDie : threeDie,
            twoDie: twoDie,
            oneDie: oneDie,
            total : 0
        }
    }

};
//below: Checks value and returns true value ex: 3 -> 0
var chckVal = function (num) {
  if(num == 3){
      return 0;
  }
  else{
      return num;
  }
};

document.addEventListener('DOMContentLoaded', function (event) {
    //Below: vars that rep. the current elements in the html
    var contentEle = document.getElementById('content');
    var gameEle = document.getElementById('game');
    var errMessEle = document.getElementById('error-message');
    var introEle = document.getElementById('intro');
    var inputEle  = document.getElementById('diceValues');
    var goBtn = document.getElementsByTagName('button')[0];
    goBtn.setAttribute('id','goButton');

    //Below: Hiding elements to show later
    errMessEle.classList.toggle('hide');
    gameEle.classList.toggle('hide');


    //Below: Creating divs for dices
    var dices  = document.createElement('div');
    dices.setAttribute('class', 'dices');
    for(var i=0; i<5; i++){
        var die = document.createElement('div');
        die.setAttribute('pinned', false);
        die.classList.toggle('diceInGame'); 
        dices.appendChild(die);
    }
    gameEle.appendChild(dices); //Adding dices div to div 'game'

    //Below: Creating start, roll, and pin buttons
    var strButton = document.createElement('button');
    var strButtonText = document.createTextNode('Start');
    strButton.appendChild(strButtonText);
    strButton.setAttribute('id', 'strButton');
    var rollButton = document.createElement('button');
    var rollButtonText = document.createTextNode('Roll');
    rollButton.appendChild(rollButtonText);
    rollButton.setAttribute('id','rollButton');
    rollButton.disabled = true;
    var pinButton = document.createElement('button');
    var pinButtonText = document.createTextNode('Pin');
    pinButton.appendChild(pinButtonText);
    pinButton.setAttribute('id', 'pinButton');
    pinButton.disabled = true;
    gameEle.appendChild(strButton);
    gameEle.appendChild(rollButton);
    gameEle.appendChild(pinButton);


    //Below: Creating func to display element to display comp score if user entered values
    var computerScore = 0; 
    var displayCompScoreFunc = function () {
        var displayCompScore = document.createElement('div');
        var compSc = calculateUserInput(inputEle.value);
        var total  = chckVal(compSc.fiveDie)+chckVal(compSc.fourDie)+chckVal(compSc.threeDie)+chckVal(compSc.twoDie)+chckVal(compSc.oneDie);
        computerScore = total; 
        var displayCompScoreText = document.createTextNode('Computer score: '+chckVal(compSc.fiveDie) + '('+compSc.fiveDie+') + '+
        chckVal(compSc.fourDie)+'('+compSc.fourDie+') + '+chckVal(compSc.threeDie)+'('+compSc.threeDie+') + '+chckVal(compSc.twoDie)+'('+
        compSc.twoDie+') + '+chckVal(compSc.oneDie)+'('+compSc.oneDie+') = '+ total);
        displayCompScore.appendChild(displayCompScoreText);
        gameEle.insertBefore(displayCompScore,userScoreEle);

    };


    //Below: Creating element to display user score
    var userScore = 0;
    var userScoreEle = document.createElement('div');
    userScoreEle.textContent = 'Your score: '+userScore; 
    userScoreEle.setAttribute('id','userScore');
    gameEle.insertBefore(userScoreEle, dices);







    //Below: Event listeners for buttons start, pin, roll, go, and die --********//// 
    var diceFun = function(evt){
            this.classList.toggle('clickedDie'); 
            var numClicked = document.querySelectorAll('.clickedDie'); 
            if(numClicked.length > 0){
                pinButton.disabled = false; 
            }
            else{
                pinButton.disabled = true; 
            }
    }
    pinButton.addEventListener('click', function(){
        var dice2  = document.querySelectorAll('.clickedDie'); 
        for(var i=0; i<dice2.length; i++){
            dice2[i].classList.toggle('clickedDie'); 
            dice2[i].classList.toggle('pinnedDie'); 
            dice2[i].setAttribute('pinned', 'true'); 
            dice2[i].classList.toggle('highlightDie'); 
            dice2[i].removeEventListener('click', diceFun); 
            userScore += chckVal(parseInt(dice2[i].textContent));
            var scoreEle = document.querySelector('#userScore');
            scoreEle.textContent = 'Your score: '+userScore; 
        }
        var dice3 = document.querySelectorAll('[pinned = false]'); 
        for(var b=0; b<dice3.length; b++){
            dice3[b].textContent = ' ';
            dice3[b].classList.toggle('highlightDie');
            dice3[b].removeEventListener('click',diceFun); 
        }
        if(dice3.length === 0){
           if(userScore > computerScore){
                console.log('You lose!');
                var loseEle = document.createElement('div'); 
                loseEle.textContent = 'You lose!'; 
                loseEle.classList.toggle('lose'); 
                gameEle.insertBefore(loseEle,dices);
           }
           else{
               console.log('You win!');
               var winEle = document.createElement('div'); 
               winEle.textContent = 'You win!'; 
               winEle.classList.toggle('win');
               gameEle.insertBefore(winEle,dices); 
           }
        }
        else{
            rollButton.disabled = false; 
            rollButton.classList.toggle('rollButton'); 
        }
        pinButton.disabled = true; 

    }); 
    rollButton.addEventListener('click', function(){
        rollButton.classList.toggle('rollButton'); 
        rollButton.disabled = true;
        var dice = document.querySelectorAll('[pinned = false]'); 
        
        for(var i=0; i<dice.length; i++){
            dice[i].classList.add('highlightDie');  
            var dieNum = document.createTextNode(Math.floor((Math.random()*5)+1));
            dice[i].appendChild(dieNum);

            dice[i].addEventListener('click', diceFun); 
        }
    });


    strButton.addEventListener('click', function(){
        displayCompScoreFunc(); //will display comp score if entered

        //Below: Getting rid of start button and listener for it 
      
        this.classList.toggle('hide');

        rollButton.disabled = false;
        rollButton.classList.toggle('rollButton');
    });
    
    goBtn.addEventListener('click', function (evt) {
        introEle.classList.toggle('hide');
        gameEle.classList.toggle('hide');
    });
    



});



