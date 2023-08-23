const PlanCard = ({
  img,
  featured,
  planPaid,
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


  async function fetchingData(params, url='http://localhost:5000/create_order') {
    const res = await fetch(url, params);
    const data = await res.json();
    window.location.href = data
  }

  const planTop = async () => {
    let planTop = {
      "intent": "CAPTURE",
      "purchase_units": [
        {
          "reference_id": 1,
          "amount": {
            "currency_code": "USD",
            "value": "30.00"
          }
        }
      ],
      "application_context": {
        "brand_name": "TempBlock",
        "landing_page": "NO_PREFERENCE",
        "user_action": "PAY_NOW",
        "return_url": "http://localhost:5173/",
        "cancel_url": "http://localhost:5173/"
      }
    }
    planTop = JSON.stringify(planTop);

    const params = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: planTop
    }
    const data = await fetchingData(params)
    return data;
  }

  const planPremium = async () => {
    let planPremium = {
      "intent": "CAPTURE",
      "purchase_units": [
        {
          "reference_id": 2,
          "amount": {
            "currency_code": "USD",
            "value": "10.00"
          }
        }
      ],
      "application_context": {
        "brand_name": "TempBlock",
        "landing_page": "NO_PREFERENCE",
        "user_action": "PAY_NOW",
        "return_url": "http://localhost:5173/",
        "cancel_url": "http://localhost:5173/"
      }
    }

    planPremium = JSON.stringify(planPremium);
    const params = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: planPremium
    }
    const data = fetchingData(params);
    return data;
  }
  
  return (
    <div className={planClassName}>
      <article>
        <h2>{title}</h2>
        <img src={img} />
        <p>{descrip}</p>
        <h4>{includesSupport}</h4>
        <h3>{price}</h3>
        {
          planPaid == 'plan premium'
            ? <button className="button-price" onClick={planPremium}>{buttonText}</button>
            : planPaid == 'plan top'
              ? <button className="button-price" onClick={planTop}>{buttonText}</button>
              : <button className="button-price">{buttonText}</button>
        }
      </article>
    </div>
  );
};

export default PlanCard;
