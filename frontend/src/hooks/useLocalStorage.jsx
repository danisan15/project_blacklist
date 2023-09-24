const getTokenAndUser = () => {
  let tokenObject = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.getItem(localStorage.key(i));
    if (key.startsWith("{") || typeof key == "object") {
      tokenObject = JSON.parse(key);
    } else continue;
  }
  if (tokenObject) {
    const token = tokenObject?.access_token;
    const userEmail = tokenObject?.user.email;
    const userObject = { token: token, userEmail: userEmail };
    return userObject;
  } else console.error("No se encontró el objeto del usuario");
};

export default getTokenAndUser;
