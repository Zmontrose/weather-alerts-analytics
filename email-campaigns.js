#!/usr/bin/env node

/**
 * AlertsAnalytics.com - Email Marketing Campaign Generator
 * 
 * Creates email templates and automation sequences for ConvertKit
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📧 AlertsAnalytics Email Marketing System');
console.log('========================================');

/**
 * Welcome Email Sequence (5 emails over 2 weeks)
 */
function createWelcomeSequence() {
    console.log('\n👋 CREATING WELCOME EMAIL SEQUENCE');
    console.log('==================================');
    
    const welcomeEmails = [
        {
            subject: "Welcome to AlertsAnalytics - Your Safety Journey Starts Here! 🚨",
            delay: 0, // Immediate
            content: `
Hi {{first_name|there}},

Welcome to AlertsAnalytics! 🎉

You've just joined thousands of people who prioritize safety and stay informed about:
• Real-time weather alerts
• Air quality updates
• Product recalls
• Emergency preparedness tips

**What you can expect:**
✅ Weekly safety digest every Tuesday
✅ Urgent alerts for severe weather
✅ Product recall notifications
✅ Expert safety tips and guides

**Get started:**
1. 🌐 Bookmark our site: https://alertsanalytics.com
2. 📱 Add us to your contacts: alerts@alertsanalytics.com
3. 🔔 Enable notifications for emergency alerts

Stay safe,
The AlertsAnalytics Team

P.S. Follow us on social media for daily safety tips:
• Twitter: @AlertsAnalytics
• Facebook: facebook.com/alertsanalytics
            `
        },
        {
            subject: "🌪️ How to Read Weather Alerts (Could Save Your Life)",
            delay: 1, // 1 day later
            content: `
Hi {{first_name}},

Weather alerts can be confusing. Here's how to decode them:

**ALERT LEVELS:**
🟢 **Advisory** - Be aware, minor impact
🟡 **Watch** - Conditions favorable, be prepared  
🟠 **Warning** - Take action immediately
🔴 **Emergency** - Life-threatening situation

**COMMON TERMS:**
• **Severe Thunderstorm** - Winds 58+ mph, hail 1"+ diameter
• **Tornado Watch** - Conditions right for tornadoes
• **Flash Flood Warning** - Flooding imminent or occurring
• **Heat Advisory** - Dangerous heat index values

**ACTION STEPS:**
1. Know your risk level (check your area: [link])
2. Have multiple ways to receive alerts
3. Practice your emergency plan
4. Keep emergency kit ready

**Quick Safety Tip:** Download the FEMA app for official emergency alerts on your phone.

Tomorrow: We'll cover air quality and your health.

Stay prepared,
AlertsAnalytics Team
            `
        },
        {
            subject: "💨 Air Quality Alert: Protect Your Family's Health",
            delay: 3, // 3 days after signup
            content: `
Hi {{first_name}},

Did you know air quality affects your health daily?

**THE AIR QUALITY INDEX (AQI):**
🟢 0-50: Good (safe for everyone)
🟡 51-100: Moderate (sensitive groups be cautious)
🟠 101-150: Unhealthy for sensitive groups
🔴 151-200: Unhealthy for everyone
🟣 201+: Very unhealthy (everyone avoid outdoors)

**HEALTH IMPACTS:**
• Asthma and breathing problems
• Heart disease complications
• Reduced lung function in children
• Cancer risk from long-term exposure

**PROTECTION STRATEGIES:**
1. Check AQI daily: [Air Quality Tool]
2. Exercise indoors on high AQI days
3. Use air purifiers at home
4. Wear N95 masks when necessary
5. Keep windows closed during pollution events

**Special Alert:** Sign up for air quality alerts for your zip code: [Link]

Coming up: Product recall safety guide.

Breathe easy,
The AlertsAnalytics Team
            `
        },
        {
            subject: "⚠️ Product Recalls: What You Need to Know Right Now",
            delay: 7, // 1 week after signup
            content: `
Hi {{first_name}},

Product recalls happen more often than you think - 2,000+ per year!

**RECENT RECALL STATS:**
• Food recalls: 400+ per year
• Drug recalls: 500+ per year  
• Car recalls: 50+ million vehicles annually
• Consumer product recalls: 300+ per year

**HOW TO STAY INFORMED:**
1. Register products when you buy them
2. Check our weekly recall roundup
3. Follow manufacturer social media
4. Sign up for CPSC and FDA alerts
5. Check recalls before using stored items

**WHAT TO DO IF AFFECTED:**
✅ Stop using the product immediately
✅ Check lot numbers and dates
✅ Contact manufacturer for refund/replacement
✅ Report injuries to appropriate agency
✅ Dispose of product safely

**Most Recalled Items:**
• Children's toys and products
• Food (contamination, allergens)
• Electronics (fire/shock hazard)
• Medications (contamination, dosing errors)

Check if you have any recalled products: [Recall Search Tool]

Next: Building your emergency kit.

Stay safe,
AlertsAnalytics Team
            `
        },
        {
            subject: "🎒 Your Complete Emergency Kit Checklist (Free Download)",
            delay: 14, // 2 weeks after signup
            content: `
Hi {{first_name}},

Emergencies happen without warning. Are you prepared?

**ESSENTIAL SUPPLIES (3-day supply):**

💧 **Water:** 1 gallon per person per day
🥫 **Food:** Non-perishable, easy to prepare
🔋 **Power:** Flashlight, extra batteries, phone chargers
📻 **Communication:** Weather radio, whistle
🏥 **First Aid:** Basic medical supplies
💊 **Medications:** 7-day supply of prescriptions
🧾 **Documents:** Insurance, ID, bank info (waterproof bag)
💰 **Cash:** Small bills for emergencies

**ADDITIONAL ITEMS:**
• Multi-tool or Swiss Army knife
• Duct tape and plastic sheeting
• Matches in waterproof container  
• Fire extinguisher
• Blankets/sleeping bags
• Change of clothes
• Personal hygiene items

**FREE DOWNLOAD:** Complete emergency kit checklist with local supplier recommendations: [Download Link]

**ACTION ITEMS:**
1. Download the checklist
2. Inventory what you have
3. Buy missing items gradually
4. Check/rotate supplies every 6 months
5. Practice using your supplies

You're now equipped with essential safety knowledge! Keep learning with our weekly newsletter.

Stay prepared,
The AlertsAnalytics Team

P.S. Share this with family and friends - everyone should be prepared! 
            `
        }
    ];
    
    console.log(`✅ Created ${welcomeEmails.length} welcome emails`);
    return welcomeEmails;
}

/**
 * Weekly Newsletter Templates
 */
function createWeeklyNewsletters() {
    console.log('\n📰 CREATING WEEKLY NEWSLETTER TEMPLATES');
    console.log('======================================');
    
    const newsletters = [
        {
            name: "Weekly Safety Digest",
            subject: "Your Weekly Safety Update - {{date}}",
            template: `
Hi {{first_name}},

Here's your weekly safety update for {{week_of}}:

## 🌪️ WEATHER ALERTS THIS WEEK
{{weather_alerts_summary}}

## 🌫️ AIR QUALITY REPORT  
{{air_quality_summary}}

## ⚠️ NEW PRODUCT RECALLS
{{recalls_summary}}

## 📚 SAFETY TIP OF THE WEEK
{{safety_tip}}

## 🔗 RECOMMENDED SAFETY PRODUCTS
{{affiliate_products}}

---

**QUICK ACTIONS:**
• Check weather alerts: [Your Local Alerts]
• View air quality: [AQI Tool]  
• Search recalls: [Recall Database]

Stay safe,
AlertsAnalytics Team

---
You're receiving this because you subscribed to AlertsAnalytics.
[Unsubscribe] | [Update Preferences] | [Forward to Friend]
            `
        },
        {
            name: "Emergency Alert",
            subject: "🚨 URGENT: {{alert_type}} Alert for {{location}}",
            template: `
🚨 EMERGENCY ALERT 🚨

{{alert_headline}}

**EFFECTIVE:** {{effective_time}}
**EXPIRES:** {{expires_time}}
**AREAS:** {{affected_areas}}

## IMMEDIATE ACTIONS REQUIRED:
{{instructions}}

## SAFETY RECOMMENDATIONS:
{{safety_actions}}

**For latest updates:** {{official_source}}

**Emergency Services:** Call 911 if immediate danger

---
This is an automated emergency alert from AlertsAnalytics.
[Emergency Preparedness Guide] | [Local Emergency Info]
            `
        }
    ];
    
    console.log(`✅ Created ${newsletters.length} newsletter templates`);
    return newsletters;
}

/**
 * Segmentation and Targeting
 */
function createSegments() {
    console.log('\n🎯 CREATING AUDIENCE SEGMENTS');
    console.log('============================');
    
    const segments = [
        {
            name: "Weather Alert Subscribers",
            criteria: "Interested in severe weather alerts",
            tags: ["weather_alerts", "emergency_prep"],
            content_focus: "Weather safety, emergency preparedness"
        },
        {
            name: "Air Quality Focused",
            criteria: "Concerned about air pollution and health",
            tags: ["air_quality", "health"],
            content_focus: "Air quality reports, health protection"
        },
        {
            name: "Product Safety Conscious",
            criteria: "Wants product recall notifications",
            tags: ["recalls", "product_safety"],
            content_focus: "Recall alerts, consumer protection"
        },
        {
            name: "Emergency Preparedness",
            criteria: "Building emergency readiness",
            tags: ["emergency_kit", "preparedness"],
            content_focus: "Survival tips, emergency supplies"
        },
        {
            name: "New Subscribers",
            criteria: "Subscribed within last 30 days",
            tags: ["new_subscriber"],
            content_focus: "Welcome sequence, basic safety education"
        }
    ];
    
    console.log(`✅ Created ${segments.length} audience segments`);
    return segments;
}

/**
 * Automation Workflows
 */
function createAutomations() {
    console.log('\n🤖 CREATING EMAIL AUTOMATIONS');
    console.log('=============================');
    
    const automations = [
        {
            name: "Welcome Series",
            trigger: "New subscriber",
            duration: "14 days",
            emails: 5,
            goal: "Educate about safety topics, build engagement"
        },
        {
            name: "Weather Alert Sequence",
            trigger: "Severe weather in subscriber's area",
            duration: "During alert + 24 hours",
            emails: "As needed",
            goal: "Provide critical safety information"
        },
        {
            name: "Product Recall Notification",
            trigger: "High-priority recall affecting subscriber's interests",
            duration: "Immediate",
            emails: 1,
            goal: "Inform about dangerous products"
        },
        {
            name: "Seasonal Preparedness",
            trigger: "Seasonal change (quarterly)",
            duration: "2 weeks",
            emails: 3,
            goal: "Prepare for seasonal hazards"
        },
        {
            name: "Re-engagement Campaign",
            trigger: "No email opens in 60 days",
            duration: "1 week",
            emails: 3,
            goal: "Win back inactive subscribers"
        }
    ];
    
    console.log(`✅ Created ${automations.length} email automations`);
    return automations;
}

/**
 * A/B Testing Templates
 */
function createABTests() {
    console.log('\n🧪 CREATING A/B TEST VARIATIONS');
    console.log('==============================');
    
    const abTests = [
        {
            test_name: "Subject Line Test - Urgency",
            element: "Subject line",
            variation_a: "Your Weekly Safety Update",
            variation_b: "🚨 Critical Safety Updates Inside",
            hypothesis: "Urgency and emojis increase open rates"
        },
        {
            test_name: "CTA Button Test",
            element: "Call-to-action",
            variation_a: "Read More",
            variation_b: "Get Safety Details →",
            hypothesis: "Action-oriented CTAs get more clicks"
        },
        {
            test_name: "Send Time Test",
            element: "Send time",
            variation_a: "Tuesday 9 AM",
            variation_b: "Wednesday 2 PM", 
            hypothesis: "Mid-week afternoon performs better"
        }
    ];
    
    console.log(`✅ Created ${abTests.length} A/B test plans`);
    return abTests;
}

/**
 * Save all email content
 */
function saveEmailContent(welcomeEmails, newsletters, segments, automations, abTests) {
    console.log('\n💾 SAVING EMAIL MARKETING CONTENT');
    console.log('=================================');
    
    const emailDir = path.join(__dirname, 'email-templates');
    if (!fs.existsSync(emailDir)) {
        fs.mkdirSync(emailDir, { recursive: true });
    }
    
    // Save welcome sequence
    fs.writeFileSync(
        path.join(emailDir, 'welcome-sequence.json'),
        JSON.stringify(welcomeEmails, null, 2)
    );
    
    // Save newsletter templates
    fs.writeFileSync(
        path.join(emailDir, 'newsletter-templates.json'),
        JSON.stringify(newsletters, null, 2)
    );
    
    // Save segments
    fs.writeFileSync(
        path.join(emailDir, 'audience-segments.json'),
        JSON.stringify(segments, null, 2)
    );
    
    // Save automations
    fs.writeFileSync(
        path.join(emailDir, 'email-automations.json'),
        JSON.stringify(automations, null, 2)
    );
    
    // Save A/B tests
    fs.writeFileSync(
        path.join(emailDir, 'ab-test-plans.json'),
        JSON.stringify(abTests, null, 2)
    );
    
    // Create ConvertKit integration guide
    const integrationGuide = `# ConvertKit Integration Guide

## Setup Steps:

1. **Create ConvertKit Account**
   - Go to: https://convertkit.com
   - Sign up for free account (up to 1,000 subscribers)

2. **Get API Keys**
   - Account Settings → API Keys
   - Copy API Key and API Secret

3. **Create Forms**
   - Newsletter signup form
   - Emergency alert opt-in
   - Different forms for each content type

4. **Set Up Automations**
   - Import welcome-sequence.json
   - Configure triggers and delays
   - Test email deliverability

5. **Add Tags and Segments**
   - Import audience-segments.json
   - Create tags for each interest
   - Set up conditional content

6. **Update Website Integration**
   - Add ConvertKit form embed codes
   - Update .env.local with real API keys
   - Test signup forms

## Email Templates Included:
- ✅ 5-email welcome sequence
- ✅ Weekly newsletter template
- ✅ Emergency alert template
- ✅ 5 automated workflows
- ✅ A/B testing variations

## Expected Results:
- Week 1: 10-25 new subscribers
- Month 1: 100-250 subscribers
- Month 3: 500-1,000 subscribers
- Open rates: 25-35%
- Click rates: 3-7%
`;
    
    fs.writeFileSync(
        path.join(emailDir, 'INTEGRATION_GUIDE.md'),
        integrationGuide
    );
    
    console.log(`✅ Saved all email templates to: email-templates/`);
}

/**
 * Main execution
 */
async function main() {
    try {
        console.log('\n🚀 GENERATING EMAIL MARKETING SYSTEM');
        console.log('====================================');
        
        const welcomeEmails = createWelcomeSequence();
        const newsletters = createWeeklyNewsletters();
        const segments = createSegments();
        const automations = createAutomations();
        const abTests = createABTests();
        
        saveEmailContent(welcomeEmails, newsletters, segments, automations, abTests);
        
        // Create performance tracking setup
        const performanceMetrics = {
            kpis: [
                'Subscriber growth rate',
                'Email open rates',
                'Click-through rates',
                'Conversion rates',
                'Unsubscribe rates',
                'List engagement score'
            ],
            goals: {
                month_1: {
                    subscribers: 250,
                    open_rate: '25%',
                    click_rate: '3%'
                },
                month_3: {
                    subscribers: 1000,
                    open_rate: '30%',
                    click_rate: '5%'
                },
                month_6: {
                    subscribers: 2500,
                    open_rate: '35%',
                    click_rate: '7%'
                }
            },
            revenue_projection: {
                month_1: '$25-50 (affiliate commissions)',
                month_3: '$100-250 (sponsorships + affiliates)',
                month_6: '$300-600 (premium content + sponsors)'
            }
        };
        
        fs.writeFileSync('email-performance-goals.json', JSON.stringify(performanceMetrics, null, 2));
        
        console.log('\n✅ EMAIL MARKETING SYSTEM COMPLETE');
        console.log('==================================');
        console.log(`📧 Welcome emails: ${welcomeEmails.length}`);
        console.log(`📰 Newsletter templates: ${newsletters.length}`);
        console.log(`🎯 Audience segments: ${segments.length}`);
        console.log(`🤖 Automations: ${automations.length}`);
        console.log(`🧪 A/B tests: ${abTests.length}`);
        
        console.log('\n📁 Files created:');
        console.log('   - email-templates/ (all templates)');
        console.log('   - email-performance-goals.json');
        
        console.log('\n🚀 NEXT STEPS:');
        console.log('1. Set up ConvertKit account (free)');
        console.log('2. Import email templates');
        console.log('3. Configure automations and triggers');
        console.log('4. Update website with real API keys');
        console.log('5. Start collecting subscribers!');
        
        console.log('\n💰 REVENUE POTENTIAL:');
        console.log('Month 1: $25-50 from affiliate links');
        console.log('Month 3: $100-250 from sponsors + affiliates');
        console.log('Month 6: $300-600 from premium content');
        
    } catch (error) {
        console.error('❌ Error in email marketing setup:', error);
        process.exit(1);
    }
}

// Run the email marketing system
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}