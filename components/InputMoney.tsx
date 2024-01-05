"use client";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

const InputMoney = ({ ...rest }: CurrencyInputProps) => {
  return <CurrencyInput prefix="$" name="price" {...rest} />;
};
export default InputMoney;
