import patients from '../../data/patients.ts';
import type { PublicPatient } from '../types.ts';

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

export default { getPublicPatients };
