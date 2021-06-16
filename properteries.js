let width=10,
    height=10,
    activeLayer="0",
    radius=10,
    fill=false,
    border=true,
    brush=false,
    lWidth=3,
    objectMode=false,
    canvasW=500,
    canvasH=500;

let startFrame=0,
    endFrame=100,
    frame=0,
    framerate=12;

function allSetter(){
    widthSetter();
    heightSetter();
    radiusSetter();
    fillSetter();
    borderSetter();
    fillColorSetter();
    borderColorSetter();
    brushSetter();
    lWidthSetter();
    endFrameSetter();
    startFrameSetter();
    framerateSetter();
    frameSetter();
    console.log("All set.");
}
function reversedAllSetter(b,f,w=false,h=false,r=false,lw=false){
    if(w){
        document.getElementById("width").value = w;
    }
    if(h){
        document.getElementById("height").value = h;
    }
    if(r){
        document.getElementById("radius").value=r;
    }

    document.getElementById("fill").checked=f;
    document.getElementById("border").checked=b;

    if(b){
        document.getElementById("borderColor").value=b;
    }
    if(f){
        document.getElementById("fillColor").value=f;
    }
    allSetter();
}
function eraserMode(){
    fill=true;
    border=true;
    ctxCursor.strokeStyle="#000000";
    ctxCursor.fillStyle="#FFFFFF";
}
function widthSetter(){
    width=document.getElementById("width").value;
}
function heightSetter(){
    height=document.getElementById("height").value;
}
function radiusSetter(){
    radius=document.getElementById("radius").value;
}
function lWidthSetter(){
    lWidth=document.getElementById("lWidth").value;
    ctx.lineWidth=lWidth;
    ctxCursor.lineWidth=lWidth;
}
function fillSetter(){
    fill=document.getElementById("fill").checked;
}
function borderSetter(){
    border=document.getElementById("border").checked;
}
function fillColorSetter(){
    ctx.fillStyle=document.getElementById("fillColor").value;
    ctxCursor.fillStyle=document.getElementById("fillColor").value;
}
function borderColorSetter(){
    ctx.strokeStyle=document.getElementById("borderColor").value;
    ctxCursor.strokeStyle=document.getElementById("borderColor").value;
}
function brushSetter(){
    brush=document.getElementById("brush").checked;
}
function brushReversedSetter(value){
    document.getElementById("brush").checked=value;
    brush=document.getElementById("brush").checked;
}

function modeSetter(){
    objectMode=document.getElementById("aMode").checked;
    if(objectMode===true) {
        document.getElementById("brushBox").style.display = "none";
        document.getElementById("LayersBox").style.display = "none";
        document.getElementById("pixelSizes").style.display = "none";
        //setting clicks
        document.getElementById("clickGetter").setAttribute('onclick','click()');
        document.getElementById("clickGetter").setAttribute('onmousedown','mouseDown()');
        document.getElementById("clickGetter").setAttribute('onmouseup','mouseUp()');
        document.getElementById("clickGetter").setAttribute('onmouseleave','mouseLeave()');
        //setting objects
        document.getElementById("addRectangle").setAttribute('onclick',"objAdd('rectangle')");
        document.getElementById("addCircle").setAttribute('onclick',"objAdd('circle')");
        document.getElementById("addBezier").setAttribute('onclick',"objAdd('bezier')");
        document.getElementById("addPolygon").setAttribute('onclick',"objAdd('polygon')");
        //setting buttons
        document.getElementById("submit").setAttribute('onclick',"objSubmit()");
        //addLayer();
        objLayerSelect(layerNum);
        brush=false;
        brushStop();
        clearInterval(placing);
        submit();
    }else{
        document.getElementById("brushBox").style.display = "block";
        document.getElementById("LayersBox").style.display = "block";
        document.getElementById("pixelSizes").style.display = "block";
        //setting clicks
        document.getElementById("clickGetter").setAttribute('onclick','placeObject()');
        document.getElementById("clickGetter").setAttribute('onmousedown','brushStart()');
        document.getElementById("clickGetter").setAttribute('onmouseup','brushStop()');
        document.getElementById("clickGetter").setAttribute('onmouseleave','brushStop()');
        //setting objects
        document.getElementById("addRectangle").setAttribute('onclick',"_add('rectangle')");
        document.getElementById("addCircle").setAttribute('onclick',"_add('circle')");
        document.getElementById("addBezier").setAttribute('onclick',"_add('bezier')");
        document.getElementById("addPolygon").setAttribute('onclick',"_add('polygon')");
        //setting buttons
        document.getElementById("submit").setAttribute('onclick',"submit()");
        brushSetter();
        objSubmit();
    }
}

function endFrameSetter(){
    endFrame=document.getElementById("endFrame").value;
}
function startFrameSetter(){
    startFrame=document.getElementById("startFrame").value;
}
function frameSetter(){
    if(frame-document.getElementById("frame").value===-1){
        frame=parseInt(document.getElementById("frame").value);
        nextFrame();
    }else if(frame-document.getElementById("frame").value===1){
        frame=parseInt(document.getElementById("frame").value);
        prevFrame();
    }else{
        frame=parseInt(document.getElementById("frame").value);
        setFrame();
    }
}
function framerateSetter(){
    framerate=document.getElementById("framerate").value;
}