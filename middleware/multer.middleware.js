import multer from "multer";
import {v4 as uuidv4} from 'uuid';
import path from 'path';

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function(req,file,cb){
       cb(null,"./public/images");
  },
  filename:function(req,fil,cb){
    const newFileName = uuidv4() + path.extname(fil.originalname)
      cb(null,newFileName);
  },
});



const upload = multer({
  
  storage: storage,
  limits: { fileSize: 1000000 },   
})


export default upload;