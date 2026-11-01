import express, { type Request, type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { NewPatient, Patient, PublicPatient } from '../types.ts';

const router = express.Router();

// T.9.12: palautetaan potilaslista ilman henkilötunnuksia
router.get('/', (_req, res: Response<PublicPatient[]>) => {
  res.json(patientService.getPublicPatients());
});

// T.9.13: otetaan lomakkeen tiedot vastaan ja palautetaan lisätty potilas
router.post('/', (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  res.json(patientService.addPatient(req.body));
});

export default router;
