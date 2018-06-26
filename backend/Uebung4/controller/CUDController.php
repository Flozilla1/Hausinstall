<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CreateController
 *
 * @author helmuth
 */
class CUDController implements Controller {
    private $jsonView;
    private $response;
    private $inputData;
    
    public function __construct() {
        $this->jsonView = new JsonView();
        $this->response = array();
    }
    
    
    public function route($inputData) {
        
        $this->inputData = $inputData;
        
        switch($this->inputData->action){
            case 'create':
                $this->createItem();
                break;
            case 'update':
                $this->updateItem(); //fehlt
                break;
            case 'delete':
                $this->deleteItem();
                break;
            default:
                //TODO: errohandlingg
                break;
        }
        
        $this->displayResponse($this->response);
        
    }
    
    private function createItem(){
        
        $createModel = new CreateModel();
        
        switch($this->inputData->listtype){
            case 'FLOORS':
                $newId = $createModel->createFloor($this->inputData->parentId, $this->inputData->specification);
                break;
            case 'ROOMS':
                $newId = $createModel->createRoom($this->inputData->parentId, $this->inputData->specification);
                break;
            case 'DEVICES':
                $newId = $createModel->createDevice($this->inputData->parentId, $this->inputData->specification);
                break;
            case 'SENSORS':
                $newId = $createModel->createSensor($this->inputData->parentId, $this->inputData->specification);
                break;
            case 'PROJECTS': 
                $newId = $createModel->createProject($this->inputData->specification);
                break;
            default:
                //TODO: errorhanding
                $newId = false;
                break;
        }
        
        if(!is_null($newId)){
            $this->response = array("status" => "OK", "newId" => $newId);
        } else {
            $this->response = array("status" => "NOK", "messgae" => "NO Entry was created");
        }
       
    }
    
    private function deleteItem(){
        $deleteModel = new DeleteModel();
        
        switch($this->inputData->listtype){
            case 'FLOORS':
                $newId = $deleteModel->deleteFloor($this->inputData->itemId);
                break;
            case 'ROOMS':
                $newId = $deleteModel->deleteRoom($this->inputData->itemId);
                break;
            case 'DEVICES':
                $newId = $deleteModel->deleteDevice($this->inputData->itemId);
                break;
            case 'SENSORS':
                $newId = $deleteModel->deleteSensor($this->inputData->itemId);
                break;

            default:
                //TODO: errorhanding
                $newId = false;
                break;
        }
        
        $this->response = array("status" => "OK");
    }
    
    public function displayResponse($output) {
        $this->jsonView->streamOutput($output);
    }
}
