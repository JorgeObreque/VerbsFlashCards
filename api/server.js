const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.log('❌ Error en MongoDB:', err));

// Definir esquema de Flashcard
const FlashcardSchema = new mongoose.Schema({
  base: String,
  past: String,
  participle: String,
  lastReviewed: { type: Date, default: Date.now }
});

const Flashcard = mongoose.model('Flashcard', FlashcardSchema);

// Rutas
app.get('/flashcards', async (req, res) => {
  const flashcards = await Flashcard.find();
  res.json(flashcards);
});

app.post('/flashcards', async (req, res) => {
  const newFlashcard = new Flashcard(req.body);
  await newFlashcard.save();
  res.json(newFlashcard);
});

app.put('/flashcards/:id', async (req, res) => {
  const updated = await Flashcard.findByIdAndUpdate(req.params.id, { lastReviewed: Date.now() }, { new: true });
  res.json(updated);
});

app.delete('/flashcards/:id', async (req, res) => {
  await Flashcard.findByIdAndDelete(req.params.id);
  res.json({ message: 'Flashcard eliminada' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});