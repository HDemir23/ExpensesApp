
import * as Localization from "expo-localization";


export const formatAmount = (
  baseAmount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: { [key: string]: number },
  locale: string = Localization.locale
): string => {
  if (fromCurrency === toCurrency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: toCurrency,
      currencyDisplay: "narrowSymbol",
    }).format(baseAmount);
  }

  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  const converted = (baseAmount / fromRate) * toRate;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: toCurrency,
    currencyDisplay: "narrowSymbol",
  }).format(converted);
};
