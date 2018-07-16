var countOfCrums = 0

function keyboardCtrl (pressed){
    
    if (openedUnit == undefined){
        switch (pressed.key){
            case ("ArrowDown"):
                var firstUnit = $(target + " div:nth-of-type(2)")
                firstUnit.click()
                break
        }
    } else {
        switch (pressed.key){
            case ("ArrowRight"):
                openedUnit.lastElementChild.click()
                openedUnit = undefined
                break
            case ("ArrowDown"):
                var nextUnit = $(".telling + div")
                nextUnit.click()
                break       
        }
    }
    if (pressed.key == "ArrowLeft"){
            oneStepBack()
            openedUnit = undefined
    }
}

function addBreadcrum (){
    var name = $(that).parent()[0].getAttribute("name")
    var cat = ++countOfCrums        
    
    if ($("#breadcrums")[0].innerHTML == "<span>Willkommen!</span>"){
        $("#breadcrums")[0].innerHTML = ""
    }
    $("#breadcrums")[0].innerHTML += "<span cat='" + cat + "'> > " + name + "</span>"
    
    $("#breadcrums span").click(goToClickedBread)
}
function goToClickedBread (){
    var tarCat = this.getAttribute("cat")
    openBread (tarCat)
}
function openBread (tarCat){
    target = "#cat-" + tarCat
    countOfCrums = tarCat
    open(target)
    --countOfCrums
    cleanUpRemains(tarCat)
}
function cleanUpRemains (tarCat) {
    $.each($("#breadcrums span"), function(key, val){
        if (val.getAttribute("cat") >= tarCat){
            val.remove()
        }
        if (val.getAttribute("cat") > tarCat){
            removeContent(val.getAttribute("cat"))
        }
        if ($("#breadcrums")[0].innerHTML == ""){
            $("#breadcrums")[0].innerHTML = "<span>Willkommen!</span>"
            countOfCrums = 0
        }
    })
    $("button").off("click")
    $("button").click(placeAction)
}
function oneStepBack (){
    --countOfCrums
    if (countOfCrums >= 1){
        openBread(countOfCrums)
    }
}