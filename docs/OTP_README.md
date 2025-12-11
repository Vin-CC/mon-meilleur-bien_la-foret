# SMS OTP Verification - Quick Reference

## What Was Implemented

A complete SMS OTP (One-Time Password) verification system for the estimation wizard, including:

- **Backend Services** (in `src/lib/`):
  - Airtable integration for OTP and Lead management
  - Twilio SMS sending service
  
- **API Routes** (in `src/app/api/`):
  - `POST /api/send-otp` - Generate and send OTP code via SMS
  - `POST /api/verify-otp` - Verify OTP code

- **Frontend** (in `src/components/estimation/EstimationModal.tsx`):
  - 3-state phone verification flow: phone input → OTP input → verified
  - Framer Motion transitions between states
  - Sonner toast notifications
  - Resend cooldown timer (45 seconds)

## Files Created/Modified

### New Files
```
src/lib/airtable.ts                    # Airtable client setup
src/lib/airtable-otp.ts                # OTP & Lead operations
src/lib/sms.ts                         # Twilio SMS service
src/app/api/send-otp/route.ts          # Send OTP endpoint
src/app/api/verify-otp/route.ts        # Verify OTP endpoint
docs/OTP_SETUP.md                      # Complete setup guide
docs/OTP_README.md                     # This file
```

### Modified Files
```
src/components/estimation/EstimationModal.tsx  # Added OTP verification flow
package.json                                    # Added dependencies
```

## Setup Steps (Quick)

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Configure Airtable**:
   - Create tables `OTP` and `Leads` (see `docs/OTP_SETUP.md` for exact schema)
   - Get API key and Base ID

3. **Configure Twilio**:
   - Sign up and buy a phone number
   - Get Account SID and Auth Token

4. **Set environment variables**:
   Create `.env.local` with:
   ```env
   AIRTABLE_API_KEY=...
   AIRTABLE_BASE_ID=...
   TWILIO_ACCOUNT_SID=...
   TWILIO_AUTH_TOKEN=...
   TWILIO_PHONE_NUMBER=+33...
   ```

5. **Test**:
   ```bash
   npm run dev
   ```
   Navigate to estimation modal → complete to phone step → test OTP flow

## How It Works

1. **User enters phone number** → clicks "Recevoir un code par SMS"
2. **Backend**:
   - Validates phone format (libphonenumber-js)
   - Checks cooldown (45s between resends)
   - Generates 6-digit code
   - Stores in Airtable OTP table
   - Sends SMS via Twilio
   - Creates/updates lead in Airtable
3. **User receives SMS** with 6-digit code
4. **User enters code** → clicks "Valider le code"
5. **Backend**:
   - Verifies code matches and not expired (10 min)
   - Marks OTP as "used"
   - Updates lead PhoneVerified = true
6. **Success** → Auto-advances to form submission

## Troubleshooting

**SMS not received?**
- Check Twilio console for delivery logs
- Verify phone number format (+33...)
- Check Twilio account balance

**Airtable errors?**
- Verify API key and Base ID
- Check table/field names (case-sensitive)

**See full documentation in `docs/OTP_SETUP.md`**
