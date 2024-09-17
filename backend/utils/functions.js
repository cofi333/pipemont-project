const generateToken = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

 const correctNameMessage = (name) => {
  const lastLetter = name.charAt(name.length - 1);
  if (["o", "a"].includes(lastLetter)) return name;
  return `${name}e`;
};



module.exports = {
    generateToken,
    correctNameMessage
};  
