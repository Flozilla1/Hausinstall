var requestedString = "";

function placeAction (){
    that = this;
    parentId = that.getAttribute("list_id")
    $(".menu").remove();

    switch (that.getAttribute("class").split("_")[1]){
            
        case ("new"):
            $(that).parent()[0].innerHTML += addNewMenu();
            $("button").click(placeAction);
            break;
            
        case ("update"):
            $(that).parent()[0].innerHTML += addUpdateMenu();
            $("button").click(placeAction);
            break;
            
        case ("delete"):
            $(that).parent()[0].innerHTML += addDeleteMenu();
            $("button").click(placeAction);
            break;
            
        case ("list"):
            getTarget();
            addContent(selectContent_createListTypeLine());
            getNextList();
            break;
            
        case ("submit"):
            var submitAction = $(that).parent()[0].getAttribute("class").split(" ")[1].split("_")[1];

            switch (submitAction){
                case ("new"):
                    
                    break;
                case ("update"):
                    
                    break;
                case ("delete"):
                    console.log(that.getAttribute("class"))
                    break;
            }
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
    
//    ajaxCall();
    
    console.log(requestedString)
}
//function ajaxCall(){
//    $.ajax({
//        url: "http://localhost/lpauebung3/index.php",
//        type: "post",
//        data: JSON.stringify(requestedString)
//    });
//}