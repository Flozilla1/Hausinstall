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
                    if (data.status == 1){
                        pinCreatedUnit(data.newid)                        
                    } else {
                        removeMenu()
                        document.getElementById("unfinished_unit").outerHTML = null
                        openedUnit = undefined
                    }
                    responsePopup(data.message)
                    break
                case "update":
                    if (data.status != 1){
                        resetUnitValues()                        
                    }
                    responsePopup(data.message)
                    break
                case "delete":
                    if (data.status == 1){
                        removeThisUnit()
                        removeBreadcrumDelete()
                    }
                    responsePopup(data.message)   
                    break
                case "circuitlistOptionList":
                    insertFusesOptions(data)
                    break
            }
        },
        error: function(data){
            console.log ("ERROR:\n",  data);
            responsePopup("Fehler :(")
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
    var inputFields = []
    var userInputs = []
    
    $.each($(".telling input, .menu_new input"), function(ix, val) {
        inputFields.push(val.getAttribute("placeholder"))
        userInputs.push($(val).val())   //funktioniert irgendwie nicht mit .getAttribute("value")
        console.log(val)
    })
    console.log(inputFields, userInputs)
    var selectTagText = document.getElementsByTagName("select")
    $.each($(selectTagText), function(key, val) {
        inputFields.push(val.getAttribute("placeholder"))
        userInputs.push(val.selectedOptions[0].text)
        if (val.selectedOptions[0].hasAttribute("fuse_id") == true){
            inputFields.push("fuseid")
            userInputs.push(val.selectedOptions[0].getAttribute("fuse_id"))
        }
    })
    return [inputFields, userInputs];
}