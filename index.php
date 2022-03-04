<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>Hi</title>
    <link rel="icon" href="images/favicon.ico" type="image/x-icon"/>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="Description" content="Hello">

    <!-- Include Analyticstracking -->
    <?php 
        if (file_exists('include_php/analyticstracking.php')) {
            include_once('include_php/analyticstracking.php');
        } else if (file_exists('../include_php/analyticstracking.php')) {
            include_once('../include_php/analyticstracking.php');
        }
        else if (file_exists('../../include_php/analyticstracking.php')) {
            include_once('../../include_php/analyticstracking.php');
        }     
    ?>

    <!-- JQuery -->
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>

    <!-- Latest compiled and minified Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <!-- Bootstrap Javascript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    
    <link href="ai_grocerylist.css" type="text/css" rel="stylesheet">
    <link href="bootstrap-iso.css" type="text/css" rel="stylesheet">

    <!-- Oxygen Font -->
    <link href='https://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet' type='text/css'>
</head>
<body>
    <div class="mainContainer">
        <div class="projectContainer">
            <?php include('indexinclude.php'); ?>
        </div>
    </div>


<script type="text/javascript" src="ai_dropdown.js"></script>
<script type="text/javascript" src="ai_getcrockpotdata.js"></script>
<script type="text/javascript" src="ai_grocerylist.js"></script>
<script type="text/javascript" src="recordLog.js"></script>

</body>
</html>