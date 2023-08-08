import styles from './FormSwitchLink.module.css'

export default function Button({ isSignUp, spanText, linkText }) {

  return (
    <span className={styles.linkForm}>{spanText} <a href="">{linkText}</a></span>
  )
}