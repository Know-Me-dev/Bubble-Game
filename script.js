var timer = 60;
var hit = 0;
var score = 0;
var timerInt; 


function makeBubble() {
    var bubbleNumbers = new Set(); // To track the unique numbers in the bubbles
    var numBubbles = 100; 

    if (window.innerWidth < 700) {
        numBubbles = 54; 
    }

    while (bubbleNumbers.size < 10) {
        bubbleNumbers.clear(); 
        var clutter = "";

        for (var i = 1; i <= numBubbles; i++) {
            var random = Math.floor(Math.random() * 10);
            bubbleNumbers.add(random);
            clutter += `<div class="bubble">
                         <div class="bubble-content">${random}</div>
                        </div>`;
        }
    }

    document.querySelector("#pbtm").innerHTML = clutter;
}






function runTimer(){
    timerInt = setInterval(function(){
        if (timer > 0){
            timer--;
            document.querySelector("#timerVal").textContent = timer;
        } else {
            clearInterval(timerInt); 
            document.querySelector("#pbtm").innerHTML = 
            `
            <div class="restartDiv">
            <h1 class="gameover-title">Game Over</h1>
            <br>
            <h1 class="score-title" > Score: ${score}</h1>
            <button onclick="restart()" id="restartBtn">Restart</button>
            </div>
            `;
        }    
    }, 1000);
}



function restart(){
    clearInterval(timerInt); 
    timer = 60; 
    score = 0; 
    document.querySelector("#scoreVal").textContent = 0;
    document.querySelector("#timerVal").textContent = timer;
    document.querySelector("#pbtm").innerHTML = ''; 
    startGame();
}


function getNewHit(){
    hit = Math.floor(Math.random()*10)
    document.querySelector("#hitVal").textContent = hit;
}

function incScore(){
    score += 10;
    document.querySelector("#scoreVal").textContent = score;
}

function decScore(){
    score -= 1;
    document.querySelector("#scoreVal").textContent = score;
    
}

document.querySelector("#pbtm").addEventListener('click', function(event) {
    var clickedBubble = event.target.closest(".bubble");

    if (clickedBubble) {
        var hitNum = Number(clickedBubble.querySelector(".bubble-content").innerHTML);

        if (hitNum === hit) {
            incScore();
            makeBubble();
            getNewHit();
        } else if (hitNum !== hit) {
            decScore();

       
            clickedBubble.style.backgroundColor = "rgb(204, 55, 35)";

            // Reset the background color after a short delay
            setTimeout(function() {
                clickedBubble.style.transition = "background-color 0.5s ease";
                clickedBubble.style.backgroundColor = "rgb(37, 83, 66)";
            }, 1000); 
        }
    }
});




function startGame(){
    makeBubble();
    runTimer();
    getNewHit();
}