# 🚀 Quick Setup Reference Card

## 📋 **All Browser Tabs Now Open - Complete These Steps:**

### ✅ **1. Google Analytics** (5 min)
**Tab:** https://analytics.google.com/
1. Create account → Add property "AlertsAnalytics"
2. Add web stream for `alertsanalytics.com`
3. Copy your Measurement ID: `G-XXXXXXXXXX`
4. Add to `.env.local`: `PUBLIC_GA4_ID=G-XXXXXXXXXX`

### ✅ **2. Google AdSense** (10 min) 
**Tab:** https://www.google.com/adsense/
1. Apply with site: `alertsanalytics.com`
2. Wait for approval (1-7 days)
3. After approval: Get Publisher ID `pub-XXXXXXXXXXXXXXXX`
4. Add to `.env.local`: `PUBLIC_ADSENSE_PUB_ID=XXXXXXXXXXXXXXXX` (numbers only)

### ✅ **3. Amazon Associates** (10 min)
**Tab:** https://affiliate-program.amazon.com/
1. Join with website: `alertsanalytics.com`
2. Category: Safety & Emergency Preparedness  
3. Complete tax info (W-9)
4. Get Associate Tag: `yourtag-20`
5. Add to `.env.local`: `PUBLIC_AMAZON_TAG=yourtag-20`

### ✅ **4. ConvertKit Newsletter** (15 min)
**Tab:** https://convertkit.com/
1. Sign up for free account (1,000 subscribers)
2. Create first form/audience
3. Set up welcome email sequence
4. Get API endpoint for newsletter form
5. Update `src/components/NewsletterSignup.astro` line 98

### ✅ **5. Domain Registration** (15 min)
**Tabs:** 
- https://www.namecheap.com/domains/ (or)
- https://www.cloudflare.com/products/registrar/

1. Search and purchase: `alertsanalytics.com`
2. In domain DNS settings, add:
   - CNAME: `alertsanalytics.com` → `weather-alerts-analytics.pages.dev`
   - CNAME: `www.alertsanalytics.com` → `weather-alerts-analytics.pages.dev`

### ✅ **6. Cloudflare Pages Custom Domain**
**Tab:** https://dash.cloudflare.com/
1. Go to Pages → weather-alerts-analytics project
2. Custom domains → Add `alertsanalytics.com` and `www.alertsanalytics.com`
3. Wait for DNS propagation (5-48 hours)

## 🔄 **After Getting Your IDs:**

1. **Update environment file:**
   ```bash
   # Edit .env.local with your actual IDs
   PUBLIC_GA4_ID=G-XXXXXXXXXX
   PUBLIC_ADSENSE_PUB_ID=XXXXXXXXXXXXXXXX  
   PUBLIC_AMAZON_TAG=yourtag-20
   ```

2. **Rebuild and deploy:**
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name weather-alerts-analytics
   ```

3. **Test everything:**
   - Visit your site at `alertsanalytics.com`
   - Check that analytics is tracking
   - Test newsletter signup
   - Verify ad placeholders show setup status

## 💰 **Expected Revenue Timeline:**

- **Week 1**: Analytics tracking, newsletter signups
- **Week 2**: AdSense approval + first ad revenue
- **Month 1**: Amazon affiliate first commissions  
- **Month 3**: $50-200/month with 5K visitors
- **Month 6**: $150-500/month with 10K visitors

## 📞 **Need Help?**

- ✅ All code is ready and deployed
- ✅ Setup guide: `MONETIZATION_SETUP.md`  
- ✅ Current site: https://1a583e5e.weather-alerts-analytics.pages.dev
- ✅ Environment template: `.env.example`

**Your site is fully prepared for monetization!** 🎉

---
*Quick Setup Card - October 8, 2025*