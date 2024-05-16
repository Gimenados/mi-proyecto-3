import multer from "multer"
// Multer es la encargada de hacer la grabacion del archivo, le decimos donde y como se va a llamar

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, "./temp/imgs") //Donde queremos que guarde nuestras imagenes
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.png`); //Con que nombre guardarlo
    },    

})

const upload = multer({ storage }) 

export default upload;
