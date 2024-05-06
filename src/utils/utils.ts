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