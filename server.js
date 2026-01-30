const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nishedk076@gmail.com', // Your email
        pass: 'your_app_password_here' // Generate app-specific password from Google
    }
});

// Test email route
app.post('/send-email', async (req, res) => {
    const { name, email, phone, university, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !university) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Email to your inbox
        const adminEmail = {
            from: 'nishedk076@gmail.com',
            to: 'nishedk076@gmail.com',
            subject: `📬 New College Inquiry from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #667eea;">🎓 New Inquiry Received</h2>
                    <hr style="border: none; border-top: 2px solid #667eea;">
                    
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <p><strong>Student Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Selected College:</strong> <span style="color: #764ba2; font-weight: bold;">${university}</span></p>
                        <p><strong>Message:</strong></p>
                        <p style="background: white; padding: 15px; border-left: 4px solid #667eea;">${message || 'No message provided'}</p>
                    </div>
                    
                    <hr style="border: none; border-top: 2px solid #e0e0e0; margin-top: 20px;">
                    <p style="font-size: 12px; color: #999;">📧 Reply to: ${email}</p>
                </div>
            `
        };

        // Confirmation email to user
        const userEmail = {
            from: 'nishedk076@gmail.com',
            to: email,
            subject: '✅ We Received Your Inquiry - College Portal',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #28a745;">✅ Inquiry Received Successfully!</h2>
                    <hr style="border: none; border-top: 2px solid #28a745;">
                    
                    <p>Dear ${name},</p>
                    <p>Thank you for your interest in <strong>${university}</strong>!</p>
                    
                    <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Your Inquiry Details:</strong></p>
                        <ul style="list-style: none; padding: 0;">
                            <li>✓ Name: ${name}</li>
                            <li>✓ Email: ${email}</li>
                            <li>✓ Phone: ${phone}</li>
                            <li>✓ College: ${university}</li>
                        </ul>
                    </div>
                    
                    <p>We have received your inquiry and our team will contact you shortly with detailed information about admissions, fees, courses, and hostel facilities.</p>
                    
                    <p style="color: #667eea; font-weight: bold;">📞 Expected Response: Within 24 hours</p>
                    
                    <hr style="border: none; border-top: 2px solid #e0e0e0;">
                    <p style="font-size: 12px; color: #999;">Best regards,<br>Private College Portal Team<br>📧 nishedk076@gmail.com</p>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(adminEmail);
        await transporter.sendMail(userEmail);

        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

// Serve static files
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`🎓 College Portal Server running on http://localhost:${PORT}`);
    console.log('✅ Ready to receive inquiries!');
});
