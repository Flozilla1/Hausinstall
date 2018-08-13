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
            html += "<li>+—————Stromkreis #" + key + "—————+</li>"
            html += "<li><b>Name</b>: " + val.name + "</li>\n"
            html += "<li><b>Stärke</b>: " + val.value + "</li>\n"
            html += "<li><b>Sicherungen</b>:\n"
            html += "<ul>\n"
            val.fuses.forEach(function(val2, key2){
                html += "<li><b>Name</b>: " + val2.name + "</li>\n"
                html += "<li><b>Stärke</b>: " + val2.value + "</li>\n"
                html += "<li><b>Verbraucher</b>:\n"
                html += "<ul>\n"
                val2.devices.forEach(function(val3, key3){
                    html += "<li><b>Name</b>: " + val3 + "</li>\n"
                })
                html += "</ul>\n</li>\n"
            })
            html += "</ul>\n</li>\n\n"
    })
    html += "</ul>\n";
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
    
    return (html)
}
function addInputFields (){
    var html = "<div>Titel: <input id='val_1' placeholder='name' maxlength='20'></div>"
    propertyList[listtype][1].forEach(function (val, key){
        html += "<div>" + val[0] + ": <input  id='val_" + (key + 2) + "' placeholder='" + val[1] + "' maxlength='20'></div>"
    })
    if (selectOptionList[listtype] != undefined){
        html += "<div>Typ: <select>"
        selectOptionList[listtype].forEach(function (val, key){
            html += "<option value='" + val + "'>" + val + "</option>"
        })
        html += "</select></div>"
    }
    return html
}
function displayResponseInMenu (response){
    $(".menu")[0].innerHTML += "<div class='responseMessage'>" + response + "</div>";
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