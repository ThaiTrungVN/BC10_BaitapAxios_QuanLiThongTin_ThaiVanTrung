function getEle(id) {
  return document.getElementById(id);
}

var service = new ThongTinServices();

var validation = new Validation();

function getData() {
  service
    .getListInforApi()
    .then(function (result) {
      renderListInfor(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getData();

function renderListInfor(list) {
  var contentHTML = "";

  list.forEach(function (infor, index) {
    contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${infor.taiKhoan}</td>
            <td>
                <img src="./../../assets/img/${infor.hinhAnh}"
                width="100"
                />
            </td>
            <td>${infor.hoTen}</td>
            <td>${infor.matKhau}</td>
            <td>${infor.email}</td>
            <td>${infor.loaiND}</td>
            <td>${infor.ngonNgu}</td>
            <td>${infor.moTa}</td>
            <td class="d-flex">
            <button class="btn btn-info mr-2" data-toggle="modal"
            data-target="#myModal" onclick="suaInfor(${infor.id})">Edit</button>
            <button class="btn btn-danger" onclick="xoaInfor(${
              infor.id
            })">Delete</button>
            </td>
        </tr>
        `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

getEle("btnThemNguoiDung").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm Người Dùng";
  var footer =
    '<button class="btn btn-success" onclick="addInfor()">Add</button>';
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

/**
 *  Thêm Sản Phẩm
 */
function addInfor() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var isValid = true;

  isValid &= validation.kiemTraRong(
    taiKhoan,
    "taiKhoanErr",
    "(*) Tài Khoản Không Được Rỗng!!!"
  );
 
  isValid &=
    validation.kiemTraRong(
      hoTen,
      "hoTenErr",
      "(*) Họ Tên Không Được Rỗng!!!"
    ) &&
    validation.kiemTraKyTuChuoi(hoTen, "hoTenErr", "(*) Họ Tên Phải Là Chữ!!!");

  isValid &=
    validation.kiemTraRong(
      matKhau,
      "matKhauErr",
      "(*) Mật Khẩu Không Được Rỗng!!!"
    ) &&
    validation.kiemTraMatKhau(
      matKhau,
      "matKhauErr",
      "(*) Mật Khẩu Không Đúng Định Dạng!!!"
    );
  
  isValid &=
    validation.kiemTraRong(email, "emailErr", "(*) Email Không Được Rỗng!!!") &&
    validation.kiemTraEmail(
      email,
      "emailErr",
      "(*) Email Không Đúng Định Dạng!!"
    );
  
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "hinhAnhErr",
    "(*) Hình Ảnh Không Được Rỗng!!!"
  );
  
  isValid &= validation.kiemTraThongTin(
    "loaiNguoiDung",
    "nguoiDungErr",
    "(*) Hãy Chọn Thông tin!!!"
  );
 
  isValid &= validation.kiemTraThongTin(
    "loaiNgonNgu",
    "ngonNguErr",
    "(*) Hãy Chọn Ngôn Ngữ!!!"
  );

  isValid &=
    validation.kiemTraRong(moTa, "moTaErr", "(*) Mô Tả Không Được Rỗng!!!") &&
    validation.kiemTraDoDaiKyTu(
      moTa,
      "moTaErr",
      "(*) Mô Tả Không Vượt Quá 60 Ký Tự!!!",
      1,
      60
    );

  var thongTin = new ThongTin(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    loaiND,
    ngonNgu,
    moTa
  );

  if (isValid) {
    service
      .addInforApi(thongTin)
      .then(function (result) {
        document.getElementsByClassName("close")[0].click();
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

/**
 *  Xóa
 */
function xoaInfor(id) {
  service
    .deleteInforApi(id)
    .then(function () {
      getData();
      alert("Xóa Thành Công!!!");
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 *  Sửa
 */
function suaInfor(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Info";

  var footer = `<button class="btn btn-success" onclick="capNhapInfor(${id})">Cập Nhập</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  service
    .getInforByApi(id)
    .then(function (result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("TaiKhoan").disabled = true;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 *  Cập nhập
 */
function capNhapInfor(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var thongTin = new thongTin(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    loaiND,
    ngonNgu,
    moTa
  );

  service
    .updateInforApi(thongTin)
    .then(function () {
      alert("Cập Nhập Thành Công");
      document.getElementsByClassName("close")[0].click();
      getData();
    })
    .catch(function (error) {
      console.log(error);
    });
}
