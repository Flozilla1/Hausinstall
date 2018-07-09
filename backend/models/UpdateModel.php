<?php

/**
 * Description of UpdateModel
 *
 * @author Wolfgang
 */
class UpdateModel {
       
    private $database;
     
    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
   
    public function updateProject($itemId, $specification){
        $name = $specification->name;
        $baumeister = $specification->baumeister;
        $kapital = $specification->kapital;

        $sql = "UPDATE projects SET name = '$name' , baumeister = '$baumeister' , kapital = $kapital   WHERE id = $itemId " ;
           
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
     
    public function updateFloor($itemId, $specification){        
        $floorCount = $specification->countFromBasement;
        $name = $specification->name;
    
        $sql = "UPDATE floors  SET   name = '$name' ,  floor_count_from_basement = $floorCount   WHERE id = $itemId " ;
         
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
       $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function updateRoom($itemId, $specification){
        $name = $specification->name;
        $flaeche = $specification->flaeche;       

        $sql = "UPDATE rooms  SET   name = '$name' , flaeche = $flaeche    WHERE id = $itemId " ;
        
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function updateDevice($itemId, $specification){
        $name = $specification->name;
        $fuseid = $specification->fuseid;
        
        $sql = "UPDATE devices  SET   name = '$name' , fuseid = $fuseid    WHERE id = $itemId " ;
        
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function updateSensor($itemId, $specification){
        $name = $specification->name;
        $unit = $specification->unit;
        $value = $specification->value;
        
        $sql = "UPDATE sensors  SET   name = '$name' , unit = '$unit', value = $value    WHERE id = $itemId " ;
        
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }

    public function updateFi($itemId, $specification){ //#################################TODO
        $current = $specification->current;
        $name = $specification->name;
        
        //$sql = "UPDATE fis  SET   name = '$name' , current = $current    WHERE id = $itemId " ;
        
        //DEBUG
        return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function updateFuse($itemId, $specification){ //#################################TODO
        $current = $specification->current;
        $name = $specification->name;
        
        $sql = "UPDATE fuses  SET   name = '$name' , current = $current    WHERE id = $itemId " ;
        
        //DEBUG
        //return $sql; // ################################ TODO Weg damit im echtbetrieb
               
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    

}
