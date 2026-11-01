import express, { type Request, type Response } from 'express';
import { calculateBmi } from './bmiCalculator.ts';
// T.9.7: käytetään olemassa olevaa liikuntalaskuria HTTP-pyynnöissä.
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
// T.9.7: endpoint on tehtävän mukaisesti portissa 3000.
const port = 3000;

// T.9.7: luetaan POST-pyyntöjen JSON-body.
app.use(express.json());

app.get('/hello', (_req: Request, res: Response): void => {
  res.send('Hello Full Stack!');
});

// Tää endpoint tehty tehtävää 9.5 varten
app.get('/bmi', (req: Request, res: Response): void => {
  const { height, weight } = req.query;

  if (typeof height !== 'string' || typeof weight !== 'string') {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const heightAsNumber = Number(height);
  const weightAsNumber = Number(weight);

  if (!Number.isFinite(heightAsNumber) || !Number.isFinite(weightAsNumber) ||
      heightAsNumber <= 0 || weightAsNumber <= 0) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  res.json({
    weight: weightAsNumber,
    height: heightAsNumber,
    bmi: calculateBmi(heightAsNumber, weightAsNumber)
  });
});

// T.9.7: tarkistetaan parametrit ja palautetaan liikuntalaskurin tulos.
app.post('/exercises', (req: Request, res: Response): void => {
  const body: unknown = req.body;

  if (body === undefined || body === null) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (typeof body !== 'object' || Array.isArray(body)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  if (!('daily_exercises' in body) || !('target' in body)) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  // T.9.7: hyväksytään numerot ja numeroiksi muunnettavat merkkijonot.
  const isNumeric = (value: unknown): value is number | string =>
    (typeof value === 'number' || (typeof value === 'string' && value.trim() !== '')) &&
    Number.isFinite(Number(value));

  if (!Array.isArray(body.daily_exercises) ||
      !body.daily_exercises.every(isNumeric) || !isNumeric(body.target)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  try {
    const dailyExercises = body.daily_exercises.map(Number);
    const target = Number(body.target);
    res.json(calculateExercises(dailyExercises, target));
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
