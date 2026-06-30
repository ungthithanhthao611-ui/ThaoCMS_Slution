using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Data.Entities
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        public int ProductId { get; set; }

        public int CustomerId { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; } // Số sao: 1 đến 5

        public string? Comment { get; set; } // Nội dung bình luận

        public string? ImageUrl { get; set; } // Link ảnh tải lên nếu có

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [ForeignKey("ProductId")]
        public virtual Product? Product { get; set; }

        [ForeignKey("CustomerId")]
        public virtual Customer? Customer { get; set; }
    }
}
