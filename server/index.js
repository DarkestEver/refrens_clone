const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const app  = express();

app.use(express.json());
app.use(cors());


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

app.get("/service", async (req,res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
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


app.listen(3001, () => console.log("Sever started!"));