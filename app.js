const canvas = document.getElementById("jsCanvas");
const ctx =canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");



const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;



let painting = false;
let filling = false;

function startPainting(){
    if(filling === false){
        painting = true;
    }
}
function stopPainting(){
    painting =false;
}

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function changeColor(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function rangeChange(e){
    const size = e.target.value;
    ctx.lineWidth = size;
}

function modeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function canvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}


function handleCM(e){
    e.preventDefault();
}


function saveClick(e){
    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = img;
    link.download = "PaintJS[🎨]";
    link.click();
}


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",canvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click",changeColor));
}

if(range){
    range.addEventListener("input",rangeChange);
}
if(mode){
    mode.addEventListener("click",modeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click",saveClick);
}