$(document).ready(function(){
    
    addContent("#cat-1", selectContent("#cat-1"));
    
    $("[list_id]").click(callSubFolder);
    $(".shut").click(tell);
});

function tell () {
    $(".cat_unit").addClass("shut");
    $(this).removeClass("shut");
}
function open (target, nextType, btn) {
    $(".all_fold-ups").removeClass("open").addClass("closed");
    $(target).addClass("open").removeClass("closed");
    
    $(".chosen_path").addClass("rejectet_path").removeClass("chosen_path");
    $(nextType).addClass("chosen_path").removeClass("rejectet_path");

    if ($(btn)[0].getAttribute("class").split(" ")[1] == "btn_devToSaf_list"){
        $(".chosen_path,.rejectet_path").removeClass("*").addClass("split_path");
    }
    
    addContent(target, selectContent(target));
}
function selectContent (target){
        
    var createOneUnit;
    var jsObject;
    switch (target){
        case "#cat-0":
            createOneUnit = createOneShoppingList;
            jsObject = EinkaufObjekt;
            break;
        case "#cat-1":
            createOneUnit = createOneProject;
            jsObject = ProjektObjekt;
            break;
        case "#cat-2":
            createOneUnit = createOneFloor;
            jsObject = FloorObjekt;
            break;
        case "#cat-3":
            createOneUnit = createOneRoom;
            jsObject = RoomObjekt;
            break;
        case "#cat-4":
            createOneUnit = createOneDevice;
            jsObject = DeviceObjekt;
            break;
        case "#cat-5":
            createOneUnit = createOneSensor;
            jsObject = SensorObjekt;
            break;
        case "#safty-2":
            createOneUnit = createOneElectricCircle;
            jsObject = CircleObjekt;
            break;
        case "#safty-3":
            createOneUnit = createOneSafty;
            jsObject = SicherungsObjekt;
    }
    return ([jsObject, createOneUnit]);
}
function addContent (target, JsoAndCommand) {
    
    var jsObject = JsoAndCommand[0];
    var createOneUnit = JsoAndCommand[1];
    var finishedHtml = createAllUnits(jsObject, createOneUnit);
    var targetContentArea = target + " .cat_content";

    $(targetContentArea)[0].innerHTML += finishedHtml;
    $(".shut").click(tell);
    $("[list_id]").click(callSubFolder);
}

function callSubFolder (){
    
    parentId = this.getAttribute("list_id")
    var currFoldNode = $(this).parents(".all_fold-ups")[0];
    var currFoldName = currFoldNode.getAttributeNode("id").value;
    var currFoldNr = currFoldName.split("-")[1];
    
    var arrOfClasses = this.getAttribute("class").split(" ");
    var nextType;
    switch (arrOfClasses[1]){
        case "btn_cat_list": case "btn_shopping_list":
            nextType = "#cat";
            break;
        case "btn_safty_list": case "btn_devToSaf_list":
            nextType = "#safty";
            break;
    }
    var nextFoldNr = upOrDown (currFoldNr, this);
    var nextFold = nextType + "-" + nextFoldNr;
    open(nextFold, nextType, this);
}

function upOrDown (currFoldNr, that){
    var btnType = that.getAttribute("class").split(" ")[1]
    switch (btnType){
        case "btn_cat_list": case "btn_safty_list":
            ++currFoldNr;
            break;
        case "btn_shopping_list":
            --currFoldNr;
            break;
        case "btn_devToSaf_list":
            currFoldNr = 3;
            break;
    }
    
    return currFoldNr;
}