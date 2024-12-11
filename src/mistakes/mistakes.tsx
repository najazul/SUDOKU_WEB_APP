import "./mistakes.css";

interface MistakesProps {
  mistakes: number;
}

const Mistakes: React.FC<MistakesProps> = ({ mistakes }) => {

  return (
    <div className="mistakes-container">
      <p className="word">Mistakes:</p>
      <p className="mistakes-text">
        {mistakes} / {3}
      </p>
    </div>
  );
};

export default Mistakes;
