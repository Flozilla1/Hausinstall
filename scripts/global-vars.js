var that
var target = "#cat-1"
var openedUnit
var countOfCrums = 1
var parentId = 1
var projectId
var fadeAndBlurSteps = 0.1
var requestJson = {'action': 'list','listtype': 'projects'}
var type
var originalValues = []

var catArr = ["#cat--1", "#cat-0", "#cat-1", "#cat-2", "#cat-3", "#cat-4", "#cat-5", "#fis-2", "#fis-3"]
var colorSteps = {   // r/g/b x7 +/- red/green/blue darf 0/255 nicht überschreiten
    'r': -20,
    'g': 0,
    'b': 20,
    'r2': 20,
    'g2': -20,
    'b2': -5
}
var listtypeList = {
    '#cat--1': 'circuitlist',
    '#cat-0': 'shoppinglist',
    '#cat-1': 'projects',
    '#cat-2': 'floors',
    '#cat-3': 'rooms',
    '#cat-4': 'devices',
    '#cat-5': 'sensors',
    '#fis-2': 'fis',
    '#fis-3': 'fuses'
}
var propertyList = {    
    //listtyp: [btn>[[programmName, Anzeigename]], Attribute>[[AnzeigeName, programmName]], ListBtn>[[ProgrammName, Anzeigename]]]
    'projects': [[["action_circlist", "<< Stromkreise"], ["action_shoppinglist", "< Einkaufsliste"], ["action_update", "Bearbeiten"], ["action_delete", "Löschen"]],
                 [["Baumeister", "baumeister"], ["Kapital", "kapital"]],
                [["action_list_cat", "Ebenen >"], ["action_list_fis", "Fi >"]]],
    'floors': [[["action_update", "Bearbeiten"], ["action_delete", "Löschen"]],
               [["Ebene Nr", "countFromBasement"]],
              [["action_list", "Räume >"]]],
    'rooms': [[["action_update", "Bearbeiten"], ["action_delete", "Löschen"]],
              [["Fläche", "flaeche"]],
             [["action_list", "Verbraucher >"]]],
    'devices': [[["action_update", "Bearbeiten"], ["action_delete", "Löschen"]],
                [["Sicherung", "fname"]],
               [["action_list", "Sensoren >"]]],
    'sensors': [[["action_update", "Bearbeiten"], ["action_delete", "Löschen"]],
                [["Einheit", "unit"], ["Wert", "value"]],],
    'fis': [[["action_update", "Bearbeiten"], ["action_delete", "Löschen"]],
            [["Stärke", "current"]],
            [["action_list", "Sicherungen >"]]],
    'fuses': [[["action_update", "Bearbeiten"], ["action_delete", "Löschen"]],
            [["Stärke", "current"]]]
}
var selectOptionList = {
    'devices': [[["fname", "Name d. Sicherung"]],[["type", "Typ"], ["Steckdose 230V Unterputz","Steckdose 230V Aufputz","Steckdose 400V","Glühbirnenfassung E24","LED Balken","FeuchtraumLeuchte","Untertisch-speicher","E-Herd","Waschmaschine","Geschirrspüler","Markise","Torantrieb","Sprinkleranlage"]]],
    'sensors': [[["type", "Typ"], ["Schalter Unterputz","Schalter Aufputz","Schalter Feuchtraum","Windsensor","Feuchtigkeitssensor"]]],
    'fis': [[["type", "Typ"], ["1ph 30mA","1ph 100mA","1ph 300mA","3ph 100mA","3ph 400mA"]]],
    'fuses': [[["type", "Typ"], ["1ph 4A","1ph+N 10A","1ph+N 12A","1ph+N 16A","3ph+N 16A","3ph+N 20A"]]]
}
var menuHelpList = {
    'new': ["Neue Werte:", "fkt-yes", "create"],
    'update': ["Neue Werte:", "fkt-yes", "update"],
    'delete': ["Wirklich Löschen?", "fkt-no", "delete"]
}