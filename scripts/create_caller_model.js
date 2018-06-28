var requestedString = "";

function placeAction (){
    that = this;
    $(".menu").remove();
    
    var actionInput = that.getAttribute("class").split("_");
    
    if (actionInput[2] == "submit"){
        actionInput = ["", "submit"]    //"submit" muss für den Switch in einem Array an 2ter Stelle stehen
    } else {
        parentId = that.getAttribute("list_id")     //Bei den Submit-Buttons steht ganz ökonomisch nicht nochmal extra die List_id drin, darum muss die List_id vom Ausgangs-Button gemerkt werden
    }
    
    switch (actionInput[1]){
            
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
            open(getTarget());
            addContent(selectContent_createListTypeLine());
            getNextList();
            break;
            
        case ("submit"):    //Ok-Buttons
            var submitAction = $(that).parent()[0].getAttribute("class").split(" ")[1].split("_")[1];
            switch (submitAction){
                case ("new"):
                    console.log("new")
                    break;
                case ("update"):
                    console.log("update")
                    break;
                case ("delete"):
                    createActionLine();
                    selectContent_createListTypeLine();
                    createParentIdLine();
                    
                    console.log(requestedString)
                    break;
            }
            break;
    }
}

function createActionLine (){
    requestedString = ""; //Rücksetzen
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