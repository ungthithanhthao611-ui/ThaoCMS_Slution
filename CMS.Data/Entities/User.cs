/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: Thực hiện quản lý danh sách người dùng
Ngay thuc hien:15/5/2026
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; } // Quản trị viên hoặc Biên tập viên
    }
}
