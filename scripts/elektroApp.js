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