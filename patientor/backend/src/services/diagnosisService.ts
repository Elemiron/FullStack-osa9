import diagnoses from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

// T.9.11: haetaan diagnoosit muistissa olevasta datasta
const getDiagnoses = (): Diagnosis[] => diagnoses;

export default { getDiagnoses };
