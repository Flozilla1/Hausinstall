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
    listtype = listtypeList[target]
    createActionLine();
    if(listtype != "shoppinglist" && listtype != "circuitlist"){
       requestJson.parentid = parentId;
    } else {        //Fall: Shoppinglist
       requestJson.projectid = parentId;        
    }
}

function ajaxCall (reqType){
    var json = {data: JSON.stringify(requestJson)}
    console.log("—————————————————————\nREQUEST:\n", requestJson);
    
    $.ajax({
        url: "backend/index.php",
        type: "post",
        data: json,
        success: function (data){
            console.log("\nRESPONSE:\n", data, "\n\n");
            switch (reqType){
                case "list": case "circlist": case "shoppinglist":
                    addContent(data)
                    break
                case "new":
                    pinCreatedUnit(data.newId)
                    break
                case "update":
                    displayResponseInMenu(data.newId)
                    break
                case "delete":
                    removeBreadcrumDelete()
                    break
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
    var inputNodesArr = []
    var inputFields = []
    var userInputs = []
    
    $.each($("input"), function(ix, value) {
        inputNodesArr.push(value)
    });
    inputNodesArr.forEach(function(val, ix){
        inputFields.push(val.getAttribute("placeholder"));
        userInputs.push($("#val_" + ++ix).val());   //funktioniert irgendwie nicht mit .getAttribute("value")
    })
    var selectTagText = document.getElementsByTagName("select")[0]
    if (selectTagText != undefined){
        userInputs.push(selectTagText.selectedOptions[0].text)
        inputFields.push("type")
    }
    return [inputFields, userInputs];
}