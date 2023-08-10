import styles from "./FormSwitchLink.module.css";
import { Link } from "react-router-dom";

export default function Button({ isSignUp, spanText, linkText, to }) {
  return (
    <span className={styles.linkForm}>
      {spanText} <Link to={to}>{linkText}</Link>
    </span>
  );
}
