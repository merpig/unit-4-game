$(document).ready(function() {
    var wins = 0, losses = 0, randNum, totalScore;
    var gemValues = [];
    var textWins = "Wins: ";
    var textLosses = "Losses: ";

    function startGame(){
        randNum = Math.floor(Math.random() * 101)+19;
        totalScore = 0;
        for(var i = 0; i < 4; i++){
            gemValues[i]=Math.floor(Math.random() * 12)+1; 
        }
        $("#randNum").text(randNum);
        $("#wins").text(textWins + wins);
        $("#losses").text(textLosses + losses);
        $("#totalScore").text(totalScore);

    }

    startGame();
    
    $(".col-3").on("click", function(){
        var tempGem = parseInt((this.id).slice(-1))
        totalScore+=gemValues[tempGem];
        $("#totalScore").text(totalScore);
        if(totalScore<randNum);
        else if(totalScore===randNum){
            alert("You win!");
            wins++;
            startGame();
        }
        else {
            alert("You lose!");
            losses++;
            startGame();
        }

    });
 
})