import express, { type Request, type Response } from 'express';
import { calculateBmi } from './bmiCalculator.ts';

const app = express();
const port = 3003;

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
