function ThongTinServices() {
  this.getListInforApi = function () {
    return axios({
      url: "https://60bc9af6b8ab37001759f4f5.mockapi.io/api/quanlithongtin",
      method: "GET",
    });
  };
  this.addInforApi = function (infor) {
    return axios({
      url: "https://60bc9af6b8ab37001759f4f5.mockapi.io/api/quanlithongtin",
      method: "POST",
      data: infor,
    });
  };
  this.deleteInforApi = function (id) {
    return axios({
      url: `https://60bc9af6b8ab37001759f4f5.mockapi.io/api/quanlithongtin/${id}`,
      method: "DELETE",
    });
  };
  this.getInforByApi = function (id) {
    return axios({
      url: `https://60bc9af6b8ab37001759f4f5.mockapi.io/api/quanlithongtin/${id}`,
      method: "GET",
    });
  };
  this.updateInforApi = function (infor) {
    return axios({
      url: `https://60bc9af6b8ab37001759f4f5.mockapi.io/api/quanlithongtin/${infor.id}`,
      method: "PUT",
      data: infor,
    });
  };
}
