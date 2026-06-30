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
using System.Threading.Tasks;
using CMS.Backend.Services;

using X.PagedList;

//Controller quản lý đơn hàng
namespace CMS.Backend.Controllers
{
    [Authorize] // [BUỔI 5]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public OrderController(ApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // ==========================================
        // 1. HIỂN THỊ DANH SÁCH ĐƠN HÀNG
        // ==========================================
        public IActionResult Index(int? page)
        {
            int pageSize = 5;
            int pageNumber = page ?? 1;

            // Nạp kèm thông tin Khách hàng để hiển thị Tên Khách Hàng thay vì chỉ ID
            var data = _context.Orders.Include(o => o.Customer).OrderByDescending(o => o.OrderDate).ToPagedList(pageNumber, pageSize);
            return View(data);
        }

        // ==========================================
        // 2. CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG (UPDATE STATUS)
        // ==========================================
        public async Task<IActionResult> UpdateStatus(int id, int status)
        {
            var order = await _context.Orders.Include(o => o.Customer).FirstOrDefaultAsync(o => o.Id == id);
            if (order != null)
            {
                order.Status = status;
                await _context.SaveChangesAsync();
                
                // Gửi email thông báo trạng thái
                await _emailService.SendOrderStatusChangedEmailAsync(order, order.Customer);
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