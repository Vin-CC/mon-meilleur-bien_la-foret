# SMS OTP Verification System - Setup Documentation

## Prerequisites

1. **Airtable Account** - https://airtable.com/
2. **Twilio Account** - https://www.twilio.com/
3. **Node.js 18+** and npm installed

## 1. Airtable Configuration

### Create Your Airtable Base

1. Log in to Airtable and create a new base named "MonMeilleurBien Leads"

2. Create the following tables with exact field names:

#### Table: `OTP`
| Field Name | Field Type | Options |
|------------|------------|---------|
| Phone | Single line text | - |
| Code | Single line text | - |
| ExpiresAt | Date | Include time |
| Status | Single select | Options: active, used, expired |
| CreatedAt | Date | Include time |

#### Table: `Leads`
| Field Name | Field Type | Options |
|------------|------------|---------|
| FirstName | Single line text | - |
| LastName | Single line text | - |
| Email | Email | - |
| Phone | Phone number | - |
| PhoneVerified | Checkbox | - |
| PropertyType | Single line text | - |
| Address | Single line text | - |
| Surface | Single line text | - |
| Rooms | Number | Integer |
| Bedrooms | Number | Integer |
| Condition | Single line text | - |
| Floor | Number | Integer, Allow negative |
| Exterior | Long text | - |
| ConstructionYear | Single line text | - |
| IsOwner | Single line text | - |
| ProjectTimeline | Single line text | - |

### Get Your Airtable Credentials

1. Go to https://airtable.com/account
2. Generate or copy your **API Key**
3. Open your base and click "Help" > "API documentation"
4. Find your **Base ID** (starts with `app...`)

## 2. Twilio Configuration

### Setup Twilio Account

1. Sign up at https://www.twilio.com/
2. Verify your phone number
3. Purchase a phone number that can send SMS (French number recommended for French recipients)

### Get Your Twilio Credentials

1. Go to https://console.twilio.com/
2. Note your **Account SID**
3. Note your **Auth Token**
4. Go to "Phone Numbers" > "Manage" > "Active numbers"
5. Copy your **Twilio Phone Number** (must be in E.164 format: +33XXXXXXXXX)

## 3. Environment Variables Setup

1. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your credentials in `.env.local`:

```env
# Airtable
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_OTP=OTP
AIRTABLE_TABLE_LEADS=Leads

# Twilio
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+33123456789

# OTP Settings
OTP_EXPIRATION_MINUTES=10
OTP_RESEND_COOLDOWN_SECONDS=45
```

## 4. Install Dependencies

The required packages should already be installed. If not:

```bash
npm install airtable twilio libphonenumber-js
```

## 5. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Click "Estimer en ligne" to open the estimation modal

4. Complete the wizard steps until you reach the phone verification step

5. Test the OTP flow:
   - Enter your phone number (French format: 06 12 34 56 78)
   - Click "Recevoir un code par SMS"
   - Check your phone for the SMS
   - Enter the 6-digit code
   - Verify successful verification

## 6. Verify Data in Airtable

After testing:

1. Check your **OTP** table:
   - Should contain the generated OTP
   - Status should be "used"

2. Check your **Leads** table:
   - Should contain the new lead with all estimation data
   - PhoneVerified should be checked

## 7. Troubleshooting

### SMS not received

- Check Twilio console logs for delivery status
- Verify your Twilio phone number can send to your country
- Check Twilio account balance
- Verify phone number format (must be international: +33...)

### Airtable errors

- Verify API key is correct
- Check base ID is correct
- Ensure table names match exactly (case-sensitive)
- Verify field names match exactly

### TypeScript errors

- Run `npm run build` to check for compilation errors
- Ensure all environment variables are set

## 8. Production Deployment

Before deploying to production:

1. Add environment variables to your hosting platform (Vercel, etc.)
2. Test with different phone numbers
3. Monitor Twilio usage and costs
4. Consider adding rate limiting for send-otp endpoint
5. Set up Airtable webhooks for notification of new leads (optional)

## 9. Costs

- **Airtable**: Free tier includes 1,200 records per base
- **Twilio**: ~€0.075 per SMS sent to French numbers (check current pricing)

## 10. Security Notes

- Never commit `.env.local` to git
- Rotate Twilio credentials regularly
- Monitor for unusual SMS volumes
- Consider implementing additional rate limiting
- Use Twilio's Verify API for production (more secure than custom OTP)

## Support

For issues:
1. Check server logs in console
2. Check Twilio delivery logs
3. Verify Airtable record creation
4. Review browser console for frontend errors
