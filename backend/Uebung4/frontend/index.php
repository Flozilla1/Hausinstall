<!DOCTYPE html>
<html lang="de">
    <head>
        <title>Elektro App</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
        <link rel="stylesheet" href="css/mainView.css">
     <body>
         
         
        <h1 class="jumbotron">Listen Anzeige - <span id="listtype"></span></h1>
        
        <div class='container'>
            
            <p class="alert alert-info">
                <b><i class="fas fa-info"></i> &nbsp; Funktionsweise der Anwendung</b> 
                <br />
                In der Tabelle unten kann man durch klicken auf das <i class="fas fa-angle-double-right"></i> Symbol eine Ebene tiefer navigieren.
                <br />
                Die anderen Optionen dienen dem Löschen(<i class="fas fa-trash"></i>) oder Bearbeiten(<i class="fas fa-pencil-alt"></i>) 
                des Eintrags in der aktuellen Ebene , dem hinzufügen von Kindelementen (<i class="fas fa-plus-circle"></i>), oder dem
                Anzeigen der Shopping Liste eines Projektes (<i class="fas fa-clipboard-list"></i>), was nur auf der obersten Ebene möglich ist.
                <br />
                Das navigieren auf die übergeordnete Ebene ist nicht implementiert, genauso wie das Bearbeiten.
            </p>
            
            <div class="card bg-faded d-none">
                <div class="card-block">
                    <h3>Einkaufsliste <span></span></h3>
                    <!-- Vorbereiteter Container für die Ausgabe -->
                    <p id="shoppinglist-output"></p>
                </div>
            </div>
            
            <br />
            <!-- Vorbereitete Container für Rückmeldungsausgaben. -->
            <div class="alert alert-success d-none" role="alert">Aktion erfolgreich!</div>
            <div class="alert alert-danger d-none" role="alert">Aktion fehlgeschlagen, bitte erneut versuchen.</div>
            
            <!--die Tabelle zur Ausgabe der Ebenen -->
            <div class="row table-responsive">
                <table class="table table-striped" id="main-table"></table>
            </div>
            
        </div>
         
        <!-- der Dialog für Hinzufügen von Elementen und zum Bearbeiten -->
        <div class="modal" id="modal-form" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Neues Sub-Element erstellen</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3 class="dialog-item-name"></h3>
                        <input type="hidden" name="parent-id" />
                        <input type="hidden" name="item-listtype" />
                        <input type="hidden" name="item-id" />
                        
                        <div class="form-group" id="form-name">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" name="name" required="required" />
                        </div>
                        
                        <div class="form-group" id="form-floor-count">
                            <label for="floor-count">Geschoss Anzahl vom Keller</label>
                            <input type="number" class="form-control" id="floor-count" name="count_from_basement" required="required" />
                        </div>
                        
                        <div class="form-group" id="form-unit">
                            <label for="unit">Einheit</label>
                            <input type="text" class="form-control" id="unit" name="unit" />
                        </div>
                        
                        <div class="form-group" id="form-value">
                            <label for="value">Wert</label>
                            <input type="text" class="form-control" id="value" name="value" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">abbrechen</button>
                        <button type="button" class="btn btn-success" id="modal-save">Speichern</button>
                        
                    </div>
                </div>
            </div>
        </div>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script> 
    <script src="js/listview.js"></script>        
    </body>
</html>