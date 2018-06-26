<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CreateModel
 *
 * @author helmuth
 */
class DeleteModel {
    
    private $database;
     
    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
    public function deleteFloor($id){
        return $this->deleteFromTable('floors', $id);
    }
    
    public function deleteRoom($id){
        return $this->deleteFromTable('rooms', $id);
    }
    
    public function deleteDevice($id){
        return $this->deleteFromTable('devices', $id);
    }
    
    public function deleteSensor($id){
        return $this->deleteFromTable('sensors', $id);
    }
    
    private function deleteFromTable($tableNme, $id){
        $sql = "DELETE FROM $tableNme WHERE id = $id LIMIT 1 ";
        $this->database->order($sql);
        
        return true;
    }
    
}