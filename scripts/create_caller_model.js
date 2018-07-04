var requestedString = "";

var requestJson;
var type;
var parentid;

function placeAction (){
    that = this;
    
    var actionInput = that.getAttribute("class").split("_");
    
    if (actionInput[2] == "submit"){
        actionInput = ["", "submit"]    //"submit" muss für den Switch in einem Array an 2ter Stelle stehen
    } else {
        $(".menu").remove();        //funktioniert, wenn es am Anfang der Methode steht
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
            createActionLine();
            var jsObject = selectContent_createListTypeLine()[0];
            createParentIdLine();
            
            switch (submitAction){
                case ("new"):
                    createSpecificationLine(readInputs());
                    break;
                case ("update"):
                    createSpecificationLine(readInputs());
                    break;
                case ("delete"):
                    requestedString += "\n}}"
                    break;
            }
            break;
    }
    console.log(requestedString)
}

// >>>>>>------------------------------------------ Wolfgang
function createActionLine () {
    console.log("createActionLine");
    console.log(parentid);
    requestJson = {
        'action': that.getAttribute("class").split("_")[1],
        'listtype': this.type,
        'parentid': parentid
    }
}

function createListTypeLine (type){
    this.type= type;
}

function createParentIdLine (){
    this.parentid =  parentId;
}

function getNextList (){
    selectContent_createListTypeLine();
    createParentIdLine();
    createActionLine();
    ajaxCall();
}

var json;

function ajaxCall(){
    console.log("Ajax Call");
    json = {data: JSON.stringify(requestJson)}
    console.log(requestJson);
    console.log(json);

    $.ajax({
//        url: "http://localhost/hausinstall/backend/index.php",
        url: "backend/index.php",
        type: "post",
//        data: requestedString,
        data: json,
        success: function (data){
            console.log(data);
        },
        error: function(data){
            console.log ("ERROR",  data);
        }
    });
}
// <<<<<<<------------------------------------------ Wolfgang






function createSpecificationLine (inputFields_userInputs){
    var inputFields = inputFields_userInputs[0]
    var userInputs = inputFields_userInputs[1]
    var html = ",\n\"specification\":{\n";
    
    inputFields.forEach(function(val, key){
        html += "\"" + val + "\": ";
        html += "\"" + userInputs[key] + "\"\n";
    })
//    requestedString += html + "}}";
    requestedString += html + "}";
}

/* FLO Original

function createActionLine (){
    requestedString = ""; //Rücksetzen
//    var actionLine = "{\n\"data\":\n{\n\"action\": \"";
    var actionLine = "{\n\"action\": \"";
    actionLine += that.getAttribute("class").split("_")[1] + "\",\n";
    
    requestedString += actionLine;
}
function createListTypeLine (type){
    var listTypeLine = "\"listtype\": \"";
    listTypeLine += type + "\",\n";
    requestedString += listTypeLine;
}
function createParentIdLine (){
    var parentIdLine = "\"parentid\": " + parentId;

    requestedString += parentIdLine;
}
function createSpecificationLine (inputFields_userInputs){
    var inputFields = inputFields_userInputs[0]
    var userInputs = inputFields_userInputs[1]
    var html = ",\n\"specification\":{\n";
    
    inputFields.forEach(function(val, key){
        html += "\"" + val + "\": ";
        html += "\"" + userInputs[key] + "\"\n";
    })
//    requestedString += html + "}}";
    requestedString += html + "}";
}

function getNextList (){
    createActionLine();
    selectContent_createListTypeLine();
    createParentIdLine();
    
    requestedString += "\n}}"
    ajaxCall();
}


*/





function readInputs (){
    var inputNodesArr = [];
    var inputFields = [];
    var userInputs = [];
    
    $.each($("input"), function(ix, value) {
        inputNodesArr.push(value);
    });
    inputNodesArr.forEach(function(val, ix){
        inputFields.push(val.getAttribute("placeholder"));
        userInputs.push($("#val_" + ++ix).val());   //funktioniert irgendwie nicht mit .getAttribute("value")
    })
    return [inputFields, userInputs];
}
<<<<<<< HEAD
function ajaxCall(){
    console.log("Hallo")
    $.ajax({
        url: "http://localhost/hausinstall/backend/index.php",
        type: "post",
        data: requestedString,
        success: function (data){
            console.log(data);
        },
        error: function(data){
            console.log ("ERROR",  data);
        }
    });
}
=======

>>>>>>> dev
