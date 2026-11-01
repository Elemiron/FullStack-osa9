import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { PublicPatient } from '../types.ts';

const router = express.Router();

// T.9.12: palautetaan potilaslista ilman henkilötunnuksia
router.get('/', (_req, res: Response<PublicPatient[]>) => {
  res.json(patientService.getPublicPatients());
});

export default router;
