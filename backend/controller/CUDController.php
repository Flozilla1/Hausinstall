<?php

/**
 * Description of CreateController
 *
 * @author helmuth  refactored by Wolfgang
 */


class CUDController implements Controller {
    private $jsonView;
    private $response;
    private $inputData;
    private $listType;
    
    public function __construct() {
        $this->jsonView = new JsonView();
        $this->response = array();
    }
    
    
    public function route($inputData) {
        
        $this->inputData = $inputData;
        $this->listType = strtoupper($this->inputData->listtype);
        
        switch($this->inputData->action){
            case 'create':
                $this->createItem();
                break;
            case 'update':
                $this->updateItem(); 
                break;
            case 'delete':
                $this->deleteItem();
                break;
            default:
                //############################# TODO: errohandlingg
                break;
        }
        
        $this->displayResponse($this->response);
        
    }
    
    private function createItem(){
   
        $createModel = new CreateModel();
              
        switch($this->listType){
            case 'FLOORS':
                $newId = $createModel->createFloor($this->inputData->parentid, $this->inputData->specification);
                break;
            case 'ROOMS':
                $newId = $createModel->createRoom($this->inputData->parentid, $this->inputData->specification);
                break;
            case 'DEVICES':
                $newId = $createModel->createDevice($this->inputData->parentid, $this->inputData->specification);
                break;
            case 'SENSORS':
                $newId = $createModel->createSensor($this->inputData->parentid, $this->inputData->specification);
                break;
            case 'FIS': 
                $newId = $createModel->createFi($this->inputData->parentid, $this->inputData->specification);
                break;
            case 'FUSES': 
                $newId = $createModel->createFuse($this->inputData->parentid, $this->inputData->specification);
                break;
            case 'PROJECTS': 
                $newId = $createModel->createProject($this->inputData->specification);
                break;
            default:
                //TODO: errorhanding
                $newId = "ErrorHugo";
                break;
        }
        
//        if(!is_null($newId)){
        if($newId > 0){
//            $this->response = array("status" => 1, "message" => $newId + " created");
            $this->response = array("status" => 1, "message" => "New Item created", "newid" => $newId);
        } else {
            $this->response = array("status" => 0, "message" => "NO Entry was created");
        }
       
    }
    
    
        private function updateItem(){
   
        $updateModel = new UpdateModel();
              
        switch($this->listType){
            case 'FLOORS':
                $newId = $updateModel->updateFloor($this->inputData->itemid, $this->inputData->specification);
                break;
            case 'ROOMS':
                $newId = $updateModel->updateRoom($this->inputData->itemid, $this->inputData->specification);
                break;
            case 'DEVICES':
                $newId = $updateModel->updateDevice($this->inputData->itemid, $this->inputData->specification);
                break;
            case 'SENSORS':
                $newId = $updateModel->updateSensor($this->inputData->itemid, $this->inputData->specification);
                break;
            case 'FIS': 
                $newId = $updateModel->updateFi($this->inputData->itemid, $this->inputData->specification);
                break;
            case 'FUSES': 
                $newId = $updateModel->updateFuse($this->inputData->itemid, $this->inputData->specification);
                break;
            case 'PROJECTS': 
                $newId = $updateModel->updateProject($this->inputData->itemid, $this->inputData->specification);
                break;
            default:
                //TODO: errorhanding
                $newId = "ErrorHugo";
                break;
        }
        
        if(!is_null($newId)){
//        if($newId > 0){
//            $this->response = array("status" => 1, "message" => $newId + " updated");
            $this->response = array("status" => 1, "message" => "Item updated");
        } else {
            $this->response = array("status" => 0, "message" => "Update failed");
        }
       
    }

    
    
    
    private function deleteItem(){
        $deleteModel = new DeleteModel();
        
        switch($this->listType){
            case 'FLOORS':
                $newId = $deleteModel->deleteFloor($this->inputData->itemid);
                break;
            case 'ROOMS':
                $newId = $deleteModel->deleteRoom($this->inputData->itemid);
                break;
            case 'DEVICES':
                $newId = $deleteModel->deleteDevice($this->inputData->itemid);
                break;
            case 'SENSORS':
                $newId = $deleteModel->deleteSensor($this->inputData->itemid);
                break;
            case 'FIS': 
                $newId = $deleteModel->deleteFi($this->inputData->itemid);
                break;
            case 'FUSES': 
                $newId = $deleteModel->deleteFuse($this->inputData->itemid);
                break;
            case 'PROJECTS': 
                $newId = $deleteModel->deleteProject ($this->inputData->itemid);
                break;

            default:
                //TODO: errorhanding
                $newId = false;
                break;
        }
        
        if(!is_null($newId)){
//        if($newId > 0){
            $this->response = array("status" => 1, "message" => "Item deleted");
        } else {
            $this->response = array("status" => 0, "message" => "Delete failed");
        }
}
    
    public function displayResponse($output) {
        $this->jsonView->streamOutput($output);
    }
}
