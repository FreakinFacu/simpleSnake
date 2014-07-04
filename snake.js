var snake = (function(){
    var currX, currY, currDirection, gridRows, gridColumns, animationID, lastStep;

    const LEFT_ARROW = 37;
    const UP_ARROW = 38;
    const RIGHT_ARROW = 39;
    const DOWN_ARROW = 40;

    const speed = 50;

    function init(numRows,numColumns){
        //Wire up handlers
        $(document).on("keydown",handleKeyDown);

        //Create Grid
        gridRows = numRows;
        gridColumns = numColumns;
        makeGrid(numRows,numColumns);

        //Set Starting position
        currX = Math.floor(numColumns / 2);
        currY = Math.floor(numRows / 2);
        currDirection = UP_ARROW;

        paintBox(currX,currY);

        //Start game loop
        animationID = requestAnimationFrame(gameLoop);
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

    function gameLoop(ts){
        if (lastStep === undefined) lastStep = ts;

        if(ts - lastStep > speed){
            lastStep = ts;

            if(!growSnake()){
                alert("GAME OVER");
                return; //game over
            }
        }

        animationID = requestAnimationFrame(gameLoop);
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
        return true;
    }

    function paintBox(x,y){
        var $box = $(".row").eq(y).find(".block").eq(x);//.addClass("snakeBody");

        if($box.hasClass("snakeBody")) return false;

        $box.addClass("snakeBody");
        return true;
    }

    return {
        init: init,
        paintBox: paintBox
    }
})();

$(function(){
    snake.init(50,50);
});