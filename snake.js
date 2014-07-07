var snake = (function(){
    var currX, currY, currDirection, gridRows, gridColumns, animationID, lastStep, currScore, isGameOver;

    const LEFT_ARROW = 37;
    const UP_ARROW = 38;
    const RIGHT_ARROW = 39;
    const DOWN_ARROW = 40;

    const ENTER_KEY = 13;

    const speed = 30;

    const LS_KEY = "snakeHighScores";

    function init(numRows,numColumns){
        //Wire up handlers
        $(document).on("keydown",handleKeyDown);
        $(document).on("touchstart",handleTouch);

        //Create Grid
        gridRows = numRows;
        gridColumns = numColumns;
        makeGrid(numRows,numColumns);
        buildHighScore();
        isGameOver = true;
    }

    function start(){
        $("h1").text("Super Snake Game").css("color","black");
        $(".snakeBody").removeClass("snakeBody");

        currScore = 0;

        //Set Starting position
        currX = Math.floor(gridColumns / 2);
        currY = Math.floor(gridRows / 2);
        currDirection = UP_ARROW;

        paintBox(currX,currY);

        //Start game loop
        animationID = requestAnimationFrame(gameLoop);
        isGameOver = false;
    }

    function makeGrid(numRows,numColumns){
        var $block, $row, i, $board = $("#snakeBoard");

        $block = $("<div/>").css({
            height: parseInt($board.css("height"))/numRows + "px",
            width: parseInt($board.css("width"))/numColumns  + "px"
        }).addClass("block");

        $row = $("<div/>").addClass("row");

        for(i=0; i<numColumns; i++){
            $row.append($block.clone());
        }

        $row.append($("<div/>"));
        for(i=0; i<numRows; i++){
            $board.append($row.clone());
        }
    }

    function buildHighScore(){
        var scores = JSON.parse(localStorage.getItem(LS_KEY)),
            $list = $("#highScores").find("ol"),
            temp;

        $list.html(" ");

        if(scores === null){
            scores = [];
            localStorage.setItem(LS_KEY, JSON.stringify(scores));
        }

        $.each(scores,function(idx, val){
            temp = $("<li/>").text(val.name + " - " + val.score);
            $list.append(temp);
        });
    }

    function gameLoop(ts){
        if (lastStep === undefined) lastStep = ts;

        if(ts - lastStep > speed){
            lastStep = ts;

            if(!growSnake()){
                cancelAnimationFrame(animationID);
                gameOver();
                return; //game over
            }
            currScore++;
            $("#scoreDisplay").text(currScore);
        }

        animationID = requestAnimationFrame(gameLoop);
    }

    function gameOver(){
        var scores = JSON.parse(localStorage.getItem(LS_KEY));

        $("h1").text("GAME OVER").css("color","red");

        scores.push({
            name:"Facu",
            score: currScore
        });

        scores.sort(function(a,b){ return b.score - a.score});
        scores = scores.slice(0,10);

        localStorage.setItem(LS_KEY, JSON.stringify(scores));

        buildHighScore();
        isGameOver = true;
    }

    function growSnake(){
        switch(currDirection){
            case UP_ARROW:
                currY--;
                if(currY < 0) return false;
                break;

            case DOWN_ARROW:
                currY++;
                if(currY >= gridRows) return false;
                break;

            case LEFT_ARROW:
                currX--;
                if(currX < 0) return false;
                break;

            case RIGHT_ARROW:
                currX++;
                if(currX >= gridColumns) return false;
                break;
        }

        return paintBox(currX,currY);
    }

    function handleKeyDown(e){
        var keyPressed = e.which;

        //Don't change direction if its the current direction or if its the direct opposite
        if(keyPressed >= LEFT_ARROW && keyPressed <= DOWN_ARROW && currDirection % 2 !== keyPressed % 2){
            currDirection = keyPressed;
            return false;
        }

        if(keyPressed == ENTER_KEY && isGameOver){
            start();
        }

        return true;
    }

    function handleTouch(e){
        var touch = e.touches[0];
        $("#tX").text(touch.pageX);
        $("#tY").text(touch.pageY);

        return false;
    }

    function paintBox(x,y){
        var $box = $(".row").eq(y).find(".block").eq(x);

        if($box.hasClass("snakeBody")) return false;

        $box.addClass("snakeBody");
        return true;
    }

    return {
        init: init,
        paintBox: paintBox,
        start: start
    }
})();

$(function(){
    snake.init(50,50);

    $(".start").click(function(){
        snake.start();
        return false;
    });
});