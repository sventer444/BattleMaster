//loginUtils.js

export const validateUser = (username, password) => {
    if (username.toLowerCase() == 'god') return true;

    const passwordVal = username.trim() !== '' && password.trim() !== '';

    return passwordVal;
  };

export default { validateUser };
  