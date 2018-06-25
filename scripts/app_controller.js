$(document).ready(function(){
    
    addContent("#cat-1", selectContent("#cat-1"));
    
    $(".btn_list").click(callSubFolder);
    $(".shut").click(tell);
});

function tell () {
    $(".cat_unit").addClass("shut");
    $(this).removeClass("shut");
}
function open (target) {
    $(".all_cats").removeClass("open").addClass("closed");
    $(target).addClass("open").removeClass("closed");
    
    addContent(target, selectContent(target));
}
function selectContent (target){
        
    var createOneUnit;
    var jsObject;
    switch (target){
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
    $(".btn_list").click(callSubFolder);
}

function callSubFolder (){
    
    parentId = this.getAttribute("list_id")
    var currFoldNode = $(this).parents(".all_fold-ups")[0];
    var currFoldName = currFoldNode.getAttributeNode("id").value;
    var currFoldNr = currFoldName.split("-")[1];
    var currFoldType = currFoldName.split("-")[0];
    var nextFold = "#" + currFoldType + "-" + ++currFoldNr;
    
    open(nextFold);
}