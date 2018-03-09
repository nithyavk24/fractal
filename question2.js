var myCanvas = document.getElementById("mycanvas");
var ctx = myCanvas.getContext("2d");
var radius = 80;
var offence = 0;
var polySide = 79;

function status(value){
    var stat = document.getElementById("status")
    stat.textContent ="driver score = " + value; 
}

status(100);

var reset = document.getElementById("reset");
reset.addEventListener('click',function(){
    clearScreen();
    status(100);
    radius = 80
    drawinngEllipse(ctx, 80, 80, 80 ,80)
    ctx.fillStyle = "grey";
    ctx.fill();
    drawinngEllipse(ctx, 50, 50, 80 ,80)
    ctx.fillStyle = "white";
    ctx.fill();
    offence = 0;
    polySide = 79;
},true);

function clearScreen(){
    cframe = document.getElementById("c-frame");
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", "892");
    canvas.setAttribute("height", "400");
    canvas.setAttribute("id", "mycanvas");

    cframe.replaceChild(canvas,myCanvas);
    myCanvas = document.getElementById("mycanvas");
    ctx = myCanvas.getContext("2d"); 
}

drawinngEllipse(ctx, 80, 80, 80 ,80)
ctx.fillStyle = "grey";
ctx.fill();
drawinngEllipse(ctx, 50, 50, 80 ,80)
ctx.fillStyle = "white";
ctx.fill();

var btn = document.getElementById("offence");

btn.addEventListener('click', offences,true);
    
function offences(){
    if(offence == 0){
        firstOffence();
        offence++;
    }
    else{
        moreOffence();
    }
}


function firstOffence(){
    clearScreen();
    var rand = Math.floor(Math.random() * 20)+1;
    rad2 = (100-rand)*radius/100;
    drawinngEllipse(ctx, radius, rad2, 80 ,80)
    ctx.fillStyle = "grey";
    ctx.fill(); 
    drawinngEllipse(ctx, radius-30, rad2-30, 80 ,80)
    ctx.fillStyle = "white";
    ctx.fill();
    status(100 - rand);

}
function moreOffence(){
    clearScreen();
    drawPolygon(ctx, polySide, radius, 80, 80);
    ctx.fillStyle = "grey";
    ctx.fill();
    drawPolygon(ctx, polySide, radius-30, 80, 80);
    ctx.fillStyle = "white";
    ctx.fill();
    status(polySide);
    polySide--;
    if(polySide==3){
        btn.removeEventListener("click",offences, true);
    }
}

function drawPolygon(cxt, sides, length, x, y){
    var numberOfSides = sides,
    size = length,
    Xcenter = x,
    Ycenter = y;
    
    cxt.beginPath();
    cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

    for (var i = 1; i <= numberOfSides;i += 1) {
        cxt.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides),
        Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }

    cxt.strokeStyle = "#000000";
    cxt.lineWidth = 1;
    cxt.stroke();
}

function drawinngEllipse(ctx, rad1, rad2, x ,y){
    ctx.setLineDash([])
    ctx.beginPath();
    ctx.ellipse(x, y, rad1, rad2, 0, 0, 2 * Math.PI);
    ctx.stroke();
}