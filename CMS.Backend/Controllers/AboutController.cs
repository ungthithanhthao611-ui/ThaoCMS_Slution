using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize] // Bảo vệ trang quản trị
    public class AboutController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AboutController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Phương thức kiểm tra bảng và tạo seed data nếu chưa có
        private void EnsureTableAndSeedData()
        {
            _context.Database.ExecuteSqlRaw(@"
                IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Abouts' AND xtype='U')
                BEGIN
                    CREATE TABLE Abouts (
                        Id INT IDENTITY(1,1) PRIMARY KEY,
                        SectionName NVARCHAR(250) NOT NULL,
                        Title NVARCHAR(250) NOT NULL,
                        Subtitle NVARCHAR(250) NULL,
                        Content NVARCHAR(MAX) NOT NULL,
                        ImageUrl NVARCHAR(500) NULL
                    )
                END
            ");

            if (!_context.Abouts.Any())
            {
                _context.Abouts.AddRange(new List<About>
                {
                    new About {
                        SectionName = "Nguồn gốc",
                        Title = "NGUỒN GỐC",
                        Subtitle = "CÂU CHUYỆN NÀY LÀ CỦA CHÚNG MÌNH",
                        Content = "Highlands Coffee® được thành lập vào năm 1999, bắt nguồn từ tình yêu dành cho đất Việt cùng với cà phê và cộng đồng nơi đây. Ngay từ những ngày đầu tiên, mục tiêu của chúng mình là có thể phục vụ và góp phần phát triển cộng đồng bằng cách siết chặt thêm sự kết nối.",
                        ImageUrl = "https://www.highlandscoffee.com.vn/vnt_upload/about/ABOUT-CAREER3.jpg"
                    },
                    new About {
                        SectionName = "Dịch vụ",
                        Title = "DỊCH VỤ",
                        Subtitle = "DỊCH VỤ NÀY LÀ CỦA CHÚNG MÌNH",
                        Content = "Highlands Coffee® là không gian của chúng mình nên mọi thứ ở đây đều vì sự thoải mái của chúng mình. Đừng giữ trong lòng, hãy chia sẻ với chúng mình điều bạn mong muốn để cùng nhau giúp Highlands Coffee® trở nên tuyệt vời hơn.",
                        ImageUrl = "https://www.highlandscoffee.com.vn/vnt_upload/about/HLC___ngang_social_1920_x_1280_px_1_1.png"
                    },
                    new About {
                        SectionName = "Nghề nghiệp",
                        Title = "NGHỀ NGHIỆP",
                        Subtitle = "CƠ HỘI NÀY LÀ CỦA CHÚNG MÌNH",
                        Content = "Là điểm hội tụ của cộng đồng, Highlands Coffee® luôn tìm kiếm những thành viên mới với mong muốn không ngừng hoàn thiện một không gian dành cho tất cả mọi người. Chúng mình luôn chào đón bạn trở thành một phần của Highlands Coffee®.",
                        ImageUrl = "https://www.highlandscoffee.com.vn/vnt_upload/about/8W1A6722_1.jpg"
                    }
                });
                _context.SaveChanges();
            }
        }

        // ==================== PHẦN VIEW ADMIN (MVC) ====================
        
        // GET: About
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> Index()
        {
            EnsureTableAndSeedData();
            var list = await _context.Abouts.ToListAsync();
            return View(list);
        }

        // GET: About/Edit/5
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> Edit(int? id)
        {
            EnsureTableAndSeedData();
            if (id == null) return NotFound();

            var about = await _context.Abouts.FindAsync(id);
            if (about == null) return NotFound();

            return View(about);
        }

        // POST: About/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> Edit(int id, [Bind("Id,SectionName,Title,Subtitle,Content,ImageUrl")] About about)
        {
            if (id != about.Id) return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(about);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AboutExists(about.Id)) return NotFound();
                    else throw;
                }
                return RedirectToAction(nameof(Index));
            }
            return View(about);
        }

        // GET: About/Create
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult Create()
        {
            return View();
        }

        // POST: About/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> Create([Bind("SectionName,Title,Subtitle,Content,ImageUrl")] About about)
        {
            if (ModelState.IsValid)
            {
                _context.Add(about);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(about);
        }

        // GET: About/Delete/5
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();

            var about = await _context.Abouts.FindAsync(id);
            if (about == null) return NotFound();

            return View(about);
        }

        // POST: About/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var about = await _context.Abouts.FindAsync(id);
            if (about != null)
            {
                _context.Abouts.Remove(about);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool AboutExists(int id)
        {
            return _context.Abouts.Any(e => e.Id == id);
        }

        // ==================== PHẦN WEB API CHO REACT FRONTEND ====================
        
        // GET: api/About (Không cần đăng nhập)
        [AllowAnonymous]
        [HttpGet("/api/About")]
        public async Task<IActionResult> GetAboutSections()
        {
            EnsureTableAndSeedData();
            var list = await _context.Abouts.ToListAsync();
            return Ok(list);
        }
    }
}
