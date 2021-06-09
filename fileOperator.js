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
function saveFile(){
    // let imgData = new Array();
    // for(let i=0;i<layerNum;i+=2){
    //     c = document.getElementById(activeLayer);
    //     ctx = c.getContext("2d");
    //     imgData.push(ctx.getImageData);
    // }
    let imgData = ctx.getImageData(0,0,500,500);
    let filename="save1";
    let data=imgData;
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
function openFile(){
    console.log("nie.");
}
function clearFile(){
    console.log("F5 se kliknij ez");
}