/*
nwm czy bledy:


bledy:
keyframe sie pierdola nwm czemu wciaz;

 */
let keyframes = [],
    frames=[],
    lastKeyframe=0,
    playTimer,
    i=0;

function checkExistingKeyframe(keyframe){
    i++;
    return keyframe[0]===frame;
}

function addKeyframe(){
    if(objectMode===false) {
        i=0;
        if(keyframes.find(checkExistingKeyframe)) {
            console.log("KLATKA ISTNIEJE, AKTUALIZUJE KEYFRAME NR",i-1);
            keyframes[i-1]=[frame, ctx.getImageData(0, 0, canvasW, canvasH)];
        }else {
            console.log("Nowa klateczkaaaa");
            keyframes.push([frame, ctx.getImageData(0, 0, canvasW, canvasH)])
        }
        console.log(keyframes);
        lastKeyframe = keyframes.length - 1;
    }else{

    }
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
    if(frame<endFrame)
    {
        try {
            if (lastKeyframe < keyframes.length && frame < keyframes.length) {
                if (keyframes[lastKeyframe + 1][0] === frame) {
                    clear();
                    ctx.putImageData(keyframes[lastKeyframe + 1][1], 0, 0);
                    lastKeyframe++;
                }
            }
        }catch{

        }
        frame++;
        document.getElementById("frame").value = frame;
    }
}
function prevFrame(){
    if(frame>startFrame)
    {

        if (lastKeyframe > 0 && keyframes[lastKeyframe - 1][0] === frame) {
            clear();
            ctx.putImageData(keyframes[lastKeyframe - 1][1], 0, 0);
            lastKeyframe--;
        }
        frame--;
        document.getElementById("frame").value = frame;
    }
}
function cycleFrames(){
    if(frame<=endFrame){
        frame++;
        if (lastKeyframe < keyframes.length && frame < keyframes.length) {
            if (keyframes[lastKeyframe + 1][0] === frame) {
                clear();
                ctx.putImageData(keyframes[lastKeyframe + 1][1], 0, 0);
                lastKeyframe++;
            }
        }
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

