/*
nwm czy bledy:


bledy:
keyframe sie pierdola nwm czemu wciaz;

 */
let keyframes = [],
    frames=[],
    lastKeyframe=0,
    playTimer;

function addKeyframe(){
    keyframes.push([frame,ctx.getImageData(0,0,canvasW,canvasH)])
    console.log(keyframes);
    lastKeyframe=keyframes.length-1;
}

function setFrame(){
    console.log("Frame set");
    for(let i=0;i<keyframes.length;i++){
        if(keyframes[i][0]===frame){
            clear();
            ctx.putImageData(keyframes[i][1],0,0);
            lastKeyframe=i;
        }
    }
}
function nextFrame(){
    console.log("nextFrame");
    if(lastKeyframe<keyframes.length&&frame<keyframes.length){
        if(keyframes[lastKeyframe+1][0]===frame){
            console.log("keyframe");
            clear();
            ctx.putImageData(keyframes[lastKeyframe + 1][1], 0, 0);
            lastKeyframe++;
        }
    }
}
function prevFrame(){
    console.log("prevFrame");
    if(lastKeyframe>0 && keyframes[lastKeyframe-1][0]===frame){
        console.log("keyframe");
        clear();
        ctx.putImageData(keyframes[lastKeyframe-1][1],0,0);
        lastKeyframe--;
    }
}
function cycleFrames(){
    if(frame<=endFrame){
        frame++;
        nextFrame();
    }else{
        frame=startFrame;
        setFrame();
    }
    console.log("frameCycledto: ",frame);
    document.getElementById("frame").value = frame;
}
function play(){
    stop();
    playTimer=setInterval(cycleFrames,1000/framerate);
}
function stop(){
    clearInterval(playTimer);
}

