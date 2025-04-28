export function getCardFlag(cardNumber: string) {
  const sanitized = cardNumber.replace(/\D/g, "");

  if (/^4/.test(sanitized)) return "visa";
  if (/^5[1-5]/.test(sanitized)) return "mastercard";
  if (/^3[47]/.test(sanitized)) return "amex";
  if (/^3(?:0[0-5]|[68])/.test(sanitized)) return "diners";
  if (/^6(?:011|5)/.test(sanitized)) return "discover";
  if (/^(38|60|62|50)/.test(sanitized)) return "elo";
  if (/^35(2[89]|[3-8][0-9])/.test(sanitized)) return "jcb";

  return "unknown";
}
