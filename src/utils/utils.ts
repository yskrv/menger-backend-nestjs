interface ActivationCode {
  code: string;
  expiresIn: Date;
}

export const generateActivationCode = (): ActivationCode => {
  const code: string = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresIn: Date = new Date(new Date().getTime() + 15 * 60000);

  return { code, expiresIn };
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export const convertToSlug = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-');
}

export const generatePassword = (length: number = 10): string => {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;':\",.<>/?";

  const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + symbols;

  let password = "";

  password += upperCaseLetters.charAt(Math.floor(Math.random() * upperCaseLetters.length));
  password += lowerCaseLetters.charAt(Math.floor(Math.random() * lowerCaseLetters.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += symbols.charAt(Math.floor(Math.random() * symbols.length));

  for (let i = password.length; i < length; i++) {
    password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
  }

  return password.split('').sort(() => 0.5 - Math.random()).join('');
}