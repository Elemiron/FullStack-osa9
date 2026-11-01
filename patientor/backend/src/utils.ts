import { Gender } from './types.ts';
import type { NewPatient } from './types.ts';

// T.9.14: tarkistetaan tyypit ennen kuin luotetaan pyynnön tietoihin
const isString = (value: unknown): value is string => typeof value === 'string';

const parseString = (value: unknown, field: string): string => {
  if (!isString(value) || value.trim() === '') {
    throw new Error(`Incorrect or missing ${field}`);
  }
  return value;
};

const parseDateOfBirth = (value: unknown): string => {
  const date = parseString(value, 'dateOfBirth');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) ||
      new Date(date).toISOString().slice(0, 10) !== date) {
    throw new Error('Incorrect dateOfBirth');
  }
  return date;
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender).some(gender => gender === value);
};

const parseGender = (value: unknown): Gender => {
  if (!isString(value) || !isGender(value)) {
    throw new Error('Incorrect or missing gender');
  }
  return value;
};

// T.9.14: poimitaan vain potilaan kentät ja tarkistetaan jokainen erikseen
const parseNewPatient = (value: unknown): NewPatient => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in value && 'dateOfBirth' in value && 'ssn' in value &&
      'gender' in value && 'occupation' in value) {
    return {
      name: parseString(value.name, 'name'),
      dateOfBirth: parseDateOfBirth(value.dateOfBirth),
      ssn: parseString(value.ssn, 'ssn'),
      gender: parseGender(value.gender),
      occupation: parseString(value.occupation, 'occupation'),
    };
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatient;
