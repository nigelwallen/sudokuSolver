(function(){
    angular.module('app')
        .service('sudokuS',sudokuService);

    function sudokuService(){
        //tests
        this.testHList=horizontalList;
        this.testVList=verticalList;
        this.testBList=boxList;
        this.testavailable=myAvaNums;
        this.testOneNeedle=oneNeedle;
        //services
        this.changesTomake=countZeros;
        this.toArray=objToArray;
        this.toObj=arrayToObj;
        this.myAvailableNumbers=myAvaNums;
        this.onlyAvailableHere=onlyHere;
        
        //FUNCTIONS
        function countZeros(sudokuArray){
            var numOfZeroes=0;
            for(var n in sudokuArray){
                if(sudokuArray[n]===0){
                    numOfZeroes++;
                }
            }
            return numOfZeroes;
        }
        //converters
        function objToArray(o){
            var sudokuArray=[];
            for(var n in o){
                sudokuArray.push(parseInt(o[n]));
            }
            return sudokuArray;
        }
        function arrayToObj(a){
            var sudokuObj={};
            for(var n=0;n<a.length;n++){
                sudokuObj[n+1]=a[n];
            }
            return sudokuObj;
        }
        //listing used numbers for that sudoku location
        function myAvaNums(location,sudokuArray){
            var hlist=horizontalList(location,sudokuArray);
            var vlist=verticalList(location,sudokuArray);
            var blist=boxList(location,sudokuArray);
            var myAvailableList=[];
            for(var number=1;number<=9;number++){
                if(notIn(number,hlist.concat(vlist,blist))){
                    myAvailableList.push(number);
                }
            }
            return myAvailableList;
        }
        function horizontalList(location,sudokuArray){
            var min = (parseInt(location/9))*9;
            var max= min+8;
            var hlist=[];
            for(var x=min;x<=max;x++){
                hlist.push(sudokuArray[x]);
            }
            return hlist;
        }
        function verticalList(location,sudokuArray){
            var min=location%9;
            var max=80;
            var vlist=[];
            for (var y=min;y<=max;y=y+9){
                vlist.push(sudokuArray[y]);
            }
            return vlist;
        }
        function boxList(location,sudokuArray){
            var min=((parseInt(location/27)) * 27) + (parseInt((location%9)/3))*3;//find the start of the box
            var max=2;//max for both horizontal and vertical movement
            var blist=[];
            for(var y=0;y<=max;y++){
                for(var x=0;x<=max;x++){
                    blist.push(sudokuArray[(min +(y*9))+x]);
                }
            }
            return blist;
        }
        function notIn(num,numList){
            var isIn=false;
            for(var e in numList){
                if(num===numList[e]){
                    isIn=true;
                    break;
                }
            }
            return !isIn;
        }
        //find all avalible/not used numbers
        function onlyHere(location,sudokuArray){
            var myAvailableList=myAvaNums(location,sudokuArray);
            var horizontalAvailableList=horizontalAvailableNumbers(location,sudokuArray);
            var verticalAvailableList=verticalAvailableNumbers(location,sudokuArray);
            var boxAvailableList=boxAvailableNumbers(location,sudokuArray);
            var needle=0;
            var num=0;
            for(var n in myAvailableList){
                needle = myAvailableList[n];
                if(oneNeedle(needle,horizontalAvailableList)
                        ||oneNeedle(needle,verticalAvailableList)
                        ||oneNeedle(needle,boxAvailableList)){
                    num= myAvailableList[n];
                }
            }
            return num;
        }
        function horizontalAvailableNumbers(location,sudokuArray){//list possible 
            var min = (parseInt(location/9))*9;
            var max= min+8;
            var horizontalAvailableList=[];
            for(var x=min;x<=max;x++){
                if(sudokuArray[x]===0){
                    horizontalAvailableList.concat(myAvaNums(x,sudokuArray));
                }
            }
            return horizontalAvailableList;
        }
        function verticalAvailableNumbers(location,sudokuArray){
            var min=location%9;
            var max=80;
            var verticalAvailavleList=[];
            for (var y=min;y<=max;y=y+9){
                if(sudokuArray[y]===0){
                    verticalAvailavleList.concat(myAvaNums(y,sudokuArray));
                }
            }
            return verticalAvailavleList;
        }
        function boxAvailableNumbers(location,sudokuArray){
            var min=((parseInt(location/27)) * 27) + (parseInt((location%9)/3))*3;//find the start of the box
            var max=2;//max for both horizontal and vertical movement
            var boxAvailableList=[];
            var Blocation=0;
            for(var y=0;y<=max;y++){
                for(var x=0;x<=max;x++){
                    Blocation=(min +(y*9))+x;
                    if(sudokuArray[Blocation]){
                        boxAvailableList.concat(myAvaNums(Blocation,sudokuArray));
                    }
                }
            }
            return boxAvailableList;
        }
        function oneNeedle(needle,haystack){//find the number of needles in the haystack
            var counter=0;
            for(var e in haystack){
                if(needle===haystack[e]){
                    counter++;
                }
            }
            return counter===1;
        }
    }
})();
