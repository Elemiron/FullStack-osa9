export interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const getRating = (average: number, target: number): Pick<ExerciseResult, 'rating' | 'ratingDescription'> => {
  // Arvio erottaa tavoitteen saavuttamisen, lähes saavuttamisen ja selvästi alle jäämisen.
  if (average >= target) {
    return { rating: 3, ratingDescription: 'excellent' };
  }

  if (average >= target * 0.75) {
    return { rating: 2, ratingDescription: 'not too bad but could be better' };
  }

  return { rating: 1, ratingDescription: 'you need to exercise more' };
};

export const calculateExercises = (dailyExercises: number[], target: number): ExerciseResult => {
  if (!Number.isFinite(target) || target < 0 || dailyExercises.length === 0 ||
      dailyExercises.some((hours) => !Number.isFinite(hours) || hours < 0)) {
    throw new Error('target and daily exercise hours must be valid non-negative numbers');
  }

  // Jakson pituus määräytyy annettujen päivien lukumäärästä.
  const periodLength = dailyExercises.length;

  // Keskiarvossa huomioidaan myös lepopäivät, jotta sitä voi verrata päivätavoitteeseen.
  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;

  // Treenipäiväksi lasketaan vain päivä, jolla on liikuntaa yli nolla tuntia.
  const trainingDays = dailyExercises.filter((hours) => hours > 0).length;
  const { rating, ratingDescription } = getRating(average, target);

  // Tavoite täyttyy, kun jakson keskiarvo saavuttaa päivittäisen tavoitteen.
  const success = average >= target;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const runFromCommandLine = (): void => {
  const argumentsFromCommandLine = process.argv.slice(2);
  if (argumentsFromCommandLine.length < 2) {
    throw new Error('usage: npm run calculateExercises -- <target> <daily exercise hours...>');
  }

  const [targetArgument, ...dailyExerciseArguments] = argumentsFromCommandLine;
  const target = Number(targetArgument);
  const dailyExercises = dailyExerciseArguments.map(Number);
  console.log(calculateExercises(dailyExercises, target));
};

if (process.argv[1]?.endsWith('exerciseCalculator.ts')) {
  try {
    runFromCommandLine();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
