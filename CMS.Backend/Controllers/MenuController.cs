/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
 Lop:CCQ2311E
 Mo ta: Quản lý CRUD Menu trong trang Admin (MVC)
 Ngay thuc hien:12/6/2026
*/

using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class MenuController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MenuController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Menu
        public IActionResult Index()
        {
            var data = _context.Menus
                .Include(m => m.Parent)
                .OrderBy(m => m.DisplayOrder)
                .ToList();
            return View(data);
        }

        // GET: Menu/Create
        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.ParentId = new SelectList(_context.Menus.Where(m => m.ParentId == null).ToList(), "Id", "Name");
            return View();
        }

        // POST: Menu/Create
        [HttpPost]
        public IActionResult Create(Menu model)
        {
            if (ModelState.IsValid)
            {
                _context.Menus.Add(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ParentId = new SelectList(_context.Menus.Where(m => m.ParentId == null).ToList(), "Id", "Name", model.ParentId);
            return View(model);
        }

        // GET: Menu/Edit/5
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var menu = _context.Menus.Find(id);
            if (menu == null) return NotFound();
            ViewBag.ParentId = new SelectList(_context.Menus.Where(m => m.ParentId == null && m.Id != id).ToList(), "Id", "Name", menu.ParentId);
            return View(menu);
        }

        // POST: Menu/Edit/5
        [HttpPost]
        public IActionResult Edit(Menu model)
        {
            if (ModelState.IsValid)
            {
                var existing = _context.Menus.Find(model.Id);
                if (existing == null) return NotFound();

                existing.Name = model.Name;
                existing.LinkUrl = model.LinkUrl;
                existing.DisplayOrder = model.DisplayOrder;
                existing.IsActive = model.IsActive;
                existing.ParentId = model.ParentId;

                _context.Menus.Update(existing);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ParentId = new SelectList(_context.Menus.Where(m => m.ParentId == null && m.Id != model.Id).ToList(), "Id", "Name", model.ParentId);
            return View(model);
        }

        // GET: Menu/Delete/5
        [HttpGet]
        public IActionResult Delete(int id)
        {
            var menu = _context.Menus.Include(m => m.Parent).FirstOrDefault(m => m.Id == id);
            if (menu == null) return NotFound();
            return View(menu);
        }

        // POST: Menu/Delete/5
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            var menu = _context.Menus.Find(id);
            if (menu != null)
            {
                // Tìm các menu con để xóa hoặc cập nhật ParentId của chúng về null
                var submenus = _context.Menus.Where(m => m.ParentId == id).ToList();
                foreach (var sub in submenus)
                {
                    sub.ParentId = null;
                    _context.Menus.Update(sub);
                }

                _context.Menus.Remove(menu);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}
