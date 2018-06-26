<!DOCTYPE html>
<html lang="de">
    <head>
        <title>Elektro App</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
        <script>
            var listViewHandler = function(){
                this.table = $('#main-table');
                this.init();
            };
            
            listViewHandler.prototype.init = function(){
                this.getLevel({'listType':'PROJECTS'});
            };
            
            listViewHandler.prototype.getLevel = function(params){
                var self = this;
                var json = {
                    'action': 'list',
                    'listtype': params.listtype
                };
                
                if(typeof(params.id) !== "undefined"){
                    json.parentid = params.id;
                }
                
                $.ajax({
                    url: "index.php",
                    type: "post",
                    data: {data: JSON.stringify(json)},
                    success: function (data){
                        self.fillTable(data);
                    },
                    error: function(data){
                        console.log ("ERROR",  data);
                    }
                });
            };
    
            listViewHandler.prototype.fillTable = function(jsonData){
                this.table.html("");
                var header = "<tr>";
                for(var key in jsonData.items[0] ){
                    if(key !== "url") {
                        header += '<th>'+key+'</th>';
                    }
                }
                header += "</tr>";
                $(header).appendTo(this.table);
                
                for(var i in jsonData.items){
                    var rowHTML = this.getHTMLRow(jsonData.items[i], jsonData.listtype);
                    $(rowHTML).appendTo(this.table);
                }
                $('#listtype').text(jsonData.listtypeNice);     
                this.bindTableOptions();
                
            };
            
            listViewHandler.prototype.getHTMLRow = function(data, listType){
            
                var tableRow = '<tr data-id="'+data.id+'" data-listType="'+listType+'">';
                
                for(var key in data ){
                    if(key !== "url") {
                        tableRow += '<td>'+data[key]+'</td>';
                    }
                }
                tableRow += "</tr>";
                
                return tableRow;
            };
            
            listViewHandler.prototype.bindTableOptions = function(){
                var self = this;
                this.table.find("tr").unbind();
                this.table.find("tr").each(function(){
                    $(this).on('click', function(){
                        self.listDeeperLevel(this);
                    });
                   
                });
            };
            
            listViewHandler.prototype.listDeeperLevel = function(row){
                var params = {
                    id : $(row).attr('data-id'),
                    listtype: $(row).attr('data-listType')
                };
                    
                this.getLevel(params);
            };
            
            $(document).ready(function(){
                var listView = new listViewHandler();
            });
            
        </script>
     </head>
     
     <body>
        <div class='container'>
            <h1>Listen Anzeige - <span id="listtype"></span></h1>
            <table class="table table-stripped" id="main-table"></table>
            
        </div> 
     </body>
</html>