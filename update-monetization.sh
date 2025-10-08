#!/bin/bash

# AlertsAnalytics.com - Monetization Credentials Update Script
# Run this after getting your real AdSense approval

echo "🚀 AlertsAnalytics Monetization Update Script"
echo "============================================="

# Function to update .env.local with real credentials
update_adsense_id() {
    echo ""
    echo "📊 GOOGLE ADSENSE SETUP"
    echo "------------------------"
    echo "1. Go to: https://www.google.com/adsense/"
    echo "2. Sign in to your approved account"
    echo "3. Go to Account > Account information"
    echo "4. Copy your Publisher ID (format: pub-1234567890123456)"
    echo ""
    read -p "Enter your AdSense Publisher ID (numbers only, no 'pub-'): " adsense_id
    
    if [[ $adsense_id =~ ^[0-9]{16}$ ]]; then
        # Update .env.local
        sed -i.bak "s/PUBLIC_ADSENSE_PUB_ID=1234567890123456/PUBLIC_ADSENSE_PUB_ID=$adsense_id/" .env.local
        echo "✅ AdSense Publisher ID updated successfully!"
    else
        echo "❌ Invalid Publisher ID format. Should be 16 digits."
        return 1
    fi
}

# Function to update ConvertKit API key
update_convertkit_api() {
    echo ""
    echo "📧 CONVERTKIT SETUP"
    echo "-------------------"
    echo "1. Go to: https://app.convertkit.com/account/edit"
    echo "2. Copy your API Key"
    echo "3. Get your Form ID from the form settings"
    echo ""
    read -p "Enter your ConvertKit API Key: " convertkit_api
    read -p "Enter your ConvertKit Form ID: " form_id
    
    if [[ ! -z "$convertkit_api" && ! -z "$form_id" ]]; then
        # Add ConvertKit credentials to .env.local
        echo "PUBLIC_CONVERTKIT_API_KEY=$convertkit_api" >> .env.local
        echo "PUBLIC_CONVERTKIT_FORM_ID=$form_id" >> .env.local
        echo "✅ ConvertKit credentials updated successfully!"
    else
        echo "❌ ConvertKit credentials cannot be empty."
        return 1
    fi
}

# Function to verify Google Analytics
verify_analytics() {
    echo ""
    echo "📈 GOOGLE ANALYTICS VERIFICATION"
    echo "--------------------------------"
    echo "1. Go to: https://analytics.google.com/"
    echo "2. Select your AlertsAnalytics property"
    echo "3. Go to Admin > Data Streams"
    echo "4. Verify your Measurement ID matches: G-2CVQM8K3JH"
    echo ""
    read -p "Is your GA4 Measurement ID correct? (y/n): " ga_confirm
    
    if [[ $ga_confirm == "y" || $ga_confirm == "Y" ]]; then
        echo "✅ Google Analytics verified!"
    else
        echo "❌ Please update your GA4 Measurement ID in .env.local"
    fi
}

# Function to rebuild and deploy
rebuild_and_deploy() {
    echo ""
    echo "🔨 REBUILDING SITE WITH NEW CREDENTIALS..."
    echo "============================================"
    
    # Build the site
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"
        
        echo ""
        echo "🚀 DEPLOYING TO CLOUDFLARE PAGES..."
        echo "===================================="
        
        # Deploy to Cloudflare Pages
        npx wrangler pages deploy dist --project-name weather-alerts-analytics
        
        if [ $? -eq 0 ]; then
            echo "✅ Deployment successful!"
            echo ""
            echo "🎉 Your site is now live with real monetization credentials!"
            echo "Visit: https://main.weather-alerts-analytics.pages.dev"
        else
            echo "❌ Deployment failed. Check your Cloudflare configuration."
        fi
    else
        echo "❌ Build failed. Check for errors above."
    fi
}

# Main menu
main_menu() {
    echo ""
    echo "Select what you want to update:"
    echo "1) AdSense Publisher ID (after approval)"
    echo "2) ConvertKit API credentials"
    echo "3) Verify Google Analytics"
    echo "4) Rebuild and deploy site"
    echo "5) Update all credentials"
    echo "6) Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice
    
    case $choice in
        1) update_adsense_id ;;
        2) update_convertkit_api ;;
        3) verify_analytics ;;
        4) rebuild_and_deploy ;;
        5) 
            update_adsense_id
            update_convertkit_api
            verify_analytics
            rebuild_and_deploy
            ;;
        6) 
            echo "👋 Goodbye! Your monetization setup is ready."
            exit 0
            ;;
        *) 
            echo "❌ Invalid choice. Please select 1-6."
            main_menu
            ;;
    esac
}

# Start the script
echo ""
echo "This script will help you update your monetization credentials"
echo "after your accounts are approved and you have real API keys."
echo ""

main_menu