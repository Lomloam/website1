

run();



function run(){
document.getElementById("back").style.setProperty("--x--pos", window.innerWidth- 130);
let d = new Date();
let time = 0;
document.getElementById("start").addEventListener("click" ,function(){
//location.reload();
if(algoStarted===true)location.reload();

document.getElementById("start").innerHTML="Reset";
breadFirstSearch();
algoStarted=true;
});

document.getElementById("meow").addEventListener("mousedown", function(){
    hasViewedInstructions=true;
    document.getElementById("meow").style.visibility="hidden";
    document.getElementById("instructions").style.visibility="hidden";

});
document.getElementById("switch").addEventListener("click", function(){
    if(eraserSelected===true){
        eraserSelected=false;
        drawerSelected=true;
        document.getElementById("switch").innerHTML="Drawing";
    }
    else if(drawerSelected===true){
        eraserSelected=true;
        drawerSelected=false;
        document.getElementById("switch").innerHTML="Erasing    ";
    }

    
} );


//upon page load
let hasViewedInstructions=false;
let isDrawing = false;
let isErasing=false; 
let eraserSelected = false;
let algoStarted = false;
let drawerSelected =true;
let algoType = 'bfs';
let dragX = 0;
let dragY = 0;
let dragInterval = null;
let downClick = false;
let canvas = document.getElementById("mazeCanvas");
let ctx = canvas.getContext('2d');
let size = 20;
let width = window.innerWidth-40- window.innerWidth%size;
let height = window.innerHeight-120 - window.innerHeight%size;
let columns = width/size;
let rows = height/size;
let animationTime = 1; 
canvas.width = width + 2;   
canvas.height = height+2;

//array for the tiles
let tiles ={};
let totalTiles = 1;
let targetTile = 1;
let startTile = 500;


makeMaze();
documentNeighbors();
tiles[targetTile][4]=true;
ctx.fillStyle="red";
ctx.fillRect(tiles[targetTile][1], tiles[targetTile][2], size, size);
ctx.fillStyle="green";
ctx.fillRect(tiles[startTile][1], tiles[startTile][2], size, size);





//creates the neighbors of each square by adding them to the end of each array in the tiles array
function documentNeighbors(){
    for(let i = 1; i<=totalTiles;i++){
        if(i-columns>0){
            tiles[i].push(i-columns)   
        }
        if(i+columns<=totalTiles){
            tiles[i].push(i+columns);   
        }
        if(i-1>0 && tiles[i][2] == tiles[i-1][2]){
            tiles[i].push(i-1);
        }       
        if(i+1<=totalTiles&&tiles[i][2] == tiles[i+1][2]){
            tiles[i].push(i+1);
        }
        
    }
}

//makes the maze yk
function makeMaze(){
//fill stuff for the tiles
ctx.strokeStyle = "black";
ctx.lineWidth=.5; 

//temp variables for the initialization of the maze group
let tempX = 1;
let tempY =1;


//goes through all rows and columns
for(let j=0; j<rows;j++){
    for(let i =0;i<columns;i++){
        //ctx.strokeRect(tempX,tempY, size,size);
        tiles[totalTiles] = [totalTiles, tempX, tempY, false, false];
        totalTiles+=1;
        tempX+=size;
       } 
    tempY+=size;
    tempX=1;
}
totalTiles-=1;
}

function calculate(dragX, dragY ,type){
    let sameRow = (dragX)/size;
    let rowsSince = dragY/size;

    if(type=="target"){
    tiles[targetTile][4]=false;
    targetTile = (sameRow+1+(rowsSince*columns));
    tiles[targetTile][4]=true;
    }
    else if(type=="wall"){
    let temp = (sameRow+1+(rowsSince*columns));
    tiles[temp][3]=true;
    ctx.fillStyle="black";
    ctx.fillRect(tiles[temp][1], tiles[temp][2], size, size);
    }
    else if(type=="erase"){
        let temp = (sameRow+1+(rowsSince*columns));
        tiles[temp][3]=false;
        //ctx.fillStyle="white";
        ctx.clearRect(tiles[temp][1], tiles[temp][2], size, size);
        }
    


}
document.addEventListener("mousedown", (event) =>{  
    
     if(hasViewedInstructions==true&& algoStarted==false && event.clientX-20 <= tiles[targetTile][1]+size && event.clientX-20 >= tiles[targetTile][1]){
         if(event.clientY-100 <= tiles[targetTile][2]+size && event.clientY-100 >= tiles[targetTile][2])
         downClick=true;
     } 
     else if(algoStarted==false && isDrawing==false && hasViewedInstructions==true && drawerSelected ==true){
        isDrawing=true;
     }
     else if(eraserSelected==true){
         isErasing = true;
     }

     //alert(isDrawing);
 });
 
document.addEventListener("mouseup", (event) =>{
    if(downClick==true){
    downClick=false;
    ctx.clearRect(dragX,dragY,size,size);
    dragX = (dragX- dragX%size) +1;
    dragY = (dragY- dragY%size)+1;
    ctx.fillStyle="red";
    ctx.fillRect(dragX, dragY, size, size);
   // console.log(dragX, dragY)
    calculate(dragX-1, dragY-1, "target");
    }
    else if(isDrawing==true){
        isDrawing=false;
    }
    else if(isErasing==true){
        isErasing=false;
    }
});

document.addEventListener('mousemove', (event) => {
    
    if(downClick==true && isDrawing==false){
    ctx.clearRect(tiles[targetTile][1], tiles[targetTile][2], size+1, size+1);
    ctx.clearRect(dragX,dragY,size,size);
    dragX =event.clientX-20;
    dragY=event.clientY-100;
    ctx.fillStyle="red";
    ctx.fillRect(dragX, dragY, size, size);
    }
    else if(isDrawing===true){
    dragX =event.clientX-20;
    dragY=event.clientY-100; 
    dragX = (dragX- dragX%size) +1;
    dragY = (dragY- dragY%size)+1;
    calculate(dragX-1, dragY-1, "wall");  
    }
    else if(isErasing===true){
        dragX =event.clientX-20;
        dragY=event.clientY-100; 
        dragX = (dragX- dragX%size) +1;
        dragY = (dragY- dragY%size)+1;
        calculate(dragX-1, dragY-1, "erase");     
    }
});
//bread
function breadFirstSearch(){
    const meow =[];
    meow.push(tiles[startTile]);
    let animation = setInterval(test, animationTime)

    function test(){
    if(meow.length>0){
        const temp = meow.pop();
        //alert(temp);
     //   if(temp[3]===false)
       // tiles[temp[0]][3]=true;
        fillSqr(temp);
        if(temp[4]==true){
            alert("Found" + temp);
            clearInterval(animation);
        }              
        for(let i =5; i<temp.length;i++){
            if(tiles[temp[i]][3] === false){
                tiles[temp[i]][3] = true;
                if(algoType=='dfs')meow.push(tiles[temp[i]]);
                if(algoType=='bfs')meow.unshift(tiles[temp[i]]);
                
            }
            }
            
      }

}   
}
//dropdown menu stuff
var option1 = document.getElementById('option1');
option1.addEventListener("click", () => {  
if(algoStarted==false){ algoType = 'bfs'; document.getElementById("dropButton").innerHTML = 'Breadth First'; }

});
var option2 = document.getElementById('option2');
option2.addEventListener("click", () => {   
if(algoStarted==false){ algoType = 'dfs'; document.getElementById("dropButton").innerHTML = 'Depth First';} 

});
var option3 = document.getElementById('option3');
option3.addEventListener("click", () => {    
document.getElementById("dropButton").innerHTML = option3.value;
});
//draws da green squares
function fillSqr(temp){
    ctx.fillStyle="green";
    ctx.fillRect(temp[1], temp[2], size, size);   
}
}


