<?php
error_reporting(E_ALL);

include "controller/AppController.php";
include "controller/ControllerInterface.php";
include "controller/ListController.php";
include "controller/CUDController.php";
include "controller/ShoppingListController.php";

include "services/Database.php";
include "models/ListModel.php";
include "models/DeleteModel.php";
include "models/CreateModel.php";
include "views/JsonView.php";

define ("DBHost", "localhost");
define ("DBName", "lpauebung3");
define ("DBUser", "root");
define ("DBPass", "");
