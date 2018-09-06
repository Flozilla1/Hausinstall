<?php
/**
 * @author Wolfgang
 */
class CircuitListModel {
    private $database;
    private $list;
    private $fi;
    private $fuse;
    
    public function __construct() {
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
    public function createReport($projectid) {
        
        //FIs
        $sql= "
            SELECT fi.name, fi.current ,fi.id
            FROM projects pj, fis fi
            WHERE fi.projects_id = pj.id 
                AND pj.id = {$projectid}
            ;" ;
        $fiData = $this->getListFromDatabase($sql);
        //Format basteln 
        $fiIndex = 0;
        foreach($fiData as $content){
            $this->list[$fiIndex]['name'] = $content['name'];
            $this->list[$fiIndex]['value'] = $content['current'];
//            $fiIndex++;
            $this->fi = $content['id'];
            //Alle fuses zum konkreten fi
            $sql= "
                SELECT fu.name, fu.current, fu.id
                FROM fuses fu
                WHERE  fu.fis_id = {$this->fi}
                ;" ;

            $fuData = $this->getListFromDatabase($sql);
            //Format basteln 
            $fuIndex = 0;
            foreach($fuData as $content1){
                $this->list[$fiIndex]['fuses'][$fuIndex]['name'] = $content1['name'];
                $this->list[$fiIndex]['fuses'][$fuIndex]['value'] = $content1['current'];
//                $fuIndex++;
                $this->fuse = $content1['id'];
                $this->list[$fiIndex]['fuses'][$fuIndex]['fuseid'] = $this->fuse;
                
                //Devices zur konkreten Sicherung
                $sql= "
                    SELECT name
                    FROM devices
                    WHERE  fuseid = {$this->fuse}
                    ;" ;
                $dvData = $this->getListFromDatabase($sql);
                
                $dvIndex = 0;
                foreach($dvData as $content2){
                    $this->list[$fiIndex]['fuses'][$fuIndex]['devices'][$dvIndex] = $content2['name'];
                    $dvIndex++;
                }
                
                //DUMMYDATA ..zum testen wenn nix echtes da ist
                //$this->list[$fiIndex]['fuses'][$fuIndex]['devices'][$dvIndex] = "Dummydevice 1";
                //$this->list[$fiIndex]['fuses'][$fuIndex]['devices'][$dvIndex+1] = "Dummydevice 2";


                $fuIndex++;                
            }
            $fiIndex++;
        }
        return $this->list;
        
    }

// !! COPY OF SHOPPINGLIST
    public function createReportREAL($projectid){  // Der gehört dann weiterentwickelt und enthält echtdaten
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

