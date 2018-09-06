function createAllUnits (jsObject){
    var allUnits = "";
    $.each(jsObject, function(key, value) {
        $.each(value, function(key2, value2){
            if (value2.parent_id == parentId || value2.parent_id == undefined){    //Es werden alle Rückgabewerte angezeigt, die keine parent_id haben (sollte vielleicht noch verbessert werden)
                allUnits += addUnit(key2, value)
            }
        })
    });
    return (allUnits);
}

//List-btn muss an letzter Stelle bleiben (last child) —> app_controller
function addUnit (unitNr, jsObject){
    var html = "<div class='cat_unit shut' name='" + jsObject[unitNr].title + "'>\n"
    html += "<ul>\n"
    html += "<li><h2 class='name'>" + jsObject[unitNr].title + "</h2>"
    html += "<span>\n"
    if (propertyList[listtype][2] != undefined){
        propertyList[listtype][2].forEach(function(val, key){
            html += "<button class='" + val[0] + "' list_id='" + unitNr.split("-")[1] + "'>" + val[1] + "</button>"
        })
    }
    html += "\n</span></li>\n"
    propertyList[listtype][1].forEach(function(val, key){
        html += "<li><span>" + val[0] + ": </span><span class='" + val[1] + "'>" + jsObject[unitNr].specification[val[1]] + "</span></li>\n"
    })
    html += "</ul>\n"
    propertyList[listtype][0].forEach(function(val, key){
        html += "<button class='" + val[0] + "' list_id='" + unitNr.split("-")[1] + "'>" + val[1] + "</button>\n"
    })
    html += "</div>"
    
    return html
}
function addEmtyUnit (){
    var html = "<div class='cat_unit telling' id='unfinished_unit' name=''>\n"
    html += "<ul>\n"
    html += "<li><h2 class='name'>Name</h2>"
    propertyList[listtype][1].forEach(function(val, key){
        html += "<li><span>" + val[0] + ": </span><span class='" + val[1] + "'>" + val[0] + "</span></li>\n"
    })
    html += "</ul>\n"
    html += "</div>"
    
    return html
}
function createCircList (jsObject){
    var circuitsArr = jsObject.circuitlist
    var html = "<div class='cat_unit'>\n";
        html += "<ul>\n";
        circuitsArr.forEach(function(val, key){
            html += "<li><b>STROMKREIS #" + key + "————————————</b></li>"
            html += "<li><b>\"" + val.name + "\"</b>"
            html += " Stärke: " + val.value + "</li>"
            html += "<li>Sicherungen:"
            html += "<ul>"
            if (val.fuses != undefined){
                val.fuses.forEach(function(val2, key2){
                    html += "<li><b>\"" + val2.name + "\"</b>"
                    html += " Stärke: " + val2.value + "</li>"
                    html += "<li>Verbraucher:"
                    html += "<ul>"
                    if (val2.devices != undefined){
                        val2.devices.forEach(function(val3, key3){
                            html += "<li><b>" + val3 + "</b></li>"
                        })
                    }
                    html += "</ul></li>"
                })
            }
            html += "</ul></li>"
    })
    html += "</ul>";
    html += "</div>";
    return(html);
}

function createShoppingList (jsObject){
    var circuitsArr = jsObject.shoppinglist
    var html = "<div class='cat_unit'>\n";
        html += "<ul>\n";
        circuitsArr.forEach(function(val, key){
        html += "<li>" + val.name + " " + val.count + "x</li>\n";
    })
    html += "</ul>\n";
    html += "</div>";
    return(html);
}
//buttons dürfen nur eine Klasse haben, sonst muss man auch app_controller anpassen (spit(" ")[1])
//buttons: Klassen: Syntax muss action_list/create/update/delete_optional sein
function addMenu (type){
    var html = ""
    html += "<div class='menu menu_" + type + " ask'>"
    html += "<div class='titel'><b>" + menuHelpList[type][0] + "</b></div>"
    if (menuHelpList[type][1] == "fkt-yes"){
    html += addInputFields()        
    }
    html += "<button class='action_" + menuHelpList[type][2] + "_submit'>Do it!</button>"
    html += "</div>"
    resetUnitValues()
    
    return (html)
}
function addInputFields (){
    var html = "<div>Titel: <input id='val_1' placeholder='name' maxlength='20'></div>"
    propertyList[listtype][1].forEach(function (val, key){
        if (selectOptionList[listtype] == undefined){
            html += "<div>" + val[0] + ": <input  id='val_" + (key + 2) + "' placeholder='" + val[1] + "' maxlength='20'></div>"
        } else {
            if (val[1] != selectOptionList[listtype][0][0][0]){
                html += "<div>" + val[0] + ": <input  id='val_" + (key + 2) + "' placeholder='" + val[1] + "' maxlength='20'></div>"
            }
        }
    })
    if (selectOptionList[listtype] != undefined){
        selectOptionList[listtype].forEach(function (val, key){
            html += "<div>" + val[0][1] + ": <select placeholder='" + val[0][0] + "'"
            if (val[0][0] != "fname"){
                html += ">"
                val[1].forEach(function (val2, key){
                    html += "<option value='" + val2 + "'>" + val2 + "</option>"                
                })
            } else {
                html += " id='select_fuses'>"
                createFusesSelectOptions()
            }
            html += "</select></div>"
        })
    }
    return html
}
function createFusesSelectOptions (){
    requestJson = {
        'action': 'circuitlist',
        'projectid': projectId
    }
    ajaxCall("circuitlistOptionList")
}
function insertFusesOptions (data){
    var html = ""
    data.circuitlist.forEach(function (val2, key){  //Fis
        if (val2.fuses != undefined){
            val2.fuses.forEach(function (val3, key){    //Sicherungen
                html += "<option fuse_id='" + val3.fuseid + "' value='" + val3.name + "'>" + val3.name + "</option>"
            })
    }})
    if (html == "") {
            html += "<option>gibt hier noch keine Sicherungen!</option>"
    }
    document.getElementById('select_fuses').innerHTML = html
}

function removeMenu (){
    $(".menu")[0].style.height = "0px"
    $(".menu")[0].style.marginTop = "0px"
    setTimeout(function (){
        $(".menu").remove()                    
    }, 1000)
}
function removeUnit (toRemove){
    toRemove.style.opacity = "0"
    setTimeout(function (){
        toRemove.remove()                        
    }, 300)
}
function responsePopup (response){
    var popup = $("#response_popup")[0]
    popup.innerHTML = response
    popup.style.width = "25vw"
    if (document.getElementsByClassName("menu")[0] != undefined){
        removeMenu()
    }
    setTimeout(function (){
        popup.style.width = "0vw"
    }, 2000)
}
function removeEmtyMessage (){
    $(".open .empty_response").remove()
}
function createFiList (){
    return ["test"]
}