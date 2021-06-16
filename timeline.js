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
//to nie działa
function findPreviousKeyframe(keyframe){
    i++;
    return keyframe[0]>frame;
}

// chce dodać keyframe
// jeśli keyfreame istnieje, to edytować, jeśli nie, to stworzyć nowy
// jeśli tworzyć nowy, to jeśli ostatni keyframe jest z klatki większej niż dodawany keyframe, to trzeba znaleźć pierwszą wartość mniejszą niż dodawany keyframe i wstawić go przed nią
// jeśli taki nie istnieje, to dac jako pierwszą klatkę
// jeśli ostatni keyframe jest z klatki mniejszej niż dodawany keyframe, to dodać na końcu

function addKeyframe(){
    if(objectMode===false) {
        i=0;
        if(keyframes.find(checkExistingKeyframe)) {
            keyframes[i-1]=[frame, ctx.getImageData(0, 0, canvasW, canvasH)];
        }else if(keyframes.length>0) {
            if(keyframes[keyframes.length - 1][0]<frame){
                keyframes.push([frame, ctx.getImageData(0, 0, canvasW, canvasH)])
            }else{
                i=0;
                if(keyframes.find(findPreviousKeyframe)){
                    keyframes.splice(i-1,0,[frame, ctx.getImageData(0, 0, canvasW, canvasH)]);
                }else{
                    keyframes.splice(0,0,[frame, ctx.getImageData(0, 0, canvasW, canvasH)]);
                }
            }
        }else{
            keyframes.push([frame, ctx.getImageData(0, 0, canvasW, canvasH)])
        }
        console.log(keyframes);
        lastKeyframe = keyframes.length - 1;
    }else{

    }
}
//To nie działa
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
//to jakby działa?
function nextFrame(){
    if(frame<endFrame)
    {
        frame++
        try {
            if (keyframes[lastKeyframe + 1][0] === frame) {
                lastKeyframe++;
                console.log("jest i keyframe");
            }
        }
        catch{
            console.log("nie ma keyframe");
        }
    }else{
        frame=startFrame;
        lastKeyframe=0;
        if(keyframes[0][0]===frame){
            console.log("Na klatce początkowej jest keyframe")
        }
    }
    document.getElementById("frame").value = frame;
}
//to nie działa
function prevFrame(){
    if(frame>startFrame)
    {
        frame--;
        document.getElementById("frame").value = frame;
        if (lastKeyframe > 0 && keyframes[lastKeyframe][0] === frame) {
            clear();
            lastKeyframe--;
            ctx.putImageData(keyframes[lastKeyframe][1], 0, 0);

        }

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

