$(document).ready(function() {
    var grid = "";

    function init(){
        var row = 0;
        var col = 0;
        for(var i = 0; i < 9*9*2; i++){
            col++;
            if(i%9===0){
                grid += "<div row class='row' id='row" + row + "'>";
                col = 0;
            }

            grid+= "<div class='col' id='col" + row + "" + col + "'>"
            grid+= "<p id='status" + row + "" + col + "' >empty</p>"
            grid+= "</div>";

            if(i%9===8){
                grid += "</div>"
                row++;
            }
        }
    }

    var shapes = {
        shape: [1,2,3,4,5,6,7],
        color: ["red","green","yellow","orange","purple","blue","cyan"],
        rotation:   [[0,1,1,1,1,2,2],
                     [3,1,2,2,1,1,1],
                     [0,1,1,1,1,2,2],
                     [3,1,2,2,1,1,1]],
        startY: "1",
        startX: "4"
    }

    function parseShape(int){
        
    }
    
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
    }

    $.fn.redraw = function(){
        $(this).each(function(){
          var redraw = this.offsetHeight;
        });
      };
    var interval;
    var currentRow = 0;
    var shift = 0;
    var lastShift = 0;
    var currentRotation = 0;
    var currentShape = 0;

    var previousCols = [];
    var previousStatus = [];

    var currentCols = [];
    var currentStatus = [];

    var playing = false;
    var shiftEval = true;
    var previous = false;
    var squareStatus = "empty";
    var attempt = 0;

    function run(){
        clearInterval(interval);
        playing = true;
        reset();
        interval = setInterval(function(){drawShape(currentShape,shift,currentRow)}, 100   );

    }

    function resetLine(){
        

        var lineId = 0;
        var count = 0;
        for (var j = 18; j > 0; j--){
            for(var i = 0; i < 9; i++){
                if ($("#status"+j+""+i).html() === "filled"){
                    count++;
                }
            }
            if (count === 9){
                console.log("Reset Line called ------------");

                lineId = j;
                for (var p = lineId; p > 0; p--){
                    for(var i = 0; i < 9; i++){
                        $("#col"+p+""+i).css("background-color", $("#col"+(p-1)+""+i).css("background-color"));
                        $("#status"+p+""+i).html($("#status"+(p-1)+""+i).html());
                    }
                }
                for(var i = 0; i < 9; i++){
                    $("#col"+0+""+i).css("background-color", "silver");
                    $("#status"+0+""+i).html("empty");
                }
                clearInterval();
            }
            count = 0;
        }
    }

    function reset(){
        currentRow = 0;
        shift = 0;
        lastShift = 0;
        previous = false;
        squareStatus = "empty";
        attempt = 0;
        previousCols = [];
        currentCols = [];
        shiftEval = true;
        currentShape = Math.floor((Math.random() * 7));
    }

    function drawShape(int, _shift, row){
        var tempColor = shapes.color[int];
        var startX = shapes.startX;
        var status;

        if (currentShape === 0){
            for(var i = 0; i < 4; i++){
                currentCols[i] = "#col" + (row-i) + "" + (parseInt(startX) + _shift);
                currentStatus[i] = "#status" + (row-i) + "" + (parseInt(startX) + _shift);
            }
        }
        if (currentShape === 1){
                currentCols[0] = "#col" + (row) + "" + (parseInt(startX) + _shift);
                currentStatus[0] = "#status" + (row) + "" + (parseInt(startX) + _shift);

                currentCols[1] = "#col" + (row-1) + "" + (parseInt(startX) + _shift);
                currentStatus[1] = "#status" + (row-1) + "" + (parseInt(startX) + _shift);

                currentCols[2] = "#col" + (row) + "" + (parseInt(startX) + _shift + 1);
                currentStatus[2] = "#status" + (row) + "" + (parseInt(startX) + _shift + 1);

                currentCols[3] = "#col" + (row-1) + "" + (parseInt(startX) + _shift + 1);
                currentStatus[3] = "#status" + (row-1) + "" + (parseInt(startX) + _shift + 1);     
        }

        status = $(currentStatus[0]).html();
        if (currentShape === 1)
            squareStatus = $(currentStatus[2]).html();
        console.log(status);

        if (status==="empty" && playing && squareStatus === "empty"){
            console.log("is empty");

            if(previous) {
                for(var i = 0; i < 4; i++){
                    $(previousCols[i]).css("background-color", "silver");
                    $(previousStatus[i]).html("empty");
                }
            }

            var canShift = true;
            if(!shiftEval){

                if(currentShape === 0){
                    for(var i = 0; i < 4; i++){
                        currentCols[i] = "#col" + (row-i) + "" + (parseInt(startX) + _shift);
                        currentStatus[i] = "#status" + (row-i) + "" + (parseInt(startX) + _shift);
                    
                        for(var j = 0; j < i; j++){
                            if($(currentStatus[j]).html()==="filled") canShift = false;
                            console.log($(currentStatus[j]).html());
                        }
                    }
                }
                if(currentShape === 1 ){
                    currentCols[0] = "#col" + (row) + "" + (parseInt(startX) + _shift);
                    currentStatus[0] = "#status" + (row) + "" + (parseInt(startX) + _shift);
                    currentCols[1] = "#col" + (row-1) + "" + (parseInt(startX) + _shift);
                    currentStatus[1] = "#status" + (row-1) + "" + (parseInt(startX) + _shift);
                    currentCols[2] = "#col" + (row) + "" + (parseInt(startX) + _shift + 1);
                    currentStatus[2] = "#status" + (row) + "" + (parseInt(startX) + _shift + 1);
                    currentCols[3] = "#col" + (row-1) + "" + (parseInt(startX) + _shift + 1);
                    currentStatus[3] = "#status" + (row-1) + "" + (parseInt(startX) + _shift + 1);

                    if (currentRow > 0){
                        if($(currentStatus[1]).html()==="filled") canShift = false;
                        if(currentRow > 1){
                            if($(currentStatus[2]).html()==="filled") canShift = false;
                            if (currentRow > 2){
                                if($(currentStatus[3]).html()==="filled") canShift = false;
                            }
                        }
                    }
                }

                if(canShift){
                    shiftEval = true; 
                    attempt=0;
                    lastShift = shift;
                    currentRow++;

                    for (var i = 0; i < 4; i++){
                        $(currentStatus[i]).html("filled");
                        $(currentCols[i]).css("background-color", tempColor);
                    }

                    if (currentShape === 0){
                        for(var i = 0; i < 4; i++){
                            previousCols[i] = "#col" + (row-i) + "" + (parseInt(shapes.startX) + _shift);
                            previousStatus[i] = "#status" + (row-i) + "" + (parseInt(shapes.startX) + _shift);
                        }
                    }
                    if (currentShape === 1){
                        previousCols[0] = "#col" + (row) + "" + (parseInt(startX) + _shift);
                        previousStatus[0] = "#status" + (row) + "" + (parseInt(startX) + _shift);
        
                        previousCols[1] = "#col" + (row-1) + "" + (parseInt(startX) + _shift);
                        previousStatus[1] = "#status" + (row-1) + "" + (parseInt(startX) + _shift);
        
                        previousCols[2] = "#col" + (row) + "" + (parseInt(startX) + _shift + 1);
                        previousStatus[2] = "#status" + (row) + "" + (parseInt(startX) + _shift + 1);
        
                        previousCols[3] = "#col" + (row-1) + "" + (parseInt(startX) + _shift + 1);
                        previousStatus[3] = "#status" + (row-1) + "" + (parseInt(startX) + _shift + 1);
                    }
        
                    previous = true;
                }
                else {
                    shift = lastShift;
                }

            }

            else if(shiftEval){
                shiftEval = true; 
                attempt=0;
                lastShift = shift;
                currentRow++;
                console.log("can shift");

                for (var i = 0; i < 4; i++){
                    $(currentStatus[i]).html("filled");
                    $(currentCols[i]).css("background-color", tempColor);
                }

                if(currentShape === 0){
                    for(var i = 0; i < 4; i++){
                        previousCols[i] = "#col" + (row-i) + "" + (parseInt(shapes.startX) + _shift);
                        previousStatus[i] = "#status" + (row-i) + "" + (parseInt(shapes.startX) + _shift);
                    }
                }
                if(currentShape===1){
                    previousCols[0] = "#col" + (row) + "" + (parseInt(startX) + _shift);
                    previousStatus[0] = "#status" + (row) + "" + (parseInt(startX) + _shift);
    
                    previousCols[1] = "#col" + (row-1) + "" + (parseInt(startX) + _shift);
                    previousStatus[1] = "#status" + (row-1) + "" + (parseInt(startX) + _shift);
    
                    previousCols[2] = "#col" + (row) + "" + (parseInt(startX) + _shift + 1);
                    previousStatus[2] = "#status" + (row) + "" + (parseInt(startX) + _shift + 1);
    
                    previousCols[3] = "#col" + (row-1) + "" + (parseInt(startX) + _shift + 1);
                    previousStatus[3] = "#status" + (row-1) + "" + (parseInt(startX) + _shift + 1);
                }
    
                previous = true;
            }

            



        }

        else if(status === undefined && currentRow > 0 && playing){
                resetLine();
                reset();
        }

        else if(status === "filled" && playing && squareStatus === "filled"){
                 
            if(attempt === 1){

                console.log(currentRow);
                if(currentRow > 0){
                    resetLine();
                    reset();
                }
                else playing = false;
            }

            else if(attempt === 0 && shift !== lastShift){
                shiftEval = true; 
                console.log("Collision 1 Detected: side block");
                shift = lastShift;
                //attempt++;
            }

            else if(attempt === 0 && shift === lastShift && currentRow > 0) {
                console.log("reset");
                resetLine();
                reset(); 
            }
            else {
                playing = false;
                clearInterval(interval);
            }
        }
        else{
            if (shift !== lastShift)
                shift = lastShift;
            else {
                resetLine();
                reset();
            }
            
        }
               
    }

    init();

    $(".container").html(grid);

    $(".col").click(run);

    $("html").keyup(function(event){
        if (event.which === 37 && playing && shiftEval){
            if(shift + 4> 0){
                lastShift = shift;
                shift--;
                shiftEval = false;
            }
            else
            console.log("ignoring you");
        }

        if (event.which === 39 && playing && shiftEval){
            if(shift + 4 + shapes.rotation[0][currentShape]< 8){
                console.log(shapes.rotation[0][currentShape]);
                lastShift = shift;
                shift++;
                shiftEval = false;
            }
            else
            console.log("ignoring you");
            
        }
    });
})