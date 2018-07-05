var that;
var target = "#cat-1";

$(document).ready(function(){
    ajaxCall()

    addContent(selectContent_createListTypeLine());
    
    $(".shut").click(tell);
});

function tell () {
    $(".cat_unit").addClass("shut");
    $(this).removeClass("shut");
}

function open (nextType) {
    $(".all_fold-ups").removeClass("open").addClass("closed");
    $(target).addClass("open").removeClass("closed");
    
    $(".chosen_path").addClass("rejectet_path").removeClass("chosen_path");
    $(nextType).addClass("chosen_path").removeClass("rejectet_path");

    addContent(selectContent_createListTypeLine);
}
function selectContent_createListTypeLine (){
        
    var createOneUnit;
    var jsObject;
    switch (target){
        case "#cat-0":
            createOneUnit = createOneShoppingList;
            createListTypeLine("shoppingList");
            break;
        case "#cat-1":
            createOneUnit = createOneProject;
            createListTypeLine("projects");
            break;
        case "#cat-2":
            createOneUnit = createOneFloor;
            createListTypeLine("floors");
            break;
        case "#cat-3":
            createOneUnit = createOneRoom;
            createListTypeLine("rooms");
            break;
        case "#cat-4":
            createOneUnit = createOneDevice;
            createListTypeLine("device");
            break;
        case "#cat-5":
            createOneUnit = createOneSensor;
            createListTypeLine("sensor");
            break;
        case "#safty-2":
            createOneUnit = createOneElectricCircle;
            createListTypeLine("fi");
            break;
        case "#safty-3":
            createOneUnit = createOneSafty;
            createListTypeLine("fuse");
    }
    return (createOneUnit);
}

function addContent (jsObject) {
    
    var createOneUnit = selectContent_createListTypeLine();
    var finishedHtml = createAllUnits(jsObject, createOneUnit);
    var targetContentArea = target + " .cat_content";

    $(targetContentArea)[0].innerHTML += finishedHtml;
    $(".shut").click(tell);
    $("button").click(placeAction);
}
function getTarget (){
    
    var currFoldName = getCurrFold();
    var currFoldNr = currFoldName.split("-")[1];
    
    var btnType = that.getAttribute("class")
    var ArrDirectionAndNextType = directionAndNextType(btnType, currFoldNr);

    var nextFoldNr = ArrDirectionAndNextType[0];
    var nextFold = ArrDirectionAndNextType[1] + "-" + nextFoldNr;
    
    target = nextFold;
    return ArrDirectionAndNextType[1];  //Für die List-Fkt
}
function getCurrFold (){
    var currFoldNode = $(that).parents(".all_fold-ups")[0];
    var currFoldName = currFoldNode.getAttributeNode("id").value;
    return currFoldName;
}
function directionAndNextType (btnType, currFoldNr){
    var nextType;
    
    switch (btnType){
        case "action_list_cat":
            ++currFoldNr;
            nextType = "#cat";
            break;
         case "action_list_safty":
            ++currFoldNr;
            nextType = "#safty";
            break;
        case "action_list_shopping":
            --currFoldNr;
            nextType = "#cat";
            break;
    }
    var typeAndNr = [currFoldNr/*(= eigentlich nextFoldNr)*/, nextType];
    return typeAndNr;
}