<?php

/**
 * Description of ReportController
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
                $this->reportModel = new CircuitListModel(); 
                $this->reportType = "circuitlist";
                break;
        }
        
        $this->reportData = $this->reportModel->createReport ($data->projectid);
        $report = array($this->reportType => $this->reportData);
//        $report[$this->reportType] = $this->reportData;
        
        $this->displayResponse($report);

    }
    
    
    public function displayResponse($outputData) {
        $this->jsonView->streamOutput($outputData);
    }
}

