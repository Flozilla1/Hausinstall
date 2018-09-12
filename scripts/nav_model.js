function keyboardCtrl (pressed){
    if (openedUnit == undefined){
        switch (pressed.key){
            case ("ArrowDown"):
                var firstUnit = $(target + " .cat_unit:nth-of-type(2)")
                firstUnit.click()
                break
            case ("ArrowUp"):
                var firstUnit = $(target + " div:last-child")
                firstUnit.click()
                break
        }
    } else { // openedUnit == defined
// !Achtung! Wenn zwei Dinge dasselbe "name" Attribut haben, wird das zu Fehlern führen
        switch (pressed.key){
            case ("ArrowRight"):
                var listBtn = $("[name='" + openedUnit.getAttribute("name") + "'] .action_list_cat, [name='" + openedUnit.getAttribute("name") + "'] .action_list")[0]
                if (listBtn != undefined){
                    listBtn.click()
                    openedUnit = undefined
                }
                break
            case ("ArrowDown"):
                var nextUnit = $(".telling + div")
                nextUnit.click()
                break
            case ("ArrowUp"):
                var nextUnit = $(".telling").prevAll("div:first")
                nextUnit.click()
                break
            case ("b"):
                $("[name='" + openedUnit.getAttribute("name") + "'] .action_update").click()
                break
            case ("l"):
                $("[name='" + openedUnit.getAttribute("name") + "'] .action_delete").click()
                break
            case ("f"):
                $("[name='" + openedUnit.getAttribute("name") + "'] .action_list_fis").click()
                openedUnit = undefined
                break
            case ("s"):
                $("[name='" + openedUnit.getAttribute("name") + "'] .action_circlist").click()
                openedUnit = undefined
                break
            case ("e"):
                $("[name='" + openedUnit.getAttribute("name") + "'] .action_shoppinglist").click()
                openedUnit = undefined
                break
        }
    }
    switch (pressed.key){
        case ("ArrowLeft"):
            oneStepBack()
            openedUnit = undefined
            break
        case ("n"):
            $("#unfinished_unit").remove()
            $(target + " .action_new").click()
            break
        case ("Escape"):
            if ($(".menu").length > 0){
                removeMenu()
                resetUnitValues()
            } else {
                $(".telling").removeClass("telling").addClass("shut")
                $(".curr_selected")[0].remove()
                if ($("#breadcrums")[0].innerHTML == ""){
                    $("#breadcrums")[0].innerHTML = "<div>Willkommen!</div>"
                }
            }
            var unfUnit = document.getElementById("unfinished_unit")
            if (unfUnit != undefined){
                unfUnit.outerHTML = null
            }
            openedUnit = undefined
            break
        case ("1"):
            openBread(1)
            openedUnit = undefined
            break
        case ("Enter"):
            var menu = document.getElementsByClassName("menu")[0]
            if (menu != undefined){
                menu.lastChild.click()
            }
            break
    }
    console.log("You pressed: " + pressed.key)
}

function addBreadcrumOpen (){
    var name = openedUnit.getAttribute("name")
    
    if ($("#breadcrums")[0].innerHTML == "<div>Willkommen!</div>"){
        $("#breadcrums")[0].innerHTML = ""
    }
    $(".curr_selected").remove()
    
    $("#breadcrums")[0].innerHTML += "<div cat='" + countOfCrums + "' class='curr_selected'> > " + name + "</div>"
    $("#breadcrums div").click(goToClickedBread)
}

function pinBreadcrum (){
    $(".curr_selected").removeClass("curr_selected")
    var cat = countOfCrums++
}

function goToClickedBread (){
    var tarCat = this.getAttribute("cat")
    openBread (tarCat)
    openedUnit = undefined
}
function openBread (tarCat){
    tarCat = checkDirection(tarCat)
    var catOrFis = checkCatOrFis(tarCat)
    target = catOrFis + tarCat
    listtype = listtypeList[target]
    countOfCrums = tarCat
    open(target, "back")
    cleanUpRemains(tarCat)
}
function checkCatOrFis (tarCat){
    var catOrFis = $(".open")[0].getAttribute("id").split("-")[0]
    var catOrFis
    if (catOrFis == "fis" && tarCat >= 2){
        catOrFis = "#fis-"
    } else {
        catOrFis = "#cat-"
    }
    return catOrFis
}
function cleanUpRemains (tarCat) {
    $.each($("#breadcrums div"), function(key, val){
        if (val.getAttribute("cat") >= tarCat){
            val.remove()
        }
        if ($("#breadcrums")[0].innerHTML == ""){
            $("#breadcrums")[0].innerHTML = "<div>Willkommen!</div>"
            countOfCrums = 1
        }
    })
    removeContent(tarCat)
    $("button").off("click").click(placeAction)
}
function oneStepBack (){
    var currCat = $(".open")[0].getAttribute("id").slice(4)
    if (countOfCrums >= 1 && currCat > 1){
        var catNr = $(".open")[0].getAttribute("id").slice(4)
        if (countOfCrums == catNr){
            --countOfCrums
        }
        openBread(countOfCrums)
    }
}
function checkDirection (tarCat){
    var catNr = $(".open")[0].getAttribute("id").slice(4)
    if (catNr < tarCat){
        tarCat = 1
        removeContentBevoreTarget(tarCat)
    }
    return tarCat
}
function removeBreadcrumDelete (){
    $("#breadcrums div:last-child")[0].remove()
}