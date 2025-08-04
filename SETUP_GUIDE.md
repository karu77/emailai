# 🚀 Gmail AI Assistant - Setup Guide

## 📋 Quick Start

### 1. Install the Extension
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `Gmail-AI-Assistant` folder
5. The extension should appear in your extensions list

### 2. Configure API Keys
1. Open `api-config.js` in your code editor
2. Replace the placeholder API keys with your actual keys
3. Save the file
4. Reload the extension in `chrome://extensions/`

### 3. Test the Extension
1. Go to Gmail (`mail.google.com`)
2. Open any email
3. Look for the "Summarize Email" button (floating in top-right)
4. Click it to test the AI analysis

## 🔑 API Configuration

### Option 1: Use Mock Response (Recommended for Testing)
The extension includes a mock response that works immediately:

```javascript
// In api-config.js - leave as is for mock response
const API_CONFIG = {
  GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
  HUGGINGFACE_TOKEN: 'YOUR_HUGGINGFACE_TOKEN_HERE',
  // ... other keys
};
```

**Result**: Beautiful UI with mock data - perfect for testing!

### Option 2: Configure Real APIs

#### A. Google Gemini API (Primary)
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIzaSy...`)
5. Update `api-config.js`:
   ```javascript
   GEMINI_API_KEY: 'AIzaSyYourActualKeyHere',
   ```

#### B. Hugging Face API (Fallback)
1. Go to [Hugging Face](https://huggingface.co/settings/tokens)
2. Sign in or create an account
3. Click "New token"
4. Give it a name (e.g., "Gmail AI Assistant")
5. Select "Read" permissions
6. Copy the token (starts with `hf_...`)
7. Update `api-config.js`:
   ```javascript
   HUGGINGFACE_TOKEN: 'hf_YourActualTokenHere',
   ```

## 🧪 Testing Your Setup

### Test 1: Mock Response (Always Works)
1. Reload the extension
2. Go to Gmail and click "Summarize Email"
3. You should see a beautiful popup with mock analysis
4. Console should show: `📝 Using mock response for demonstration`

### Test 2: Real APIs
1. Configure your API keys in `api-config.js`
2. Reload the extension
3. Go to Gmail and click "Summarize Email"
4. Check console for API calls and responses

## 🔍 Debugging

### Console Logs to Look For:

#### ✅ Working Mock Response:
```
🔄 Attempting fallback API...
🔄 Trying fallback 1/3: Hugging Face GPT-2
❌ Hugging Face GPT-2 failed: [error]
🔄 Trying fallback 2/3: Hugging Face DistilGPT2
❌ Hugging Face DistilGPT2 failed: [error]
🔄 Trying fallback 3/3: Mock Response
📝 Using mock response for demonstration
```

#### ✅ Working Gemini API:
```
🔍 Gemini API Debug Info:
URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSy...
API Key (first 10 chars): AIzaSyCNwT...
Request body: {contents: [{parts: [{text: "..."}]}]}
Response status: 200
Gemini response: {candidates: [{content: {parts: [{text: "..."}]}}]}
```

#### ❌ API Issues:
```
❌ Gemini API error: Error: Gemini API error: 404
❌ Hugging Face GPT-2 failed: Error: Hugging Face GPT-2 API error: 404
```

## 🛠️ Troubleshooting

### Problem: "Summarize Email" button not visible
**Solution:**
1. Check if the extension is loaded in `chrome://extensions/`
2. Reload the extension
3. Refresh Gmail page
4. Look for the floating button in the top-right corner

### Problem: API calls failing with 404
**Solution:**
1. Check your API keys are correct
2. Verify APIs are enabled in their respective consoles
3. Check API quotas haven't been exceeded
4. Use the mock response for testing

### Problem: Extension not loading
**Solution:**
1. Check `manifest.json` is valid
2. Ensure all files are in the correct directory
3. Check Chrome console for errors
4. Try reloading the extension

## 🎨 Features

### Current Features:
- ✅ **Beautiful UI** with gradients and animations
- ✅ **Email Data Extraction** (sender, subject, date, content)
- ✅ **AI Analysis** (summary, key points, priority, category, sentiment)
- ✅ **Fallback System** (Gemini → Hugging Face → Mock)
- ✅ **Copy to Clipboard** functionality
- ✅ **Save to File** functionality
- ✅ **Responsive Design** that works on all screen sizes

### Planned Features:
- 🔄 **Custom Prompts** for different analysis types
- 🔄 **Multiple AI Models** (GPT-4, Claude, etc.)
- 🔄 **Email Templates** for responses
- 🔄 **Batch Processing** for multiple emails
- 🔄 **Export Options** (PDF, CSV, etc.)

## 📞 Support

### Need Help?
1. **Check the console logs** for detailed error messages
2. **Use the mock response** to test the UI
3. **Verify your API keys** are correct and active
4. **Check API quotas** haven't been exceeded

### Common Issues:
- **404 Errors**: Usually invalid API keys or disabled APIs
- **Button Not Visible**: Extension not loaded or Gmail not fully loaded
- **Network Errors**: Check internet connection and API endpoints

## 🚀 Next Steps

1. **Test with mock response** to see the beautiful UI
2. **Configure real APIs** for actual AI analysis
3. **Customize the prompts** for your specific needs
4. **Add more features** like custom analysis types

The extension is designed to gracefully handle API failures and provide a great user experience even when APIs are unavailable! 🎨✨ 