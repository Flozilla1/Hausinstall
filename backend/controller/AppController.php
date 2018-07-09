<?php
/**
 * @author helmuth
 */
class AppController {
   
    private $jsonView;
    private $listModel;
   
    public function __construct() {
        $this->jsonView = new JsonView();
        $this->listModel = new ListModel();
    }
    
    public function route(){
        //eingabe übernehmen
        $jsonInput = filter_input(INPUT_POST, 'data');
        //das erwartete json in ein objekt für php zwecke umwandeln
        $inputData = json_decode($jsonInput);
        
        //je nach action einen anderen controller laden        
        switch($inputData->action){
            
            case 'list': 
                $subController = new ListController();
                break;
            case 'create': case 'update': case 'delete':
                $subController = new CUDController();
                break;
            case 'shoppinglist': case 'circuitlist':
                $subController = new ReportController();
                break;
            default: 
                $subController = new CUDController();
                break;
            
        }
        
        $subController->route($inputData);
        
    }
}
