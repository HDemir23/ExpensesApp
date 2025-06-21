import * as Localization from "expo-localization";

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat(Localization.locale, {
    style: "currency",
    currency: Localization.currency ?? "USD",
    currencyDisplay: "narrowSymbol",
  }).format(amount);
};
