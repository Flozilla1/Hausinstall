<?php

/**
 * Description of ShopingListController
 *
 * @author Wolfgang
 */
class ReportController implements Controller{
    private $jsonView;
    private $reportModel;
    private $reportData;
    private $reportType;
    
    public function __construct() {
        $this->jsonView = new JsonView();
    }
    
    public function route($data) {
        
        switch($data->action){
            case 'shoppinglist': 
                $this->reportModel = new ShoppingListModel();
                $this->reportType = "shoppinglist";
                //debug
//                $report = array("status" => 1, "circuitlist" => 2);
//                $this->displayResponse($report);
                break;
            case 'circuitlist':
                $this->reportModel = new ShoppingListModel(); // ############# TODO
                $this->reportType = "circuitlist";
                break;
        }
        
        $this->reportData = $this->reportModel->createReport ($data->projectid);
        $report = array("circuitlist" => $this->reportData);
//        $report[$this->reportType] = $this->reportData;
        
        $this->displayResponse($report);

    }
    
    
    public function displayResponse($outputData) {
        $this->jsonView->streamOutput($outputData);
    }
}

/* ############
    private function formatAndDisplayListDataFLO(){
 
        $itemList = array();
        $data = $this->listModel->getCurrentList();  //Daten aus der DB holen
        
        foreach($data as $content){
//            $content = $this->getSpecificationTable($row); // Listentries aufbereiten ..obsolet, da ich sowieso auf jeden einzelnen Key gehen muss
            $itemid = $content['id']; //id gibts in jeder tabelle und der key heißt auch immer so
            $name = $content['name']; //name gibts in jeder tabelle und der key heißt auch immer so
            $specification = $this->listModel->getItemSpecification($content);  // Die spezialfelder herauskiezeln und in specifications packen
 
            $itemheader = $this->itemprefix . "-" . $itemid;  // z.B. "project-1" zusammenbasteln
           
            $itemList[$itemheader]['title'] = $name;
            $itemList[$itemheader]['specification'] = $specification;              
        }
        
        $outputData[$this->itemtitle] = $itemList;              
        $this->displayResponse($outputData);  // DAS sollte im endeffekt funktionieren !!! ...tut's auch :-)
    }
     
    public function displayResponse($outputData) {
        $this->jsonView->streamOutput($outputData);
    }
 * 
 * */
