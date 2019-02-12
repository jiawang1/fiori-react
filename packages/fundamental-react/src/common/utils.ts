export enum KeyCode  {
  ENTER = 13,
  CTRL = 17,
  ALT =18,
  ESC = 27
};

export const getRandomNumber = (low = 0, high = Number.MAX_SAFE_INTEGER)=>{
  const ratio = (high === Number.MAX_SAFE_INTEGER && 1 - low > 0)? Number.MAX_SAFE_INTEGER : high - low + 1;
  return Math.floor(Math.random() * ratio + low);
};