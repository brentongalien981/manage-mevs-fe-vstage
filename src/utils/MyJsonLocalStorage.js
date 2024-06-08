import My from "./My";

class MyJsonLocalStorage {

  static clear() {
    localStorage.clear();
  }



  /**
   * 
   * @param {*} key 
   * @param {*} val 
   * @returns bool
   */
  static set(key, val) {
    key = import.meta.env.VITE_APP_NAME + "::" + key;
    val = JSON.stringify(val);

    try {
      localStorage.setItem(key, val);
    } catch (e) {
      return false;
    }

    return true;

  }


  static isSet(key) {
    key = import.meta.env.VITE_APP_NAME + "::" + key;
    let val = localStorage.getItem(key);

    if (!val || val === "") { return false; }

    return true;
  }



  static get(key) {

    if (!MyJsonLocalStorage.isSet(key)) { return null; }

    try {
      key = import.meta.env.VITE_APP_NAME + "::" + key;
      let val = localStorage.getItem(key);
      val = JSON.parse(val);
      return val;
    } catch (e) {
      My.log('Error: In CLASS: MyJsonLocalStorage, METHOD: get(), MESSAGE ==> ' + e);
      return null
    }
  }
}



export default MyJsonLocalStorage;