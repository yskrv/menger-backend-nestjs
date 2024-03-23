interface ActivationCode {
  code: string;
  expiresIn: Date;
}

export const generateActivationCode = (): ActivationCode => {
  const code: string = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresIn: Date = new Date(new Date().getTime() + 15 * 60000);

  return { code, expiresIn };
};
