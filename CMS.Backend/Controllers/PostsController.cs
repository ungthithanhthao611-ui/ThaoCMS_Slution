using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.DTOs;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// API Endpoint 1: GET https://localhost:7111/api/Posts
        /// Nhận tham số lọc động gửi từ { params: filters } của dịch vụ postService.js
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<PostOutDTO>), 200)]
        public async Task<IActionResult> GetAll([FromQuery] int? categoryId)
        {
            try
            {
                var query = _context.Posts.AsQueryable();

                if (categoryId.HasValue)
                {
                    query = query.Where(p => p.CategoryId == categoryId.Value);
                }

                query = query.OrderByDescending(p => p.CreatedDate);

                var result = await query.ToListAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi hệ thống SQL Server khi tải danh sách tin tức: {ex.Message}");
            }
        }

        /// <summary>
        /// API Endpoint 2: GET https://localhost:7111/api/Posts/{id}
        /// Truy vấn chi tiết một bài viết độc bản theo khóa chính ID phục vụ trang BlogDetail
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            try
            {
                var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);

                if (post == null)
                {
                    return NotFound(new { message = "Bài viết này không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống ThaoCMS" });
                }

                return Ok(post);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi hệ thống SQL Server khi tải chi tiết bài viết: {ex.Message}");
            }
        }

        /// <summary>
        /// GET: api/posts/latest - Lấy 3 bài viết mới nhất cho trang chủ (phục vụ yêu cầu hiển thị Swagger)
        /// </summary>
        [HttpGet("latest")]
        public async Task<IActionResult> GetLatest()
        {
            try
            {
                var posts = await _context.Posts
                    .Include(p => p.Category)
                    .OrderByDescending(p => p.Id)
                    .Take(3)
                    .Select(p => new {
                        p.Id,
                        p.Title,
                        p.ImageUrl,
                        p.CreatedDate,
                        CategoryName = p.Category != null ? p.Category.Name : ""
                    })
                    .ToListAsync();

                return Ok(posts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi hệ thống SQL Server khi tải danh sách tin tức mới nhất: {ex.Message}");
            }
        }
    }
}
