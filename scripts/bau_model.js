var parentId;

function createAllUnits (jsObject, createOneUnit){
        
    var allUnits = "";
    $.each(jsObject, function(key, value) {
        if (value.parent_id == parentId && createOneUnit != "createOneProjekt"){
            allUnits += createOneUnit (key, jsObject);
        }
    });
    return (allUnits);
}

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
    html += "<button type='button' class='btn_list btn_shopping_list' list_id='" + unitNr.split("-")[1] + "'>Einkaufsliste</button>\n";
    html += "<button type='button' class='btn_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='btn_delete'>Löschen</button>\n";
    html += "<button type='button' class='btn_list btn_cat_list' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
    html += "<button type='button' class='btn_list btn_safty_list' list_id='" + unitNr.split("-")[1] + "'>Stromkreise</button>\n";
    html += "</div>";
    return(html);
}

function createOneFloor (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "<li><span>Ebene: </span><span>" + jsObject[unitNr].specification.countFromBasement + "</span></li>\n";
    html += "</ul>\n";
    html += "<button type='button' class='btn_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='btn_delete'>Löschen</button>\n";
    html += "<button type='button' class='btn_list btn_cat_list' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
    html += "</div>";
    return(html);
}
function createOneRoom (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "<li><span>Fläche: </span><span>" + jsObject[unitNr].specification.Fläche + "</span></li>\n";
    html += "</ul>\n";
    html += "<button type='button' class='btn_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='btn_delete'>Löschen</button>\n";
    html += "<button type='button' class='btn_list btn_cat_list' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
    html += "</div>";
    return(html);
}
function createOneDevice (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "</ul>\n";
    html += "<button type='button' class='btn_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='btn_delete'>Löschen</button>\n";
    html += "<button type='button' class='btn_list btn_devToSaf_list' list_id='" + unitNr.split("-")[1] + "'>Sicherungen</button>\n";    
    html += "<button type='button' class='btn_list btn_cat_list' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
    html += "</div>";
    return(html);
}
function createOneSensor (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "</ul>\n";
    html += "<button type='button' class='btn_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='btn_delete'>Löschen</button>\n";
    html += "</div>";
    return(html);
}

function createOneElectricCircle (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "</ul>\n";
    html += "<button type='button' class='btn_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='btn_delete'>Löschen</button>\n";
    html += "<button type='button' class='btn_list btn_safty_list' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
    html += "</div>";
    return(html);
}
function createOneSafty (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "</ul>\n";
    html += "<button type='button' class='btn_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='btn_delete'>Löschen</button>\n";
    html += "<button type='button' class='btn_list btn_safty_list' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
    html += "</div>";
    return(html);
}