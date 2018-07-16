var parentId = 1;
var propertyList = {    
    //listtyp: [btn>[[programmName, Anzeigename]], Atribute>[[AnzeigeName, programmName]]]
    'projects': [[["action_shopping", "Einkaufsliste"], ["action_circlist", "Stromkreise"], ["action_update", "Bearbeiten"], ["action_delete", "Löschen"], ["action_list_cat", "Ebenen >"]],
                 [["Baumeister", "baumeister"], ["Kapital", "kapital"]]],
    'floors': [[["action_update", "Bearbeiten"], ["action_delete", "Löschen"], ["action_list_cat", "Räume >"]],
               [["Ebene Nr", "countFromBasement"]]],
    'rooms': [[["action_update", "Bearbeiten"], ["action_delete", "Löschen"], ["action_list_cat", "Verbraucher >"]],
              [["Fläche", "flaeche"]]],
    'devices': [[["action_update", "Bearbeiten"], ["action_delete", "Löschen"], ["action_list_cat", "Sensoren >"]],
                [["Sicherungs-Id", "fuseid"]]],
    'sensors': [[["action_update", "Bearbeiten"], ["action_delete", "Löschen"]],
                [["", "unit"], ["", "value"]]],
    'fis': [[""], [""], [""]],
    'fuses': [[""], [""], [""]]
}

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
    var html = "<div class='cat_unit shut' name='" + jsObject[unitNr].title + "'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].title + "</h2></li>\n";
    propertyList[listtype][1].forEach(function(val, key){
        html += "<li><span>" + val[0] + ": </span><span>" + jsObject[unitNr].specification[val[1]] + "</span></li>\n";
    })
    html += "</ul>\n";
    propertyList[listtype][0].forEach(function(val, key){
        html += "<button class='" + val[0] + "' list_id='" + unitNr.split("-")[1] + "'>" + val[1] + "</button>\n";
    })
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
function addDeleteMenu (){
    var html = "";
    html += "<div class='menu menu_delete ask'>"
    html += "<div class='titel'><b>Wirklich Löschen?</b></div>"
    html += "<button class='action_delete_submit'>Do it!</button>"
    html += "</div>"
    
    return (html);
}
function addUpdateMenu (){
    var html = "";
    html += "<div class='menu menu_update ask'>"
    html += "<div class='titel'><b>Neue Werte:</b></div>"
    html += addInputFields()
    html += "<button class='action_update_submit'>Do it!</button>"
    html += "</div>"
    
    return (html);
}
function addNewMenu (){
    var html = "";
    html += "<div class='menu menu_new ask'>"
    html += "<div class='titel'><b>Neue Werte:</b></div>"
    html += addInputFields()
    html += "<button class='action_create_submit'>Do it!</button>"
    html += "</div>"
    
    return (html);
}
function addInputFields (){
    var html = "<div>Titel:<input id='val_1' placeholder='name'></div>"
    propertyList[listtype][1].forEach(function(val, key){
        html += "<div>" + val[0] + ":<input  id='val_" + (key + 2) + "' placeholder='" + val[1] + "'></div>"
    })
    return html
}
function displayResponseInMenu (response){
    $(".menu")[0].innerHTML += "<div class='responseMessage'>" + response + "</div>";
}