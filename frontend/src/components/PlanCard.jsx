const PlanCard = ({
  img,
  featured,
  title,
  price,
  descrip,
  support,
  buttonText,
}) => {
  const planClassName = featured ? "featured-plan-card" : "plan-card";
  const includesSupport = support
    ? "(Incluye soporte)"
    : "(No incluye soporte)";

  return (
    <div className={planClassName}>
      <article>
        <h2>{title}</h2>
        <img src={img} />
        <p>{descrip}</p>
        <h4>{includesSupport}</h4>
        <h3>{price}</h3>
        <button className="button-price">{buttonText}</button>
      </article>
    </div>
  );
};

export default PlanCard;
