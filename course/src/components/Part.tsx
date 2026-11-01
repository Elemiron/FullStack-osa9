import type { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: PartProps) => {
  const heading = <strong>{part.name} {part.exerciseCount}</strong>;

  switch (part.kind) {
    case 'basic':
      return <p>{heading}<br /><em>{part.description}</em></p>;
    case 'group':
      return <p>{heading}<br />Group projects: {part.groupProjectCount}</p>;
    case 'background':
      return (
        <p>{heading}<br /><em>{part.description}</em><br />
          Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );
    case 'special':
      return (
        <p>{heading}<br /><em>{part.description}</em><br />
          Required skills: {part.requirements.join(', ')}
        </p>
      );
    default:
      return assertNever(part);
  }
};
export default Part;
