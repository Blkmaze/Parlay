const fs = require('fs');
const path = require('path');

// Define the directories and files to delete
const directoriesToDelete = [
    'node_modules',
    'build',
    'dist',
    'temp',
    'logs',
    'public',
    'uploads',
    'cache'
];

const filesToDelete = [
    'package-lock.json',
    'yarn.lock',
    '.env',
    '.git',
    '.gitignore',
    '.npmignore'
];

// Function to delete a directory and its contents recursively
function deleteDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach(file => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteDirectory(curPath); // Recursively delete directories
            } else {
                fs.unlinkSync(curPath); // Delete files
            }
        });
        fs.rmdirSync(dirPath); // Remove the empty directory
        console.log(`Directory ${dirPath} deleted successfully.`);
    }
}

// Function to delete a specific file
function deleteFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`File ${filePath} deleted successfully.`);
    }
}

// Function to clear old deployment files
function clearOldDeployments() {
    // Delete directories
    directoriesToDelete.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        deleteDirectory(dirPath);
    });

    // Delete specific files
    filesToDelete.forEach(file => {
        const filePath = path.join(__dirname, file);
        deleteFile(filePath);
    });

    console.log('Old deployments cleared.');
}

// Execute the script
clearOldDeployments();
