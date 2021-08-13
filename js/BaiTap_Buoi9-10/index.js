

document.getElementById('btnTimNV').addEventListener('click', TimKiemTheoLoaiNV);

document.getElementById('btnThemNV').addEventListener('click', ThemNhanVien);

document.getElementById('btnCapNhat').addEventListener('click', CapNhatNhanVien)

document.getElementById('tableDanhSach').addEventListener('click', delegateTable)


var qlnv = new QuanLyNhanVien();
qlnv.khoiTao()
HienThiNhanVien(qlnv.dsNhanVien)

function ThemNhanVien(){
    var tkNV = document.getElementById('tknv').value;
    var tenNV = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var ngayLam = document.getElementById('datepicker').value;
    var luongCoBan = document.getElementById('luongCB').value;
    var chucVu = document.getElementById('chucvu').value;
    var gioLam = +document.getElementById('gioLam').value;

    var nv = new NhanVien(tkNV, tenNV, email, password, ngayLam, luongCoBan, chucVu, gioLam);

    var isValid = xacThucDuLieu(nv)

    if(!isValid) {
        return
    }

    qlnv.themNhanVien(nv)

    HienThiNhanVien(qlnv.dsNhanVien)
    filledForm({})
}


function HienThiNhanVien(dsNhanVien){
    var tbody = document.getElementById('tableDanhSach')
    var html =""

    for (let i = 0; i < dsNhanVien.length; i++) {
        var nv= dsNhanVien[i];
        html += `
            <tr>
                <td>${nv.tkNV}</td>
                <td>${nv.tenNV}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.TongLuong()}</td>
                <td>${nv.XepLoai()}</td>
                <td>
                    <button class="btn btn-warning mt-2" data-action="select" data-toggle="modal" data-target="#myModal" data-tknv = "${nv.tkNV}">Update</button>
                    <button class="btn btn-danger mt-2" data-action="delete" data-tknv="${nv.tkNV}">Delete</button>
                </td>
            </tr>

        ` 
    }
    tbody.innerHTML = html;
}

function filledForm(nhanVien){
    document.getElementById('tknv').value = nhanVien.tkNV || "";
    document.getElementById('name').value = nhanVien.tenNV || "";
    document.getElementById('email').value = nhanVien.email || "";
    document.getElementById('password').value = nhanVien.password || "";
    document.getElementById('datepicker').value = nhanVien.ngayLam || "";
    document.getElementById('luongCB').value = nhanVien.luongCoBan || "";
    document.getElementById('chucvu').value = nhanVien.chucVu || "";
    document.getElementById('gioLam').value = nhanVien.gioLam || "";
}

function delegateTable(event){
    
    var tknv = event.target.getAttribute('data-tknv')
    var action = event.target.getAttribute('data-action')
    
    if(action === "select"){
        chonNhanVien(tknv);
    }

    if(action === "delete"){
        xoaNhanVien(tknv);
    }

}

function chonNhanVien(tknv){
    var nhanVien = qlnv.chonNhanVien(tknv)
    document.getElementById('tknv').disabled=true;
    filledForm(nhanVien)

}

function xoaNhanVien(tknv){
    qlnv.xoaNhanVien(tknv)
    HienThiNhanVien(qlnv.dsNhanVien);
}

function CapNhatNhanVien(){
    var tkNV = document.getElementById('tknv').value;
    var tenNV = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var ngayLam = document.getElementById('datepicker').value;
    var luongCoBan = document.getElementById('luongCB').value;
    var chucVu = document.getElementById('chucvu').value;
    var gioLam = +document.getElementById('gioLam').value;

    var nhanVien = new NhanVien(tkNV, tenNV, email, password, ngayLam, luongCoBan, chucVu, gioLam);

    var isValid = xacThucDuLieu(nhanVien)

    if(!isValid) {
        return
    }

    qlnv.capNhatNhanVien(nhanVien)

    HienThiNhanVien(qlnv.dsNhanVien);
    document.getElementById('tknv').disabled=false;
    filledForm({})
    
}

function TimKiemTheoLoaiNV(){
    var search = document.getElementById('searchName').value;

    var newDSNV = qlnv.timKiemNhanVien(search)

    HienThiNhanVien(newDSNV);
}

function xacThucDuLieu(nhanVien) {
    var validator = new Validator();
    var isValid = validator.isRequired("tbTKNV", nhanVien.tkNV) && validator.taiKhoan("tbTKNV", nhanVien.tkNV);
    isValid &= validator.isRequired("tbTen", nhanVien.tenNV);
    isValid &=
      validator.isRequired("tbEmail", nhanVien.email) &&
      validator.email("tbEmail", nhanVien.email);
    isValid &= validator.isRequired("tbMatKhau", nhanVien.password) && validator.checkPass("tbMatKhau", nhanVien.password);
    isValid &= validator.isRequired("tbNgay", nhanVien.ngayLam);
    isValid &= validator.isRequired("tbLuongCB", nhanVien.luongCoBan);
    isValid &= validator.isRequired("tbChucVu", nhanVien.chucVu);
    isValid &= validator.isRequired("tbGiolam", nhanVien.gioLam);
  
    if (!isValid) {
      for (var key in validator.errors) {
        if (validator.errors[key]) {
          document.getElementById(key).innerHTML = validator.errors[key];
        }
      }
      return false
    }
  
    return true
}