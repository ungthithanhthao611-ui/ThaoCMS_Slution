USE ThanhThaoCMS_DB;
GO

-- 1. Xóa dữ liệu cũ (Xóa bảng con trước, bảng cha sau để không vi phạm khóa ngoại)
DELETE FROM OrderDetails;
DELETE FROM Orders;
DELETE FROM Products;
DELETE FROM CategoriesProducts;
DELETE FROM Posts;
DELETE FROM Categories;

-- 2. Đặt lại mốc ID tự tăng về 0
DBCC CHECKIDENT ('Products', RESEED, 0);
DBCC CHECKIDENT ('CategoriesProducts', RESEED, 0);
DBCC CHECKIDENT ('Posts', RESEED, 0);
DBCC CHECKIDENT ('Categories', RESEED, 0);
GO

-- 3. Nạp Danh Mục Sản Phẩm (CategoriesProducts)
INSERT INTO CategoriesProducts (Name, Description) VALUES
(N'CÀ PHÊ', N'Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica thượng hạng'),
(N'TRÀ', N'Hương vị trà Việt Nam tinh tế, hòa quyện với trái cây tươi mát'),
(N'FREEZE', N'Sảng khoái với thức uống đá xay phong cách Highlands'),
(N'BÁNH MÌ QUE', N'Bánh mì que giòn tan với lớp nhân đậm đà');
GO

-- 4. Nạp Sản Phẩm (Products)
-- Lấy ID của CÀ PHÊ (1)
INSERT INTO Products (Name, Description, Price, StockQuantity, ImageUrl, CategoryProductId) VALUES
(N'Phin Sữa Đá', N'Hương vị cà phê Việt Nam đích thực! Từng giọt cà phê đậm đà kết hợp sữa đặc ngọt ngào.', 29000, 100, '/images/phin_sua_da_1780038680971.png', 1),
(N'Phin Đen Đá', N'Dành cho những ai yêu thích vị cà phê nguyên bản, đậm đà và đầy thử thách.', 29000, 100, '/images/phin_sua_da_1780038680971.png', 1),
(N'Bạc Xỉu Đá', N'Phiên bản nhiều sữa hơn, ngọt ngào, thơm béo nhưng vẫn giữ nguyên hương vị cà phê.', 29000, 100, '/images/phin_sua_da_1780038680971.png', 1);

-- Lấy ID của TRÀ (2)
INSERT INTO Products (Name, Description, Price, StockQuantity, ImageUrl, CategoryProductId) VALUES
(N'Trà Sen Vàng', N'Sự kết hợp độc đáo giữa trà Ô Long, hạt sen thơm bùi và củ năng giòn rụm.', 45000, 50, '/images/peach_tea_1780038702669.png', 2),
(N'Trà Thanh Đào', N'Vị trà thanh mát, hòa quyện với miếng đào chua ngọt đầy sảng khoái.', 45000, 50, '/images/peach_tea_1780038702669.png', 2),
(N'Trà Thạch Đào', N'Trà thanh mát kết hợp với thạch đào giòn sần sật, giải nhiệt cực đã.', 45000, 50, '/images/peach_tea_1780038702669.png', 2);

-- Lấy ID của FREEZE (3)
INSERT INTO Products (Name, Description, Price, StockQuantity, ImageUrl, CategoryProductId) VALUES
(N'Freeze Trà Xanh', N'Thức uống đá xay mát lạnh với hương vị trà xanh thượng hạng từ Thái Nguyên.', 55000, 50, '/images/matcha_freeze_1780038724287.png', 3),
(N'Caramel Phin Freeze', N'Kết hợp cà phê Phin Việt Nam cùng caramel ngọt ngào, thêm chút đá xay mát lạnh.', 55000, 50, '/images/matcha_freeze_1780038724287.png', 3);

-- Lấy ID của BÁNH MÌ QUE (4)
INSERT INTO Products (Name, Description, Price, StockQuantity, ImageUrl, CategoryProductId) VALUES
(N'Bánh Mì Que Pate', N'Bánh mì que giòn rụm với lớp nhân pate thơm lừng đặc trưng.', 19000, 150, '/images/banh_mi_que_1780038746540.png', 4),
(N'Bánh Mì Que Phô Mai', N'Bánh mì que giòn rụm với nhân phô mai béo ngậy tan chảy.', 19000, 150, '/images/banh_mi_que_1780038746540.png', 4);
GO

-- 5. Nạp Danh Mục Tin Tức (Categories)
INSERT INTO Categories (Name, Description) VALUES
(N'Tin Tức & Sự Kiện', N'Cập nhật tin tức nóng hổi từ Highlands Coffee'),
(N'Khuyến Mãi', N'Các chương trình ưu đãi hấp dẫn dành cho bạn');
GO

-- 6. Nạp Bài Viết (Posts)
-- ID Tin Tức (1)
INSERT INTO Posts (Title, Content, ImageUrl, CreatedDate, CategoryId) VALUES
(N'Tự Hào Sinh Ra Từ Đất Việt', N'Hành trình Highlands Coffee mang hương vị cà phê Việt Nam vươn xa.', '/images/phin_sua_da_1780038680971.png', GETDATE(), 1),
(N'Trải Nghiệm Đặt Hàng Trực Tuyến Mới', N'Ra mắt ứng dụng Highlands ĐI! Đặt trước, lấy ngay không cần xếp hàng.', '/images/peach_tea_1780038702669.png', GETDATE(), 1);

-- ID Khuyến Mãi (2)
INSERT INTO Posts (Title, Content, ImageUrl, CreatedDate, CategoryId) VALUES
(N'Đồng Hành Cùng Highlands - Nhận Ưu Đãi Bất Ngờ', N'Chương trình khuyến mãi mùa thu với vô vàn voucher giảm giá.', '/images/matcha_freeze_1780038724287.png', GETDATE(), 2);
GO
