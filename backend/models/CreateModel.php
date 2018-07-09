<?php


/**
 * Description of CreateModel
 *
 * @author helmuth  refactored by Wolfgang
 */
class CreateModel {
    
    private $database;
     
    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
   
    public function createProject($specification){
        $name = $specification->name;
        $baumeister = $specification->baumeister;
        $kapital = $specification->kapital;
        
        $sql = "INSERT INTO projects (name, baumeister, kapital) VALUES ('$name', '$baumeister', $kapital) ";
        
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
     
    public function createFloor($parentId, $specification){
        $floorCount = $specification->countFromBasement;
        $name = $specification->name;
             
        $sql = "INSERT INTO floors (projects_id, floor_count_from_basement, name) VALUES ($parentId, $floorCount, '$name') ";
         
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
       $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function createRoom($parentId, $specification){
        $name = $specification->name;
        $flaeche = $specification->flaeche;
        
        $sql = "INSERT INTO rooms (floors_id, name, flaeche) VALUES ($parentId, '$name', $flaeche) ";
        
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function createDevice($parentId, $specification){
        $name = $specification->name;
        $fuseid = $specification->fuseid;
        $sql = "INSERT INTO devices (rooms_id, name, fuseid) VALUES ($parentId, '$name', $fuseid) ";
        
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function createSensor($parentId, $specification){
        $name = $specification->name;
        $unit = $specification->unit;
        $value = $specification->value;
        
        $sql = "INSERT INTO sensors (devices_id, name, unit, value) VALUES ($parentId, '$name', '$unit', $value) ";
        
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }

    public function createFi($parentId, $specification){ 
        $current = $specification->current;
        $name = $specification->name;
        
        $sql = "INSERT INTO fis (projects_id, name, current) VALUES ($parentId, '$name', $current) ";
        
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function createFuse($parentId, $specification){ 
        $current = $specification->current;
        $name = $specification->name;
        
        $sql = "INSERT INTO fuses (fis_id, name, current) VALUES ($parentId, '$name', $current) ";
        
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
}
