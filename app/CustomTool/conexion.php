<?php

$con = mysqli_connect('localhost', 'root', '', 'posadada_dbhumacos', 3306);
if ($con) {
    echo 'conecto ';
    $query = 'select * from  users';
    $data = mysqli_query($con, $query);
    foreach ($data as $d) {
        echo $d['name'].' ';
        echo $d['email'].' ';
        echo $d['password'].' ';

    }
    $con->close();

}
