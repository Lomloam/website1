//button settings
document.getElementById("back").style.setProperty("--x--pos", window.innerHeight- 120);

var option1 = document.getElementById('option1');
option1.addEventListener("click", () => {  
if(sortStarted==false){ searchType = 'selection'; document.getElementById("dropButton").innerHTML = 'Selection'; }

});

var option2 = document.getElementById('option2');
option2.addEventListener("click", () => {  
if(sortStarted==false){ searchType = 'bubble'; document.getElementById("dropButton").innerHTML = 'Bubble Sort'; }

});

document.getElementById("start").addEventListener("click" ,function(){
    if(sortStarted===true)location.reload();
    else{
        document.getElementById("start").innerHTML="Reset";
        sortStarted=true;
        if(searchType=="selection") selectionSort();
        if(searchType=="bubble") bubbleSort();
    }
  
    });



//canvas settings
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * .72;
canvas.height = window.innerHeight * .9;

//game data setup
let canvWidth = canvas.width;
let canvHeight = canvas.height;
let blockHeight = 2;
let blockWidth = 1;
let sizeOfArray = (canvWidth - canvWidth%blockWidth)/blockWidth;
let maxHeight = (canvHeight-canvHeight%blockHeight)/blockHeight;
let dataArray = [];

//creates the random numbers for the array
let sortStarted = false;
let searchType = "selection";

for(let i=0; i<sizeOfArray;i++){
let tempInt = Math.floor(Math.random() * maxHeight);    
dataArray.push(tempInt);
var tempX = i*blockWidth;
var tempY = canvHeight- (tempInt*blockHeight);
ctx.fillRect(tempX, tempY, blockWidth, tempInt*blockHeight);
}




//selection sort
function selectionSort(){
    let finalArray =[];
    let i = 0; 
    let animationInterval = setInterval(animation, 1);
    function animation(){
        if(i<dataArray.length){
            let min = Infinity;
            let index = 0;
            for(let j =i; j< dataArray.length;j++){
                if(dataArray[j]<min){
                    min=dataArray[j];
                    index=j;      
                } 
            }

            swap(i, index);
            i++;
        }
        else{
            clearInterval(animationInterval);
            console.log(dataArray);
        }
        
    }
 
}


function bubbleSort(){
    let i = 0; 
    let animationInterval = setInterval(animation, 1);
    function animation(){
        if(i<dataArray.length){
            for(let j =0; j< dataArray.length;j++){
                if(dataArray[j]>dataArray[j+1]){
                    swap(j+1, j);      
                } 
            }

            i++;
        }
        else{
            clearInterval(animationInterval);
            console.log(dataArray);
        }
        
    }
 
}


   //changes positions of the data when sorting
   function swap(i, index){
    if(i==index){
        ctx.fillStyle='green';
        ctx.fillRect(i*blockWidth, canvHeight- dataArray[i]*blockHeight, blockWidth, dataArray[i]*blockHeight);
    }
    else{
    ctx.clearRect(i*blockWidth, canvHeight- dataArray[i]*blockHeight, blockWidth, dataArray[i]*blockHeight);
    ctx.clearRect(index*blockWidth, canvHeight- dataArray[index]*blockHeight, blockWidth, dataArray[index]*blockHeight);
    let temp = dataArray[i];
    dataArray[i] = dataArray[index];
    dataArray[index] = temp;
    ctx.fillStyle='green';
    ctx.fillRect(i*blockWidth, canvHeight- dataArray[i]*blockHeight, blockWidth, dataArray[i]*blockHeight);
    ctx.fillStyle='black';
    ctx.fillRect(index*blockWidth, canvHeight- dataArray[index]*blockHeight, blockWidth, dataArray[index]*blockHeight);
    }}












