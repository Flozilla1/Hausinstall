var that;
var target = "#cat-1";

$(document).ready(function(){

    addContent(selectContent_createListTypeLine());
    
    $("button").click(placeAction);
//    $("[list_id]").click(callSubFolder);
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

//    Für später, um Devices und Sicherungen nebeneinander anzuzeigen (chosen_path und rejectet_path 50:50)
//    if ($(btn)[0].getAttribute("class").split(" ")[1] == "btn_devToSaf_list"){
//        $(".chosen_path,.rejectet_path").removeClass("*").addClass("split_path");
//    }
    addContent(selectContent_createListTypeLine);
}
function selectContent_createListTypeLine (){
        
    var createOneUnit;
    var jsObject;
    switch (target){
        case "#cat-0":
            createOneUnit = createOneShoppingList;
            jsObject = EinkaufObjekt;
            createListTypeLine("shoppingList");
            break;
        case "#cat-1":
            console.log(target)
            createOneUnit = createOneProject;
            jsObject = ProjektObjekt;
            createListTypeLine("projects");
            break;
        case "#cat-2":
            createOneUnit = createOneFloor;
            jsObject = FloorObjekt;
            createListTypeLine("floors");
            break;
        case "#cat-3":
            createOneUnit = createOneRoom;
            jsObject = RoomObjekt;
            createListTypeLine("rooms");
            break;
        case "#cat-4":
            createOneUnit = createOneDevice;
            jsObject = DeviceObjekt;
            createListTypeLine("device");
            break;
        case "#cat-5":
            createOneUnit = createOneSensor;
            jsObject = SensorObjekt;
            createListTypeLine("sensor");
            break;
        case "#safty-2":
            createOneUnit = createOneElectricCircle;
            jsObject = CircleObjekt;
            createListTypeLine("fi");
            break;
        case "#safty-3":
            createOneUnit = createOneSafty;
            jsObject = SicherungsObjekt;
            createListTypeLine("fuse");
    }
//console.log(requestedString)
    return ([jsObject, createOneUnit]);
}

function addContent (JsoAndCommand) {

    var jsObject = JsoAndCommand[0];
    var createOneUnit = JsoAndCommand[1];
    var finishedHtml = createAllUnits(jsObject, createOneUnit);
    var targetContentArea = target + " .cat_content";

    $(targetContentArea)[0].innerHTML += finishedHtml;
    $(".shut").click(tell);
    $("button").click(placeAction); //!!!Das verursacht doppelte auflistung (zweites Mal aufgerufen)!!!
}
function getTarget (){
    
    var currFoldNode = $(that).parents(".all_fold-ups")[0];
    var currFoldName = currFoldNode.getAttributeNode("id").value;
    var currFoldNr = currFoldName.split("-")[1];
    
    var ArrDirectionAndNextType = directionAndNextType(currFoldNr, this);

    var nextFoldNr = ArrDirectionAndNextType[0];
    var nextFold = ArrDirectionAndNextType[1] + "-" + nextFoldNr;
    
    target = nextFold;
    open(ArrDirectionAndNextType[1]);
}
function directionAndNextType (currFoldNr){
    var btnType = that.getAttribute("class")
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
//        case "btn_devToSaf_list":
//            currFoldNr = 3;
//            break;
    }
    var typeAndNr = [currFoldNr/*(= eigentlich nextFoldNr)*/, nextType];
    return typeAndNr;
}