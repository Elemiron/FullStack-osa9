import express from 'express';
// T.9.10: tarvitaan cors kun frontend pyörii eri portissa
import cors from 'cors';
// T.9.11: diagnoosien reitit omassa tiedostossa
import diagnosisRouter from './src/routes/diagnoses.ts';

// T.9.9: pistetään Patientorin backend pystyyn
const app = express();
// T.9.10: sallitaan frontendin pyynnöt selaimesta
app.use(cors());
app.use(express.json());

// T.9.9: frontend odottaa backendia portissa 3001
const PORT = 3001;

// T.9.9: tällä voi tsekata että backend vastaa
app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

// T.9.11: ohjataan diagnoosipyynnöt omalle routerille
app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
