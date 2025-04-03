export const encodeData = (email: string) => {
  return btoa(email)
}


export const decodeData = (encodedEmail: string) => {
  try {
    return atob(encodedEmail)
  } catch (e) {
    return 'Invalid encoded email or otp'
  }
}

export const maskEmail = (email: string) => {
  const emailParts = email.split('@');
  const emailPrefix = emailParts[0];
  const maskedPrefix = emailPrefix.length > 3 ? `${emailPrefix.slice(0, 3)}***` : emailPrefix;
  return `${maskedPrefix}@${emailParts[1]}`;
};