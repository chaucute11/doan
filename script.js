// Dữ liệu giả lập (thay bằng fetch API nếu có backend)
const data = {
  hoaDon: [
    { maHD: 'HD001', ngayHD: '2025-01-15', tongTien: 500000 },
    { maHD: 'HD002', ngayHD: '2025-02-20', tongTien: 750000 },
  ],
  khachHang: [
    {
      maKH: 'KH001',
      hoTen: 'Nguyễn Văn A',
      gioiTinh: 'Nam',
      diaChi: 'Hà Nội',
      dienThoai: '0901234567',
      tongMua: 1250000,
    },
    {
      maKH: 'KH002',
      hoTen: 'Trần Thị B',
      gioiTinh: 'Nữ',
      diaChi: 'TP.HCM',
      dienThoai: '0912345678',
      tongMua: 2000000,
    },
  ],
  thongKe: [
    { nam: 2025, quy: 1, doanhThu: 1000000 },
    { nam: 2025, quy: 2, doanhThu: 1500000 },
  ],
  matHang: [
    {
      maNCC: 'NCC001',
      maMH: 'MH001',
      tenMH: 'Áo sơ mi',
      gia: 200000,
      soLuongTon: 50,
    },
    {
      maNCC: 'NCC001',
      maMH: 'MH002',
      tenMH: 'Quần jeans',
      gia: 300000,
      soLuongTon: 30,
    },
  ],
  nguoiDung: [],
};

// 1. Tìm kiếm hóa đơn
function searchHoaDon() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const filtered = data.hoaDon.filter((hd) =>
    hd.maHD.toLowerCase().includes(keyword)
  );
  const tbody = document.getElementById('hoaDonTable').querySelector('tbody');
  tbody.innerHTML = filtered
    .map(
      (hd) => `
      <tr>
          <td>${hd.maHD}</td>
          <td>${hd.ngayHD}</td>
          <td>${hd.tongTien.toLocaleString()}</td>
      </tr>
  `
    )
    .join('');
}
// 2. Hiển thị danh sách khách hàng
function loadKhachHang() {
  const tbody = document
    .getElementById('khachHangTable')
    .querySelector('tbody');
  tbody.innerHTML = data.khachHang
    .map(
      (kh) => `
      <tr>
          <td>${kh.maKH}</td>
          <td>${kh.hoTen}</td>
          <td>${kh.gioiTinh}</td>
          <td>${kh.diaChi}</td>
          <td>${kh.dienThoai}</td>
          <td>${kh.tongMua.toLocaleString()}</td>
      </tr>
  `
    )
    .join('');
}

// 3. Thống kê bán hàng theo quý
function thongKeBanHang() {
  const nam = parseInt(document.getElementById('namInput').value);
  const filtered = data.thongKe.filter((tk) => tk.nam === nam);
  const tbody = document.getElementById('thongKeTable').querySelector('tbody');
  tbody.innerHTML = filtered
    .map(
      (tk) => `
      <tr>
          <td>${tk.quy}</td>
          <td>${tk.doanhThu.toLocaleString()}</td>
      </tr>
  `
    )
    .join('');
}

// 4. Hiển thị mặt hàng theo nhà cung cấp
function hienThiMatHang() {
  const maNCC = document.getElementById('maNCCInput').value;
  const filtered = data.matHang.filter((mh) => mh.maNCC === maNCC);
  const tbody = document.getElementById('matHangTable').querySelector('tbody');
  tbody.innerHTML = filtered
    .map(
      (mh) => `
      <tr>
          <td>${mh.maMH}</td>
          <td>${mh.tenMH}</td>
          <td>${mh.gia.toLocaleString()}</td>
          <td>${mh.soLuongTon}</td>
      </tr>
  `
    )
    .join('');
}

// 5. Tạo người dùng
function taoNguoiDung() {
  const maND = document.getElementById('maND').value;
  const tenND = document.getElementById('tenND').value;
  const matKhau = document.getElementById('matKhau').value;
  const quyen = document.getElementById('quyen').value;

  if (data.nguoiDung.some((nd) => nd.maND === maND)) {
    alert('Mã người dùng đã tồn tại!');
    return;
  }
  data.nguoiDung.push({ maND, tenND, matKhau, quyen });
  alert('Tạo người dùng thành công!');
  console.log(data.nguoiDung); // Kiểm tra dữ liệu
}

// Ngăn xóa khách hàng đã phát sinh hóa đơn (giả lập)
function xoaKhachHang(maKH) {
  if (data.hoaDon.some((hd) => hd.maKH === maKH)) {
    alert('Không thể xóa khách hàng đã phát sinh hóa đơn!');
  } else {
    data.khachHang = data.khachHang.filter((kh) => kh.maKH !== maKH);
    loadKhachHang();
  }
}

// Load danh sách khách hàng khi trang mở
window.onload = loadKhachHang;
