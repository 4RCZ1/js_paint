/*
nwm czy bledy:


bledy:


 */
let keyframes = [],
    objKeyframes = [],
    lastKeyframe=0,
    playTimer,
    i=0,
    isPlaying=false;

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
        objKeyframes.push([frame,[object.getData()]]);
        console.log(objKeyframes);
    }
}

function setFrame(){
    console.log("Frame set");
    let found=false;
    //sprawdź czy na nowej klatkce jest klatka kluczowa, jeśli tak, to skorzystaj z niej
    if(objectMode===false) {
        for (let j = 0; j < keyframes.length; j++) {
            if (keyframes[j][0] === frame) {
                clear();
                ctx.putImageData(keyframes[j][1], 0, 0);
                lastKeyframe = j;
                found = true;
                console.log("Znaleziono KLATKE!!!");
                break;
            }
        }
        if (!found) {
            //znajdź klatkę kluczową przed obecną klatką
            i = 0;
            if (keyframes.find(findPreviousKeyframe)) {
                lastKeyframe = i - 2;
            } else {
                lastKeyframe = keyframes.length - 1;
            }

        }
    }else{
        for (let j = 0; j < objKeyframes.length; j++) {
            if (objKeyframes[j][0] === frame) {
                clear();
                objFramePutter(j);
                lastKeyframe = j;
                found = true;
                console.log("Znaleziono KLATKE!!!");
                break;
            }
        }
        if (!found) {
            //znajdź klatkę kluczową przed obecną klatką
            i = 0;
            if (objKeyframes.find(findPreviousKeyframe)) {
                lastKeyframe = i - 2;
            } else {
                lastKeyframe = objKeyframes.length - 1;
            }

        }
    }

}

//[ [0,[ [dane obiektu],[dane obiektu2] ] ] ]
//[0]=[0,[ [dane obiektu],[dane obiektu2] ] ]
//[0][0]=0
//[0][1]=[ [dane obiektu],[dane obiektu2] ]
//[0][1][0]=[dane obiektu]

function nextFrame(){
    if(frame<endFrame)
    {
        frame++
        if(objectMode===false){
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
                if (objKeyframes[lastKeyframe + 1][0] === frame) {
                    lastKeyframe++;
                    objFramePutter()
                    console.log("jest i objKeyframe");
                }
            }catch{
                console.log("Nie ma objKeyframe");
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
        if(objectMode===false) {
            try {
                if (keyframes[lastKeyframe - 1][0] === frame) {
                    lastKeyframe--;
                    ctx.putImageData(keyframes[lastKeyframe][1], 0, 0);
                    console.log("jest i keyframe");
                }
            } catch {
                console.log("nie ma keyframe");
            }
        }else{
            try {
                if (objKeyframes[lastKeyframe - 1][0] === frame) {
                    lastKeyframe--;
                    objFramePutter()
                    console.log("jest i objKeyframe");
                }
            }catch{
                console.log("Nie ma objKeyframe");
            }
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
    isPlaying=true;
}

function stop(){
    clearInterval(playTimer);
    isPlaying=false;
}

function objFramePutter(j=null){
    if(j===null){
        j=lastKeyframe
    }
    clear("cursor");
    objKeyframes[j][1].forEach(function(item){
        objSelect(item[item.length-1]);
        object.update(item.slice(0,item.length-1));
        object.draw();
    })
}
