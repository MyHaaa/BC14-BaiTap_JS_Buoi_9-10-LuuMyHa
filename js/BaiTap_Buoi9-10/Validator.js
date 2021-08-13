function Validator(){
    this.error = {}
}

Validator.prototype.isRequired = function (name, value) {
    if (!value) {
      this.errors[name] = "Vui lòng nhập vào trường này";
      return false;
    }
    return true;
};
  
Validator.prototype.email = function (name, value) {
    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
      this.errors[name] = "Email không đúng định dạng";
      return false;
    }
  
    return true;
};
  
Validator.prototype.taiKhoan = function (name, value) {
    if(value.length >=4 &&  value.length <=6){
        this.errors[name] = "Tài khoản tối đa 4 - 6 ký số"
        return false;
    }
      
    return true;
};

Validator.prototype.checkPass = function(name, value){
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,10}$/.test(value)){
        this.errors[name] = "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
        return false;
    }
    return true;
}