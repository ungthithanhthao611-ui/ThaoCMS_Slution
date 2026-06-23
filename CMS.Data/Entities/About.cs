using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    public class About
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string SectionName { get; set; } = string.Empty; // e.g. Nguồn gốc, Dịch vụ, Nghề nghiệp

        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Subtitle { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }
    }
}
