import styles from "./Forms.module.css";
import paypalButton from "../assets/paypal_button.png";
import coinbaseButton from "../assets/coinbase.jpg";

import { usePlanPremium, usePlanTop, useCoinbase } from "../hooks/usePlan";

const PaymentMethod = () => {
  const userObject = localStorage.getItem("user");
  const userPlan = JSON.parse(userObject).plan;

  const handlePaypal = () => {
    if (userPlan == 2) usePlanPremium();
    if (userPlan == 3) usePlanTop();
  };

  const handleCoinbase = () => {
    useCoinbase(userPlan);
  };

  return (
    <div className={styles.contentForm}>
      <p className={styles.title}>método de pago</p>
      <button id={styles.paypalButtonStyle} onClick={handlePaypal}>
        <img
          src={paypalButton}
          alt="paypal-logo"
          style={{ width: "9rem", height: "6rem" }}
        />
      </button>
      <button id={styles.coinbaseButtonStyle} onClick={handleCoinbase}>
        <img
          src={coinbaseButton}
          alt="binance-logo"
          style={{ width: "9rem", height: "6rem" }}
        />
      </button>
    </div>
  );
};

export default PaymentMethod;
