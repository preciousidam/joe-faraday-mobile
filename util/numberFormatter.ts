export function numberWithCommas(num: number | string) {
  if (typeof num === 'string'){
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  else if(typeof num === 'number'){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export const sanitizeCurrency = (num: string) => {
  return num.replace(/[^\d.-]/g, '');
}