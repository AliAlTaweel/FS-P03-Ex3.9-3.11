const express = require("express");
require("dotenv").config();
const port = process.env.VITE_PORT || 3003;
const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  },
];
//=========== get all persons ============
app.get("/api/persons", (req, res) => {
    res.json(persons);
});

//=========== get person by ID ============
app.get("/api/person/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find((person) => person.id === id);
    if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: "No Such idot!!!" });
}
});




//=========== listen to port ============
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
