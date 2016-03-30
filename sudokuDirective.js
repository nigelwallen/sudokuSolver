(function () {
    angular.module('sudokuDisplayApp',[])
        .directive('sudokuDisplay',sudokuDirective);
    function sudokuDirective() {
        var directiveScope = {
            currentPass: '=',
            edit: '=',
            lastPass: '='
        };
        
        function makeScopes(scope) {
            scope.rowColNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            scope.calculatePosition = calPos;
            scope.Break = calBreak;
            scope.isDifferent = different;

            function calPos(row, col) {
                return ((row - 1) * 9) + col;
            }
            function calBreak(n) {
                return n % 3 === 0 && n !== 9;
            }
            function different(current,last){
                if(typeof last === 'undefined'){
                    return false;
                }else{
                    return current!==last;  
                }
            }
        }
        
        return {
            restrict: 'A',
            scope: directiveScope,
            replace: true,
            templateUrl: 'sudokuTemplate.html',
            link:makeScopes
        };
    }
})();