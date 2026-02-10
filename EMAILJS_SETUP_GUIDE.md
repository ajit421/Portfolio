# 📧 EmailJS Setup Guide - Step by Step

Follow these exact steps to enable your contact form.

---

## Step 1: Create EmailJS Account

1. **Go to EmailJS website:**
   - Visit: https://www.emailjs.com/
   
2. **Sign up for free account:**
   - Click "Sign Up" button
   - Enter your email address
   - Create a password
   - Click "Create Account"

3. **Verify your email:**
   - Check your inbox for verification email
   - Click the verification link
   - You'll be redirected to EmailJS dashboard

---

## Step 2: Add Email Service

1. **Navigate to Email Services:**
   - In EmailJS dashboard, click "Email Services" in left sidebar
   
2. **Add New Service:**
   - Click "Add New Service" button
   
3. **Choose Email Provider:**
   - Select your email provider:
     - **Gmail** (recommended for personal)
     - **Outlook/Hotmail**
     - **Yahoo**
     - Or any other SMTP service
   
4. **Configure Service:**
   - For Gmail:
     - Click "Connect Account"
     - Sign in with your Google account
     - Allow EmailJS permissions
   
5. **Copy Service ID:**
   - After connecting, you'll see a **Service ID** (looks like: `service_abc123`)
   - **COPY THIS** - you'll need it for .env file
   - Keep this tab open!

---

## Step 3: Create Email Template

1. **Navigate to Email Templates:**
   - Click "Email Templates" in left sidebar
   
2. **Create New Template:**
   - Click "Create New Template" button
   
3. **Template Settings:**
   - **Template Name:** "Portfolio Contact Form" (or any name you like)
   
4. **Edit Template Content:**
   Replace the default content with this:
   
   **Subject Line:**
   ```
   New Contact Form Message from {{from_name}}
   ```
   
   **Email Body:**
   ```
   You have received a new message from your portfolio contact form.
   
   From: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   
   ---
   This email was sent from your portfolio contact form.
   ```

5. **Save Template:**
   - Click "Save" button
   
6. **Copy Template ID:**
   - You'll see a **Template ID** at the top (looks like: `template_vd6a0ur`)
   - **COPY THIS** - you'll need it for .env file
   - Keep this tab open!

---

## Step 4: Get Public Key

1. **Navigate to Account Settings:**
   - Click your profile icon (top right)
   - Select "Account"
   
2. **Find Public Key:**
   - Scroll down to "API Keys" section
   - You'll see **Public Key** (looks like: `AbCdEf123XyZ`)
   - **COPY THIS** - you'll need it for .env file

---

## Step 5: Update .env File

Now you have all three credentials! Let's add them to your `.env` file.

1. **Open your .env file:**
   - File location: `d:\Code\Portfolio\.env`
   - (You already have this open!)

2. **Fill in the EmailJS credentials:**
   
   Replace the empty values with your copied credentials:
   
   ```bash
   # API URL
   VITE_API_BASE_URL=
   
   # Feature Flags
   VITE_ENABLE_ANALYTICS=false
   
   # EmailJS Configuration (for Contact Form)
   # Sign up at https://www.emailjs.com/ to get your credentials
   VITE_EMAILJS_SERVICE_ID=service_abc123      # ← Paste Service ID here
   VITE_EMAILJS_TEMPLATE_ID=template_vd6a0ur    # ← Paste Template ID here
   VITE_EMAILJS_PUBLIC_KEY=AbCdEf123XyZ        # ← Paste Public Key here
   
   # Contact Form Configuration (IGNORE THESE - they're duplicates)
   VITE_CONTACT_SERVICE_ID=
   VITE_CONTACT_TEMPLATE_ID=
   VITE_CONTACT_USER_ID=
   ```

3. **Save the file:**
   - Press `Ctrl + S` to save

---

## Step 6: Restart Development Server

The dev server needs to restart to load the new environment variables.

1. **Stop current server:**
   - In your terminal, press `Ctrl + C`
   
2. **Start server again:**
   ```bash
   npm run dev
   ```

---

## Step 7: Test Contact Form

1. **Open your portfolio:**
   - Should be at: http://localhost:3000
   
2. **Scroll to Contact section:**
   - Click "Contact" in navigation
   
3. **Fill out test form:**
   - Name: "Test User"
   - Email: "test@example.com"
   - Subject: "Testing Contact Form"
   - Message: "This is a test message from my portfolio!"
   
4. **Submit:**
   - Click "Send Message" button
   - Wait for success message
   
5. **Check your email:**
   - Check the email account connected to EmailJS
   - You should receive the test message within 1-2 minutes

---

## ✅ Verification Checklist

- [ ] Created EmailJS account and verified email
- [ ] Connected email service (Gmail/Outlook/etc.)
- [ ] Created email template with correct variables
- [ ] Copied all three credentials (Service ID, Template ID, Public Key)
- [ ] Updated .env file with credentials
- [ ] Saved .env file
- [ ] Restarted dev server
- [ ] Tested contact form
- [ ] Received test email

---

## 🔧 Troubleshooting

**Form shows error "EmailJS not configured":**
- Check that .env file has all three values filled in
- Make sure you restarted the dev server after editing .env
- Verify there are no extra spaces in the credentials

**Email not received:**
- Check spam/junk folder
- Verify email service is connected in EmailJS dashboard
- Test template directly in EmailJS dashboard
- Check EmailJS dashboard "Email Log" for error messages

**Build error after adding .env:**
- Make sure .env file is in root folder (`d:\Code\Portfolio\.env`)
- Verify no syntax errors (no spaces around `=`)
- Check that .env is NOT committed to git (it's in .gitignore)

**Still not working?**
- Go to EmailJS dashboard → Email Log
- Check for error messages
- Verify template variables match exactly: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`

---

## 📝 Your Credentials (Fill this in)

Keep this for reference:

```
Service ID:    _______________________
Template ID:   _______________________
Public Key:    _______________________
```

**⚠️ IMPORTANT:** Never share these credentials publicly or commit them to git!

---

## 🎯 What Each Variable Does

| Variable | Purpose |
|----------|---------|
| `VITE_EMAILJS_SERVICE_ID` | Tells EmailJS which email account to send from |
| `VITE_EMAILJS_TEMPLATE_ID` | Which email template to use for formatting |
| `VITE_EMAILJS_PUBLIC_KEY` | Authenticates your website with EmailJS |

The other variables (`VITE_CONTACT_SERVICE_ID`, etc.) are old duplicates and can be left empty.

---

**Need more help?** Check [DEPLOYMENT.md](DEPLOYMENT.md) or [MAINTENANCE.md](MAINTENANCE.md).
