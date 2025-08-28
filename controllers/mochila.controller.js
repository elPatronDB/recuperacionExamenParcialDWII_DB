import Joi from 'joi';
import { connectDB } from '../configs/mongo.config.js';

const mochilasStructure = Joi.object({
    nombreAlumno: Joi.string().required(),
    precio: Joi.number().integer().min(100).max(1000).required(),
    capacidadLb: Joi.number().integer().min(10).max(20).required(),
    alturaCm: Joi.number().integer().min(25).max(50),
    material: Joi.string().required()
});

// GET
export const getMochilas = async (req, res) => {
  try {
    const mochilasCollection = await connectDB();
    const mochilas = await mochilasCollection.find().toArray();
    res.status(200).json(mochilas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mochilas' });
  }
};


// POST
export const postMochilas = async (req, res) => {
  const { error, value } = mochilasStructure.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const mochilasCollection = await connectDB();
    const existing = await mochilasCollection.findOne({ nombreAlumno: value.nombreAlumno });
    if (existing) {
      return res.status(409).json({ error: 'La mochila ya existe' });
    }
    const result = await mochilasCollection.insertOne(value);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la mochila' });
  }
};






