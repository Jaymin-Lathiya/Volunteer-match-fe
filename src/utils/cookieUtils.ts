export const getCookie = (cname: String) => {
    if (typeof window !== "undefined" && document) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${cname}=`);
  
      if (parts.length === 2) return parts.pop()?.split(";").shift();
    }
    return null;
  };
  export function setCookie(cname: String, cvalue: String, exdays = 30) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 8 * 60 * 60 * 1000);
    var expires = "expires=";
    
    let valueToStore = cvalue;
    if (typeof cvalue === "object" && cvalue !== null) {
      valueToStore = JSON.stringify(cvalue);
    }
  
  
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  export function clearCookie(cname: String) {
    setCookie(cname, "", -1);
  }
  