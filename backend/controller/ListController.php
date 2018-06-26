<?php
/**
 * @author helmuth
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
        if ($this->listType !== 'PROJECTS') {
            $parentId = $data->parentid; 
        } else {
            $parentId = 1;
        }

        $this->createRequestedList($parentId);

        $this->formatAndDisplayListData();    
    }
    
    private function createRequestedList($parentId){
        $this->listModel->setListType($this->listType);
        switch(strtoupper($this->listType)){
           
            case 'FLOORS':
                $this->listModel->listFloors($parentId);
                break;
            case 'ROOMS':
                $this->listModel->listRooms($parentId);
                break;
            case 'DEVICES':
                $this->listModel->listDevices($parentId);
                break;
            case 'SENSORS':
                $this->listModel->listSesnors($parentId);
                break;
            case 'PROJECTS': default:
                $this->listModel->listProjects();
                break;          
        }
    }
    
    private function formatAndDisplayListData(){
        
        $itemList = array();
        $data = $this->listModel->getCurrentList();
        
        foreach($data as $row){
            $specification = $this->getSpecificationTable($row);
            
            $childListType = $this->listModel->getChildListType();
            if($childListType !== ""){
            
                $url = "http://localhost/Uebung3/index.php?listtype=".$childListType."&parentid=".$row['id'];
                $specification['url'] = $url;
            }
            
            $itemList[] = $specification;
            
        }
        $outputData = array (
            "listtypeNice" => $this->listModel->getListNameByType(),
            "listtype" => $this->listModel->getChildListType(),
            "items" => $itemList
        );
        $this->displayResponse($outputData);
    }
    
    private function getSpecificationTable($entries){
        $specification = array();
        foreach($entries as $key => $value){
            
            if(!is_numeric($key)){
                $specification[$key] = $value;
            }
        }
        
        return $specification;
    }
    
    public function displayResponse($outputData) {
        $this->jsonView->streamOutput($outputData);
    }
}
