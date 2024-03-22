<?php
define('db', 'db_parkingionic');
define('usuario', 'root');
define('clave', '');
define('host', 'localhost');
$mysqli = new mysqli(host, usuario, clave, db);

if ($mysqli->connect_errno) {

    echo "Falló la conexión a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    exit();
}
?>

