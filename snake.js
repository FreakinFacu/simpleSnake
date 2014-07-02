var snake = (function(){
    var currX, currY, gridRows, gridColumns;

    const DOWN_ARROW = 40;
    const UP_ARROW = 38;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

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

        paintBox(currX,currY);

        //Start game loop
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

    function handleKeyDown(e){
//        console.log(e.which);
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