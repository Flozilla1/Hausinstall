<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ShopingListController
 *
 * @author helmuth
 */
class ShoppingListController implements Controller{
    private $jsonView;
    
    public function __construct() {
        $this->jsonView = new JsonView();
    }
    
    public function route($data) {
        //es gibt bis jetzt nur eine aktion
        $this->getListOfProject($data->projectId);
    }
    
    private function getListOfProject($projectId){
        $listModel = new ListModel();
        
        
        $projectName = $listModel->getProjectName($projectId);
        $list = $listModel->getDivecesOfProject($projectId);
        
        $outputData = array(
            'project' => $projectName,
            'shoppingList'=> $list
        );
        
        $this->displayResponse($outputData);
        
    }
    
    public function displayResponse($outputData) {
        $this->jsonView->streamOutput($outputData);
    }
}
