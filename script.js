document.addEventListener('DOMContentLoaded', ()=>{

    const squares = document.querySelectorAll(".grid div");
    const timeLeft = document.getElementById('time-left');
    const result = document.getElementById('result');
    const startBtn = document.querySelector('#btn');
    const carsLeft = document.querySelectorAll('.car-left');
    const carsRight = document.querySelectorAll('.car-right');
    const logsLeft = document.querySelectorAll('.log-left');
    const logsRight = document.querySelectorAll('.log-right');

    const width = 9;
    let currenIndex = 76;
    let timerId;
    let currentTime = 20

    // render fron in starting block
    squares[currenIndex].classList.add('frog');

    // move frog
    function moveFrog(e){
        squares[currenIndex].classList.remove('frog');

        switch(e.keyCode){
            
            case 37 :
                if(currenIndex%width != 0) currenIndex -= 1;
                break;

            case 38:
                if(currenIndex-width >= 0 ) currenIndex -= width;
                break;

            case 39:
                if(currenIndex % width < width-1 ) currenIndex += 1;
                break;

            case 40:
                if(currenIndex + width < (width*width)) currenIndex += width;
                break;
        }

        squares[currenIndex].classList.add('frog');
    }

    document.addEventListener('keyup',moveFrog);


    // move cars
    function autoMoveCars() {
        carsLeft.forEach(carLeft => moveCarLeft(carLeft));
        carsRight.forEach(carRight => moveCarRight(carRight));
    }

    // move car left
    function moveCarLeft(carLeft){

        switch(true){

            case carLeft.classList.contains('c1'):
                carLeft.classList.remove('c1');
                carLeft.classList.add('c2');
                break;

            case carLeft.classList.contains('c2'):
                carLeft.classList.remove('c2');
                carLeft.classList.add('c3');
                break;
            case carLeft.classList.contains('c3'):
                carLeft.classList.remove('c3');
                carLeft.classList.add('c1');
                break;
        }
    }
    // move car right
    function moveCarRight(carRight){

        switch(true){

            case carRight.classList.contains('c1'):
                carRight.classList.remove('c1');
                carRight.classList.add('c3');
                break;

            case carRight.classList.contains('c2'):
                carRight.classList.remove('c2');
                carRight.classList.add('c1');
                break;
            case carRight.classList.contains('c3'):
                carRight.classList.remove('c3');
                carRight.classList.add('c2');
                break;
        }
    }

    // move logs
    function autoMoveLogs() {
        logsLeft.forEach(logLeft => moveLogLeft(logLeft));
        logsRight.forEach(logRight => moveLogRight(logRight));
    }

    // move log left
    function moveLogLeft(logLeft){

        switch(true){

            case logLeft.classList.contains('l1'):
                logLeft.classList.remove('l1');
                logLeft.classList.add('l2');
                break;
            case logLeft.classList.contains('l2'):
                logLeft.classList.remove('l2');
                logLeft.classList.add('l3');
                break;
            case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3');
                logLeft.classList.add('l4');
                break;
            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4');
                logLeft.classList.add('l5');
                break;
            case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5');
                logLeft.classList.add('l1');
                break;
        }
    }
    // move car right
    function moveLogRight(logRight){

        switch(true){

            case logRight.classList.contains('l1'):
                logRight.classList.remove('l1');
                logRight.classList.add('l5');
                break;
            case logRight.classList.contains('l2'):
                logRight.classList.remove('l2');
                logRight.classList.add('l1');
                break;
            case logRight.classList.contains('l3'):
                logRight.classList.remove('l3');
                logRight.classList.add('l2');
                break;
            case logRight.classList.contains('l4'):
                logRight.classList.remove('l4');
                logRight.classList.add('l3');
                break;
            case logRight.classList.contains('l5'):
                logRight.classList.remove('l5');
                logRight.classList.add('l4');
                break;
        }
    }

    // for win
    function win(){
        if(squares[4].classList.contains('frog')){
            result.innerHTML = "You Win!";
            alert("You Win");
            squares[currenIndex].classList.remove('frog');
            clearInterval(timerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }

    // for loose
    function lose(){
        if((currentTime == 0) || squares[currenIndex].classList.contains('c1') || 
            squares[currenIndex].classList.contains('l5') || 
            squares[currenIndex].classList.contains('l4') ) {
            result.innerHTML = "You Lose!";
            squares[currenIndex].classList.remove('frog');
            clearInterval(timerId);
            document.removeEventListener('keyup', moveFrog);
        }
    }
    
    //move the frog when its on the log moving left
    function moveWithLogLeft() {
        if (currenIndex >= 27 && currenIndex < 35) {
            squares[currenIndex].classList.remove('frog')
            currenIndex += 1
            squares[currenIndex].classList.add('frog')
        }
    }

    //move the frog when its on the log moving right
    function moveWithLogRight() {
        if (currenIndex > 18 && currenIndex <= 26) {
            squares[currenIndex].classList.remove('frog')
            currenIndex -= 1
            squares[currenIndex].classList.add('frog')
        }
    }
        
    //all the functions that move pieces
    function movePieces() {
        currentTime--;
        timeLeft.textContent = currentTime;
        autoMoveCars()
        autoMoveLogs()
        moveWithLogLeft()
        moveWithLogRight()
        lose()
        win()
    }

    //to start, and pause the game
    startBtn.addEventListener('click', () => {
        if(timerId) {
        clearInterval(timerId)
        } else {
        timerId = setInterval(movePieces, 500)
        document.addEventListener('keyup', moveFrog)
        }
    })

})