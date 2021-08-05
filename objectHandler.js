let mousedown,object,activeObject;
function click(){
    if(placedObject==="rectangle"){

    }else if(placedObject==="circle"){

    }else if(placedObject==="bezier"){

    }else if(placedObject==="polygon"){

    }
}
function mouseDown(){
    mousedown=true;
}
function mouseUp(){
    mousedown=false;
}
function mouseLeave(){
    mousedown=false;
}
function objSelect(i=null){
    clearInterval(objTimer);
    if(i===null)
    {
      i=document.getElementById("objects").value;
    }
    ctxCursor.clearRect(0,0,500,500);
    if(objects[i][0]==="rect"){
        object=new Rectangle(objects[i][1],objects[i][2],objects[i][3],objects[i][4],objects[i][5],objects[i][6],objects[i][7],i)
    }
    else if(objects[i][0]==="circ"){
        object=new Circle(objects[i][1],objects[i][2],objects[i][3],objects[i][4],objects[i][5],objects[i][6],i)
    }
    else if(objects[i][0]==="bez"){
        object=new Bezier(objects[i][1],objects[i][2],objects[i][3],objects[i][4],objects[i][5],objects[i][6],objects[i][7],objects[i][8],objects[i][9],objects[i][10],objects[i][11],objects[i][12],i)
    }else if(objects[i][0]==="poly"){
        object=new Polygon(objects[i][1],objects[i][2],objects[i][3],objects[i][4],objects[i][5],i)
    }
    if(isPlaying===false) {
        objTimer = setInterval(function () {
            object.draw();
            object.configure();
        }, 10);
    }
}
function objAdd(_object){
    clearInterval(objTimer);
    let b=false,f=false;
    addLayer("object");

    object=false;

    placedObject=_object;
    cCursor = document.getElementById("cursor");
    ctxCursor = cCursor.getContext("2d");

    if(border){
        b=ctx.strokeStyle;
    }
    if(fill){
        f=ctx.fillStyle;
    }

    if(placedObject==="rectangle") {

        console.log("Rectangle");
        object=new Rectangle(250,250,30,30,parseInt(activeLayer), b, f);
        objTimer=setInterval(function(){object.draw();object.configure();},10);

    }else if(placedObject==="circle") {
        console.log("Circle");
        object=new Circle(250,250,30,parseInt(activeLayer),b,f);
        objTimer=setInterval(function(){object.draw();object.configure();},10);
    }
    else if(placedObject==="bezier"){
        console.log("Bezier");
        object=new Bezier(200,250,230,280,270,220,300,250,parseInt(activeLayer), b, f);
        objTimer=setInterval(function(){object.draw();object.configure();},10);
    }
    else if(placedObject==="polygon"){
        console.log("Polygon");
        object=new Polygon([200,200,300,200,300,300],parseInt(activeLayer), b, f);
        objTimer=setInterval(function(){object.draw();object.configure();},10);
    }
    else if(placedObject==='gradient'){
        console.log("Gradient");
        object=new Gradient(0,250,500,250,parseInt(activeLayer));
        objTimer=setInterval(function(){object.draw();object.configure();},10);
    }

    if(object){
        //objTimer=setInterval(function(){object.draw();object.configure();},10); this line can be moved here, and that would be more practical in case of any changes
    }

    console.log("object ",_object," added");

}

function addObjectToList(label,index='none'){
    let option = document.createElement("option");
    if(index==='none'){
        option.text = label+" "+objects.length;
        option.value = objects.length-1;
    }else{
        console.log(index);
        option.text = label+" "+(index+1);
        option.value = index;
    }
    document.getElementById("objects").add(option);
    objLayerSelect(layerNum);
}

function objSubmit(){
    if(object){
        object.draw();
        object.save();
        object = false;
        clearInterval(objTimer);
    }
}
