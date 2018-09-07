function placeAction (){
    that = this;
    var actionInput = that.getAttribute("class").split("_");

    if (actionInput[2] == "submit"){
        actionInput = ["", "submit"]    //"submit" muss für den Switch in einem Array an 2ter Stelle stehen
    } else {
        if (actionInput[2] == "fis"){
            choosePath("fis")
        } else if (actionInput[2] == "cat"){
            choosePath("cat")
        }
        $(".menu").remove()
        if(that.hasAttribute("list_id") == true){       //Für den Fall: New-Button, damit die Parentid gespeichert bleibt, in den es eingefügt werden soll
            parentId = that.getAttribute("list_id")     //Bei den Submit-Buttons steht ganz ökonomisch nicht nochmal extra die List_id drin, darum muss die List_id vom Ausgangs-Button gemerkt werden
        }
    }
    switch (actionInput[1]){
            
        case ("new"):
            $(addMenu("new")).insertAfter($(that).parent())
            $(".curr_selected").remove()
            protectAndShowInput()
            $("button").off("click").click(placeAction)
            break
            
        case ("back"):
            oneStepBack()
            openedUnit = undefined
            break
            
        case ("update"):
            $(addMenu("update")).insertAfter($("[list_id=" + that.getAttribute("list_id") + "] ~ .action_delete"))
            protectAndShowInput()
            $("button").off("click").click(placeAction)
            break
            
        case ("delete"):
            $(addMenu("delete")).insertAfter(that)
            protectAndShowInput()
            $("button").off("click").click(placeAction)
            break
            
        case ("list"): default:     //shoppinglist & circuitlist = default
            openedUnit = $(that).parents(".cat_unit")[0]
            addBreadcrumOpen()
            
            open(getTarget())
            getNextList()
            ajaxCall(actionInput[1])
            break
            
        case ("submit"):    //"Do It!"-Buttons
            var submitAction = $(that).parent()[0].getAttribute("class").split(" ")[1].split("_")[1]
            createActionLine()
            
            switch (submitAction){
                case ("new"):
                    requestJson.parentid = parentId
                    createSpecificationLine(readInputs())
                    removeMenu()
                    removeEmtyMessage()
                    break;
                case ("update"):
                    requestJson.itemid = parentId
                    createSpecificationLine(readInputs())
                    break
                case ("delete"):
                    requestJson.itemid = parentId
                    var toRemove = $(this).parents(".cat_unit")[0]
                    removeUnit(toRemove)
                    break
            }
            
            ajaxCall(submitAction)
            break
    }
}