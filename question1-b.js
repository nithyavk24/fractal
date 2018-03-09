var myCanvas = document.getElementById("mycanvas");
var ctx = myCanvas.getContext("2d");
var num;
var form = document.getElementById("drawFractal");
ctx.strokeStyle = document.querySelector('input[name = "color"]:checked').value;


var fractalArcArray = [];
initArc = {
    midX:75,
    midY:75,
    sAngle:180,
    eAngle:0,
    rad:50,
    dir:false
}


fractalArcArray.push(initArc);

form.addEventListener("submit", function(e){
    e.preventDefault();
    clearScreen();
    var iteration = document.getElementById("iteration").value;
    if (iteration==1){
        num = Math.pow(4,iteration-1);
    }
    else if(iteration==2){
        num = Math.pow(4,iteration-1);
        
    }
    drawArc(initArc,false);
    for(var i=0; i<num;i++){
        fractalArc(fractalArcArray[i]);
    }

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
    ctx.strokeStyle = document.querySelector('input[name = "color"]:checked').value;
    
}

function getDistance(x1,y1,x2,y2){
    x = Math.pow((x1-x2),2);
    y = Math.pow((y1-y2),2);
    return Math.sqrt(x+y);
}

// angle in radians
function getAngle(x1,y1,x2,y2){
    return Math.atan2(y2 - y1, x2 - x1)* 180 / Math.PI;
}


function fractalArc(arcObj){
    var x=arcObj.midX,
    y=arcObj.midY,
    radius=arcObj.rad,
    sAngle=(arcObj.sAngle)%360,
    eAngle=(arcObj.eAngle)%360;

    var a = sAngle+1/3*(eAngle-sAngle);
    var b = sAngle+2/3*(eAngle-sAngle);

    if((eAngle<sAngle)&&arcObj.dir){
        a=a-180;
        b=b-180;
        temp = a;
            a=b;
            b=temp;
    }
    if(!arcObj.dir){
        a+=180;
        b+=180;
        temp = a;
        a=b;
        b=temp;
    }
    else{
        a-=180;
        b-=180;
        temp = a;
        a=b;
        b=temp;
    }

    

    

    console.log(a,b)

    var x1 = (x + radius*(Math.cos(a*(Math.PI/180))));
    var y1 = (y + radius*(Math.sin(a*(Math.PI/180))))+100;

    var y2 = (y + radius*(Math.sin(b*(Math.PI/180))))+100;
    var x2 = (x + radius*(Math.cos(b*(Math.PI/180))));

    var ox = (x + radius*(Math.cos(sAngle*(Math.PI/180))));
    var oy = (y + radius*(Math.sin(sAngle*(Math.PI/180))))+100;

    var ex = (x + radius*(Math.cos(eAngle*(Math.PI/180))));
    var ey = (y + radius*(Math.sin(eAngle*(Math.PI/180))))+100;

    subArc1 = getArcObject(ox,oy,x1,y1,true);
    subArc2 = getArcObject(x1,y1,x2,y2,false);
    subArc3 = getArcObject(x2,y2,ex,ey,true);

    fractalArcArray.push(subArc1);
    fractalArcArray.push(subArc2);
    fractalArcArray.push(subArc3);

    drawArc(subArc1,true);
    drawArc(subArc2,false);
    drawArc(subArc3,true);
}

function getArcObject(x1,y1,x2,y2,dir){
    var obj = {};
    obj.midX = (x1+x2)/2;
    obj.midY = (y1+y2)/2;
    obj.sAngle = getAngle(obj.midX,obj.midY,x1,y1);
    obj.sAngle = (obj.sAngle<=0) ? obj.sAngle+360 : obj.sAngle;
    
    obj.eAngle = getAngle(obj.midX,obj.midY,x2,y2);
    obj.eAngle = (obj.eAngle<=0) ? obj.eAngle+360 : obj.eAngle;

    obj.rad = getDistance(obj.midX,obj.midY,x1,y1);
    obj.dir=dir;

    return obj;
}

function drawArc(arcObj, dir){
    console.log(arcObj);
    ctx.strokeStyle = document.querySelector('input[name = "color"]:checked').value;
    ctx.beginPath();
    ctx.arc(
        arcObj.midX,
        arcObj.midY,
        arcObj.rad,
        (arcObj.sAngle)*(Math.PI/180),
        (arcObj.eAngle)*(Math.PI/180),
        dir
    );
    ctx.stroke();
}