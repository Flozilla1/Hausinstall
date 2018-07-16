var catArr = ["#cat--1", "#cat-0", "#cat-1", "#cat-2", "#cat-3", "#cat-4", "#cat-5"]
var color = {   // r/g/b x7 +/- red/green/blue darf 0/255 nicht überschreiten
    'r': -10,
    'g': -2,
    'b': 15,
    'r2': 20,
    'g2': -5,
    'b2': 5
}
function colorize (){
    
    document.getElementsByTagName("head")[0].innerHTML += "<style id='color_css'></style>"

    var red = 230
    var green = 255
    var blue = 100
    
    var red2 =  20
    var green2 = 120
    var blue2 = 20
    
    var zindex = 6
    
    var breadcrums = document.getElementById("breadcrums").style
    breadcrums.backgroundColor = "rgb(" + (red + 3 * color.r) + ", " + (green + 3 * color.g) + ", " + (blue + 3 * color.b) + ")"
    
    $(".all_fold-ups").each(function (key, val){
        red += color.r
        green += color.g
        blue += color.b
        red2 += color.r2
        green2 += color.g2
        blue2 += color.b2
        
        var color1 = "rgb(" + red + ", " + green + ", " + blue + ")"
        var color2 = "rgb(" + red2 + ", " + green2 + ", " + blue2 + ")"
        
        val.style.zIndex = --zindex
        val.style.backgroundColor = color1
        val.style.color = color2
        
        createColorCss(color1, color2, key)
        })
}

function createColorCss (color1, color2, key){
    var cssInsides = document.getElementById("color_css")
    cssInsides.innerHTML += catArr[key] + " .cat_unit{\nbackground-color: " + color2 + ";\ncolor: " + color1 + "}\n"
    cssInsides.innerHTML += "#breadcrums{color:" + color2 + ";border-bottom: solid 8px " + color2 + "}"
    cssInsides.innerHTML += ".all_fold-ups{border-right: solid 1px " + color2 + ";}"
    cssInsides.innerHTML += "button{border: solid 1px " + color2 + "}"
}