/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: thuc hien quan ly danh muc
Ngay thuc hien:15/5/2026
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMS.Data.Entities;
namespace CMS.Data.Entities
{
// Class Category đại diện cho thực thể (Entity) "Danh mục bài viết" trong hệ thống
    // Khi dùng Entity Framework, class này sẽ được chuyển thành một bảng (table) tên là "Categories" trong Database
    public class Category
    {
        // Thuộc tính Id: Khóa chính của bảng (Primary Key). Tự động tăng khi thêm dữ liệu mới.
        public int Id { get; set; }
        
        // Thuộc tính Name: Tên của danh mục (vd: Tin Giáo Dục, Thể Thao...)
        public string Name { get; set; } 
        
        // Thuộc tính Description: Mô tả thêm về danh mục này
        public string Description { get; set; }

        // Mối quan hệ (Relationship): Một danh mục (Category) có thể chứa nhiều bài viết (Post)
        // ICollection<Post> là một danh sách chứa các bài viết.
        // Từ khóa 'virtual' cho phép Entity Framework hỗ trợ tính năng Lazy Loading (tải dữ liệu liên quan khi cần)
        public virtual ICollection<Post> Posts { get; set; }
    }
}