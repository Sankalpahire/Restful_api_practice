const express = require("express");
const app = express();
const Person = require("./person");
require("./db");
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/person", async (req, res) => {
  try {
    console.log(req.body);
    const person = new Person(req.body);
    await person.save(); 
    res.status(201).json({ message: "Person created successfully", person });
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/fetch", async (req, res) => {
 try{
   const person = await Person.find()
   res.status(200).json({ message: "Person fetched successfully", person });
 }catch(error){
   console.error("Error fetching person:", error);
   res.status(500).json({ error: "Internal server error" });
 }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try{
    const Updateperson = await Person.findByIdAndUpdate(id, newData, { new: true })
    if (!Updateperson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json({ message: "Person updated successfully", person: Updateperson });
  }catch(error){
    console.error("Error updating person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
 });

 app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removedPerson = await Person.findByIdAndDelete(id);
    if (!removedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json({ message: "Person removed successfully", person: removedPerson });
  } catch(error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// app.post("/person", (req, res) => {
//     console.log(req.body);
//     const person = new Person(req.body);
//     person.save()
//     console.log("hello");
//   });

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
