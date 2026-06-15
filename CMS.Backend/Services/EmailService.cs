using CMS.Data.Entities;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace CMS.Backend.Services
{
    public interface IEmailService
    {
        Task SendOrderConfirmationEmailAsync(Order order, Customer customer, List<OrderDetail> details);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendOrderConfirmationEmailAsync(Order order, Customer customer, List<OrderDetail> details)
        {
            var server = _configuration["SmtpSettings:Server"] ?? "smtp.gmail.com";
            var portStr = _configuration["SmtpSettings:Port"] ?? "587";
            int port = int.TryParse(portStr, out int p) ? p : 587;
            var senderName = _configuration["SmtpSettings:SenderName"] ?? "Highlands Coffee";
            var senderEmail = _configuration["SmtpSettings:SenderEmail"] ?? "";
            var username = _configuration["SmtpSettings:Username"] ?? "";
            var password = _configuration["SmtpSettings:Password"] ?? "";

            if (string.IsNullOrEmpty(senderEmail) || string.IsNullOrEmpty(customer.Email))
            {
                Console.WriteLine("Sender email or Customer email is empty. Skipping email send.");
                return;
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(senderName, senderEmail));
            message.To.Add(new MailboxAddress(customer.FullName, customer.Email));
            message.Subject = $"Xác nhận đơn hàng #{order.Id} - Highlands Coffee";

            var bodyBuilder = new BodyBuilder();
            
            // Build a beautiful HTML body
            string itemsHtml = "";
            decimal totalAmount = 0;
            foreach (var detail in details)
            {
                var itemTotal = detail.Quantity * detail.UnitPrice;
                totalAmount += itemTotal;
                itemsHtml += $@"
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd;'>{(detail.Product?.Name ?? $"Sản phẩm #{detail.ProductId}")}</td>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd; text-align: center;'>{detail.Quantity}</td>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd; text-align: right;'>{detail.UnitPrice:N0} VNĐ</td>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd; text-align: right;'>{itemTotal:N0} VNĐ</td>
                </tr>";
            }

            bodyBuilder.HtmlBody = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;'>
                <div style='text-align: center; border-bottom: 2px solid #b22830; padding-bottom: 10px;'>
                    <img src='https://www.highlandscoffee.com.vn/vnt_upload/weblink/red_BG_logo800.png' alt='Highlands Coffee' style='max-width: 120px;' />
                    <h2 style='color: #b22830;'>Cảm ơn bạn đã đặt hàng!</h2>
                </div>
                <div style='padding: 20px 0;'>
                    <p>Xin chào <strong>{customer.FullName}</strong>,</p>
                    <p>Đơn hàng của bạn đã được nhận và đang được xử lý.</p>
                    
                    <h3 style='color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px;'>Thông tin đơn hàng #{order.Id}</h3>
                    <p><strong>Ngày đặt:</strong> {order.OrderDate:dd/MM/yyyy HH:mm}</p>
                    <p><strong>Địa chỉ giao hàng:</strong> {order.DeliveryAddress}</p>
                    {(order.DeliveryTime.HasValue ? $"<p><strong>Thời gian giao mong muốn:</strong> {order.DeliveryTime.Value:dd/MM/yyyy HH:mm}</p>" : "<p><strong>Thời gian giao:</strong> Giao ngay</p>")}
                    {(!string.IsNullOrEmpty(order.Notes) ? $"<p><strong>Ghi chú:</strong> {order.Notes}</p>" : "")}

                    <h3 style='color: #333; margin-top: 20px;'>Chi tiết sản phẩm</h3>
                    <table style='width: 100%; border-collapse: collapse;'>
                        <thead>
                            <tr style='background-color: #f8f8f8;'>
                                <th style='text-align: left; padding: 8px; border-bottom: 2px solid #ddd;'>Sản phẩm</th>
                                <th style='text-align: center; padding: 8px; border-bottom: 2px solid #ddd;'>SL</th>
                                <th style='text-align: right; padding: 8px; border-bottom: 2px solid #ddd;'>Đơn giá</th>
                                <th style='text-align: right; padding: 8px; border-bottom: 2px solid #ddd;'>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsHtml}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan='3' style='text-align: right; padding: 8px; font-weight: bold;'>Tổng cộng:</td>
                                <td style='text-align: right; padding: 8px; font-weight: bold; color: #b22830;'>{totalAmount:N0} VNĐ</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div style='text-align: center; border-top: 1px solid #eee; padding-top: 15px; font-size: 12px; color: #777;'>
                    <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua hotline hoặc email hỗ trợ.</p>
                    <p>© Highlands Coffee. All rights reserved.</p>
                </div>
            </div>";

            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            try
            {
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                await client.ConnectAsync(server, port, SecureSocketOptions.StartTls);
                
                if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password) && password != "your-app-password")
                {
                    await client.AuthenticateAsync(username, password);
                }

                await client.SendAsync(message);
                await client.DisconnectAsync(true);
                Console.WriteLine($"Email successfully sent to {customer.Email} for Order #{order.Id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email to {customer.Email}: {ex.Message}");
                throw;
            }
        }
    }
}
