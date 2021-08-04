function select(){
    ctxCursor.clearRect(0,0,500,500);
    clearInterval(placing);
    clearInterval(cTimer);
    placing=null;
}

function brush() {
    brushMode=true;
    fill=true;
}
function brushStart(){
    clearInterval(brushTimer);
    if(brushMode){
        ctx.beginPath();
        ctx.moveTo(mouseX,mouseY);
        brushTimer=setInterval(function(){ ctx.lineTo(mouseX,mouseY); ctx.stroke();},1);
    }
}
function brushStop(){
    ctx.stroke();
    clearInterval(brushTimer);
}
function gradient(){
    clearInterval(placing);
    let grd=ctxCursor.createLinearGradient(0, 20, 200, 20);
    let startPin=new Pinpoint(0,20);
    let endPin=new Pinpoint(200,20);
    placing=setInterval(function(){gradientPlacer(startPin,endPin,grd);},10);
}
function gradientPlacer(startPin,endPin,grd){
    startPin.draw();
    endPin.draw();
    startPin.followOnClick();
    endPin.followOnClick();
    grd=ctxCursor.createLinearGradient(startPin.position()[0], startPin.position()[1], endPin.position()[0], endPin.position()[1]);
    grd.addColorStop(0, document.getElementById("fillColor").value);
    grd.addColorStop(1, ctxCursor.strokeStyle);
    console.log(startPin.position()[0],startPin.position()[1]);
    if(startPin.following){
        startPin.modify(mouseX,mouseY);
        clear("cursor");
    }else if(endPin.following){
        endPin.modify(mouseX,mouseY);
        clear("cursor");
    }
    //grd.addColorStop(0, "#000000");
    //grd.addColorStop(1, ctxCursor.strokeStyle);
    ctxCursor.fillStyle = grd;
    ctxCursor.fillRect(0, 0, 500, 500);
    startPin.draw();
    endPin.draw();
}
