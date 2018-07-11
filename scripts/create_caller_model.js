var requestJson = {'action': 'list','listtype': 'projects'};
var type;
var parentId = 1;

function placeAction (){
    that = this;
    var actionInput = that.getAttribute("class").split("_");
    
    if (actionInput[2] == "submit"){
        actionInput = ["", "submit"]    //"submit" muss für den Switch in einem Array an 2ter Stelle stehen
    } else {
        $(".menu").remove();        //funktioniert, wenn es am Anfang der Methode steht
        if(that.hasAttribute("list_id") == true){       //Für den Fall: New-Button, damit die Parentid gespeichert bleibt, in den es eingefügt werden soll
            parentId = that.getAttribute("list_id")     //Bei den Submit-Buttons steht ganz ökonomisch nicht nochmal extra die List_id drin, darum muss die List_id vom Ausgangs-Button gemerkt werden
        }
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
            
        case ("list"): default:     //shoppinglist & circuitlist = default
            open(getTarget());
            addContent(selectContent_createListTypeLine());
            getNextList();
            break;
            
        case ("submit"):    //"Do It!"-Buttons
            var submitAction = $(that).parent()[0].getAttribute("class").split(" ")[1].split("_")[1];
            createActionLine();
            
            switch (submitAction){
                case ("new"):
                    requestJson.parentid = parentId;
                    createSpecificationLine(readInputs());
                    break;
                case ("update"):
                    requestJson.itemid = parentId;
                    createSpecificationLine(readInputs());
                    break;
                case ("delete"):
                    requestJson.itemid = parentId;
                    break;
            }
            ajaxCall();
            break;
    }
}

function createActionLine () {
    
    if (listtype != "shoppinglist" && listtype != "circuitlist"){
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
    if(listtype != "shoppinglist" && listtype != "circuitlist"){
       requestJson.parentid = parentId;
    } else {        //Fall: Shoppinglist
       requestJson.projectid = parentId;        
    }
    ajaxCall();
}

function ajaxCall(){
    var json = {data: JSON.stringify(requestJson)}
    console.log("o———————————————————————o\nREQUEST:\n", requestJson);
    
    $.ajax({
        url: "backend/index.php",
        type: "post",
        data: json,
        success: function (data){
            console.log("\nRESPONSE:\n", data, "\n\n");
            if (requestJson.action == "list" || requestJson.action == "shoppinglist" || requestJson.action == "circuitlist"){
                addContent(data)
            } else {
                //displayResponseInMenu(data.message)
                displayResponseInMenu(data.newId)
            }
        },
        error: function(data){
            console.log ("ERROR:\n",  data);
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