let canvas = new fabric.Canvas('c', { width: 800, height: 400 });
canvas.setBackgroundColor("white");
canvas.renderAll();

//label dimension functionality
let labeldim = document.getElementById("labeldim");
labeldim.onchange = () => {
    console.log(labeldim.value);
    canvas.clear();
    canvas.dispose();
    canvas = new fabric.Canvas('c', dimension_table[labeldim.value]);
    canvas.setBackgroundColor("white");
    canvas.renderAll();
};

//add text
document.getElementById("addtext").onclick = () =>{
  var textbox = new fabric.Textbox('Lorum ipsum', {
  left: 50,
  top: 50,
  width: 150,
  fontSize: 20
});
canvas.add(textbox).setActiveObject(textbox);
}

//add line
document.getElementById("addline").onclick = () =>{
  var line = new fabric.Line([50, 50, 200, 50], { 
            stroke: 'black', strokeWidth: 3
        });
canvas.add(line).setActiveObject(line);
}



//add barcode
document.getElementById("addbarcode").onclick = () =>{
  fabric.Image.fromURL('/src/UPC.png', function(myImg) {
 //i create an extra var for to change some image properties
 var img1 = myImg.set({ left: 50, top: 50});
 img1.scaleToHeight(346);
 img1.scaleToWidth(480);
 canvas.add(img1); 
});
}

//add logo
document.getElementById('addlogo').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) { console.log('fdsf');
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            // start fabricJS stuff
            
            var image = new fabric.Image(imgObj);
            image.set({
                left: 250,
                top: 250
            });
            image.scale(0.1).setCoords();
            canvas.add(image);
            
            // end fabricJS stuff
        }
        
    }
    reader.readAsDataURL(e.target.files[0]);
}

//Delete active object
document.getElementById("delete").onclick = () =>{
  canvas.getActiveObjects().forEach((obj) => {
    canvas.remove(obj)
  });
  canvas.discardActiveObject().renderAll()

}


let dimension_table = {
  "s4x2" : {width: 800, height: 400},
  "s1.5_1": {width: 900, height: 600},
  "s1.75_0.5": {width: 875, height: 250},
  "s1.75_1.25": {width: 875, height: 625},
  "s2.25_0.75": {width: 900, height: 300}
};