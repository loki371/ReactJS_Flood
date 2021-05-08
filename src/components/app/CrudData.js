class CrudData {
    constructor(name) {
      this.nameData = name;

      this.data = this.getData();
    }
  
    getData() {
      var dataString = localStorage.getItem(this.nameData);
      var userData = JSON.parse(dataString);
        
      return userData;
    }
  
  
    set(userData) {
      localStorage.setItem(this.nameData, JSON.stringify(userData));
      this.data = userData;
    }
  
    delete() {
      localStorage.removeItem(this.nameData);
      this.data = null;
    }
}

export default CrudData;