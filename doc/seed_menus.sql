-- Script thêm dữ liệu mẫu vào bảng Menus
-- Khớp với menu hiển thị trên trang web Highlands Coffee frontend
-- Chạy trong SSMS với database ThanhThaoCMS_DB

USE ThanhThaoCMS_DB;
GO

-- Xóa dữ liệu cũ nếu có (để chạy lại an toàn)
DELETE FROM [dbo].[Menus];
DBCC CHECKIDENT ('Menus', RESEED, 0);
GO

-- Insert 4 menu chính (không có menu cha)
INSERT INTO [dbo].[Menus] ([Name], [LinkUrl], [DisplayOrder], [IsActive], [ParentId])
VALUES 
    (N'Thực Đơn',       '/san-pham',    1, 1, NULL),
    (N'Về Highlands',   '/gioi-thieu',  2, 1, NULL),
    (N'Tin Tức',        '/tin-tuc',     3, 1, NULL),
    (N'Hỗ Trợ',        '#',            4, 1, NULL);
GO

-- Insert menu con của "Thực Đơn" (Id = 1)
INSERT INTO [dbo].[Menus] ([Name], [LinkUrl], [DisplayOrder], [IsActive], [ParentId])
VALUES 
    (N'Cà Phê',     '/category/1',  1, 1, 1),
    (N'Trà',        '/category/2',  2, 1, 1),
    (N'Freeze',     '/category/3',  3, 1, 1),
    (N'Khác',       '/category/5',  4, 1, 1);
GO

SELECT * FROM [dbo].[Menus];
PRINT N'Thêm dữ liệu menu thành công!';
GO
