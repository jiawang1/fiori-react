import React,{ReactElement} from 'react';

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

export const isDOMElement = (ele :ReactElement<any>) => React.isValidElement(ele) && typeof ele.type === "string";

export const isClassElement = (ele:ReactElement<any>) => React.isValidElement(ele) && typeof ele.type === "function" && ele.type instanceof React.Component;
