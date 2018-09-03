$(document).ready(function(){
    colorize()
    ajaxCall("list")
    enableKeyboard()
});

function tell () {
    $(".cat_unit").addClass("shut").removeClass("telling")
    $("#unfinished_unit").remove()
    $(".menu_new").remove()
    $(this).removeClass("shut").addClass("telling")
    
    openedUnit = this
    var currFoldDom = $(openedUnit).parents(".all_fold-ups")[0]
    if (currFoldDom != undefined){
        var currFold = currFoldDom.getAttribute("id")
    }
    if ("#" + currFold == target){
        addBreadcrumOpen()
    }
}

function open (nextType, direction) {
    $(".all_fold-ups").removeClass("open").addClass("closed");
    $(target).addClass("open").removeClass("closed");

    if (direction != "back"){
        pinBreadcrum()
        if (target == "#cat-2" || target == "#fis-2"){
            projectId = parentId
        }
    }
}
function choosePath (which){

    $(".chosen_path").addClass("rejected_path").removeClass("chosen_path");
    var path = "." + which + "_path"
    $(path).addClass("chosen_path").removeClass("rejected_path");    
}
function addContent (jsObject) {
    
    $(".telling").addClass("shut").removeClass("telling")

    listtype = listtypeList[target]
    if(jsObject.shoppinglist == undefined && jsObject.circuitlist == undefined){
        var finishedHtml = createAllUnits(jsObject)
    } else {
        if(jsObject.shoppinglist == undefined){
            var finishedHtml = createCircList(jsObject)
        } else {
            var finishedHtml = createShoppingList(jsObject)
        }
    }
    if (finishedHtml == ""){
        finishedHtml = "<div class='empty_response'>Hier gibt es noch gar nichts! Baue mehr!</div>"
    }
    var targetContentArea = target + " .cat_content"
    $(targetContentArea)[0].innerHTML += finishedHtml
    $(".shut").click(tell)
    $("button").click(placeAction)
}
function removeContent (until){
    for (ix = 7; ix > until; --ix){
        var those ="#cat-" + ix + " .cat_unit, #cat-" + ix + " .empty_response"
        var those ="#fis-" + ix + " .cat_unit, #fis-" + ix + " .empty_response"
        $(those).each(function (key, val){
            $(val).remove()
        })
    }

}
function removeContentBevoreTarget (until){
    for (ix = -1; ix < until; ++ix){
        var those ="#cat-" + ix + " .cat_unit, #cat-" + ix + " .empty_response"
        $(those).each(function (key, val){
            $(val).remove()
        })
    }
}
function getTarget (){
    
    var currFoldName = getCurrFold();
    var currFoldNr = currFoldName.slice(4);

    var btnType = that.getAttribute("class")
    var ArrDirectionAndNextType = directionAndNextType(btnType, currFoldNr);

    var nextFold = ArrDirectionAndNextType[1] + "-" + ArrDirectionAndNextType[0];
    
    target = nextFold;
    return ArrDirectionAndNextType[1];  //Für die List-Fkt
}
function getCurrFold (){
    var currFoldNode = $(that).parents(".all_fold-ups")[0];
    var currFoldName = currFoldNode.getAttributeNode("id").value;
    return currFoldName;
}
function directionAndNextType (btnType, currFoldNr){
    var nextType
    switch (btnType){
        case "action_list_cat":
            ++currFoldNr
            nextType = "#cat"
            break
         case "action_circlist":
            currFoldNr = currFoldNr - 2
            nextType = "#cat"
            break
        case "action_shoppinglist":
            --currFoldNr
            nextType = "#cat"
            break
        case "action_list_fis":
            ++currFoldNr
            nextType = "#fis"
            break
         case "action_list":
            ++currFoldNr
            if ($(that).parents(".all_cats,.all_fis")[0].getAttribute("id").substr(0,3) == "cat"){
                nextType = "#cat"
            } else {
                nextType = "#fis"
            }
            break
    }
    var typeAndNr = [currFoldNr/*(= eigentlich nextFoldNr)*/, nextType]
    return typeAndNr
}
function protectAndShowInput (){

    //Bugs: wenn blur, dann einheit öffnen => falsche Einheit wird bearbeited
    
    if ($("input").parents(".menu_new")[0] != undefined){   //if (create Neu)
        $(".cat_unit").addClass("shut").removeClass("telling")
        $(addEmtyUnit()).insertAfter($("input").parents(".menu_new")[0])
    }
    $("input").focus(function (){
        document.body.removeEventListener("keypress", doThis)
        markTarget(this)
        placeInputLetters(this)
    })
    $("input").blur(function (){
        enableKeyboard()
        unMarkTarget(this)
    })
}
function enableKeyboard (){
    document.body.addEventListener("keypress", doThis = function (pressed){
        keyboardCtrl(pressed)
    })
}