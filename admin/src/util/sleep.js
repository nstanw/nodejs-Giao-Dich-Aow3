const delay = (second) =>{
  return new Promise((resolve) => setTimeout(() => resolve, second));
}
async function Sleep(second) {
  await delay(second);
};

export default Sleep;
