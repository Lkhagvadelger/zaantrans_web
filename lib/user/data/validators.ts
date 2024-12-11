export const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const passwordPattern =
  /^(?=.*[0-9])(?=.*[!@#$%^&*_.-])[a-zA-Z0-9!@#$%-._^&*]{8,28}/;
// const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const validateEmail = (email: string) => {
  return emailPattern.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => {
  return passwordPattern.test(password);
};
