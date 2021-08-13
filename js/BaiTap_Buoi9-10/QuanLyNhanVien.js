function QuanLyNhanVien(){
    this.dsNhanVien = JSON.parse(localStorage.getItem("dsNhanVien")) || [];
}
QuanLyNhanVien.prototype.khoiTao = function(){
    if(this.dsNhanVien.length === 0){
        return 
    }
    this.dsNhanVien = this.dsNhanVien.map(function (nv){
        return new NhanVien(nv.tkNV, nv.tenNV, nv.email, nv.password, nv.ngayLam, nv.luongCoBan, nv.chucVu, nv.gioLam)
    })
}

QuanLyNhanVien.prototype.saveLocalStorage = function(){
    localStorage.setItem("dsNhanVien", JSON.stringify(this.dsNhanVien));
}

QuanLyNhanVien.prototype.themNhanVien = function(nhanVien){
    this.dsNhanVien.push(nhanVien);
    this.saveLocalStorage();
}

QuanLyNhanVien.prototype.capNhatNhanVien = function(nhanVien){
    this.dsNhanVien = this.dsNhanVien.map(function(nv){
        if(nv.tkNV === nhanVien.tkNV){
            return nhanVien
        }
        return nv
    });

    this.saveLocalStorage();
}

QuanLyNhanVien.prototype.xoaNhanVien = function(tknv){
    this.dsNhanVien = this.dsNhanVien.filter(function(nhanVien){
        return nhanVien.tkNV !== tknv;
    });

    this.saveLocalStorage();
}

QuanLyNhanVien.prototype.timKiemNhanVien = function(search){
    return this.dsNhanVien.filter(function(nv){
        return nv.XepLoai().toLowerCase().indexOf(search.toLowerCase()) !== -1;
     })
}

QuanLyNhanVien.prototype.chonNhanVien = function(tknv){
    return this.dsNhanVien.find(function(nv){
        return nv.tkNV === tknv
    })
}