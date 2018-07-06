<?php


/**
 * Description of CreateModel
 *
 * @author helmuth  refactored by Wolfgang
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

    public function deleteFi($id){
        return $this->deleteFromTable('fis', $id);
    }

    public function deleteFuse($id){
        return $this->deleteFromTable('fuses', $id);
    }
    
    public function deleteProject($id){
        return $this->deleteFromTable('projects', $id);
    }


    
    private function deleteFromTable($tableNme, $id){
        $sql = "DELETE FROM $tableNme WHERE id = $id LIMIT 1 ";
        
        //DEBUG  ######################################  RAUS DAMIT im ECHTBETRIEB
        return $sql;
        
        $this->database->order($sql);


        return $this->database->lastInsertedId();   // MAL SEHEN, ob das bei Delete auch eine ID zurückliefert ???      
        return true;  //######################################## TODO
    }
    
}