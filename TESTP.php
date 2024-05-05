<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <input type="button" onclick="add()" value="create">
    <input type="button" onclick="update()" value="update">
    <input type="button" onclick="Delete()" value="delete">
    <input type="button" onclick="read()" value="read">
    <div id="container">
    <ul id="elementPage">

    </ul>
    <div id="pageContainer"></div>
    </div>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script src="./js/TEST_CRUD_AJAX_PHP.js"></script>
</html>