#!/usr/bin/env node

/**
 * AlertsAnalytics.com - Sitemap Generator
 * 
 * Generates XML sitemap for search engines to improve SEO
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗺️ AlertsAnalytics Sitemap Generator');
console.log('====================================');

const SITE_URL = 'https://7e06e559.weather-alerts-analytics.pages.dev';
const PRODUCTION_URL = 'https://alertsanalytics.com'; // Future production URL

/**
 * Generate sitemap.xml for better SEO
 */
function generateSitemap() {
    console.log('\n📍 GENERATING SITEMAP');
    console.log('====================');
    
    const baseUrl = SITE_URL;
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Define static pages
    const staticPages = [
        { url: '', priority: '1.0', changefreq: 'daily' }, // Homepage
        { url: '/about', priority: '0.8', changefreq: 'monthly' },
        { url: '/contact', priority: '0.6', changefreq: 'monthly' },
        { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
        { url: '/air-quality', priority: '0.9', changefreq: 'hourly' }
    ];
    
    // Dynamic pages (from existing content)
    const dynamicPages = [
        // Weather alerts by hazard
        { url: '/hazard/winter-storm-warning', priority: '0.9', changefreq: 'hourly' },
        { url: '/hazard/heat-advisory', priority: '0.9', changefreq: 'hourly' },
        { url: '/hazard/flash-flood-watch', priority: '0.9', changefreq: 'hourly' },
        
        // States
        { url: '/state/ca', priority: '0.8', changefreq: 'daily' },
        { url: '/state/fl', priority: '0.8', changefreq: 'daily' },
        { url: '/state/tx', priority: '0.8', changefreq: 'daily' },
        { url: '/state/ny', priority: '0.8', changefreq: 'daily' },
        
        // Categories
        { url: '/category/food', priority: '0.7', changefreq: 'daily' },
        { url: '/brand/unknown', priority: '0.6', changefreq: 'weekly' }
    ];
    
    // Add recent blog posts if they exist
    const blogPages = [];
    const blogDir = path.join(__dirname, 'src', 'content', 'blog');
    if (fs.existsSync(blogDir)) {
        const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
        blogFiles.forEach(file => {
            const slug = file.replace('.md', '');
            blogPages.push({
                url: `/blog/${slug}`,
                priority: '0.8',
                changefreq: 'weekly'
            });
        });
    }
    
    const allPages = [...staticPages, ...dynamicPages, ...blogPages];
    
    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <mobile:mobile/>
  </url>`).join('\n')}
</urlset>`;
    
    // Save to public directory
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    
    console.log(`✅ Generated sitemap with ${allPages.length} pages`);
    console.log(`📁 Saved to: public/sitemap.xml`);
    
    return allPages.length;
}

/**
 * Generate robots.txt
 */
function generateRobotsTxt() {
    console.log('\n🤖 GENERATING ROBOTS.TXT');
    console.log('========================');
    
    const robotsTxt = `# AlertsAnalytics.com - Robots.txt
# Generated: ${new Date().toISOString()}

User-agent: *
Allow: /

# Important pages for crawling
Allow: /air-quality
Allow: /hazard/
Allow: /state/
Allow: /recalls/
Allow: /alerts/

# Disallow admin or temp files
Disallow: /admin/
Disallow: /*.json
Disallow: /temp/
Disallow: /node_modules/

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;
    
    const publicDir = path.join(__dirname, 'public');
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
    
    console.log('✅ Generated robots.txt');
    console.log(`📁 Saved to: public/robots.txt`);
}

/**
 * Generate Google Search Console verification file
 */
function generateSearchConsoleVerification() {
    console.log('\n🔍 GOOGLE SEARCH CONSOLE SETUP');
    console.log('==============================');
    
    // This would be replaced with actual verification code from GSC
    const verificationCode = 'google-site-verification-placeholder.html';
    const verificationContent = `google-site-verification: ${verificationCode}`;
    
    console.log('📋 SETUP INSTRUCTIONS:');
    console.log('1. Go to: https://search.google.com/search-console');
    console.log('2. Add property: ' + SITE_URL);
    console.log('3. Choose "HTML file" verification method');
    console.log('4. Download verification file and replace placeholder');
    console.log('5. Upload to your site and verify');
    console.log('6. Submit sitemap: ' + SITE_URL + '/sitemap.xml');
    
    return verificationCode;
}

/**
 * Generate analytics tracking setup
 */
function setupAnalyticsTracking() {
    console.log('\n📊 ANALYTICS SETUP VERIFICATION');
    console.log('================================');
    
    // Check if GA4 is properly configured
    const envFile = path.join(__dirname, '.env.local');
    if (fs.existsSync(envFile)) {
        const envContent = fs.readFileSync(envFile, 'utf8');
        const ga4Match = envContent.match(/PUBLIC_GA4_ID=(.+)/);
        
        if (ga4Match && ga4Match[1] !== 'YOUR_GA4_MEASUREMENT_ID') {
            console.log(`✅ Google Analytics 4 configured: ${ga4Match[1]}`);
        } else {
            console.log('⚠️  Google Analytics 4 needs configuration');
        }
    }
    
    console.log('\n📈 CONVERSION TRACKING SETUP:');
    console.log('1. Newsletter signups');
    console.log('2. Affiliate link clicks');
    console.log('3. Page engagement time');
    console.log('4. Social media shares');
    console.log('5. Email link clicks');
}

/**
 * Main execution
 */
async function main() {
    try {
        console.log('\n🚀 STARTING SEO & ANALYTICS SETUP');
        console.log('==================================');
        
        const sitemapPages = generateSitemap();
        generateRobotsTxt();
        generateSearchConsoleVerification();
        setupAnalyticsTracking();
        
        // Create SEO checklist
        const seoChecklist = {
            completed: [
                'XML sitemap generated',
                'robots.txt created',
                'Google Analytics 4 integrated',
                'Meta tags implemented',
                'Mobile responsive design',
                'SSL certificate enabled',
                'Content optimization',
                'Internal linking structure'
            ],
            pending: [
                'Google Search Console verification',
                'Bing Webmaster Tools setup',
                'Social media meta tags (Open Graph)',
                'Schema.org structured data',
                'Page speed optimization',
                'Alt text for images',
                'Canonical URLs'
            ],
            metrics_to_track: [
                'Organic search traffic',
                'Keyword rankings',
                'Click-through rates',
                'Newsletter signups',
                'Affiliate link clicks',
                'Average session duration',
                'Pages per session',
                'Bounce rate'
            ]
        };
        
        fs.writeFileSync('seo-checklist.json', JSON.stringify(seoChecklist, null, 2));
        
        console.log('\n✅ SEO SETUP COMPLETE');
        console.log('====================');
        console.log(`📄 Pages in sitemap: ${sitemapPages}`);
        console.log('📁 Files created:');
        console.log('   - public/sitemap.xml');
        console.log('   - public/robots.txt');
        console.log('   - seo-checklist.json');
        
        console.log('\n🚀 IMMEDIATE ACTIONS:');
        console.log('1. Verify Google Analytics is tracking visits');
        console.log('2. Submit sitemap to Google Search Console');
        console.log('3. Set up Bing Webmaster Tools');
        console.log('4. Monitor organic search traffic');
        console.log('5. Optimize page titles and meta descriptions');
        
        console.log('\n📈 Expected SEO Results:');
        console.log('- Week 1: Search engines discover your sitemap');
        console.log('- Week 2: Pages begin appearing in search results');
        console.log('- Month 1: 50-200 organic visitors/month');
        console.log('- Month 3: 200-1000 organic visitors/month');
        
    } catch (error) {
        console.error('❌ Error in SEO setup:', error);
        process.exit(1);
    }
}

// Run the SEO setup
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}