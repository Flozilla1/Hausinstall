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

function createOneProject (unitNr, jsObject){
    var html = "<div class='cat_unit shut'>\n";
    html += "<ul>\n";
    html += "<li><h2>" + jsObject[unitNr].titel + "</h2></li>\n";
    html += "<li><span>Baumeister: </span><span>" + jsObject[unitNr].specification.baumeister + "</span></li>\n";
    html += "<li><span>Kapital: </span><span>" + jsObject[unitNr].specification.kapital + "</span></li>\n";
    html += "</ul>\n";
    html += "<button type='button' class='btn_update'>Bearbeiten</button>\n";
    html += "<button type='button' class='btn_delete'>Löschen</button>\n";
    html += "<button type='button' class='btn_list' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
    html += "<button type='button' class='btn_shoplist'>Einkaufsliste</button>\n";
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
    html += "<button type='button' class='btn_list' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
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
    html += "<button type='button' class='btn_list' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
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
    html += "<button type='button' class='btn_list'>Sicherungen</button>\n";    
    html += "<button type='button' class='btn_list' list_id='" + unitNr.split("-")[1] + "'>Inhalt</button>\n";
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