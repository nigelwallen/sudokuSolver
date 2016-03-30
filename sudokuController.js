(function(){
    angular.module('app')
            .controller('sudokuC',sudokuController);
    
    function sudokuController(sudokuS){
        var sudokuVm=this;
        sudokuVm.passes={};
        sudokuVm.solve=verify;
        sudokuVm.passReset=passReset;
        sudokuVm.puzzleReset=puzzleReset;
        sudokuVm.puzzle=sudokuVm.puzzleReset();
        sudokuVm.status='';
        
        function solveSudoku(p){
            var puzzle=sudokuS.toArray(p);
            var changeMade=true;
            var pass=0;
            sudokuVm.passReset();
            var availableNumbers=[];
            var changesToMake=sudokuS.changesTomake(puzzle);
            while((changeMade)&&(changesToMake>0)){
                changeMade=false;
                for(var loc in puzzle){
                    if(puzzle[loc]===0){
                        availableNumbers=sudokuS.myAvailableNumbers(loc,puzzle);
                        if(availableNumbers.length===1){
                            puzzle[loc]=availableNumbers[0];
                        }else{
                            puzzle[loc]=sudokuS.onlyAvailableHere(loc,puzzle);
                        }
                        if(puzzle[loc]!==0){//CHANGE WAS MADE
                            changeMade=true;
                        }
                    }
                }
                pass++;
                sudokuVm.passes[pass]=sudokuS.toObj(angular.copy(puzzle));
                changesToMake=sudokuS.changesTomake(puzzle);
            }
            if(changesToMake>0){
                sudokuVm.status='Could not solve puzzle';
            }else{
                sudokuVm.status='Puzzle solved!';
            }
        }
        function verify(p){
            if(puzzleOk(p)){
                solveSudoku(p);
            }else{
                alert('PLease verify that all values are valid');
            }
        }
        function passReset(){
            sudokuVm.passes={};
        }
        
        function puzzleReset(){
            var newPuzzle={};
            for (var key=1;key<=81;key++){
                newPuzzle[key]=0;
            }
            return newPuzzle;
        }
        
        function puzzleOk(p){
            var ok=true;
            for (var n in p){
                if((p[n]===null)||(typeof p[n] === 'undefined')){
                    ok=false;
                }
            }
            return ok;
        }
    }
})();