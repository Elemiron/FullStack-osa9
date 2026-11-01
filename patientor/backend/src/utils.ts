import { z } from 'zod';
import { Gender } from './types.ts';
import type { NewPatient } from './types.ts';

// T.9.15: pelkkä tyhjä merkkijono tai välilyönnit eivät kelpaa tiedoksi
const requiredString = z.string().refine(value => value.trim() !== '', {
  message: 'Must not be empty',
});

// T.9.15: Zod tarkistaa koko pyynnön ja jättää ylimääräiset kentät pois
const newPatientSchema = z.object({
  name: requiredString,
  dateOfBirth: z.iso.date(),
  ssn: requiredString,
  gender: z.enum(Gender),
  occupation: requiredString,
});

const parseNewPatient = (value: unknown): NewPatient => newPatientSchema.parse(value);

export default parseNewPatient;
