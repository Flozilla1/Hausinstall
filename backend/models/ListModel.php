<?php
/**
 * @author helmuth
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
    
    public function listProjects(){
        $sql = " SELECT id, name FROM projects ";
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = "FLOORS";
    }
    
    public function listFloors($projectId){
        $sql = " SELECT id, name, floor_count_from_basement FROM floors WHERE projects_id = {$projectId} ";
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = "ROOMS";
    }
    
    public function listRooms($floorId){
        $sql = " SELECT id, name FROM rooms WHERE floors_id = {$floorId} ";
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = "DEVICES";
    }
    
    public function listDevices($roomId){
//        $sql = " SELECT id, name, sicherungs_id FROM devices WHERE rooms_id = {$roomId} ";
        $sql = " SELECT d.id, d.name, s.sicherungs_name, fi.FI_name FROM devices d "
                . " JOIN sicherung s on s.id = d.sicherungs_id "
                . " JOIN fi on fi.id = s.fi_id "
                . "WHERE rooms_id = {$roomId} ";
        
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = "SENSORS";
    }
    
    public function listSesnors($deviceId){
        $sql = " SELECT id, name, unit, value FROM sensors WHERE devices_id = {$deviceId} ";
        $this->list = $this->getListFromDatabase($sql);
        $this->childListType = false;
    }
    
    
    
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
