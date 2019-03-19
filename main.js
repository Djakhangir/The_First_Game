//the game is about random poppings up of the mole and when you click it it will count, the game is 10 seconds long but 
//where and how long the mole is going to be popped up is totally random;

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

        //--------------------Fn that randomly throw the numbers we indicate between max and min--------------------//

function randomTime(min, max){
return Math.round(Math.random() * (max - min) + min);
}

        //---------------------- Pick the random hole where Mole will pop up from-----------------------//

function randomHole(holes){ // don't forget that querySelector returns nodeList not an array and the length of it is going to be 6 as all holes
    const idx  = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('Nuh, it is the same');
        return randomHole(holes);
    }
lastHole = hole; // save as the reference of the last hole popped up to avoid repetition of the mole;
return hole;
}

                    //-----------------------to pop up on a random time with a random mole-----------------//

function peep(){
    const time = randomTime(200, 1000); 
    const hole = randomHole(holes);
    hole.classList.add('up'); // adding the class up to peep fn to trigger our css file;
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) 
        peep();
    }, time)
}

                    //--------------------------To Start game from the beginning------------------------------//
function startGame() {
    scoreBoard.textContent = 0; // to reset the scoreBoard of the game;
    timeUp = false; // even though we defined it on page load we have to do it on every game reload;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000) //to stop the game after 10 seconds;
}

                    //--------------------------to bonk the head and count as a score-----------------------//
function bonk(e) {
    if (!e.isTrusted) // events have the property as isTrusted to avoid cheaters to fake the click by assigning it manually to true;
    return;
    score++; //when smacked increment
    this.classList.remove('up'); // when smack the head remove the class up too;
    scoreBoard.textContent = score;
}

                //------------------------------to listen the click on each of the bonk ----------------------//

moles.forEach(mole => mole.addEventListener('click', bonk));