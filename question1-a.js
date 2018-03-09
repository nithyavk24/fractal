var myCanvas = document.getElementById("mycanvas");
var ctx = myCanvas.getContext("2d");

var tempx=0;
var tempy=0;
var fractArray = [];

var form = document.getElementById("drawFractal");
ctx.strokeStyle = document.querySelector('input[name = "color"]:checked').value;


form.addEventListener("submit", function(e){
    e.preventDefault();
    
    clearScreen()
    
    fractArray = [ ];

    var ratio = document.getElementById("ratio").value;
    var iteration = document.getElementById("iteration").value;

    ctx.beginPath();
    ctx.moveTo(50,10);
    ctx.lineTo(200,10);
    ctx.stroke();

    var line = lineFactory(50,80,200,80, 0);
    console.log(line);
    if(ratio==2){
        
        twoFractal(line, iteration)
    }
    else{
        
        threeFractal(line, iteration)
    }

},true);

function lineFactory(x1,y1,x2,y2,degrees){
    var obj = {};
    obj.x1 = x1
    obj.x2 = x2
    obj.y1 = y1
    obj.y2 = y2
    obj.degrees = degrees

    return obj;
}

function clearScreen(){
    cframe = document.getElementById("c-frame");
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", "892");
    canvas.setAttribute("height", "400");
    canvas.setAttribute("id", "mycanvas");

    cframe.replaceChild(canvas,myCanvas);
    myCanvas = document.getElementById("mycanvas");
    ctx = myCanvas.getContext("2d"); 
    ctx.strokeStyle = document.querySelector('input[name = "color"]:checked').value;
    
}

function drawLine(x,y,lineLength,deg){
    deg = (deg-360)%360
    tempx = x+lineLength *Math.cos(deg *Math.PI/180);
    tempy = y+lineLength *Math.sin(deg *Math.PI/180);
    fractArray.push(lineFactory(x,y+100,tempx,tempy+100,deg))

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(tempx,tempy);
    ctx.stroke()
}

function threeFractal(lineObj, iteration){
    var len = 0;
    for(var j=0; j<iteration; j++){
        len = len+Math.pow(4,j)
    }

    fractArray.push(lineObj);

    for(var i = 0; i<len; i++){
        fractal(fractArray[i]);
    }

    function fractal(obj){
        x1 = obj.x1
        y1 = obj.y1
        x2 = obj.x2
        y2 = obj.y2
        degrees = obj.degrees
    
        var dx = Math.pow ((x1-x2),2),
        dy = Math.pow ((y1-y2),2),
        dist = Math.sqrt(dx+dy),
        lineLength = dist/3;

    
        drawLine(x1,y1,lineLength,degrees)
        drawLine(tempx,tempy,lineLength,degrees-60);   
        drawLine(tempx,tempy,lineLength,degrees+60);
        drawLine(tempx,tempy,lineLength,degrees);
    }
}

function twoFractal(lineObj, iteration){
    var len = 0;
    for(var j=0; j<iteration; j++){
        len = len+Math.pow(4,j)
    }

    fractArray.push(lineObj);

    for(var i = 0; i<len; i++){
        fractal(fractArray[i]);
    }

    function fractal(obj){
        x1 = obj.x1
        y1 = obj.y1
        x2 = obj.x2
        y2 = obj.y2
        degrees = obj.degrees
    
        var dx = Math.pow ((x1-x2),2),
        dy = Math.pow ((y1-y2),2),
        dist = Math.sqrt(dx+dy),
        lineLength = dist/2;    

        ctx.strokeStyle = document.querySelector('input[name = "color"]:checked').value;
        
        drawLine(x1,y1,lineLength,degrees+60);   
        drawLine(tempx,tempy,lineLength,degrees-60,);
        drawLine(tempx,tempy,lineLength,degrees-60);
        drawLine(tempx,tempy,lineLength,degrees+60);        
    }
}