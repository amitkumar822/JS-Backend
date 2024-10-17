// Importing the 'multer' library for handling file uploads
import multer from "multer";

// Defining the storage configuration for file uploads
const storage = multer.diskStorage({
  // Setting the destination where the uploaded files will be stored
  destination: function (req, file, cb) {
    // 'cb' is a callback function, first argument is for error (null if no error),
    // and second argument is the path where files will be stored
    cb(null, "./public/temp");
  },
  // Setting the filename for the uploaded file
  filename: function (req, file, cb) {
    // Using the original name of the file for the filename
    cb(null, file.originalname);
    
    // Uncommenting the lines below would generate a unique filename using the current date and random number
    // This can be useful to avoid overwriting files with the same name
    
    // const uniqueSuffix = Date.now() + "-" + Math.random(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Exporting the 'upload' middleware, which is used to handle file uploads
export const upload = multer({ storage });
