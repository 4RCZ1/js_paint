function presetting(){
    c = document.getElementById("0");
    ctx = c.getContext("2d");
    console.log("Presetted Succesfully")
    //ALLSETTER
    cCursor = document.getElementById("cursor");
    ctxCursor = cCursor.getContext("2d");
    allSetter();
    modeSetter();
}
function saveObjects(){
    let content = JSON.stringify(objects);
    let file = new Blob([content], {type: 'text/plain'});
    let filename="save1";
    let element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = filename;
    element.click();
}
function saveImage(){
    let imageCtx = document.getElementById('imageGetter').getContext("2d");

    for(let i=0;i<=layerNum;i+=2){
        console.log('copied data from ',i);
        imageCtx.drawImage(document.getElementById(i),0,0);
    }

    let file = document.getElementById("imageGetter").toDataURL("image/png");
    let filename="image.png";
    let element = document.createElement('a');
    element.href = file;
    element.download = filename;
    element.click();
}

function openFile(file) {
    if(file.type && file.type.match('image.*')){
        const reader = new FileReader();
        reader.onload = function(event){
            let img=new Image;
            img.src=event.target.result;
            ctx.drawImage(img,0,0);
        };
        reader.readAsDataURL(file);
    }else{
        const reader = new FileReader();
        reader.onload = function(e) {
            objects = JSON.parse(reader.result);
            console.log(objects);
            objects.forEach((element, index) => {
                addLayer('obj');
                objSelect(index);
                objSubmit();
                addObjectToList(element[0], index);
                console.log(index);
            })
        };
        reader.readAsText(file);
    }


}

function selectFile(){
    document.getElementById("FILE_SELECT").style.display = "flex";
}

function clearFile(){
    console.log("F5 se kliknij ez");
}
