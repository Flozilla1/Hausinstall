function placeInputLetters (thisInputField){
    //wenn das Window focus verliert, und ihn wieder bekommt, wiederholt sich die hier ausgelöste fkt!
    var editThis = $(".telling" + " ." + thisInputField.getAttribute("placeholder"))[0]
    var originalValue = editThis.innerHTML
    thisInputField.addEventListener("keyup", function (pressed){
        editThis.innerHTML = thisInputField.value
        if(thisInputField.value == ""){
            editThis.innerHTML = originalValue
        }
    })
}
function markTarget (thisInputField){
    var editThis = $(".telling" + " ." + thisInputField.getAttribute("placeholder"))[0]
    editThis.style.color = "white"
}
function unMarkTarget (thisInputField){
    var editThis = $(".telling" + " ." + thisInputField.getAttribute("placeholder"))[0]
    editThis.removeAttribute("style")
}
function pinCreatedUnit (newID){
    var unfUnit = document.getElementById("unfinished_unit")
    
    var newName = $("#unfinished_unit .name")[0].innerHTML
    unfUnit.setAttribute("name", newName)
    
    if (propertyList[listtype][2] != undefined){
        var listBtns = "<span>\n"
        propertyList[listtype][2].forEach(function(val, key){
            listBtns += "<button class='" + val[0] + "' list_id='" + newID + "'>" + val[1] + "</button>"
        })
        listBtns += "\n</span></li>\n"
        $("#unfinished_unit li:first-of-type")[0].innerHTML += listBtns
    }
    propertyList[listtype][0].forEach(function(val, key){
      unfUnit.innerHTML += "<button class='" + val[0] + "' list_id='" + newID + "'>" + val[1] + "</button>\n"
    })
    unfUnit.removeAttribute("id")

    $("button").click(placeAction)
    $(unfUnit).click(tell)

    openedUnit = unfUnit
}