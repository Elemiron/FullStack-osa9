interface ExerciseResult {
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
    return { rating: 3, ratingDescription: 'excellent' }
  }

  if (average >= target * 0.75) {
    return { rating: 2, ratingDescription: 'not too bad but could be better' }
  }

  return { rating: 1, ratingDescription: 'you need to exercise more' }
}

export const calculateExercises = (dailyExercises: number[], target: number): ExerciseResult => {
  // Jakson pituus määräytyy annettujen päivien lukumäärästä.
  const periodLength = dailyExercises.length

  // Keskiarvossa huomioidaan myös lepopäivät, jotta sitä voi verrata päivätavoitteeseen.
  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0)
  const average = totalHours / periodLength

  // Treenipäiväksi lasketaan vain päivä, jolla on liikuntaa yli nolla tuntia.
  const trainingDays = dailyExercises.filter((hours) => hours > 0).length
  const { rating, ratingDescription } = getRating(average, target)

  // Tavoite täyttyy, kun jakson keskiarvo saavuttaa päivittäisen tavoitteen.
  const success = average >= target

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
