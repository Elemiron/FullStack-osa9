import express, { type Request, type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { Patient, PublicPatient } from '../types.ts';
import parseNewPatient from '../utils.ts';

const router = express.Router();

// T.9.12: palautetaan potilaslista ilman henkilötunnuksia
router.get('/', (_req, res: Response<PublicPatient[]>) => {
  res.json(patientService.getPublicPatients());
});

// T.9.13: otetaan lomakkeen tiedot vastaan ja palautetaan lisätty potilas
// T.9.14: validoidaan tuntematon body ennen tallennusta ja kerrotaan virhe frontendille
router.post('/', (req: Request<unknown, unknown, unknown>, res: Response<Patient | string>) => {
  try {
    const patient = parseNewPatient(req.body);
    res.json(patientService.addPatient(patient));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).send(`Something went wrong. Error: ${message}`);
  }
});

export default router;
