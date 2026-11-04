# PrintCalc VN

Công cụ mã nguồn mở tính giá in ấn Hiflex, PP và decal, giao diện tiếng Việt. Không cần cài đặt, không cần máy chủ.

## Chức năng
- Nhập kích thước (cm), số tấm và giá in/vật tư (VND/m²).
- Tính diện tích, hao hụt, gia công, chi phí khác và lợi nhuận trên **giá vốn**.
- Hiển thị giá vốn, lợi nhuận, tổng báo giá và giá mỗi tấm.
- Sao chép nội dung báo giá để gửi khách.
- Giao diện thích ứng điện thoại, hoạt động offline sau khi tải file.

## Cách sử dụng
Mở `index.html` trong trình duyệt. Thay đơn giá mẫu bằng giá thực tế của bạn.

## Công thức
- `diện_tích_mỗi_tấm = rộng_cm × cao_cm / 10.000`
- `tổng_diện_tích = diện_tích_mỗi_tấm × số_lượng`
- `chi_phí_in = tổng_diện_tích × đơn_giá_m2 × (1 + hao_hụt% / 100)`
- `giá_vốn = chi_phí_in + gia_công_mỗi_tấm × số_lượng + chi_phí_khác`
- `lợi_nhuận = giá_vốn × tỷ_lệ_lợi_nhuận / 100`
- `giá_báo_khách = giá_vốn + lợi_nhuận`

**Lưu ý:** Đơn giá điền sẵn chỉ mang tính minh họa. Lợi nhuận tính theo tỷ lệ cộng trên giá vốn (markup), không phải biên lợi nhuận trên doanh thu. Chưa bao gồm thuế VAT riêng, phí vận chuyển hoặc quy tắc làm tròn khổ in theo cuộn vật tư.

## Đăng lên GitHub Pages
1. Tạo repository công khai tên `printcalc-vn` trên GitHub.
2. Tải lên `index.html`, `style.css`, `script.js`, `README.md`, `LICENSE` vào thư mục gốc.
3. Vào **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Chọn `main` và `/ (root)`, bấm **Save**.
5. Chờ GitHub Pages triển khai; trang dự kiến có dạng `https://<username>.github.io/printcalc-vn/`.

## Đóng góp
Có thể tạo Issue hoặc Pull Request để đề xuất tính giá theo cuộn, VAT, xuất PDF, nhiều dòng sản phẩm, lưu bảng giá. Không tạo đóng góp giả để xin ưu đãi.

## Giấy phép
MIT — xem [LICENSE](LICENSE).
