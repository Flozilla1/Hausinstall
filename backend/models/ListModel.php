<?php
/**
 * @author helmuth  refactored by Wolfgang
 */
class ListModel {
    
    private $database;
    private $childListType;
    private $listType;
    private $list;
    
    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
    public function setListType($listType){
        $this->listType = strtoupper( $listType );
    }
    
    public function getListType(){
        if(!$this->listType){
            return "PROJECTS";
        }
        return $this->listType;
    }
   
    public function getItemSpecification($content) {  // Holt die spezialfelder je Tabelle heraus und packt sie in ein "specifications" objekt
        switch($this->listType){
            case 'FLOORS':
                 return $this->getFloorsSpecs($content);
            case 'ROOMS':
                return $this->getRoomsSpecs($content);
            case 'DEVICES':
                return $this->getDevicesSpecs($content);
            case 'SENSORS':
                return $this->getSensorsSpecs($content);
            case 'FIS': 
                return $this->getFisSpecs($content);
            case 'FUSES': 
                return $this->getFusesSpecs($content);
            case 'PROJECTS': default:
                return $this->getProjectsSpecs($content);
       }      
    }
    
 

//  ORIGINAL  .... für Meine Version überflüssig
/*    
    public function getListNameByType(){
        switch($this->listType){
             case 'FLOORS':
                 return "Stockwerke";
            case 'ROOMS':
                return "Zimmer";
            case 'DEVICES':
                return "Geräte";
            case 'SENSORS':
                return "Sensoren";
            case 'PROJECTS': default:
                return "Projekte";
        }
    }
 * 
 */
    
    public function getCurrentList(){
        return $this->list;
    }
 
    public function getChildListType(){
        if($this->childListType){
            return $this->childListType;
        } else {
            return "";
        }
    }


    /*  ORIGINAL
       public function getChildListType(){
        if($this->childListType){
            return $this->childListType;
        } else {
            return "";
        }
    }

     */


    
    public function listProjects(){
        $sql = " SELECT id, name, baumeister, kapital FROM projects ";
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = "FLOORS";
    }

    public function getProjectsSpecs($content){  // bekommt EINE zeile aus dem gefundenen Tabellinhalt und holt alle specifications heraus
        $specs['baumeister'] = $content['baumeister'];
        $specs['kapital'] = $content['kapital'];
        
        return $specs;
    }


    
    public function listFloors($projectId){
        $sql = " SELECT id, name, floor_count_from_basement FROM floors WHERE projects_id = {$projectId} ";
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = "ROOMS";
    }

    public function getFloorsSpecs($content){  // bekommt EINE zeile aus dem gefundenen Tabellinhalt und holt alle specifications heraus
        $specs['countFromBasement'] = $content['floor_count_from_basement'];
    //    $specs['countFromBasement'] = 1;
        return $specs;
    }
    
    
    public function listRooms($floorId){
        $sql = " SELECT id, name, flaeche FROM rooms WHERE floors_id = {$floorId} ";
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = "DEVICES";
    }
 
    public function getRoomsSpecs($content){  // bekommt EINE zeile aus dem gefundenen Tabellinhalt und holt alle specifications heraus
        $specs['flaeche'] = $content['flaeche'];    
        return  $specs;
    }

    
   
    public function listDevices($roomId){
        $sql = " SELECT d.id, d.name, d.fuseid, f.name AS fname FROM devices d "
                . " JOIN fuses f on f.id = d.fuseid "
                . "WHERE rooms_id = {$roomId} ";
        
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = "SENSORS";
    }

    public function getDevicesSpecs($content){  // bekommt EINE zeile aus dem gefundenen Tabellinhalt und holt alle specifications heraus
        $specs['fuseid'] = $content['fuseid'];           
        $specs['fname'] = $content['fname'];           
         return  $specs;
    }
    
    
    public function listSesnors($deviceId){
        $sql = " SELECT id, name, unit, value FROM sensors WHERE devices_id = {$deviceId} ";
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = false;
    }

    public function getSensorsSpecs($content){  // bekommt EINE zeile aus dem gefundenen Tabellinhalt und holt alle specifications heraus
        $specs['unit'] = $content['unit'];           
        $specs['value'] = $content['value'];           
        return  $specs;
    }
  
    

    public function listFis($projectId){  
        $sql = " SELECT id, name, current FROM fis WHERE projects_id = {$projectId} ";
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = false;
    }

    public function getFisSpecs($content){  // bekommt EINE zeile aus dem gefundenen Tabellinhalt und holt alle specifications heraus
        $specs['current'] = $content['current'];           
        return  $specs;
    }
    
    

    public function listFuses($fisId){  
        $sql = " SELECT id, name, current FROM fuses WHERE fis_id = {$fisId} ";
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = false;
    }

    public function getFusesSpecs($content){  // bekommt EINE zeile aus dem gefundenen Tabellinhalt und holt alle specifications heraus
        $specs['current'] = $content['current'];           
        return  $specs;
    }
    
    
    
// ------------------------------------------------    
/*    
    public function getProjectName($projectId){
        $sql = "SELECT name FROM projects WHERE id = ".$projectId." LIMIT 1";
        $result = $this->getListFromDatabase($sql);
        
        return $result[0]['name'];
    }
    
    public function getDivecesOfProject($projectId){
        $sql = "SELECT d.id, d.name AS deviceName FROM devices d "
            . " JOIN rooms r ON r.id = d.rooms_id "
            . " JOIN floors f ON f.id = r.floors_id "
            . " JOIN projects p ON p.id = f.projects_id "
            . "WHERE p.id = ".$projectId;
        
        $devices = $this->getListFromDatabase($sql);
        
        $devicesList = $this->getUniqueDevicesWithSensors($devices);
        return $devicesList;
    }
    
    private function getUniqueDevicesWithSensors($devicesList){
        $uniqueDevices = array();
        foreach($devicesList as $device){
            
            $currentSql = "SELECT name FROM sensors WHERE devices_id = ".$device['id'];
            $sensors = $this->getListFromDatabase($currentSql);
            //erzeugen eines eindeutigen index - der string des json objektes und der name des geräts müssen gleich sein
            $uniqueIdentifier = md5( $device['deviceName'].json_encode($sensors) );
            
            if(!isset($uniqueDevices[$uniqueIdentifier])){
                $uniqueDevices[$uniqueIdentifier] = array(
                    'deviceName' => $device['deviceName'],
                    'amount' => 1,
                    'sensors' => $sensors
                );
                
            } else {
                $uniqueDevices[$uniqueIdentifier]['amount']++;
            }
            
        }
        
        return $uniqueDevices;
    }
*/    
    private function getListFromDatabase($sql){
        $result = array();
        try{
            //iterieren für alle moeglichen zeilen
            foreach ($this->database->query($sql) as $row) {
                $result[] = $row; //die Zeile in den Array schreiben
            }
        } catch (PDOException $ex){
            //error handling, wenn der query schief ging
            error_log("PDO ERROR: querying database: " . $ex->getMessage()."\n".$sql);
        }
        
        return $result;
    }
    
    
}
