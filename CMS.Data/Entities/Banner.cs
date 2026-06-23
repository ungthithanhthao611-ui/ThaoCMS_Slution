/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
 Lop:CCQ2311E
 Mo ta: Thực hiện khai báo thực thể Banner phục vụ quản lý Banner quảng cáo/slide
*/
using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    public class Banner
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Tiêu đề banner không được để trống")]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Hình ảnh banner không được để trống")]
        public string ImageUrl { get; set; } = string.Empty;

        public string? LinkUrl { get; set; }

        public string? Description { get; set; }

        public int DisplayOrder { get; set; } = 0;

        public bool IsActive { get; set; } = true;
    }
}
