# World Cup 2026 App

Ứng dụng tĩnh bằng HTML, CSS và JavaScript để xem lịch thi đấu World Cup 2026 bằng tiếng Việt.

## Tính năng

- Xem bảng xếp hạng theo bảng đấu.
- Xem tỷ số các trận đã qua.
- Xem lịch thi đấu sắp tới.
- Click vào trận đã qua để xem chi tiết: cầm bóng, bàn thắng, thẻ vàng, thẻ đỏ, lỗi và diễn biến chính.
- Tìm kiếm theo đội bóng, sân vận động hoặc thành phố.
- Lọc theo bảng đấu.

## Chạy local

Mở trực tiếp file `index.html` trong trình duyệt hoặc chạy một static server:

```bash
python -m http.server 5176
```

Sau đó mở:

```text
http://localhost:5176
```

## Deploy lên Netlify

### Cách 1: Kéo thả nhanh

1. Vào Netlify.
2. Chọn **Add new site**.
3. Chọn **Deploy manually**.
4. Kéo thả toàn bộ thư mục này lên Netlify.

### Cách 2: Deploy qua GitHub

1. Tạo repository mới trên GitHub.
2. Push toàn bộ thư mục này lên repository đó.
3. Trong Netlify, chọn **Add new site** -> **Import an existing project**.
4. Chọn repository GitHub vừa tạo.
5. Build settings:
   - Build command: để trống
   - Publish directory: `.`
6. Deploy.

## Ghi chú dữ liệu

Dữ liệu hiện tại là dữ liệu mẫu để trình diễn giao diện. Khi triển khai thật, có thể thay mảng dữ liệu trong `app.js` bằng dữ liệu từ API thể thao/FIFA hoặc backend riêng.
