let layerNum=0;
function addLayer(type="rasterized"){
    layerNum += 2;
    let layer = document.createElement('canvas');
    layer.id = layerNum;
    layer.width = 500;
    layer.height = 500;
    layer.style.zIndex = layerNum;
    document.getElementById("WORKSPACE").appendChild(layer);
    activeLayer = layerNum;
    document.getElementById("clickGetter").style.zIndex = parseInt(layerNum) + 2;
    //dodaje wpis w liście warstw tylko wtedy, kiedy warstwa jest rasteryzowana
    if (type === "rasterized") {
        let option = document.createElement("option");
        option.text = "Layer " + layerNum / 2;
        option.value = layerNum;
        document.getElementById("layers").add(option);
        document.getElementById("layers").value = activeLayer;
        layerSelect();
    }
}
function layerSelect(){
    activeLayer=document.getElementById("layers").value;
    c = document.getElementById(activeLayer);
    ctx = c.getContext("2d");
    document.getElementById("cursor").style.zIndex=parseInt(activeLayer) + 1;
    allSetter();
}
function objLayerSelect(layer){
    activeLayer=layer;
    c = document.getElementById(layer);
    ctx = c.getContext("2d");
    document.getElementById("cursor").style.zIndex=parseInt(layerNum) + 1;
}
