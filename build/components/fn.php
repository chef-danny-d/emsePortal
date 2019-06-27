<?php

function loginCheck(){
    if($_SESSION['logged_in'] == true AND isset($_SESSION['username']) AND !empty($_SESSION['username'])){
        echo '<script>console.log("Session load successful.");</script>';
    }
    else{
        echo '<script>console.log("Session failure. Check function loginCheck()");</script>';
    }
}

function search($conn){
    if(isset($_POST['search'])){
        $response = "<ul><li>No data found</li></ul>";

        $q = $conn->real_escape_string($_POST['q']);

        $sql = $conn->query("SELECT * FROM module WHERE name LIKE '%$q%'");

        if($sql->num_rows > 0){
            $response = "<ul>";
            while($data  = $sql->fetch_array()){
                $response .= "<li>". $data['name'];
                // if($data['author'] != NULL){
                //     $response .=" by " . $data['author'] . "</li>";
                // }
            }
            $response .= "</ul>";
        }

        exit($response);
    }
}

function completion($x, $conn){
    $module = $_GET['module' . $x];

    if($module == true){
        $sql = $conn -> query('UPDATE module SET done = 1 WHERE uid = ' . $x);
        echo "<script> console.log('module submission successful')</script>";
        if(mysqli_query($conn, $sql)){
            echo "<script> console.log('Record updated successfully')</script>";
        }
        else {
            echo "<script> console.log('Error updating record: " . $conn->error . "');</script>";
        }
    }
    else{
        echo "<script> console.log('module submission not successful')</script>";
    }
    return $module;
}

function timeConversion($time){
    if($time >= 60){
        $time = $time / 60;
        echo "Approximately " .  round($time, 1, PHP_ROUND_HALF_UP) . " hours";
    }
    else {
        echo "Approximately " . $time . " minutes";
    }
}