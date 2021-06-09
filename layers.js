let layerNum=0;
function addLayer(){
        layerNum+=2;
        let layer = document.createElement('canvas');
        layer.id = layerNum;
        layer.width = 500;
        layer.height = 500;
        layer.style.zIndex=layerNum;
        document.getElementById("WORKSPACE").appendChild(layer);
        let option = document.createElement("option");
        option.text = "Layer " + layerNum/2;
        option.value = layerNum;
        document.getElementById("layers").add(option);
        document.getElementById("clickGetter").style.zIndex=parseInt(layerNum) + 2;
}
function layerSelect(){
    activeLayer=document.getElementById("layers").value;
    c = document.getElementById(activeLayer);
    ctx = c.getContext("2d");
    document.getElementById("cursor").style.zIndex=parseInt(activeLayer) + 1;
    console.log("Layer set to "+activeLayer);
    allSetter();
}
function objLayerSelect(layer){
    activeLayer=layer;
    c = document.getElementById(layer);
    ctx = c.getContext("2d");
    document.getElementById("cursor").style.zIndex=parseInt(layerNum) + 1;
    console.log("Object layer set to "+layer);
    allSetter();
}