interface TotalProps {
  exerciseCount: number;
}

const Total = ({ exerciseCount }: TotalProps) => <p>Number of exercises {exerciseCount}</p>;
export default Total;
