var parentId = 1;
var propertyList = {    //[AnzeigeName, programmName]
    'projects': [["Baumeister", "baumeister"], ["Kapital", "kapital"]],
    'floors': [["Ebene Nr", "countFromBasement"]],
    'rooms': [["Fläche", "flaeche"]],
    'devices': [["Sicherungs-Id", "fuseid"]],
    'sensors': [["", "unit"], ["", "value"]],
    'fis': [["", "current"]],
    'fuses': [["", "current"]]
}

function createAllUnits (jsObject, createOneUnit){
        
    var allUnits = "";
    $.each(jsObject, function(key, value) {
        $.each(value, function(key2, value2){
            if (value2.parent_id == parentId || value2.parent_id == undefined){    //Es werden alle Rückgabewerte angezeigt, die keine parent_id haben (sollte vielleicht noch verbessert werden)
                allUnits += createOneUnit (key2, value);
            }
        })
    });
    return (allUnits);
}

//buttons dürfen nur eine Klasse haben, sonst muss man auch app_controller anpassen (spit(" ")[1])
//buttons: Klassen: Syntax muss action_list/create/update/delete_optional sein
function createOneShoppingList (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "<li><span>Preis: </span><span>" + jsObject[unitNr].specification.preis + "</span></li>\n";
    html += "</ul>\n";
    html += "</div>";
    return(html);
}

function createOneProject (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].title + "</h2></li>\n";
    html += "<li><span>Baumeister: </span><span>" + jsObject[unitNr].specification.baumeister + "</span></li>\n";
    html += "<li><span>Kapital: </span><span>" + jsObject[unitNr].specification.kapital + "</span></li>\n";
    html += "</ul>\n";
    
    html += "<button class='action_list_shopping' list_id='" + unitNr.split("-")[1] + "'>Einkaufsliste</button>\n";
    html += "<button class='action_update' list_id='" + unitNr.split("-")[1] + "'>Bearbeiten</button>\n";
    html += "<button class='action_delete' list_id='" + unitNr.split("-")[1] + "'>Löschen</button>\n";
    html += "<button class='action_list_cat' list_id='" + unitNr.split("-")[1] + "'>Nächste Ebene</button>\n";
    html += "<button class='action_list_safty' list_id='" + unitNr.split("-")[1] + "'>Fi</button>\n";
    html += "</div>";
        
    return(html);
}

function createOneFloor (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].title + "</h2></li>\n";
    html += "<li><span>Ebene: </span><span>" + jsObject[unitNr].specification.countFromBasement + "</span></li>\n";
    html += "</ul>\n";
    
    html += "<button class='action_update' list_id='" + unitNr.split("-")[1] + "'>Bearbeiten</button>\n";
    html += "<button class='action_delete' list_id='" + unitNr.split("-")[1] + "'>Löschen</button>\n";
    html += "<button class='action_list_cat' list_id='" + unitNr.split("-")[1] + "'>Nächste Ebene</button>\n";
    html += "</div>";
    
    return(html);
}
function createOneRoom (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].title + "</h2></li>\n";
    html += "<li><span>Fläche: </span><span>" + jsObject[unitNr].specification.Fläche + "</span></li>\n";
    html += "</ul>\n";
    
    html += "<button class='action_update' list_id='" + unitNr.split("-")[1] + "'>Bearbeiten</button>\n";
    html += "<button class='action_delete' list_id='" + unitNr.split("-")[1] + "'>Löschen</button>\n";
    html += "<button class='action_list_cat' list_id='" + unitNr.split("-")[1] + "'>Nächste Ebene</button>\n";
    html += "</div>";
    
    return(html);
}
function createOneDevice (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].title + "</h2></li>\n";
    html += "<li><span>Sicherung: </span><span>" + jsObject[unitNr].specification.Sicherung + "</span></li>\n";
    html += "</ul>\n";
    
    html += "<button class='action_update' list_id='" + unitNr.split("-")[1] + "'>Bearbeiten</button>\n";
    html += "<button class='action_delete' list_id='" + unitNr.split("-")[1] + "'>Löschen</button>\n";
    html += "<button class='action_list_safty' list_id='" + unitNr.split("-")[1] + "'>Sicherungen</button>\n";    
    html += "<button class='action_list_cat' list_id='" + unitNr.split("-")[1] + "'>Nächste Ebene</button>\n";
    html += "</div>";
    
    return(html);
}
function createOneSensor (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].title + "</h2></li>\n";
    html += "</ul>\n";
    
    html += "<button class='action_update' list_id='" + unitNr.split("-")[1] + "'>Bearbeiten</button>\n";
    html += "<button class='action_delete' list_id='" + unitNr.split("-")[1] + "'>Löschen</button>\n";
    html += "</div>";
    
    return(html);
}

function createOneElectricCircle (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].title + "</h2></li>\n";
    html += "</ul>\n";
    
    html += "<button class='action_update' list_id='" + unitNr.split("-")[1] + "'>Bearbeiten</button>\n";
    html += "<button class='action_delete' list_id='" + unitNr.split("-")[1] + "'>Löschen</button>\n";
    html += "<button class='action_list_safty' list_id='" + unitNr.split("-")[1] + "'>Nächste Ebene</button>\n";
    html += "</div>";
    
    return(html);
}
function createOneSafty (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].title + "</h2></li>\n";
    html += "</ul>\n";
    
    html += "<button class='action_update' list_id='" + unitNr.split("-")[1] + "'>Bearbeiten</button>\n";
    html += "<button class='action_delete' list_id='" + unitNr.split("-")[1] + "'>Löschen</button>\n";
    html += "<button class='action_list_safty' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
    html += "</div>";
    
    return(html);
}

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
    propertyList[listtype].forEach(function(val, key){
        html += "<div>" + val[0] + ":<input  id='val_" + (key + 2) + "' placeholder='" + val[1] + "'></div>"
    })
    return html
}
function displayResponseInMenu (response){
    $(".menu")[0].innerHTML += "<div class='responseMessage'>" + response + "</div>";
}