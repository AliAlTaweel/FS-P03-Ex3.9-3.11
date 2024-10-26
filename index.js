const express = require("express");
require("dotenv").config();
const port = process.env.VITE_PORT || 3003;
const app = express();
const cors = require("cors");
const morgan = require("morgan");
app.use(express.static("dist"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ali Lovelace",
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
  {
    name: "samir",
    number: "39-23-6423122",
    id: "4",
  },
];

app.use(cors());
app.use(morgan("tiny"));
//=========== get all persons ============
app.get("/api/persons", (req, res) => {
  res.json(persons);
  console.log("check");
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
//=========== delete person by ID ============
app.delete("/api/person/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.use(express.json());
//=========== add person ============
const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxId + 1;
};
app.use(express.json());
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  console.log(req.body);
  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }
  const personExists = persons.some((person) => person.name === name);
  if (personExists) {
    return res.status(400).json({ error: "Name must be unique" });
  }
  const newPerson = {
    id: generateId(),
    name,
    number,
  };
  persons = [...persons, newPerson];
  res.json(newPerson);
});

//=========== listen to port ============
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
