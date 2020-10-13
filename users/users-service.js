module.exports = {
    isValid,
  };
  
  function isValid(user) {
    return Boolean(user.username && user.department && user.password && typeof user.password === "string");
  }