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
        Task SendForgotPasswordOtpEmailAsync(Customer customer, string otp);
        Task SendAdminNewOrderNotificationEmailAsync(Order order, Customer customer, List<OrderDetail> details);
        Task SendItemCancelledEmailAsync(Customer customer, Order order, Product cancelledProduct, string cancelReason);
        Task SendOrderStatusChangedEmailAsync(Order order, Customer customer);
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
            message.Subject = $"Hoa don don hang #{order.Id} tu Highlands Coffee";

            // Add headers to prevent spam
            message.Headers.Add("X-Mailer", "Microsoft Outlook");
            message.Headers.Add("X-Priority", "3"); // Normal Priority
            message.Headers.Add("Importance", "Normal");

            var bodyBuilder = new BodyBuilder();
            
            // Build a clean, simplified HTML body
            string itemsHtml = "";
            decimal totalAmount = 0;
            foreach (var detail in details)
            {
                var itemTotal = detail.Quantity * detail.UnitPrice;
                totalAmount += itemTotal;
                itemsHtml += $@"
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd;'>{(detail.Product?.Name ?? $"San pham #{detail.ProductId}")}</td>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd; text-align: center;'>{detail.Quantity}</td>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd; text-align: right;'>{detail.UnitPrice:N0} VND</td>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd; text-align: right;'>{itemTotal:N0} VND</td>
                </tr>";
            }

            bodyBuilder.HtmlBody = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;'>
                <div style='text-align: center; border-bottom: 2px solid #b22830; padding-bottom: 10px;'>
                    <h2 style='color: #b22830; margin: 0;'>HIGHLANDS COFFEE</h2>
                    <p style='margin: 5px 0 0 0; color: #777;'>Cam on ban da dat hang tai Highlands Coffee!</p>
                </div>
                <div style='padding: 20px 0;'>
                    <p>Kinh chao <strong>{customer.FullName}</strong>,</p>
                    <p>Yeu cau dat hang cua ban da duoc tiep nhan va dang duoc xu ly.</p>
                    
                    <h3 style='color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px;'>Thong tin don hang #{order.Id}</h3>
                    <p><strong>Ngay dat:</strong> {order.OrderDate:dd/MM/yyyy HH:mm}</p>
                    <p><strong>Dia chi giao hang:</strong> {order.DeliveryAddress}</p>
                    {(order.DeliveryTime.HasValue ? $"<p><strong>Thoi gian giao hang:</strong> {order.DeliveryTime.Value:dd/MM/yyyy HH:mm}</p>" : "<p><strong>Thoi gian giao hang:</strong> Giao ngay</p>")}
                    {(!string.IsNullOrEmpty(order.Notes) ? $"<p><strong>Ghi chu:</strong> {order.Notes}</p>" : "")}

                    <h3 style='color: #333; margin-top: 20px;'>Chi tiet san pham</h3>
                    <table style='width: 100%; border-collapse: collapse;'>
                        <thead>
                            <tr style='background-color: #f8f8f8;'>
                                <th style='text-align: left; padding: 8px; border-bottom: 2px solid #ddd;'>San pham</th>
                                <th style='text-align: center; padding: 8px; border-bottom: 2px solid #ddd;'>SL</th>
                                <th style='text-align: right; padding: 8px; border-bottom: 2px solid #ddd;'>Don gia</th>
                                <th style='text-align: right; padding: 8px; border-bottom: 2px solid #ddd;'>Thanh tien</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsHtml}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan='3' style='text-align: right; padding: 8px; font-weight: bold;'>Tong cong:</td>
                                <td style='text-align: right; padding: 8px; font-weight: bold; color: #b22830;'>{totalAmount:N0} VND</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div style='text-align: center; border-top: 1px solid #eee; padding-top: 15px; font-size: 12px; color: #777;'>
                    <p>Cam on ban da tin tuong va lua chon Highlands Coffee.</p>
                    <p>&copy; Highlands Coffee. All rights reserved.</p>
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

        public async Task SendForgotPasswordOtpEmailAsync(Customer customer, string otp)
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
                Console.WriteLine("Sender email or Customer email is empty. Skipping OTP email send.");
                return;
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(senderName, senderEmail));
            message.To.Add(new MailboxAddress(customer.FullName, customer.Email));
            message.Subject = "Ma OTP khoi phuc mat khau tu Highlands Coffee";

            // Add headers to prevent spam
            message.Headers.Add("X-Mailer", "Microsoft Outlook");
            message.Headers.Add("X-Priority", "3"); // Normal Priority
            message.Headers.Add("Importance", "Normal");

            var bodyBuilder = new BodyBuilder();

            bodyBuilder.HtmlBody = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;'>
                <div style='text-align: center; border-bottom: 2px solid #b22830; padding-bottom: 10px;'>
                    <h2 style='color: #b22830; margin: 0;'>HIGHLANDS COFFEE</h2>
                    <p style='margin: 5px 0 0 0; color: #777;'>Khoi phuc mat khau tai khoa cua ban</p>
                </div>
                <div style='padding: 20px 0; text-align: center;'>
                    <p style='text-align: left;'>Kinh chao <strong>{customer.FullName}</strong>,</p>
                    <p style='text-align: left;'>Chung toi da nhan duoc yeu cau khoi phuc mat khau cua ban. Duoi day la ma xac thuc OTP cua ban:</p>
                    
                    <div style='background-color: #f8f8f8; border: 1px dashed #b22830; display: inline-block; padding: 15px 30px; font-size: 24px; font-weight: bold; color: #b22830; letter-spacing: 5px; margin: 20px 0; border-radius: 8px;'>
                        {otp}
                    </div>
                    
                    <p style='text-align: left; font-size: 14px; color: #555;'>Ma xac thuc nay co hieu luc trong vong 5 phut. Vui long khong chia se ma nay voi bat ky ai.</p>
                </div>
                <div style='text-align: center; border-top: 1px solid #eee; padding-top: 15px; font-size: 12px; color: #777;'>
                    <p>Neu ban khong yeu cau khoi phuc mat khau, vui long bo qua email nay.</p>
                    <p>&copy; Highlands Coffee. All rights reserved.</p>
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
                Console.WriteLine($"OTP Email successfully sent to {customer.Email}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send OTP email to {customer.Email}: {ex.Message}");
                throw;
            }
        }

        public async Task SendAdminNewOrderNotificationEmailAsync(Order order, Customer customer, List<OrderDetail> details)
        {
            var server = _configuration["SmtpSettings:Server"] ?? "smtp.gmail.com";
            var portStr = _configuration["SmtpSettings:Port"] ?? "587";
            int port = int.TryParse(portStr, out int p) ? p : 587;
            var senderName = _configuration["SmtpSettings:SenderName"] ?? "Highlands Coffee System";
            var senderEmail = _configuration["SmtpSettings:SenderEmail"] ?? "";
            var username = _configuration["SmtpSettings:Username"] ?? "";
            var password = _configuration["SmtpSettings:Password"] ?? "";

            if (string.IsNullOrEmpty(senderEmail))
            {
                Console.WriteLine("Sender/Admin email is empty. Skipping admin notification.");
                return;
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(senderName, senderEmail));
            message.To.Add(new MailboxAddress("System Admin", senderEmail)); // Gửi trực tiếp đến email của Admin
            message.Subject = $"[THAO CMS] Co don hang moi can duyet #{order.Id}";

            message.Headers.Add("X-Mailer", "Microsoft Outlook");
            message.Headers.Add("X-Priority", "2");
            message.Headers.Add("Importance", "High");

            var bodyBuilder = new BodyBuilder();
            string itemsHtml = "";
            decimal totalAmount = 0;
            foreach (var detail in details)
            {
                var itemTotal = detail.Quantity * detail.UnitPrice;
                totalAmount += itemTotal;
                itemsHtml += $@"
                <tr>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd;'>{(detail.Product?.Name ?? $"San pham #{detail.ProductId}")}</td>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd; text-align: center;'>{detail.Quantity}</td>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd; text-align: right;'>{detail.UnitPrice:N0} VND</td>
                    <td style='padding: 8px; border-bottom: 1px solid #ddd; text-align: right;'>{itemTotal:N0} VND</td>
                </tr>";
            }

            bodyBuilder.HtmlBody = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;'>
                <div style='text-align: center; border-bottom: 2px solid #b22830; padding-bottom: 10px;'>
                    <h2 style='color: #b22830; margin: 0;'>THONG BAO DON HANG MOI</h2>
                    <p style='margin: 5px 0 0 0; color: #777;'>He thong vua nhan duoc mot don hang moi can duoc duyet.</p>
                </div>
                <div style='padding: 20px 0;'>
                    <p>Kinh chao <strong>Admin</strong>,</p>
                    <p>Khach hang <strong>{customer.FullName}</strong> (Email: {customer.Email} | SDT: {customer.Phone}) vua dat don hang moi tren he thong.</p>
                    
                    <h3 style='color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px;'>Thong tin don hang #{order.Id}</h3>
                    <p><strong>Trang thai hien tai:</strong> <span style='background-color: #ffc107; padding: 3px 8px; border-radius: 4px; font-weight: bold;'>Cho duyet</span></p>
                    <p><strong>Ngay dat:</strong> {order.OrderDate:dd/MM/yyyy HH:mm}</p>
                    <p><strong>Dia chi giao hang:</strong> {order.DeliveryAddress}</p>
                    {(order.DeliveryTime.HasValue ? $"<p><strong>Thoi gian giao:</strong> {order.DeliveryTime.Value:dd/MM/yyyy HH:mm}</p>" : "<p><strong>Thoi gian giao:</strong> Giao ngay</p>")}
                    {(!string.IsNullOrEmpty(order.Notes) ? $"<p><strong>Ghi chu cua khach:</strong> {order.Notes}</p>" : "")}

                    <h3 style='color: #333; margin-top: 20px;'>Chi tiet san pham</h3>
                    <table style='width: 100%; border-collapse: collapse;'>
                        <thead>
                            <tr style='background-color: #f8f8f8;'>
                                <th style='text-align: left; padding: 8px; border-bottom: 2px solid #ddd;'>San pham</th>
                                <th style='text-align: center; padding: 8px; border-bottom: 2px solid #ddd;'>SL</th>
                                <th style='text-align: right; padding: 8px; border-bottom: 2px solid #ddd;'>Don gia</th>
                                <th style='text-align: right; padding: 8px; border-bottom: 2px solid #ddd;'>Thanh tien</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsHtml}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan='3' style='text-align: right; padding: 8px; font-weight: bold;'>Tong cong:</td>
                                <td style='text-align: right; padding: 8px; font-weight: bold; color: #b22830;'>{totalAmount:N0} VND</td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <div style='margin-top: 30px; text-align: center;'>
                        <a href='https://localhost:7030/Order' style='background-color: #b22830; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;'>DI DEN TRANG QUAN LY DON HANG</a>
                    </div>
                </div>
                <div style='text-align: center; border-top: 1px solid #eee; padding-top: 15px; font-size: 12px; color: #777;'>
                    <p>&copy; ThaoCMS System Notification.</p>
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
                Console.WriteLine($"Admin notification email sent for Order #{order.Id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send admin notification email: {ex.Message}");
            }
        }

        public async Task SendItemCancelledEmailAsync(Customer customer, Order order, Product cancelledProduct, string cancelReason)
        {
            var server = _configuration["SmtpSettings:Server"] ?? "smtp.gmail.com";
            var portStr = _configuration["SmtpSettings:Port"] ?? "587";
            int port = int.TryParse(portStr, out int p) ? p : 587;
            var senderName = _configuration["SmtpSettings:SenderName"] ?? "Highlands Coffee System";
            var senderEmail = _configuration["SmtpSettings:SenderEmail"] ?? "";
            var username = _configuration["SmtpSettings:Username"] ?? "";
            var password = _configuration["SmtpSettings:Password"] ?? "";

            if (string.IsNullOrEmpty(senderEmail) || string.IsNullOrEmpty(customer.Email))
            {
                Console.WriteLine("Sender/Customer email is empty. Skipping cancel item notification.");
                return;
            }

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(senderName, senderEmail));
            message.To.Add(new MailboxAddress(customer.FullName, customer.Email));
            message.Subject = $"[THONG BAO] Thay doi chi tiet don hang #{order.Id}";

            message.Headers.Add("X-Priority", "1"); // High Priority
            message.Headers.Add("Importance", "High");

            var bodyBuilder = new BodyBuilder();

            bodyBuilder.HtmlBody = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;'>
                <div style='text-align: center; border-bottom: 2px solid #b22830; padding-bottom: 10px;'>
                    <h2 style='color: #b22830; margin: 0;'>THONG BAO DON HANG</h2>
                    <p style='margin: 5px 0 0 0; color: #777;'>Mot phan don hang cua ban vua duoc dieu chinh.</p>
                </div>
                <div style='padding: 20px 0;'>
                    <p>Kinh chao <strong>{customer.FullName}</strong>,</p>
                    <p>Chung toi rat tiec phai thong bao rang san pham <strong>{(cancelledProduct?.Name ?? "San pham")}</strong> trong don hang #{order.Id} cua ban hien dang bi loi hoac tam thoi het hang.</p>
                    
                    <div style='background-color: #f9f2f4; padding: 15px; border-left: 4px solid #d9534f; margin: 20px 0;'>
                        <strong>Ly do xoa mon:</strong> <span style='color: #c7254e;'>{cancelReason}</span>
                    </div>

                    <p>De khong lam cham tre viec giao hang, he thong da <strong>tu dong huy san pham nay</strong> khoi don hang cua ban.</p>
                    
                    <div style='background-color: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ffeeba;'>
                        <strong>Cac san pham con lai trong don hang cua ban van se duoc giao binh thuong.</strong><br/>
                        Tong tien can thanh toan se duoc nhan vien dieu chinh lai chinh xac khi giao hang.
                    </div>
                    
                    <p>Chung toi thanh that xin loi vi su bat tien nay. Mong ban thong cam cho su co ngoai y muon nay.</p>
                </div>
                <div style='text-align: center; border-top: 1px solid #eee; padding-top: 15px; font-size: 12px; color: #777;'>
                    <p>Cam on ban da tin tuong va lua chon Highlands Coffee.</p>
                    <p>&copy; Highlands Coffee. All rights reserved.</p>
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
                Console.WriteLine($"Item cancelled email sent to {customer.Email} for Order #{order.Id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send item cancelled email: {ex.Message}");
            }
        }
        public async Task SendOrderStatusChangedEmailAsync(Order order, Customer customer)
        {
            if (order.Status == 0) return; // Không gửi mail khi chờ duyệt vì lúc mới tạo đã gửi rồi

            var server = _configuration["SmtpSettings:Server"] ?? "smtp.gmail.com";
            var portStr = _configuration["SmtpSettings:Port"] ?? "587";
            var port = int.Parse(portStr);
            var senderEmail = _configuration["SmtpSettings:SenderEmail"] ?? "your-email@gmail.com";
            var senderName = _configuration["SmtpSettings:SenderName"] ?? "ThaoCMS System";
            var password = _configuration["SmtpSettings:Password"] ?? "your-app-password";

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(senderName, senderEmail));
            message.To.Add(new MailboxAddress(customer.FullName, customer.Email));

            string statusText = order.Status == 1 ? "Đang giao hàng" : "Đã giao thành công";
            message.Subject = $"Cập nhật trạng thái Đơn hàng #{order.Id} - {statusText}";

            var bodyBuilder = new BodyBuilder();

            string titleMessage = order.Status == 1 
                ? "Đơn hàng của bạn đang trên đường vận chuyển!" 
                : "Đơn hàng của bạn đã được giao thành công!";
            string subMessage = order.Status == 1
                ? "Shipper của chúng tôi đang tiến hành giao hàng. Vui lòng chú ý điện thoại để nhận hàng bạn nhé!"
                : "Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của ThaoCMS. Rất mong được phục vụ bạn trong những lần tiếp theo.";

            string htmlTemplate = $@"
            <html>
            <body style='font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;'>
                <div style='max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; border-top: 5px solid #b22830; box-shadow: 0 4px 10px rgba(0,0,0,0.1);'>
                    <h2 style='color: #b22830; text-align: center;'>CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG #{order.Id}</h2>
                    <p>Xin chào <strong>{customer.FullName}</strong>,</p>
                    <p style='font-size: 16px; color: #333;'>
                        {titleMessage}
                    </p>
                    <div style='background-color: #fcebe3; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;'>
                        <p style='margin: 0; font-size: 18px; font-weight: bold; color: #b22830;'>
                            Trạng thái hiện tại: {statusText}
                        </p>
                    </div>
                    <p>{subMessage}</p>
                    <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'/>
                    <p style='font-size: 12px; color: #888; text-align: center;'>ThaoCMS - Hệ thống quản lý cửa hàng chuyên nghiệp</p>
                </div>
            </body>
            </html>";

            bodyBuilder.HtmlBody = htmlTemplate;
            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            try
            {
                await client.ConnectAsync(server, port, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(senderEmail, password);
                await client.SendAsync(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending status update email to {customer.Email}: {ex.Message}");
            }
            finally
            {
                await client.DisconnectAsync(true);
            }
        }
    }
}
