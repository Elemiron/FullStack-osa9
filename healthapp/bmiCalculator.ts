export const calculateBmi = (height: number, weight: number): string => {
  if (!Number.isFinite(height) || !Number.isFinite(weight) || height <= 0 || weight <= 0) {
    throw new Error('height and weight must be positive numbers');
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

const runFromCommandLine = (): void => {
  const [heightArgument, weightArgument, ...extraArguments] = process.argv.slice(2);
  if (!heightArgument || !weightArgument || extraArguments.length > 0) {
    throw new Error('usage: npm run calculateBmi -- <height in cm> <weight in kg>');
  }

  const height = Number(heightArgument);
  const weight = Number(weightArgument);
  console.log(calculateBmi(height, weight));
};

// Komentorivikäyttö tehtävää varten
if (process.argv[1] === import.meta.filename) {
  try {
    runFromCommandLine();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
