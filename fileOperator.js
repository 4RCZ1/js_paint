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
    let content = JSON.stringify(objects);
    let file = new Blob([content], {type: 'text/plain'});
    let filename="save1";
    let element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = filename;
    element.click();
}

function openFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        console.log(e.target.result)
        objects=JSON.parse(reader.result);
        console.log(objects);
        objects.forEach((element,index) => {addLayer('obj'); objSelect(index); objSubmit();addObjectToList(element[0],index); console.log(index);})
    };
    reader.readAsText(file)
}

function selectFile(){
    document.getElementById("FILE_SELECT").style.display = "flex";
}

function clearFile(){
    console.log("F5 se kliknij ez");
}
