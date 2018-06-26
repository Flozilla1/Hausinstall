$(document).ready(function(){
    var listView = new listViewHandler();
});




/**
 * Ein Javascript Objekt kann wie folgt aufgebaut werden,
 * wobei die definierte function gleichzeitig einem Constructor entspricht.
 * 
 * Leider ist diese Klasse recht lang geworden.
 * @returns {listViewHandler}
 */
var listViewHandler = function(){
    /**
     * die properties nehmen dir URL der Anwendung an und 
     * belegen eines der hauptelemente mit denen gearbeitet wird
     */
    this.baseUrl = "http://localhost/Uebung4/";
    this.table = $('#main-table');
    /**
     * und eine init methode gibt an, welche schritte 
     * als vorberietung in der view getroffen werden sollen
     */
    this.init();
};

listViewHandler.prototype.init = function(){
    this.getLevel({'listtype':'PROJECTS'});
    this.bindShoppingList();
};

/**
 * Lädt alle Elemente einer angegebenen Ebene und lässt die tabelle befüllen.
 * @param Object params enthält die ebene und die id derselben
 */
listViewHandler.prototype.getLevel = function(params){
    //durch diese variable ermögliche ich mir, dass ich
    //in der späteren annonymen function im jQuery Object auf mein eigentliches
    //Objekt zugreifen kann.
    var self = this;
    
    //vorbereiten des parameter objektes, welches an den server übertragen wird.
    var json = {
        'action': 'list',
        'listtype': params.listtype
    };

    //ggf. werden wir auch die id setzen, bei oberster ebene nicht nötig
    if(typeof(params.id) !== "undefined"){
        json.parentid = params.id;
    }

    $.ajax({
        url: self.baseUrl + "index.php",
        type: "post",
        data: {data: JSON.stringify(json)},
        success: function (data){
            //aufruf der callback funktion
            self.fillTable(data);
        },
        error: function(data){
            console.log ("ERROR",  data);
        }
    });
};

/**
 * Hier bauen wir HTML Table Zeilen zusammen und fügen sie der 
 * Tabelle hinzu. Jede Ebene kann hier generisch "erzeugt" werden, da wir uns
 * auf die Standardisierte Rückgabe stützen können.
 * 
 * Um das durchlaufen der Struktur besser nach zu voll ziehen sehen Sie sich die
 * Spezifikation der Ausgabe von Übung 3 an.
 * @param object jsonData Rückgabe vom Server
 */
listViewHandler.prototype.fillTable = function(jsonData){
     // wir stellen sicher, dass die Tabelle leer ist
    this.table.html("");
    //wir erzeugen die Überschriften der Tabelle. Die Namen befinden sich in den 
    //Keys der ItemArray Einträge, die vom Server respektive der DB kommen.
    //Wir betrachten dazu einfach den ersten Eintrag(Zeile) in der DB - Tabelle
    // Ein HTML String wird zusammen gesetzt:
    var header = "<tr>";
    for(var key in jsonData.items[0] ){
        if(key !== "url") {//wir wollen aus der definierten Schnittstelle, die URL weglassen
            header += '<th>'+key+'</th>';
        }
    }
    header += "<th>Optionen</th>";
    header += "</tr>";
    //im nächsten Schritt rezeugen wir ein jQuery Objekt welches die header Zeile
    //enthält und hängen sie an die Ausgabe Tabelle an (siehe properties im Konstruktor)
    $(header).appendTo(this.table);

    // nun gehen wir an die Einträge heran und durchlaufen alle un erzeugen jeweils
    // die HTML Table Row (die in einer eigenen Methode erzeugt wrd)
    for(var i in jsonData.items){
        //Ich persönlich markieren Variablen in JS mit einem $ Zeichen, wenn darin 
        //ein jQuery Objekt gehalten wird. Hier erzeugen wir solche Objekte 
        var $row = this.getRow(jsonData.items[i], jsonData.listtype);
        //und hängen sie an die Ausgabetabelle hinten an.
        $row.appendTo(this.table);
    }
    //wir setzen die Überschrift
    $('#listtype').text(jsonData.listtypeNice);     
    //und rufen die Methoden auf, die sich um das Eventbinding kümmern,
    //damit die Oberfläche interaktiv wird.
    //Wir machen das nach dem Aufbau der Tabelle, denn die Tabelle kann sich ja 
    //je nach Level Ändern und die Events müssen dann neu gebunden werden, weil
    //ja neue HTML Knoten erzeugt wurden, die Event-Los sind.
    this.bindLevelNavigationOptions();
    this.bindCRUDOptions(this);
    this.bindShoppingList();
};

/**
 * Erzeugt eine HTML Table Row als jQuery Objekt und gibt dieses zurüc
 * @param Object data des aktuelen Eintrags
 * @param string listType
 * @return jQueryObject
 */
listViewHandler.prototype.getRow = function(data, listType){
    //wir bereiten ein TR-Tag als HTML String vor und speichern notwendige
    //Daten in selbst erfundenen Data-Attributen des Tags, um die Zeile ggf.
    //wieder zu identifizieren
    var tableRow = '<tr data-id="'+data.id+'" data-listType="'+listType+'">';

    //wie im header durchlaufen wir die Einträge und erzeugen Zellen
    for(var key in data ){
        if(key !== "url") {
            tableRow += '<td>'+data[key]+'</td>';
        }
    }
    tableRow += "</tr>";
    
    $row = $(tableRow); //nun erzeugen wir ein jQuery Objekt aus der Zeile
    
    //und !! Wichtig !! hängen an die Zeile noch die Zelle mit den Optionen an
    $row.append( this.getRowOptions(data.id, listType) );

    //rückgabe der fertig gebauten Zeile
    return $row;
};

/**
 * erzeugt eine Tabellen Zelle als jQuery Objekt und fügt je nach List-Type
 * die Optionsbuttons hinzu.
 * @param int rowId
 * @param string listType
 * @returns {$|listViewHandler.prototype.getRowOptions.$td}
 */
listViewHandler.prototype.getRowOptions = function(rowId, childListType){    
    //nachdem wir sehr ähnlihe Buttons haben werden erzeugen wir uns einen 
    //s.g. Primaten den wir für die jeweiligen echten Buttons klonen werden.
    //er enthält jeweils solche Informationen die zur Identifikation später notwendig sind
    //denken Sie daran, dass ja jede Zeile diese Buttons haben wir und der Computer
    //nicht weis welcher Button, den der User klickt, welcher Zeile zugeordnet ist
    //wenn sie ihm das nicht sagen.
    var $button = $('<button class="btn btn-default fas" data-id="'+rowId+'" data-listType="'+childListType+'" ></button>');
    
    //außerdem bereiten wir die Tabellen Zelle vor, und unten folgen Fälle zu den einzelnen Ebenen
    var $td = $('<td></td>');
    
    //um einen Button zu erzeugen verwenden wir eine hilfsmethode
    $td.append(this.getClonedButton($button, 'fa-angle-double-right', 'show-children') );
    
    //unterster Knoten hat keine Kinder, daher kann man hier keine Kinder erzeuge
    if(childListType){
        $td.append(this.getClonedButton($button, 'fa-plus-circle', 'create-child') );
    }   
    
    $td.append(this.getClonedButton($button, 'fa-pencil-alt', 'edit-item') );
    
    //auf oberster Ebene soll das Enternen nicht möglich sein, dafür aber die 
    //sopping list angezeigt werden.
    if(childListType === "FLOORS"){
        $td.append(this.getClonedButton($button, 'fa-clipboard-list', 'shopping-list') );
    } else {
        $td.append(this.getClonedButton($button, 'fa-trash', 'remove-item') );
    }
    
    return $td;
};

listViewHandler.prototype.getClonedButton = function($button, iconClass, actionClass){
    //wir klonen den Button 
    var $concreteButton = $button.clone(true);
    //setzen die CSS Klassen zur selection später durch jquery (beim eventbinding(
    $concreteButton.addClass(iconClass).addClass(actionClass);
   
    return $concreteButton;
};

listViewHandler.prototype.bindLevelNavigationOptions = function(){
    //wir brauchen im jquery-event Aufruf noch unser Objekt, daher wieder diese Variable
    //den "this" referenziert im jquery objekt natürlich auf das jquery objekt und nicht auf unseres
    var self = this; 
    //wir entfernen alle möglichen bestehenden events die gebunden sein könnten
    this.table.find(".show-children").unbind();
    //und durchlaufen alle elemente der klasse "show-children" auf die wir das
    //klick event binden wollen
    this.table.find(".show-children").each(function(){
        //jedes element in der liste wird mit dem klick event versehen
        $(this).on('click', function(){
            //und der folgende callback zugewiesen, der das aktuelle 
            //angeklickte element übergeben bekommt um zu wissen wer es war
            self.listDeeperLevel(this);
        });
    });
};

//der event callback
listViewHandler.prototype.listDeeperLevel = function(button){
    //wir lesen die attribute aus, die wir auf dem button (Primat)
    //vorbereitet haben
    var params = {
        id : $(button).attr('data-id'),
        listtype: $(button).attr('data-listType')
    };
    //und übergeben sie der bereits bekannten getLevel methode (siehe oben)
    this.getLevel(params);
};

//EDIT Fehlt als Option. die Bindings funktioniere wie in der Mehtode bindLevelNavigationOptions
listViewHandler.prototype.bindCRUDOptions = function(){
    var self = this;
    this.table.find('.create-child').unbind();
    this.table.find('.create-child').each(function(){
        $(this).on('click', function(){
            //wir lesen die vorbereiteten parameter aus
            var id = $(this).attr('data-id');
            var listtype= $(this).attr('data-listType');
            
            //und konfigurieren den Eingabedialog
            self.configModalDialog(listtype, id);
            $('#modal-form').modal('dispose');
            //zeigen ihn an (modal kommt von Bootstrap4 als Unterstützung)
            $('#modal-form').modal('show');
            //und haben hier wieder events zu binden, die nach dem klicken der
            //buttons im dialog aufgerufen werden.
            self.bindModalOptions("create");
        });
    });
    
    this.table.find('.remove-item').unbind();
    this.table.find('.remove-item').each(function(){
        $(this).on('click', function(){
            var id = $(this).attr('data-id');
            var childListtype= $(this).attr('data-listType');
            //durch diese konstruktion öffnet sich der Browserdialog 
            var check = confirm("Diesen Eintrag wirklich Löschen?");
            //und hält das JS bis zu Eingabe des Users und darum können wir
            //synchron warten und dann den Rückgabe wert des Dialgos prüfen
            if(check){
                self.removeItem(childListtype, id);
            }
            
        });
    });
};

/**
 * je nach Ebene werden im Dialog andere Felder angezeigt oder versteckt
 * außerdem weden parameter in hidden fields gesetzt, damit wir uns später
 * beim weiteren verarbeiten des formulars leichter tun
 * @param string type
 * @param int parentId
 */
listViewHandler.prototype.configModalDialog = function(type, parentId){
    var dialog = $('#modal-form');
    dialog.find('input').val("");
    dialog.find('.form-group').hide();
    dialog.find('input[name="parent-id"]').val(parentId);
    dialog.find('input[name="item-listtype"]').val(type);
    
    
    $('.alert-success, .alert-danger').hide();
    
    switch(type){
        case 'FLOORS':  
            dialog.find('#form-name').show();
            dialog.find('#form-floor-count').show();
            dialog.find('.dialog-item-name').text("Geschoss hinzufügen");
            break;
        case 'ROOMS':
            dialog.find('#form-name').show();            
            dialog.find('.dialog-item-name').text("Raum hinzufügen");
           break;
       case 'DEVICES':
           dialog.find('.dialog-item-name').text("Gerät hinzufügen");
           dialog.find('#form-name').show();
           break;
       case 'SENSORS':
           dialog.find('.dialog-item-name').text("Sensor hinzufügen");
           dialog.find('#form-name').show();
           dialog.find('#form-unit').show();
           dialog.find('#form-value').show();
           break;
       default:
           console.log("unknown type "+type);
           break;
    }    
};

//wieder event binder, funktinoiert jedes mal gleich
//wir haben hier aber die fallunterscheidung für edit shcon implementiert
//da wir vorhaben den selben dialog wieder zu verwenden.
listViewHandler.prototype.bindModalOptions = function(action){
    var self = this;
    
    $('#modal-save').unbind();
    switch(action){
        case 'create':
            $('#modal-save').on('click', function(){
                self.processCreateRequest();
            });
            break;
        case 'edit':
            $('#modal-save').on('click', function(){
                self.processEditRequest();
            });
            break;
        default:
            console.log("unknown action "+action);
    }
};

//wenn nun im Dialog auf Speichern geklickt wurde...
listViewHandler.prototype.processCreateRequest = function(){
    var self = this;
    //wir suchen uns die Parameter aus dem Dialog zusammen
    var json = this.collectCreateParams();
    //und setzen den call ab
    $.ajax({
        url: self.baseUrl + "index.php",
        type: "post",
        data: {data: JSON.stringify(json)},
        success: function (data){
             if(data.status === "OK"){ //wenn alles gut ging "OK" message
                 $('.alert-success').removeClass('d-none').show();
             } else {//fehler sonst.
                 $('.alert-danger').removeClass('d-none').show();
             }
             $('#modal-form').modal('hide');
        },
        error: function(data){
            console.log ("ERROR",  data);
        }
    });
};

// das sammeln der felder des dialogs
listViewHandler.prototype.collectCreateParams = function(){
    var dialog = $('#modal-form');
    //wir sammeln nur werte der sichtbaren felder.
    var fields = dialog.find('.form-group:visible').find('input');
    var specification = {};
    //und geben sie in ein objekt namens specification
    ////(das wird schon für ajax call vorbereitet, siehe Spezifikation der Schnittstelle)
    fields.each(function(){
        specification[$(this).attr('name')] = $(this).val();
    });
    
    //und hier holen wir uns die parameter der hidden fields die wir
    //fpr die identifizierung der aktuellen ebene vorbereitet hatten
    var params = {
        action: 'create',
        listtype: dialog.find('input[name="item-listtype"]').val(),
        parentId: dialog.find('input[name="parent-id"]').val(),
        specification: specification
    };
    
    return params;
};

//wenn der trashcan geklickt und bestätigt wurde
listViewHandler.prototype.removeItem = function(childListType, id){
    var self = this;
    var listType = "";
    //weil wir ja immer die kind-ebene angeben müssen wir leider hier
    //irgndwie auf die eltern-ebene schließen - ich gebe zu das ist nicht optimal
    //optimal wäre ein parameter der uns das mitteilt (sprich die Schnittstelle ist unzureichend)
    switch(childListType){
        case 'ROOMS':
           listType = "FLOORS";
           break;
        case 'DEVICES':
           listType = "ROOMS";
           break;
        case 'SENSORS':
           listType = "DEVICES";
           break;
        default:
           listType = "SENSORS";
           break;
    }
    
    //parameter vorbereiten
    var json = {
        action: "delete",
        listtype: listType,
        itemId: id
    };
    
    //server ansprechen
    $.ajax({
        url: self.baseUrl + "index.php",
        type: "post",
        data: {data: JSON.stringify(json)},
        success: function (data){
            if(data.status === "OK"){
                location.reload();//eigentlich sollte es reichen die TR zu löschen ,aber wir laden neu
                //auch damit wir wieder durch die ebenen navigieren können.
                //ist eben zum vorzeigen in der LV programmiert
            } else {
                $('.alert-danger').removeClass('d-none').show();
            }
        },
        error: function(data){
            console.log ("ERROR",  data);
        }
    });
};

//wenn der benutzer auf den Clipboard Button eines Projektes klickt:
listViewHandler.prototype.bindShoppingList = function(){
    //das binding kennen wir jetzt schon
    var self = this;
    $('.shopping-list').unbind();
    $('.shopping-list').each(function(){
        $(this).on('click', function(){
            var projectId = $(this).attr('data-id');
            self.loadShoppingList(projectId);
        });
    });
};


listViewHandler.prototype.loadShoppingList = function(projectId){
    var self = this;
    //parameter vorbereiten
    var json = {
        action: "get-shoppinglist",
        projectId: projectId
    };
    
    //call ausführen und ergebnis verarbeiten
    $.ajax({
        url: self.baseUrl + "index.php",
        type: "post",
        data: {data: JSON.stringify(json)},
        success: function (data){
            //aufruf um Liste anzuzegen
            self.displayShoppingList(data);
        },
        error: function(data){
            console.log ("ERROR",  data);
        }
    });
};

//ähnlich wie bei den tables erzeugen wir jetzt das html der Ausgabe Liste
listViewHandler.prototype.displayShoppingList = function(list){
    //wo soll die liste ausgegeben werden
    var output = $('#shoppinglist-output');
    //überscrhfit setzen
    output.prev('h3').find('span').text(list.project);
    
    output.html("");
    //je Liste
    var $ul = $('<ul></ul>');
    //alle elemente durchlaifen und hinzufügen
    for(var i in list.shoppingList){
        var device = list.shoppingList[i];
        //hier wird der eintrag erzeugt (intern als blackbox)
        $ul.append( this.getDeviceListEntry(device) );
    }
    
    output.append($ul);
    output.parents('.card').first().removeClass('d-none');
};

//der intere Geräte eintrag als HTML
listViewHandler.prototype.getDeviceListEntry = function(device){
    //ein LI
    var $li = $('<li></li>');
    //mit beschriftung und
    var text = device.deviceName + "("+device.count+"x), Sensor(en): ";
    //subliste - selber mechanismus wie vorher
    var $subUl = $("<ul></ul>");
    
    //also je senoren eintrag wird in er sub liste ein eintrag erzegt und angehängt
    for(var ix in device.sensors ){
        var sensor = device.sensors[ix];
        var $currentLi = $('<li></li>');
        $currentLi.append( sensor.name );
        
        $subUl.append($currentLi);
    };
    
    //dann hängen wir die subliste noch an den Listeneintrag des Geräts an
    $li.append(text).append($subUl);
    //und dann die Rückgabe
    return $li;
};