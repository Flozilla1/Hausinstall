var requestedString = "";

function placeAction (){
    that = this;
    parentId = that.getAttribute("list_id")

    switch (that.getAttribute("class").split("_")[1]){
        case ("new"):
            break;
        case ("update"):
            break;
        case ("delete"):
            $(".menu").toggleClass("ask");
            break;
        case ("list"):
            getTarget();
            addContent(selectContent_createListTypeLine());
            getNextList();
            break;
    }
}

function createActionLine (){
    var actionLine = "{\n\"data\":\n{\n\"action\": \"";
    actionLine += that.getAttribute("class").split("_")[1] + "\",\n";
    
    requestedString += actionLine;
}
function createListTypeLine (type){
    var listTypeLine = "\"listtype\": \"";
    listTypeLine += type + "\",\n";
    requestedString += listTypeLine;
}
function createParentIdLine (){
    var parentIdLine = "\"parentid\": " + parentId + "\n}}";

    requestedString += parentIdLine;
}

function getNextList (){
    requestedString = ""; //Rücksetzen
    createActionLine();
    selectContent_createListTypeLine();
    createParentIdLine();
    console.log(requestedString)
}