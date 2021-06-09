let mouseX,mouseY,sensR=7;
let xOffset,yOffset;
let cCursor,ctxCursor;
let placing=null,placedObject,cTimer;
let eraser=false, brushTimer;
let startX, startY, cp1x, cp2x, cp1y ,cp2y, endX, endY;
let phase=0;
let points = [];
//TODO disable brush when making bezier or polygon


//getMouseLocation


(function() {
    "use strict";

    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        let eventDoc, doc, body;

        event = event || window.event;

        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        //defining canvas offset    TODO move it to some function called only on load and rescaling!
        xOffset=getOffset(document.getElementById("cursor")).left;
        yOffset=getOffset(document.getElementById("cursor")).top;
        //getting actual mouse location on canvas
        mouseX = event.pageX-xOffset;
        mouseY = event.pageY-yOffset;
    }
})();

function getOffset( el ) {
    let _x = 0;
    let _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function _add(_object){
    phase=0;
    clearInterval(placing);
    clearInterval(cTimer);
    //allSetter();
    placedObject=_object;
    cCursor = document.getElementById("cursor");
    ctxCursor = cCursor.getContext("2d");
    if(placedObject==="rectangle") {
        placing = setInterval(placingRect, 10);
    }else if(placedObject==="circle"){
        placing = setInterval(placingCirc, 10);
    }else if(placedObject==="eraser"){
        eraserMode();
        placing = setInterval(placingRect, 10);
    }
    else if(placedObject==="polygon"){
        placing=setInterval(configurePoint,10);
    }
    else {
        //placing = setInterval(placingBezier, 10);
        placing=0;
    }

}

function placingRect(){
    if(mouseX<=500 && mouseX>=0 && mouseY<=500 && mouseY>=0){
        ctxCursor.clearRect(0,0,500,500);
        ctxCursor.beginPath();
        ctxCursor.rect(mouseX-width/2,mouseY-height/2,width,height);
        if(fill){
            ctxCursor.fill();
        }
        if(border){
            ctxCursor.stroke();
        }
    }
}

function placingCirc(){
    if(mouseX<=500 && mouseX>=0 && mouseY<=500 && mouseY>=0){
        ctxCursor.clearRect(0,0,500,500);
        ctxCursor.beginPath();
        ctxCursor.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
        if(fill){
            ctxCursor.fill();
        }
        if(border){
            ctxCursor.stroke();
        }
    }
}


//Bezier


function drawBezier(){
    ctxCursor.clearRect(0,0,500,500);
    //ctxCursor.fillRect(mouseX-width/2,mouseY-height/2,width,height);
    ctxCursor.beginPath();
    ctxCursor.moveTo(startX, startY);
    ctxCursor.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    if(fill){
        ctxCursor.fill();
    }
    if(border){
        ctxCursor.stroke();
    }
    //Drawing points on curve
    //Control points
    quickPin(cp1x,cp1y);
    quickPin(cp2x,cp2y);
    //Start and End points
    quickPin(startX,startY);
    quickPin(endX,endY);
    //draw control lines
    ctxCursor.lineWidth=1;
    ctxCursor.strokeStyle="rgba(0,0,0,0.3)"
    ctxCursor.beginPath();
    ctxCursor.moveTo(startX, startY);
    ctxCursor.lineTo(cp1x, cp1y);
    ctxCursor.stroke();
    ctxCursor.beginPath();
    ctxCursor.moveTo(endX, endY);
    ctxCursor.lineTo(cp2x, cp2y);
    ctxCursor.stroke();
    borderColorSetter();
    lWidthSetter();
}

function placingBezier(){
    let a;
    if(mouseX<=500 && mouseX>=0 && mouseY<=500 && mouseY>=0){
        a=(mouseY-startY)/(mouseX-startX);
        cp1x=bezierCpX(1);
        cp2x=bezierCpX(2);
        cp1y=bezierCpY(a,cp1x);
        cp2y=bezierCpY(a,cp2x);
        endX=mouseX;
        endY=mouseY;
    }
}

//Calculating starting cp locations on bezier curve
function bezierCpY(a,x){
    return a*(x-startX)+startY;
}
function bezierCpX(n){
    return startX+(mouseX-startX)/3*n;
}

//Configuring points on bezier curve
//Control points
function configureCp1(){
    cp1x=mouseX;
    cp1y=mouseY;
}
function configureCp2(){
    cp2x=mouseX;
    cp2y=mouseY;
}
//Start and end points
function configureStart(){
    startX=mouseX;
    startY=mouseY;
}
function configureEnd(){
    endX=mouseX;
    endY=mouseY;
}

function bezierController(){

    ctxCursor.clearRect(0,0,500,500);
    ctxCursor.beginPath();
    ctxCursor.moveTo(mouseX, mouseY);
    startX=mouseX;
    startY=mouseY;
    placing=setInterval(placingBezier,10);
    cTimer=setInterval(drawBezier,10);
}


//Polygon


function drawPolygon(){
    ctxCursor.clearRect(0,0,500,500);
    ctxCursor.beginPath();
    ctxCursor.moveTo(points[0],points[1]);
    for (let i=2;i<points.length;i+=2){
        ctxCursor.lineTo(points[i],points[i+1]);
    }
    if(fill){
        ctxCursor.fill();
    }
    if(border){
        ctxCursor.stroke();
    }
    for (let i=0;i<points.length;i+=2) {
        quickPin(points[i], points[i+1])
    }
}

function configurePoint(){
    points[points.length-2]=mouseX;
    points[points.length-1]=mouseY;
}

function addPoint(){
    //Add point location

    points.push(mouseX);
    points.push(mouseY);
    //Add elements to list for configurePoint() to configure
    points.push(mouseX);
    points.push(mouseY);
}

function select(){
    ctxCursor.clearRect(0,0,500,500);
    clearInterval(placing);
    clearInterval(cTimer);
    placing=null;
}

function placeObject(){
    if(placing!=null) {
        //clearInterval(placing);
        //ctxCursor.clearRect(0,0,500,500);
        if(placedObject==="rectangle") {
            ctxCursor.clearRect(0,0,500,500);
            ctx.beginPath();
            ctx.rect(mouseX-width/2,mouseY-height/2,width,height);
            if(fill){
                ctx.fill();
            }
            if(border){
                ctx.stroke();
            }
        }else if(placedObject==="circle"){
            ctxCursor.clearRect(0,0,500,500);
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
            if(fill){
                ctx.fill();
            }
            if(border){
                ctx.stroke();
            }
        }else if(placedObject==='eraser'){
            ctxCursor.clearRect(0,0,500,500);
            ctx.clearRect(mouseX-width/2,mouseY-height/2,width,height);
        }
        else if(placedObject==='polygon'){


            if(phase===0) {
                brushReversedSetter(false);
                addPoint();
                cTimer=setInterval(drawPolygon,10);
                phase++;
            }else if(phase===1){
                addPoint();
                phase++;
            }else if(phase===2){
                if(points[0]>=mouseX-sensR && points[0]<=mouseX+sensR && points[1]>=mouseY-sensR && points[1]<=mouseY+sensR){
                    phase++;
                    clearInterval(placing);
                    points[points.length-2]=points[0];
                    points[points.length-1]=points[1];
                }else{
                    addPoint();
                }
            }else if(phase===3){

            }
        }
        else {
            clearInterval(placing);
            if(phase===0) {
                brushReversedSetter(false);
                bezierController();
                phase++;
            }else if(phase===1){
                phase++
            }else if(phase===2) {
                if (mouseX > startX - sensR && mouseX < startX + sensR && mouseY > startY - sensR && mouseY < startY + sensR) {
                    placing = setInterval(configureStart, 10);
                    phase++;

                } else if (mouseX > cp1x - sensR && mouseX < cp1x + sensR && mouseY > cp1y - sensR && mouseY < cp1y + sensR) {
                    placing = setInterval(configureCp1, 10);
                    phase++;

                } else if (mouseX > cp2x - sensR && mouseX < cp2x + sensR && mouseY > cp2y - sensR && mouseY < cp2y + sensR) {
                    placing = setInterval(configureCp2, 10);
                    phase++;

                } else if (mouseX > endX - sensR && mouseX < endX + sensR && mouseY > endY - sensR && mouseY < endY + sensR) {
                    placing = setInterval(configureEnd, 10);
                    phase++;

                }
            }else{
                phase--;
            }
        }
    }
}

function submit(){
    if(placedObject==='bezier'){
        clearInterval(cTimer);
        clearInterval(placing);
        ctxCursor.clearRect(0,0,500,500);
        phase=0;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        if(fill){
            ctx.fill();
        }
        if(border){
            ctx.stroke();
        }
        brushReversedSetter(true);
    }else if(placedObject==='polygon'){
        clearInterval(cTimer);
        clearInterval(placing);
        ctxCursor.clearRect(0,0,500,500);
        phase=0;

        ctx.beginPath();
        ctx.moveTo(points[0],points[1]);
        for (let i=2;i<points.length-2;i+=2){
            ctx.lineTo(points[i],points[i+1]);
        }
        if(fill){
            ctx.fill();
        }
        if(border){
            ctx.stroke();
        }
        points=[];
        brushReversedSetter(true);
    }
}

function brushStart(){
    if(brush) {
        brushTimer = setInterval(placeObject, 10);
    }
}
function brushStop(){
    clearInterval(brushTimer);
}