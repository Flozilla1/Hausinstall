<?php
error_reporting(E_ALL);

include "controller/AppController.php";
include "controller/ControllerInterface.php";
include "controller/ListController.php";
include "controller/CUDController.php";
include "controller/ReportController.php";

include "services/Database.php";
include "models/ListModel.php";
include "models/DeleteModel.php";
include "models/CreateModel.php";
include "models/UpdateModel.php";
include "models/ShoppingListModel.php";
include "views/JsonView.php";

define ("DBHost", "localhost");
//define ("DBName", "uebung3_db");
define ("DBName", "lpauebung3");
define ("DBUser", "root");
define ("DBPass", "");
