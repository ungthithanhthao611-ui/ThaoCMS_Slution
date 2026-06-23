-- Script tạo bảng Menus cho database ThanhThaoCMS_DB
-- Chạy trong SQL Server Management Studio (SSMS)

USE ThanhThaoCMS_DB;
GO

-- Kiểm tra nếu bảng chưa tồn tại thì mới tạo
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Menus')
BEGIN
    CREATE TABLE [dbo].[Menus] (
        [Id]            INT            NOT NULL IDENTITY(1,1),
        [Name]          NVARCHAR(100)  NOT NULL,
        [LinkUrl]       NVARCHAR(255)  NOT NULL,
        [DisplayOrder]  INT            NOT NULL DEFAULT 1,
        [IsActive]      BIT            NOT NULL DEFAULT 1,
        [ParentId]      INT            NULL,
        CONSTRAINT [PK_Menus] PRIMARY KEY CLUSTERED ([Id] ASC),
        CONSTRAINT [FK_Menus_Menus_ParentId] FOREIGN KEY ([ParentId])
            REFERENCES [dbo].[Menus] ([Id]) ON DELETE NO ACTION
    );

    CREATE INDEX [IX_Menus_ParentId] ON [dbo].[Menus] ([ParentId]);

    -- Ghi nhận migration vào bảng __EFMigrationsHistory
    INSERT INTO [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES ('20260612063000_AddMenusTable', '8.0.23');

    PRINT 'Tạo bảng Menus thành công!';
END
ELSE
BEGIN
    PRINT 'Bảng Menus đã tồn tại.';
END
GO
