import patients from '../../data/patients.ts';
import { v1 as uuid } from 'uuid';
import type { NewPatient, Patient, PublicPatient } from '../types.ts';

// T.9.12: poimitaan vain listaan kuuluvat kentät ettei ssn lähde mukaan
const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

// T.9.13: luodaan tunniste ja lisätään potilas muistiin
const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: patient.gender,
    occupation: patient.occupation,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPublicPatients, addPatient };
