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
                keyframes.push([frame, ctx.getImageData(0, 0, canvasW, canvasH)]);
            }else{
                i=0;
                if(keyframes.find(findPreviousKeyframe)){
                    keyframes.splice(i-1,0,[frame, ctx.getImageData(0, 0, canvasW, canvasH)]);
                }else{
                    keyframes.splice(0,0,[frame, ctx.getImageData(0, 0, canvasW, canvasH)]);
                }
            }
        }else{
            keyframes.push([frame, ctx.getImageData(0, 0, canvasW, canvasH)]);
        }
        console.log(keyframes);
        lastKeyframe = keyframes.length - 1;
    }else{
        //obiektowa wersja dodawania klatek
        i=0;
        if(objKeyframes.find(checkIfKeyframeExist)) {

            let found = false;
            let newData = object.getData();
            for(let j=0;j<objKeyframes[i-1][1].length;j++){
                if(objKeyframes[i-1][1][j][objKeyframes[i-1][1][j].length - 1]===newData[newData.length-1]){
                    objKeyframes[i-1][1][j]=newData;
                    found=true;
                    break;
                }
            }
            if(!found){
                objKeyframes[i-1][1].push(newData);
            }

        }else if(objKeyframes.length>0) {
            if(objKeyframes[objKeyframes.length - 1][0]<frame){
                objKeyframes.push([frame,[object.getData()]]);
            }else{
                i=0;
                if(objKeyframes.find(findPreviousKeyframe)){
                    objKeyframes.splice(i-1,0,[frame,[object.getData()]]);
                }else{
                    objKeyframes.splice(0,0,[frame,[object.getData()]]);
                }
            }
        }else{
            objKeyframes.push([frame,[object.getData()]]);
        }
        console.log(objKeyframes);
        lastKeyframe = objKeyframes.length - 1;
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
                    console.log("objKeyframe placed");
                }else{
                    console.log("No objKeyframe present, trying interpolation");
                    objFrameInterpolator();
                }

            }catch{
                console.log("Last keyframe is behind");
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
//TODO: Make it per object, not per keyframe
function objFrameInterpolator(){
    let frameDifference = objKeyframes[lastKeyframe+1][0]-objKeyframes[lastKeyframe][0];
    let framesPassed = frame-objKeyframes[lastKeyframe][0];
    objKeyframes[lastKeyframe][1].forEach(function(item, index){
        objSelect(item[item.length-1]);
        let updateData=item.slice(0,item.length-1);
        for(let i = 0 ; i<updateData.length; i++){
            //startValue+(endValue-startValue)/steps*(actualStep-startStep)=actualValue
            updateData[i] += (objKeyframes[lastKeyframe+1][1][index][i]-updateData[i])/frameDifference*framesPassed;
        }
        object.update(updateData);
        object.draw();
    })
}
