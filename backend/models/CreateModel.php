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
class CreateModel {
    
    private $database;
     
    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
    
    public function createFloor($parentId, $specifcation){
        $floorCount = $specifcation->count_from_basement;
        $name = $specifcation->name;
        
        $sql = "INSERT INTO floors (projects_id, floor_count_from_basement, name) VALUES ($parentId, $floorCount, '$name') ";
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function createRoom($parentId, $specifcation){
        $name = $specifcation->name;
        
        $sql = "INSERT INTO rooms (floors_id, name) VALUES ($parentId, '$name') ";
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function createDevice($parentId, $specifcation){
        $name = $specifcation->name;
        
        $sql = "INSERT INTO devices (rooms_id, name) VALUES ($parentId, '$name') ";
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
    public function createSensor($parentId, $specifcation){
        $name = $specifcation->name;
        $unit = $specifcation->unit;
        $value = $specifcation->value;
        
        $sql = "INSERT INTO sensors (devices_id, unit, value, name) VALUES ($parentId, '$unit', '$value', '$name') ";
        $this->database->order($sql);
        return $this->database->lastInsertedId();
    }
    
}
