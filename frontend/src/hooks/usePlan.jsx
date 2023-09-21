async function fetchingData(params, url = import.meta.env.VITE_CREATE_ORDER) {
  const res = await fetch(url, params);
  const data = await res.json();
  window.location.href = data;
}

async function fetchingDataComplete(
  params,
  url = import.meta.env.VITE_COMPLETE_ORDER
) {
  const res = await fetch(url, params);
  const data = await res.json();
  return data;
}

const usePlanPremium = async () => {
  let planPremium = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: 2,
        amount: {
          currency_code: "USD",
          value: "10.00",
        },
      },
    ],
    application_context: {
      brand_name: "TempBlock",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: import.meta.env.VITE_SIGN_UP,
      cancel_url: import.meta.env.VITE_ORIGIN_URL,
    },
  };

  planPremium = JSON.stringify(planPremium);
  const params = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: planPremium,
  };
  const data = await fetchingData(params);
  return data;
};

const usePlanTop = async () => {
  let planTop = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: 1,
        amount: {
          currency_code: "USD",
          value: "30.00",
        },
      },
    ],
    application_context: {
      brand_name: "TempBlock",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: import.meta.env.VITE_SIGN_UP,
      cancel_url: import.meta.env.VITE_ORIGIN_URL,
    },
  };
  planTop = JSON.stringify(planTop);

  const params = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: planTop,
  };
  const data = await fetchingData(params);
  return data;
};

export { usePlanPremium, usePlanTop, fetchingDataComplete };
