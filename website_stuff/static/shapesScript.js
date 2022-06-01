
document.getElementById("back").style.setProperty("--x--pos", window.innerWidth- 130);

window.addEventListener('load', (event) => {

let canvas = document.getElementById("shapesCanvas");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mode = "draw";

  

const meowmeow = function(){

  
//changeable stuff
let sides = 1;
let size = 150;
let maxLimit = 1;
let scale = .5;
let spread = .8;
let branches = 3;
let thickness = 10;
let color = "#2bedb6";
let canvX = canvas.width/2;
let canvY = canvas.height/2;


/*meow
window.addEventListener('click', (event) => {
  ctx.restore();
  canvX = event.clientX;
  canvY = event.clientY;
  drawFractal();
})
*/
function drawBranch(limit){
    if(limit > maxLimit) return;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    for(var i = 0; i< branches; i++){
        
        
        ctx.save();
        ctx.translate(size-(size/branches)*i,0);
        ctx.rotate(spread);
        ctx.scale(scale,scale);
        drawBranch(limit +1);
        ctx.restore();

        ctx.save();
        ctx.translate(size-(size/branches)*i,0);
        ctx.rotate(-spread);
        ctx.scale(scale,scale);
        drawBranch(limit +1);
        ctx.restore();
    
    } 
}

function drawFractal(){
    //canvas settings
    ctx.strokeStyle=color;
    ctx.lineWidth=thickness;
    ctx.lineCap='round';
    ctx.shadowColor='rgba(0,0,0,0.7)';
    ctx.shadowOffsetX=10;
    ctx.shadowOffsetY=5;
    ctx.shadowBlur=10;
    ctx.save();
    ctx.translate(canvX, canvY);
    ctx.scale(1,1);
    ctx.rotate(0);
    for(let i = 0; i< sides;i++){
        ctx.rotate((Math.PI *2)/sides)
        drawBranch(0);
    }
    ctx.restore;
}
drawFractal();


//sides
var sidesSlider = document.getElementById("sidesSlider");
var sidesLabel = document.getElementById("sidesLabel");
sidesLabel.innerHTML = 'Sides: ' + sidesSlider.value;
sidesSlider.addEventListener("mouseup", () => {
  sidesLabel.innerHTML = 'Sides: ' + sidesSlider.value;
  sides=sidesSlider.value; 
  ctx.restore();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFractal(); 
});

//depth
var depthSlider = document.getElementById("depthSlider");
var depthLabel = document.getElementById("depthLabel");
depthLabel.innerHTML = 'Depth: ' + depthSlider.value;
depthSlider.addEventListener("mouseup", () => {
  depthLabel.innerHTML = 'Depth: ' + depthSlider.value;
  maxLimit=depthSlider.value; 
  ctx.restore();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFractal(); 
});

//scale
var scaleSlider = document.getElementById("scaleSlider");
var scaleLabel = document.getElementById("scaleLabel");
scaleLabel.innerHTML = 'Scale: ' + scaleSlider.value*.1;
scaleSlider.addEventListener("mouseup", () => {
  scale=Math.round(scaleSlider.value*.1 * 10).toFixed(1) / 10;
  scaleLabel.innerHTML = 'Scale: ' + scale;
  ctx.restore();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFractal(); 
});

//spread
var spreadSlider = document.getElementById("spreadSlider");
var spreadLabel = document.getElementById("spreadLabel");
spreadLabel.innerHTML = 'Spread: ' + spread;
spreadSlider.addEventListener("mouseup", () => {
  spread= Math.round(spreadSlider.value*.1 * 10).toFixed(1) / 10
  spreadLabel.innerHTML = 'Spread: ' + spread;
  ctx.restore();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFractal(); 
});

//size
var sizeSlider = document.getElementById("sizeSlider");
var sizeLabel = document.getElementById("sizeLabel");
sizeLabel.innerHTML = 'Size: ' + size;
sizeSlider.addEventListener("mouseup", () => {
  size  = sizeSlider.value;
  sizeLabel.innerHTML = 'Size: ' + size;
  ctx.restore();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFractal(); 
});

//branches
var branchSlider = document.getElementById("branchSlider");
var branchLabel = document.getElementById("branchLabel");
branchLabel.innerHTML = 'Branches: ' + branchSlider.value;
branchSlider.addEventListener("mouseup", () => {
  branches= branchSlider.value
  branchLabel.innerHTML = 'Branches: ' + branches;
  ctx.restore();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFractal(); 
});





//thickness
var thickSlider = document.getElementById("thickSlider");
var thickLabel = document.getElementById("thickLabel");
thickLabel.innerHTML = 'Thickness: ' + thickness;
thickSlider.addEventListener("mouseup", () => {
  thickness  = thickSlider.value;
  thickLabel.innerHTML = 'Thickness: ' + thickness;
  ctx.restore();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFractal(); 
});


function changeColor(meow) {
  document.getElementById("sidesSlider").style.setProperty("--slider-secondary", meow);
  document.getElementById("depthSlider").style.setProperty("--slider-secondary", meow);
  document.getElementById("scaleSlider").style.setProperty("--slider-secondary", meow);
  document.getElementById("branchSlider").style.setProperty("--slider-secondary", meow);
  document.getElementById("spreadSlider").style.setProperty("--slider-secondary", meow);
  document.getElementById("sizeSlider").style.setProperty("--slider-secondary", meow);
  document.getElementById("thickSlider").style.setProperty("--slider-secondary", meow);

  
}


var colorPicker = document.getElementById('colorPicker');
var colorLabel = document.getElementById('colorLabel');
colorLabel.innerHTML = 'Color: ' + color;
colorPicker.addEventListener("change", () => {
  color  = colorPicker.value;
  changeColor(color);
  colorLabel.innerHTML = 'Color: ' + color;
  ctx.restore();
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawFractal(); 
});




};
meowmeow();


function dragon(){
  ctx.translate(canvas.width/2, canvas.height/3.5);
  
  let angle = (90*Math.PI)/180;

  ctx.strokeStyle="white";
  let directions ="r";
  
  let lineLength = 10;
  let depth =9; 
  


  function drawDragonIterations(){
      //first line meow
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(lineLength, 0);
      ctx.stroke();
      ctx.translate(lineLength,0)
      for(let i=0; i<depth;i++){
        directions=createDirections(directions)
      }

      for(let i=0; i<directions.length; i++){
        if(directions[i]=="r"){
          ctx.rotate(angle);
          ctx.lineTo(lineLength,0);
          ctx.stroke();
          ctx.translate(lineLength,0);
        }
        if(directions[i]=="l"){
          ctx.rotate(-angle);
          ctx.lineTo(lineLength,0);
          ctx.stroke();
          ctx.translate(lineLength,0);
        }
      }
  }

  

  function createDirections(directions){
    let secondHalf ="";
    let temp =[];
    for(let i=0; i<directions.length;i++){
      if(directions[i]=="r") temp.push("l");
      if(directions[i]=="l") temp.push("r");
    }
    
   for(let k=0; k<directions.length;k++){
    secondHalf+=temp.pop();
    }
    
    return directions + "r"+secondHalf;


  }


drawDragonIterations();


}
//dragon();
});