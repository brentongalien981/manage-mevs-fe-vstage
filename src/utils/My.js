import { v4 as uuidv4 } from 'uuid';

class My {
  static displayJsonContents(jsonObj) {
    const jsonString = JSON.stringify(jsonObj, null, 2); // The third argument (2) adds indentation for readability
    My.log(jsonString);
  }



  static getDefaultAltImgSrc() {
    return "/img/product/beetle-1.jpg";
  }



  static log(msg) {
    console.log(msg);
  }


  static sleep(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  static isEmptyString(str) {
    return str.length === 0;
  };


  static generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }


  static generateUuid4() {
    return uuidv4();
  }


  /**
   * 
   * @param {integer} min: inclusive
   * @param {integer} max: inclusive 
   * @returns integer
   */
  static getRandomNumber(min, max) {
    // Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
    // Multiply by (max - min + 1) to include the maximum value in the range
    // Math.floor() rounds down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}


export default My;