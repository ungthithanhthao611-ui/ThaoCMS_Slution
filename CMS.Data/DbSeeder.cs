/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: Tự động khởi tạo dữ liệu mẫu (Seed Data) cho tất cả các bảng bao gồm Loại sản phẩm, Sản phẩm, Khách hàng, Đơn hàng và Chi tiết đơn hàng
Ngay thuc hien:22/5/2026
*/
using CMS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Data
{
    public static class DbSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            // Bảo đảm database đã được khởi tạo
            context.Database.EnsureCreated();

            // Tự động bổ sung các cột IsNew, IsBestSeller, IsPromo vào bảng Products nếu chưa tồn tại
            try
            {
                context.Database.ExecuteSqlRaw(@"
                    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Products]') AND name = 'IsNew')
                    BEGIN
                        ALTER TABLE [dbo].[Products] ADD [IsNew] BIT NOT NULL DEFAULT 0;
                    END
                    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Products]') AND name = 'IsBestSeller')
                    BEGIN
                        ALTER TABLE [dbo].[Products] ADD [IsBestSeller] BIT NOT NULL DEFAULT 0;
                    END
                    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Products]') AND name = 'IsPromo')
                    BEGIN
                        ALTER TABLE [dbo].[Products] ADD [IsPromo] BIT NOT NULL DEFAULT 0;
                    END
                ");

                // Thêm cột Size vào OrderDetails
                context.Database.ExecuteSqlRaw(@"
                    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[OrderDetails]') AND name = 'Size')
                    BEGIN
                        ALTER TABLE [dbo].[OrderDetails] ADD [Size] NVARCHAR(20) NULL;
                    END
                ");

                // Thêm cột PriceSizeM vào Products
                context.Database.ExecuteSqlRaw(@"
                    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Products]') AND name = 'PriceSizeM')
                    BEGIN
                        ALTER TABLE [dbo].[Products] ADD [PriceSizeM] DECIMAL(18,2) NULL;
                    END
                ");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Lỗi cập nhật cấu trúc bảng Products hoặc OrderDetails: " + ex.Message);
            }

            // 1. Khởi tạo danh mục sản phẩm nếu trống
            if (!context.CategoriesProducts.Any())
            {
                context.CategoriesProducts.AddRange(new List<CategoryProduct>
                {
                    new CategoryProduct { Name = "Điện tử", Description = "Sản phẩm công nghệ, thiết bị điện tử" },
                    new CategoryProduct { Name = "Thời trang", Description = "Quần áo, phụ kiện thời trang" },
                    new CategoryProduct { Name = "Đồ gia dụng", Description = "Sản phẩm dùng trong gia đình" }
                });
                context.SaveChanges();
            }

            // Lấy ID các danh mục đã có/vừa tạo để liên kết với sản phẩm
            var dienTuCat = context.CategoriesProducts.FirstOrDefault(c => c.Name == "Điện tử");
            var thoiTrangCat = context.CategoriesProducts.FirstOrDefault(c => c.Name == "Thời trang");
            var giaDungCat = context.CategoriesProducts.FirstOrDefault(c => c.Name == "Đồ gia dụng");

            // 2. Khởi tạo sản phẩm mẫu nếu trống
            if (!context.Products.Any())
            {
                context.Products.AddRange(new List<Product>
                {
                    new Product 
                    { 
                        Name = "Điện thoại iPhone 15 Pro Max 256GB Titan Tự Nhiên", 
                        Price = 29990000, 
                        StockQuantity = 50, 
                        ImageUrl = "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
                        Description = "Điện thoại thông minh cao cấp nhất của Apple với vỏ titan siêu bền, camera zoom quang học 5x cực đỉnh và hiệu năng xử lý mạnh mẽ nhất thế giới với chip A17 Pro.",
                        CategoryProductId = dienTuCat?.Id ?? 1
                    },
                    new Product 
                    { 
                        Name = "Áo Khoác Blazer Nam Hàn Quốc Lịch Lãm", 
                        Price = 450000, 
                        StockQuantity = 120, 
                        ImageUrl = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
                        Description = "Áo khoác Blazer chất vải Tuyết mưa cao cấp, dáng suông phong cách Hàn Quốc trẻ trung lịch lãm, dễ phối đồ công sở hoặc đi chơi.",
                        CategoryProductId = thoiTrangCat?.Id ?? 2
                    },
                    new Product 
                    { 
                        Name = "Nồi Chiên Không Dầu Philips HD9200/90 6.2 Lít", 
                        Price = 1890000, 
                        StockQuantity = 35, 
                        ImageUrl = "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=800",
                        Description = "Nồi chiên không dầu dung tích lớn 6.2L, công nghệ Rapid Air giảm đến 90% lượng mỡ thừa, lòng nồi phủ chống dính cao cấp dễ vệ sinh.",
                        CategoryProductId = giaDungCat?.Id ?? 3
                    }
                });
                context.SaveChanges();
            }

            // 3. Khởi tạo danh sách khách hàng mẫu nếu trống
            if (!context.Customers.Any())
            {
                context.Customers.AddRange(new List<Customer>
                {
                    new Customer 
                    { 
                        FullName = "Nguyễn Văn An", 
                        Email = "an.nguyen@gmail.com", 
                        Phone = "0912345678", 
                        Address = "123 Nguyễn Trãi, Quận 5, TP.HCM", 
                        Password = "password123" 
                    },
                    new Customer 
                    { 
                        FullName = "Trần Thị Bình", 
                        Email = "binh.tran@yahoo.com", 
                        Phone = "0987654321", 
                        Address = "456 Lê Lợi, Quận 1, TP.HCM", 
                        Password = "password123" 
                    },
                    new Customer 
                    { 
                        FullName = "Lê Hoàng Cường", 
                        Email = "cuong.le@hotmail.com", 
                        Phone = "0909090909", 
                        Address = "789 Cách Mạng Tháng 8, Quận 10, TP.HCM", 
                        Password = "password123" 
                    }
                });
                context.SaveChanges();
            }

            // 4. Khởi tạo đơn hàng mẫu nếu trống
            if (!context.Orders.Any())
            {
                var customers = context.Customers.ToList();
                if (customers.Count >= 3)
                {
                    context.Orders.AddRange(new List<Order>
                    {
                        new Order 
                        { 
                            OrderDate = DateTime.Now, 
                            CustomerId = customers[0].Id, 
                            Status = 0, 
                            Notes = "Giao giờ hành chính, gọi trước khi đến 15 phút." 
                        },
                        new Order 
                        { 
                            OrderDate = DateTime.Now.AddDays(-1), 
                            CustomerId = customers[1].Id, 
                            Status = 1, 
                            Notes = "Đóng gói quà tặng sinh nhật cẩn thận." 
                        },
                        new Order 
                        { 
                            OrderDate = DateTime.Now.AddDays(-3), 
                            CustomerId = customers[2].Id, 
                            Status = 2, 
                            Notes = "Đã thanh toán trước qua chuyển khoản." 
                        }
                    });
                    context.SaveChanges();
                }
            }

            // 5. Khởi tạo chi tiết đơn hàng mẫu nếu trống
            if (!context.OrderDetails.Any())
            {
                var orders = context.Orders.ToList();
                var products = context.Products.ToList();
                if (orders.Count >= 3 && products.Count >= 3)
                {
                    context.OrderDetails.AddRange(new List<OrderDetail>
                    {
                        new OrderDetail 
                        { 
                            OrderId = orders[0].Id, 
                            ProductId = products[0].Id, 
                            Quantity = 1, 
                            UnitPrice = products[0].Price 
                        },
                        new OrderDetail 
                        { 
                            OrderId = orders[1].Id, 
                            ProductId = products[1].Id, 
                            Quantity = 2, 
                            UnitPrice = products[1].Price 
                        },
                        new OrderDetail 
                        { 
                            OrderId = orders[2].Id, 
                            ProductId = products[2].Id, 
                            Quantity = 1, 
                            UnitPrice = products[2].Price 
                        },
                        new OrderDetail 
                        { 
                            OrderId = orders[2].Id, 
                            ProductId = products[1].Id, 
                            Quantity = 1, 
                            UnitPrice = products[1].Price 
                        }
                    });
                    context.SaveChanges();
                }
            }

            // 6. Khởi tạo Banner mẫu nếu trống
            if (!context.Banners.Any())
            {
                context.Banners.AddRange(new List<Banner>
                {
                    new Banner 
                    { 
                        Title = "ĐẶT TRƯỚC - LẤY NGAY", 
                        ImageUrl = "/uploads/banner_1.png", 
                        LinkUrl = "/san-pham", 
                        Description = "Bỏ qua hàng chờ, nhận nước liền tay với HighlandsĐI",
                        DisplayOrder = 1,
                        IsActive = true
                    },
                    new Banner 
                    { 
                        Title = "PHIN SỮA ĐÁ", 
                        ImageUrl = "/uploads/banner_2.png", 
                        LinkUrl = "/san-pham", 
                        Description = "Đậm đà hương vị truyền thống Highlands Coffee",
                        DisplayOrder = 2,
                        IsActive = true
                    },
                    new Banner 
                    { 
                        Title = "FREEZE TRÀ XANH", 
                        ImageUrl = "/uploads/banner_3.png", 
                        LinkUrl = "/san-pham", 
                        Description = "Thơm ngon thanh mát bừng tỉnh năng lượng ngày mới",
                        DisplayOrder = 3,
                        IsActive = true
                    }
                });
                context.SaveChanges();
            }

            // 7. Khởi tạo Menu mẫu nếu trống
            if (!context.Menus.Any())
            {
                var mainMenus = new List<Menu>
                {
                    new Menu { Name = "Thực Đơn",     LinkUrl = "/san-pham",   DisplayOrder = 1, IsActive = true },
                    new Menu { Name = "Về Highlands",  LinkUrl = "/gioi-thieu", DisplayOrder = 2, IsActive = true },
                    new Menu { Name = "Tin Tức",       LinkUrl = "/tin-tuc",    DisplayOrder = 3, IsActive = true },
                    new Menu { Name = "Hỗ Trợ",       LinkUrl = "#",           DisplayOrder = 4, IsActive = true }
                };

                context.Menus.AddRange(mainMenus);
                context.SaveChanges(); // Lưu trước để có Id cho Menu cha

                // Thêm Menu con của "Thực Đơn" (lấy Menu "Thực Đơn" vừa được tạo)
                var thucDonMenu = mainMenus.FirstOrDefault(m => m.Name == "Thực Đơn");
                if (thucDonMenu != null)
                {
                    context.Menus.AddRange(new List<Menu>
                    {
                        new Menu { Name = "Cà Phê",   LinkUrl = "/category/1", DisplayOrder = 1, IsActive = true, ParentId = thucDonMenu.Id },
                        new Menu { Name = "Trà",       LinkUrl = "/category/2", DisplayOrder = 2, IsActive = true, ParentId = thucDonMenu.Id },
                        new Menu { Name = "Freeze",    LinkUrl = "/category/3", DisplayOrder = 3, IsActive = true, ParentId = thucDonMenu.Id },
                        new Menu { Name = "Khác",      LinkUrl = "/category/5", DisplayOrder = 4, IsActive = true, ParentId = thucDonMenu.Id }
                    });
                    context.SaveChanges();
                }
            }
        }
    }
}
