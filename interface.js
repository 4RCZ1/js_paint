class Pinpoint {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.following=false;
    }
    draw() {
        quickPin(this.x,this.y);
    }
    hovered(){
        return (mouseX>this.x-sensR && mouseX<this.x+sensR && mouseY>this.y-sensR && mouseY<this.y+sensR);
    }
    followOnClick(){
         if(mousedown){
             if(this.hovered()){
                 this.following = true;
             }
         }else{
             this.following=false;
         }
    }
    modify(x,y){
        this.x=x;
        this.y=y;
    }
}
function quickPin(x,y){
    //white outline
    ctxCursor.lineWidth = 2;
    ctxCursor.strokeStyle = "rgba(255,255,255,0.3)"
    ctxCursor.beginPath();
    ctxCursor.arc(x, y, sensR, 0, 2 * Math.PI);
    ctxCursor.stroke();

    //black circle
    ctxCursor.lineWidth = 1;
    ctxCursor.strokeStyle = "rgb(0,0,0)"
    ctxCursor.beginPath();
    ctxCursor.arc(x, y, sensR, 0, 2 * Math.PI);
    ctxCursor.stroke();

    borderColorSetter();
    lWidthSetter();
}
function clear(canvas="default"){
    if(canvas==="cursor"){
        ctxCursor.clearRect(0,0,canvasW,canvasH);
    }else{
        ctx.clearRect(0,0,canvasW,canvasH);
    }
}