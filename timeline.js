/*
nwm czy bledy:


bledy:


 */
let keyframes = [],
    objectKeyframes = [],
    lastKeyframe=0,
    playTimer,
    i=0;

function checkIfKeyframeExist(keyframe){
    i++;
    return keyframe[0]===frame;

}

function findPreviousKeyframe(keyframe){
    i++;
    return keyframe[0]>frame;

}

function addKeyframe(){
    if(objectMode===false) {
        i=0;
        if(keyframes.find(checkIfKeyframeExist)) {
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
        //obiektowa wersja dodawania klatek
        objectKeyframes.push([frame,[object.getData()]]);
    }
}

function setFrame(){
    console.log("Frame set");
    let found=false;
    //sprawdź czy na nowej klatkce jest klatka kluczowa, jeśli tak, to skorzystaj z niej
    for(let j=0;j<keyframes.length;j++){
        if(keyframes[j][0]===frame){
            clear();
            ctx.putImageData(keyframes[j][1],0,0);
            lastKeyframe=j;
            found=true;
            console.log("Znaleziono KLATKE!!!");
            break;
        }
    }
    if(!found){
        //znajdź klatkę kluczową przed obecną klatką
        i=0;
        if(keyframes.find(findPreviousKeyframe)){
            lastKeyframe=i-2;
        }else{
            lastKeyframe=keyframes.length-1;
        }

    }

}

function nextFrame(){
    if(frame<endFrame)
    {
      frame++
      if(objectMode===true)
      {
        try {
          if (keyframes[lastKeyframe + 1][0] === frame) {
              lastKeyframe++;
              ctx.putImageData(keyframes[lastKeyframe][1],0,0);
              console.log("jest i keyframe");
          }
        }
        catch{
            console.log("nie ma keyframe");
          }
      }else {
        //objektowa wersja
        try {
          if (objectKeyframes[lastKeyframe + 1][0] === frame) {
              lastKeyframe++;
              objSelect(objectKeyframes[lastKeyframe][1][4]);
              object.update(objectKeyframes[lastKeyframe][1])
              console.log("jest i keyframe");
          }
        }
      }
    }else{
      frame=startFrame;
      setFrame();
    }
    document.getElementById("frame").value = frame;
}

function prevFrame(){
    if(frame>startFrame)
    {
        frame--
        try {
            if (keyframes[lastKeyframe - 1][0] === frame) {
                lastKeyframe--;
                ctx.putImageData(keyframes[lastKeyframe][1],0,0);
                console.log("jest i keyframe");
            }
        }
        catch{
            console.log("nie ma keyframe");
        }
    }else{
        frame=endFrame;
        setFrame();
    }
    document.getElementById("frame").value = frame;
}

function cycleFrames(){
    nextFrame();
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
