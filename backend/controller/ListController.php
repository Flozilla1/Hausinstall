<?php
/**
 * @author helmuth   refactored by Wolfgang
 */
class ListController implements Controller{
   
    private $jsonView;
    private $listModel;
    private $listType;
   
    public function __construct() {
        $this->jsonView = new JsonView();
        $this->listModel = new ListModel();
    }
    
    public function route($data){
        
        $this->listType = $data->listtype;
        if (strtoupper($this->listType) !== 'PROJECTS') {  //NOTFALL listtype !!  Wannimmer projekte statt was gewünschtes kommen ... fehler im request !
            $parentId = $data->parentid; 
        } else {
            $parentId = 1;
        }

        $this->createRequestedList($parentId);
        $this->formatAndDisplayListDataFLO();    
    }

private $itemprefix;
private $itemtitle;
    
    private function createRequestedList($parentId){
        $this->listModel->setListType($this->listType);
        switch(strtoupper($this->listType)){
           
            case 'FLOORS':
                $this->itemtitle = "FloorObject";
                $this->itemprefix = "floor";
                $this->listModel->listFloors($parentId);
                break;
            case 'ROOMS':
                $this->itemtitle = "RoomObject";
                $this->itemprefix = "room";
                $this->listModel->listRooms($parentId);
                break;
            case 'DEVICES':
                $this->itemtitle = "DeviceObject";
                $this->itemprefix = "device";
                $this->listModel->listDevices($parentId);
                break;
            case 'SENSORS':
                $this->itemtitle = "SensorObject";
                $this->itemprefix = "sensor";
                $this->listModel->listSesnors($parentId);
                break;
            case 'FIS': 
                $this->itemtitle = "FiObject";
                $this->itemprefix = "fi";
                $this->listModel->listFis($parentId);  
                break;          
            case 'FUSES': 
                $this->itemtitle = "FuseObject";
                $this->itemprefix = "fuse";
                $this->listModel->listFuses($parentId); 
                break;          
            case 'PROJECTS': default:
                $this->itemtitle = "ProjectObject";
                $this->itemprefix = "project";
                $this->listModel->listProjects();
                break;          
         }
          
    }
    
  
    
    // FLO-format
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
}
