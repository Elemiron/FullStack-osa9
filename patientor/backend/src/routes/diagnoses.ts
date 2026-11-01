import express, { type Response } from 'express';
import diagnosisService from '../services/diagnosisService.ts';
import type { Diagnosis } from '../types.ts';

const router = express.Router();

// T.9.11: palautetaan kaikki diagnoosit frontendille
router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.json(diagnosisService.getDiagnoses());
});

export default router;
