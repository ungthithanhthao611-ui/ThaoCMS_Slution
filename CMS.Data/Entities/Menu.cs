/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: thuc hien quan ly menu
Ngay thuc hien:12/6/2026
*/

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Data.Entities
{
    // Class Menu đại diện cho thực thể (Entity) "Menu điều hướng" trong hệ thống
    public class Menu
    {
        // Khóa chính tự động tăng
        [Key]
        public int Id { get; set; }

        // Tên hiển thị của Menu (vd: Trang chủ, Tin tức...)
        [Required(ErrorMessage = "Tên menu không được để trống")]
        [StringLength(100, ErrorMessage = "Tên menu không được quá 100 ký tự")]
        public string Name { get; set; } = string.Empty;

        // Đường dẫn liên kết của Menu (vd: /, /san-pham, /lien-he...)
        [Required(ErrorMessage = "Đường dẫn không được để trống")]
        [StringLength(255, ErrorMessage = "Đường dẫn không được quá 255 ký tự")]
        public string LinkUrl { get; set; } = string.Empty;

        // Thứ tự hiển thị trên thanh điều hướng
        [Required(ErrorMessage = "Thứ tự hiển thị không được để trống")]
        [Range(1, 1000, ErrorMessage = "Thứ tự hiển thị phải nằm từ 1 đến 1000")]
        public int DisplayOrder { get; set; } = 1;

        // Trạng thái hiển thị (Bật/Tắt)
        public bool IsActive { get; set; } = true;

        // ID của Menu cha (nếu có, để làm menu đa cấp)
        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public virtual Menu? Parent { get; set; }

        public virtual ICollection<Menu>? SubMenus { get; set; }
    }
}
