<?php

//Connect to Mysql
include_once "config.php";

// CREATE USER 'defiwars'@'localhost' IDENTIFIED BY 'defiwars';
// GRANT ALL PRIVILEGES ON * . * TO 'defiwars'@'localhost';
// sql to create 'users' table
$sql = "CREATE TABLE `users` (
 `ID` INT(11) NOT NULL AUTO_INCREMENT,
 `address` VARCHAR(42) NOT NULL UNIQUE,
 `email` VARCHAR(200) NOT NULL,
 `publicName` TINYTEXT,
 `nonce` TINYTEXT NOT NULL,
 `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1";



if ($conn->query($sql) === TRUE) {
    echo "Table 'users' created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}


$conn->close();

?>
