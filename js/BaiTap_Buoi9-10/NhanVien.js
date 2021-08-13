function NhanVien(tkNV, tenNV, email, password, ngayLam, luongCoBan, chucVu, gioLam ) {
    this.tkNV = tkNV;
    this.tenNV = tenNV;
    this.email = email;
    this.password = password;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
}

NhanVien.prototype.XepLoai= function(){
    if(this.gioLam >= 192){
        return "Xuất sắc";
    }
    else if(this.gioLam >=176){
        return "Giỏi";
    }
    else if(this.gioLam >= 160){
        return "Khá";
    }
    else{
        return "Trung bình";
    }
}

NhanVien.prototype.TongLuong = function(){
    if(this.chucVu == "Sếp"){
        return this.luongCoBan *3;
    }
    else if (this.chucVu == "Trưởng phòng"){
        return this.luongCoBan *2;
    }
    else{
        return this.luongCoBan;
    }
}
