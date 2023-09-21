import { useNavigate } from "react-router-dom";

const PlanCard = ({
  img,
  featured,
  planPaid,
  title,
  price,
  descrip,
  support,
  buttonText,
  isLogged,
}) => {
  const navigate = useNavigate();

  const planClassName = featured ? "featured-plan-card" : "plan-card";

  const includesSupport = support
    ? "(Incluye soporte)"
    : "(No incluye soporte)";

  const planTop = async () => {
    if (!isLogged) {
      navigate("/signup");
      return;
    }
  };

  const planPremium = async () => {
    if (!isLogged) {
      navigate("/signup");
      return;
    }
  };

  return (
    <div className={planClassName}>
      <article>
        <h2>{title}</h2>
        <img src={img} />
        <p>{descrip}</p>
        <h4>{includesSupport}</h4>
        <h3>{price}</h3>
        {planPaid == "plan premium" ? (
          <button className="button-price" onClick={planPremium}>
            {buttonText}
          </button>
        ) : planPaid == "plan top" ? (
          <button className="button-price" onClick={planTop}>
            {buttonText}
          </button>
        ) : (
          <button className="button-price" onClick={() => navigate("/signup")}>
            {buttonText}
          </button>
        )}
      </article>
    </div>
  );
};

export default PlanCard;
