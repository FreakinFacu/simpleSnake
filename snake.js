var snake = (function(){
    var currX, currY, currDirection, gridRows, gridColumns, animationID, lastStep;

    const LEFT_ARROW = 37;
    const UP_ARROW = 38;
    const RIGHT_ARROW = 39;
    const DOWN_ARROW = 40;

    const speed = 500;

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
            height: parseInt($board.css("height"))/numRows-2 + "px",
            width: parseInt($board.css("width"))/numColumns-2 + "px"
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
            //todo do move
            lastStep = ts;
        }

        animationID = requestAnimationFrame(gameLoop);
    }

    function handleKeyDown(e){
        var keyPressed = e.which;

        //Don't change direction if its the current direction or if its the direct opposite
        if(currDirection % 2 !== keyPressed % 2){
            currDirection = keyPressed;
        }

        return false;
    }

    function paintBox(x,y){
        $(".row").eq(y).find(".block").eq(x).addClass("snakeBody");
    }

    return {
        init: init,
        paintBox: paintBox
    }
})();

$(function(){
    snake.init(20,20);
});