const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');

const dotenv = require("dotenv");

dotenv.config();

const app  = express();

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/'); 
  },
  filename: (req, file, cb) => {
    // cb(null, `${Date.now()}-${file.originalname}`); 
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage });

mongoose.set('strictQuery', false);

mongoose.connect( process.env.MONGODB_URL,   
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
)   .then(()=>{
        console.log("DB Connection Successful");
    })
    .catch((err) => {
        console.log(err);
    });

    
const Service = require("./models/Service.js");
const Quotation = require("./models/Quotation.js");
const UploadFiles = require("./models/UploadFiles.js");
// const Post = require("./models/PostImage.js");

app.post('/upload/attachment', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    console.log(req.file);
  
    const newFile = new UploadFiles({
      file_name: req.file.originalname,
      path: req.file.path,
      destination: req.file.destination,
      mimetype: req.file.mimetype,
      file: req.file.filename, 
      thumbUrl: req.file.thumbUrl
       
    });
    console.log(newFile);
  
    newFile.save()
      .then(() => res.send("Successfully uploaded file"))
      .catch((err) => console.log(err));
  });

app.get('/upload/attachment', async (req,res) => {
    try{
        const upload = await UploadFiles.find();
        res.json(upload);
    } catch (err) {
        res.status(500).json({message: err.message });
    }
})

app.get("/quotation", async (req,res) => {
    try{
        const quotation = await Quotation.find();
        res.json(quotation);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
})


app.post("/new/quotation", async (req,res) => {
    const quotationData = req.body;
    try {
      const quotation = new Quotation(quotationData);
      await quotation.save();
      res.status(201).json(quotation);
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
});

app.get("/service", async (req,res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/new/service", async (req,res) => {
    const serviceData = req.body;
    try {
      const service = new Service(serviceData);
      await service.save();
      res.status(201).json(service);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
});


app.get("/service/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/editservice/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { service_name, service_para, service_tags, isPricing, pricing } = req.body;
      const updatedService = await Service.findByIdAndUpdate(id, {
        service_name,
        service_para,
        service_tags,
        isPricing,
        pricing
      }, { new: true });
  
      res.json(updatedService);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});
  

app.delete("/delete/service/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByIdAndDelete(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/upload/signature', async (req, res) => {
  const body = req.body;
  try {
    const newImage = await Post.create(body);
    console.log(newImage);
    newImage.save();
    res.status(201).json({msg: "New image uploaded!!"})
  }catch(error){
    res.status(409).json({message: error.message});
  }
});


// app.post('/upload/signature', async (req, res) => {
//   const body = req.body;
//   try {
//     const newImage = await Post.create(body);
//     console.log(newImage);
//     newImage.save();
//     res.status(201).json({msg: "New image uploaded!!"})
//   }catch(error){
//     res.status(409).json({message: error.message});
//   }
// });


app.listen(3001, () => console.log("Sever started!"));