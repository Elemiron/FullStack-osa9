// T.9.11: latinankielistä nimeä ei löydy kaikilta diagnooseilta
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
