<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$host = "localhost";
$user = "tomermy_romi";
$pass = "i*WFlYMS*I=j";
$db = "tomermy_final_project";

// Log upload configuration
error_log("Upload max filesize: " . ini_get('upload_max_filesize'));
error_log("Post max size: " . ini_get('post_max_size'));

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connection successful<br>";

// Create uploads directory if it doesn't exist
$targetDir = __DIR__ . "/uploads/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}
chmod($targetDir, 0777); // Temporary for testing - adjust for production

// Validate file upload
if (!isset($_FILES["recipeImage"]) || $_FILES["recipeImage"]["error"] !== UPLOAD_ERR_OK) {
    error_log("File upload error: " . $_FILES["recipeImage"]["error"]);
    die("Error with file upload: " . $_FILES["recipeImage"]["error"]);
}

// Retrieving form data
$recipeName = $_POST['recipeName'];
$prepTime = $_POST['prepTime'];
$recipeType = $_POST['recipeType'];
$ingredients = $_POST['IngredientsText'];
$description = $_POST['recipeText'];
$videoUrl = $_POST['videoUrl'];

// Handle image upload
$imageName = basename($_FILES["recipeImage"]["name"]);
$targetFilePath = $targetDir . time() . "_" . $imageName;
$imageFileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

// Validate image type
$allowedTypes = ["jpg", "jpeg", "png", "gif"];
if (!in_array($imageFileType, $allowedTypes)) {
    die("Error: Only JPG, JPEG, PNG, and GIF files are allowed.");
}

// Attempt to move the uploaded file
if (!move_uploaded_file($_FILES["recipeImage"]["tmp_name"], $targetFilePath)) {
    error_log("Upload error details: " . print_r($_FILES["recipeImage"], true));
    error_log("Target path: " . $targetFilePath);
    error_log("Temp name: " . $_FILES["recipeImage"]["tmp_name"]);
    die("Error uploading image. Check error log for details.");
}


// Insert data into the database
$sql = "INSERT INTO recepies (recipeName, prepTime, recipeType, ingredients, description, imagePath, videoUrl) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die("Error preparing statement: " . $conn->error);
}

$stmt->bind_param("sisssss", $recipeName, $prepTime, $recipeType, $ingredients, $description, $targetFilePath, $videoUrl);
if ($stmt->execute()) {
    echo "Recipe added successfully!";
} else {
    echo "Error executing statement: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>