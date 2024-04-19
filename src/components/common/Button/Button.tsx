import { ButtonHTMLAttributes } from "react";
import { ButtonVatiant } from "./Button.constants";
import styles from "./Button.module.css";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

export function Button({
  variant = ButtonVatiant.Default,
  children,
  ...rest
}: IButton) {
  let buttonClass = styles.buttonBase;
  switch (variant) {
    case ButtonVatiant.Default:
      buttonClass += ` ${styles.buttonDefault}`;
      break;
    case ButtonVatiant.Outlined:
      buttonClass += ` ${styles.buttonOutlined}`;
      break;
    case ButtonVatiant.Text:
      buttonClass += ` ${styles.buttonText}`;
      break;
  }

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
}
