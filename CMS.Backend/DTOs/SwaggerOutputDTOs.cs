using System;
using System.Collections.Generic;

namespace CMS.Backend.DTOs
{
    // ==========================================
    // CÁC DTO ĐẦU RA (OUTPUT) DÀNH CHO SWAGGER UI
    // Lưu ý: Các class này chỉ để Swagger sinh ra Schema Document,
    // không làm thay đổi logic trả về anonymous object trong Controller.
    // ==========================================

    public class ProductOutDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal? SalePrice { get; set; }
        public string ImageUrl { get; set; }
        public int StockQuantity { get; set; }
    }

    public class ProductDetailOutDTO : ProductOutDTO
    {
        public string Description { get; set; }
        public int? CategoryId { get; set; }
    }

    public class OrderOutDTO
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public int Status { get; set; }
        public string Notes { get; set; }
        public string ReceiverName { get; set; }
        public string ReceiverPhone { get; set; }
        public string ShippingAddress { get; set; }
        public List<OrderDetailOutDTO> OrderDetails { get; set; }
    }

    public class OrderDetailOutDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public string Size { get; set; }
    }

    public class ReviewOutDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string AvatarUrl { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CategoryOutDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class MenuOutDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LinkUrl { get; set; }
        public int DisplayOrder { get; set; }
        public int? ParentId { get; set; }
    }

    public class BannerOutDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string LinkUrl { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class PostOutDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsPublished { get; set; }
        public int? CategoryPostId { get; set; }
    }

    public class CategoryProductOutDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int DisplayOrder { get; set; }
        public List<ProductOutDTO> Products { get; set; }
    }
}
