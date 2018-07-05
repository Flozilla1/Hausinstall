var requestJson = {'action': 'list','listtype': 'projects'};
var type;
var parentiId;

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
            
        case ("list"): default:
            open(getTarget());
            addContent(selectContent_createListTypeLine());
            getNextList();
            break;
            
        case ("submit"):    //Ok-Buttons
            var submitAction = $(that).parent()[0].getAttribute("class").split(" ")[1].split("_")[1];
            createActionLine();
            
            switch (submitAction){
                case ("new"):
                    createSpecificationLine(readInputs());
                    break;
                case ("update"):
                    requestJson.itemId = parentId;
                    createSpecificationLine(readInputs());
                    break;
                case ("delete"):
                    requestJson.itemId = parentId;
                    break;
            }
            ajaxCall();
            break;
    }
    console.log(requestJson)
}

function createActionLine () {
    
    if (listtype != "shoppinglist"){
        requestJson = {
            'action': that.getAttribute("class").split("_")[1],
            'listtype': listtype
        }
    } else {    //Fall: ShoppingList
        requestJson = {
            'action': listtype
        }
    }
}
function getNextList (){
    selectContent_createListTypeLine();
    createActionLine();
    requestJson.parentid = parentId;
    ajaxCall();
}

function ajaxCall(){
    var json = {data: JSON.stringify(requestJson)}
    console.log("\n\nREQUEST:\n", requestJson);
    
    $.ajax({
        url: "backend/index.php",
        type: "post",
        data: json,
        success: function (data){
            console.log("\nRESPONSE:\n\n", data);
            if (requestJson.action == "list"){
                addContent(data)
            }
        },
        error: function(json){
            console.log ("ERROR",  json);
        }
    });
}
function createSpecificationLine (inputFields_userInputs){
    var inputFields = inputFields_userInputs[0]
    var userInputs = inputFields_userInputs[1]
    requestJson.specification = {}
    
    inputFields.forEach(function(val, key){
        requestJson.specification[val] = userInputs[key]   
    })
}

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