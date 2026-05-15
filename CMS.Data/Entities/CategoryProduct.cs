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
    public class CategoryProduct
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên danh mục không được để trống")]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public virtual ICollection<Product>? Products { get; set; }
    }
}