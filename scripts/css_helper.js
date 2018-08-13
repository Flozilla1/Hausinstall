function colorize (){
    
    document.getElementsByTagName("head")[0].innerHTML += "<style id='color_css'></style>"
    
    var colors = {
    'red': 250,
    'green': 255,
    'blue': 110,
    'red2':  20,
    'green2': 139,
    'blue2': 80
    }
    var zindex = 7
    
    var breadcrums = document.getElementById("breadcrums").style
    breadcrums.backgroundColor = "rgb(" + (colors.red + 3 * colorSteps.r) + ", " + (colors.green + 3 * colorSteps.g) + ", " + (colors.blue + 3 * colorSteps.b) + ")"
    
    $(".all_cats").each(function (key, val){
        
        var color = colorEvolve(colors, "+", 1)

        val.style.zIndex = --zindex
        val.style.backgroundColor = color[0]
        val.style.color = color[1]
        
        createColorCss(color[0], color[1], key)
        })
    
    colorEvolve(colors, "-", 3)
    zindex = zindex + 4
    $(".all_fis").each(function (key, val){
        
        var color = colorEvolve(colors, "+", 1)
        
        val.style.zIndex = --zindex
        val.style.backgroundColor = color[1]
        val.style.color = color[0]
        
        var cssInsides = document.getElementById("color_css")
        cssInsides.innerHTML += "#fis-" + (key + 2) + " .cat_unit{\nbackground-color: " + color[0] + ";\ncolor: " + color[1] + ";}\n"
    })
}

function colorEvolve (colors, plusMinus, speed){
    
    colors.red += (speed * colorSteps.r) * (plusMinus + "1")
    colors.green += (speed * colorSteps.g) * (plusMinus + "1")
    colors.blue += (speed * colorSteps.b) * (plusMinus + "1")
    colors.red2 += (speed * colorSteps.r2) * (plusMinus + "1")
    colors.green2 += (speed * colorSteps.g2) * (plusMinus + "1")
    colors.blue2 += (speed * colorSteps.b2) * (plusMinus + "1")

    var color1 = "rgb(" + colors.red + ", " + colors.green + ", " + colors.blue + ")"
    var color2 = "rgb(" + colors.red2 + ", " + colors.green2 + ", " + colors.blue2 + ")"

    return [color1,color2]
}

function createColorCss (color1, color2, key){
    var cssInsides = document.getElementById("color_css")
    cssInsides.innerHTML += catArr[key] + " .cat_unit{\nbackground-color: " + color2 + ";\ncolor: " + color1 + ";}\n"
    //cssInsides.innerHTML += ".all_fold-ups{border-right: solid 1px " + color2 + ";}"

    cssInsides.innerHTML += "#breadcrums{color:" + color2 + ";border-bottom: solid 8px " + color2 + ";}"
    cssInsides.innerHTML += "@keyframes bounce{0%{color: transparent; text-shadow: 0px 0px 10px " + color2 + ";}100%{color: transparent; text-shadow: 0px 0px 0px " + color2 + ";}}"
    cssInsides.innerHTML += "#breadcrums div:last-child{animation: bounce 0.4s ease 0s 1;}"
    cssInsides.innerHTML += "#breadcrums div:nth-last-child(2){opacity: " + (1 - fadeAndBlurSteps * 2.5) + "; color: transparent; text-shadow: 0px 0px " + (fadeAndBlurSteps * 15) + "px " + color2 + "}"
    cssInsides.innerHTML += "#breadcrums div:nth-last-child(3){opacity: " + (1 - fadeAndBlurSteps * 3.5) + "; color: transparent; text-shadow: 0px 0px " + (fadeAndBlurSteps * 25) + "px " + color2 + "}"
    cssInsides.innerHTML += "#breadcrums div:nth-last-child(4){opacity: " + (1 - fadeAndBlurSteps * 4.5) + "; color: transparent; text-shadow: 0px 0px " + (fadeAndBlurSteps * 35) + "px " + color2 + "}"
    cssInsides.innerHTML += "#breadcrums div:nth-last-child(5){opacity: " + (1 - fadeAndBlurSteps * 5.5) + "; color: transparent; text-shadow: 0px 0px " + (fadeAndBlurSteps * 40) + "px " + color2 + "}"
    cssInsides.innerHTML += "#breadcrums div:hover{text-shadow: 0px 0px 0px " + color2 + "; opacity: 1;}"
}