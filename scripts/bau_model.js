var parentId = 1;

function createAllUnits (jsObject, createOneUnit){
        
    var allUnits = "";
    $.each(jsObject, function(key, value) {
        if (value.parent_id == parentId){       //&& createOneUnit != "createOneProjekt" (wenn die Projekte im Json keine parent_id haben)
            allUnits += createOneUnit (key, jsObject);
        }
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
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "<li><span>Baumeister: </span><span>" + jsObject[unitNr].specification.baumeister + "</span></li>\n";
    html += "<li><span>Kapital: </span><span>" + jsObject[unitNr].specification.kapital + "</span></li>\n";
    html += "</ul>\n";
    
    html += "<button type='button' class='action_list_shopping' list_id='" + unitNr.split("-")[1] + "'>Einkaufsliste</button>\n";
    html += "<button type='button' class='action_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='action_delete'>Löschen</button>\n";
    html += "<button type='button' class='action_list_cat' list_id='" + unitNr.split("-")[1] + "'>Nächste Ebene</button>\n";
    html += "<button type='button' class='action_list_safty' list_id='" + unitNr.split("-")[1] + "'>Fi</button>\n";
    
    html += "<div class='menu'>"
    html += "<div class='titel'>Wirklich Löschen?</div>"
    html += "<div><input>Option blabliblu</div>"
    html += "<div><input>Option blabliblu</div>"
    html += "</div>"
    html += "</div>";
    
    return(html);
}

function createOneFloor (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "<li><span>Ebene: </span><span>" + jsObject[unitNr].specification.countFromBasement + "</span></li>\n";
    html += "</ul>\n";
    
    html += "<button type='button' class='action_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='action_delete'>Löschen</button>\n";
    html += "<button type='button' class='action_list_cat' list_id='" + unitNr.split("-")[1] + "'>Nächste Ebene</button>\n";
    html += "</div>";
    
    return(html);
}
function createOneRoom (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "<li><span>Fläche: </span><span>" + jsObject[unitNr].specification.Fläche + "</span></li>\n";
    html += "</ul>\n";
    
    html += "<button type='button' class='action_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='action_delete'>Löschen</button>\n";
    html += "<button type='button' class='action_list_cat' list_id='" + unitNr.split("-")[1] + "'>Nächste Ebene</button>\n";
    html += "</div>";
    
    return(html);
}
function createOneDevice (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "<li><span>Sicherung: </span><span>" + jsObject[unitNr].specification.Sicherung + "</span></li>\n";
    html += "</ul>\n";
    
    html += "<button type='button' class='action_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='action_delete'>Löschen</button>\n";
    html += "<button type='button' class='action_list_safty' list_id='" + unitNr.split("-")[1] + "'>Sicherungen</button>\n";    
    html += "<button type='button' class='action_list_cat' list_id='" + unitNr.split("-")[1] + "'>Nächste Ebene</button>\n";
    html += "</div>";
    
    return(html);
}
function createOneSensor (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "</ul>\n";
    
    html += "<button type='button' class='action_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='action_delete'>Löschen</button>\n";
    html += "</div>";
    
    return(html);
}

function createOneElectricCircle (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "</ul>\n";
    
    html += "<button type='button' class='action_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='action_delete'>Löschen</button>\n";
    html += "<button type='button' class='action_list_safty' list_id='" + unitNr.split("-")[1] + "'>Nächste Ebene</button>\n";
    html += "</div>";
    
    return(html);
}
function createOneSafty (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "</ul>\n";
    
    html += "<button type='button' class='action_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='action_delete'>Löschen</button>\n";
    html += "<button type='button' class='action_list_safty' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
    html += "</div>";
    
    return(html);
}

function createActionMenu (){
    var html = "";
    html += "<div class='menu'>"
    html += "<div class='titel'>Wirklich Löschen?</div>"
    html += "<div><input>Option blabliblu</div>"
    html += "<div><input>Option blabliblu</div>"
    html += "<div><input>Option blabliblu</div>"
    html += "</div>"
    
    return (html);
}