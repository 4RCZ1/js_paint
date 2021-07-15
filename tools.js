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
    // if(brushMode) {
    //     brushTimer = setInterval(placeObject, 10);
    // }
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
