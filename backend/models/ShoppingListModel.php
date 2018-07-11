<?php
/**
 * Description: Selektiert alle devices, sensors, fis, fuses aus der DB und reiht sie nacheinander in die ergebnisliste
 * Ausgegben werden alle namen und die anzahl gleicher namen
 * @author Wolfgang
 */
class ShoppingListModel {
    private $database;
    private $list;
    
    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
    public function createReport($projectid){
        //Devices
        $sql= "
            SELECT dv.name, count(dv.name) as count
            FROM projects pj, floors fl, rooms ro, devices dv
            WHERE fl.projects_id = pj.id 
                AND ro.floors_id = fl.id
                AND dv.rooms_id = ro.id
                AND pj.id = {$projectid}
            GROUP BY  dv.name
            ;" ;
        $data = $this->getListFromDatabase($sql);
        //Format basteln 
        $index = 0;
        foreach($data as $content){
            $this->list[$index]['name'] = $content['name'];
            $this->list[$index]['count'] = $content['count'];
            $index++;
        }
                                
        //Sensors
        $sql= "
            SELECT ss.name, count(ss.name) as count
            FROM projects pj, floors fl, rooms ro, devices dv, sensors ss
            WHERE fl.projects_id = pj.id 
                AND ro.floors_id = fl.id
                AND dv.rooms_id = ro.id
                AND ss.devices_id = dv.id
                AND pj.id = {$projectid}
            GROUP BY ss.name
            ;" ;
        $data = $this->getListFromDatabase($sql);
        //Format basteln 
        foreach($data as $content){
            $this->list[$index]['name'] = $content['name'];
            $this->list[$index]['count'] = $content['count'];
            $index++;
        }

        //FIs
        $sql= "
            SELECT fi.name, count(fi.name) as count
            FROM projects pj, fis fi
            WHERE fi.projects_id = pj.id 
                AND pj.id = {$projectid}
            GROUP BY fi.name
            ;" ;
        $data = $this->getListFromDatabase($sql);
        //Format basteln 
        foreach($data as $content){
            $this->list[$index]['name'] = $content['name'];
            $this->list[$index]['count'] = $content['count'];
            $index++;
        }

        //Sicherungen
        $sql= "
            SELECT fu.name, count(fu.name) as count
            FROM projects pj, fis fi, fuses fu
            WHERE fi.projects_id = pj.id 
                AND fu.fis_id = fi.id
                AND pj.id = {$projectid}
            GROUP BY fu.name
            ;" ;
        
        $data = $this->getListFromDatabase($sql);
        //Format basteln 
        foreach($data as $content){
            $this->list[$index]['name'] = $content['name'];
            $this->list[$index]['count'] = $content['count'];
            $index++;
        }
                 
        return $this->list;
    }
    
    private function getListFromDatabase($sql){
        $result = array();
        try{
            foreach ($this->database->query($sql) as $row) {
                $result[] = $row; //die Zeile in den Array schreiben
            }
        } catch (PDOException $ex){
            error_log("PDO ERROR: querying database: " . $ex->getMessage()."\n".$sql);
        }       
        return $result;
    }
   
}

