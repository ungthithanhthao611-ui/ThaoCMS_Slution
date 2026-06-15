using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    // [BUỔI 6] 1. Định nghĩa đường dẫn để gọi API. [controller] sẽ tự lấy tên là "Products"
    // Khi chạy, địa chỉ truy cập dữ liệu sẽ là: https://localhost:xxxx/api/products
    [Route("api/[controller]")]

    // [BUỔI 6] 2. Đánh dấu đây là một API Controller để hệ thống hỗ trợ các tính năng tự động kiểm tra dữ liệu đầu vào
    [ApiController]

    // [BUỔI 6] 3. API Controller phải kế thừa từ ControllerBase (thay vì kế thừa từ Controller như phân hệ MVC)
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // [BUỔI 6] 4. Hàm khởi tạo (Constructor): "Tiêm" ngữ cảnh dữ liệu SQL Server vào để sử dụng
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // [BUỔI 6] 1. Chỉ định phương thức GET (Dùng để kéo dữ liệu từ cơ sở dữ liệu)
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] decimal? minPrice = null, [FromQuery] decimal? maxPrice = null, [FromQuery] string? search = null)
        {
            var query = _context.Products.AsQueryable();

            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                var lowerSearch = search.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(lowerSearch) || (p.Description != null && p.Description.ToLower().Contains(lowerSearch)));
            }

            var products = await query
                .OrderByDescending(p => p.Id) // Sắp xếp sản phẩm mới nhất lên đầu
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.SalePrice,
                    p.ImageUrl,
                    p.StockQuantity
                })
                .ToListAsync();

            // Trả về kết quả cho Frontend kèm mã trạng thái HTTP 200 OK (Thành công)
            return Ok(products);
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatest()
        {
            var products = await _context.Products
                .OrderByDescending(p => p.Id)
                .Take(3)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.SalePrice,
                    p.ImageUrl,
                    p.StockQuantity
                })
                .ToListAsync();

            return Ok(products);
        }

        // GET: api/products/sale - Lấy sản phẩm đang có giá sale (SalePrice != null)
        [HttpGet("sale")]
        public async Task<IActionResult> GetSale()
        {
            var products = await _context.Products
                .Where(p => p.SalePrice != null && p.SalePrice > 0 && p.SalePrice < p.Price)
                .OrderByDescending(p => p.Price - p.SalePrice) // Ưu tiên SP giảm nhiều nhất
                .Take(3)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.SalePrice,
                    p.ImageUrl,
                    p.StockQuantity
                })
                .ToListAsync();

            // Nếu chưa có sản phẩm sale, fallback lấy sản phẩm mới nhất
            if (!products.Any())
            {
                var fallback = await _context.Products
                    .OrderByDescending(p => p.Id)
                    .Take(3)
                    .Select(p => new {
                        p.Id,
                        p.Name,
                        p.Price,
                        p.SalePrice,
                        p.ImageUrl,
                        p.StockQuantity
                    })
                    .ToListAsync();
                return Ok(fallback);
            }

            return Ok(products);
        }

        // Giữ lại endpoint hot để tương thích ngược
        [HttpGet("hot")]
        public async Task<IActionResult> GetHot()
        {
            var hotProductIds = await _context.OrderDetails
                .GroupBy(od => od.ProductId)
                .OrderByDescending(g => g.Sum(x => x.Quantity))
                .Select(g => g.Key)
                .Take(3)
                .ToListAsync();

            var productsList = new List<Product>();

            if (hotProductIds.Any())
            {
                var dbProducts = await _context.Products
                    .Where(p => hotProductIds.Contains(p.Id))
                    .ToListAsync();
                
                foreach (var id in hotProductIds)
                {
                    var p = dbProducts.FirstOrDefault(x => x.Id == id);
                    if (p != null) productsList.Add(p);
                }
            }

            if (productsList.Count < 3)
            {
                var remainingCount = 3 - productsList.Count;
                var excludeIds = productsList.Select(p => p.Id).ToList();
                var fallbackProducts = await _context.Products
                    .Where(p => !excludeIds.Contains(p.Id))
                    .Take(remainingCount)
                    .ToListAsync();
                productsList.AddRange(fallbackProducts);
            }

            var result = productsList.Select(p => new {
                p.Id,
                p.Name,
                p.Price,
                p.SalePrice,
                p.ImageUrl,
                p.StockQuantity
            });

            return Ok(result);
        }

        // [BUỔI 6] 2. Định nghĩa đường dẫn chứa tham số động: api/products/category/{categoryProductId}
        [HttpGet("category/{categoryProductId}")]
        public async Task<IActionResult> GetByCategoryProduct(int categoryProductId)
        {
            // Lọc các sản phẩm có CategoryProductId trùng với ID truyền vào từ thanh URL
            var products = await _context.Products
                .Where(p => p.CategoryProductId == categoryProductId)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.SalePrice,
                    p.ImageUrl,
                    p.StockQuantity
                })
                .ToListAsync();

            return Ok(products);
        }

        // [BUỔI 6] 3. Định nghĩa đường dẫn nhận ID trực tiếp: api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            // 3.1. Quét bảng Products để tìm sản phẩm đầu tiên có Id khớp với tham số
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id);

            // 3.2 Xử lý kịch bản lỗi bảo vệ hệ thống: ID không tồn tại trong Database
            if (product == null)
            {
                // Trả về mã lỗi 404 kèm một "gói tin" JSON thông báo nhỏ gọn để Frontend tự xử lý UI
                return NotFound(new { message = "Không tìm thấy sản phẩm này trong hệ thống" });
            }

            // 3.3. Trả về toàn bộ đối tượng sản phẩm (bao gồm cả trường Description chứa mô tả) kèm mã 200 OK
            return Ok(product);
        }
    }
}
