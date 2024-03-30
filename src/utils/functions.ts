/**
 * Truncates a given title to a specified maximum length and adds ellipses if needed.
 *
 * @param {string} text - The input title text.
 * @param {number} [maxLength=18] - The maximum length for the truncated title.
 * @returns {string} - The truncated title.
 */
export function titlecCut (txt: string, max:number=18): string{
    if(txt.length>=max) return `${txt.slice(0,max)} ...`
    return txt
}


/**
 * Truncates a given title to a specified maximum length and adds ellipses if needed.
 *
 * @param {string} text - The input description text.
 * @param {number} [maxLength=50] - The maximum length for the truncated description.
 * @returns {string} - The truncated description.
 */
export function descCut (txt: string, max:number=50): string{
    if(txt.length>=max) return `${txt.slice(0,max)} ...`
    return txt
}


/**
 * Adds " , " to a given price string for better readabilit.
 * 
 * @param {string} [price] - The input price string.
 * @returns {string} - The price string with commas added.
 */
export  const priceCur = (price: string) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Adding commas to price
  }

