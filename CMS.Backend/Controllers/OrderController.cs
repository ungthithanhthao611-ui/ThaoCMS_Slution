/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: thuc hien quan ly danh mục sản phẩm 
*/
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Authorization; // [BUỔI 5]
using Microsoft.EntityFrameworkCore; // Hỗ trợ Eager Loading (Include)

//Controller quản lý đơn hàng
namespace CMS.Backend.Controllers
{
    [Authorize] // [BUỔI 5]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. HIỂN THỊ DANH SÁCH ĐƠN HÀNG
        // ==========================================
        public IActionResult Index()
        {
            // Nạp kèm thông tin Khách hàng để hiển thị Tên Khách Hàng thay vì chỉ ID
            var data = _context.Orders.Include(o => o.Customer).ToList();
            return View(data);
        }

        // ==========================================
        // 2. CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG (UPDATE STATUS)
        // ==========================================
        public IActionResult UpdateStatus(int id, int status)
        {
            var order = _context.Orders.Find(id);
            if (order != null)
            {
                order.Status = status;
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        // ==========================================
        // 3. XÓA ĐƠN HÀNG (DELETE CASCADING)
        // ==========================================
        public IActionResult Delete(int id)
        {
            var order = _context.Orders.Include(o => o.OrderDetails).FirstOrDefault(o => o.Id == id);
            if (order != null)
            {
                // Xóa chi tiết đơn hàng trước do ràng buộc khóa ngoại
                if (order.OrderDetails != null && order.OrderDetails.Any())
                {
                    _context.OrderDetails.RemoveRange(order.OrderDetails);
                }
                _context.Orders.Remove(order);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}