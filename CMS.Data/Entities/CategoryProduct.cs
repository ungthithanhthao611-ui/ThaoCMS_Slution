/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: thuc hien quan ly danh muc sản phẩm 
Ngay thuc hien:15/5/2026
*/

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    // Class CategoryProduct đại diện cho bảng "Danh mục sản phẩm" trong Database
    public class CategoryProduct
    {
        // [Key]: Annotation chỉ định thuộc tính Id là khóa chính của bảng
        [Key]
        public int Id { get; set; }

        // [Required]: Bắt buộc không được để trống khi nhập liệu. Sẽ báo lỗi ErrorMessage nếu để trống.
        [Required(ErrorMessage = "Tên danh mục không được để trống")]
        // [StringLength(100)]: Giới hạn độ dài tối đa của cột này trong DB là 100 ký tự (varchar(100))
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        // Dấu chấm hỏi '?' ở kiểu string (string?) nghĩa là cho phép trường này nhận giá trị null (có thể bỏ trống)
        public string? Description { get; set; }

        // Mối quan hệ 1-Nhiều: Một CategoryProduct có thể chứa nhiều Product
        public virtual ICollection<Product>? Products { get; set; }
    }
}