# 🔧 API Debugging & Configuration Guide

## 🚨 Current Issues

Based on your console logs, both APIs are returning 404 errors:

### Gemini API Issues:
- **Error**: `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCNwTQi0mcNn8FkQ09WlF__Pe26re8B_Kc 404 (Not Found)`
- **Possible Causes**:
  1. **Invalid API Key**: The key might be incorrect or expired
  2. **API Not Enabled**: Gemini API might not be enabled in your Google Cloud Console
  3. **Quota Exceeded**: You might have hit your API quota limit

### Hugging Face API Issues:
- **Error**: `POST https://api-inference.huggingface.co/models/gpt2 404 (Not Found)`
- **Possible Causes**:
  1. **Invalid API Key**: The Hugging Face token might be incorrect
  2. **Model Not Available**: The model might be temporarily unavailable
  3. **Rate Limiting**: You might be hitting rate limits

## 🔧 How to Fix

### 1. Fix Gemini API

#### Step 1: Get a Valid API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the new key (starts with `AIzaSy...`)

#### Step 2: Enable Gemini API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Go to "APIs & Services" > "Library"
4. Search for "Gemini API"
5. Click "Enable"

#### Step 3: Update the Code
Replace the API key in `content.js` line 899:
```javascript
const API_KEY = 'YOUR_NEW_GEMINI_API_KEY_HERE';
```

### 2. Fix Hugging Face API

#### Step 1: Get a Valid API Token
1. Go to [Hugging Face](https://huggingface.co/settings/tokens)
2. Sign in or create an account
3. Click "New token"
4. Give it a name (e.g., "Gmail AI Assistant")
5. Select "Read" permissions
6. Copy the token (starts with `hf_...`)

#### Step 2: Update the Code
Replace the API token in `content.js` around line 745:
```javascript
'Authorization': 'Bearer YOUR_NEW_HUGGINGFACE_TOKEN_HERE'
```

### 3. Test Your APIs

#### Test Gemini API:
```bash
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Hello, how are you?"
      }]
    }]
  }'
```

#### Test Hugging Face API:
```bash
curl -X POST \
  "https://api-inference.huggingface.co/models/gpt2" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "inputs": "Hello, how are you?",
    "parameters": {
      "max_length": 50,
      "temperature": 0.7
    }
  }'
```

## 🛠️ Alternative Solutions

### Option 1: Use Mock Response (Current)
The extension now includes a mock response that works perfectly for testing the UI:

```javascript
{
  name: 'Mock Response',
  url: null,
  method: 'GET',
  headers: {},
  bodyFormat: 'mock',
  model: 'mock'
}
```

### Option 2: Use Different Hugging Face Models
Try these alternative models:
- `microsoft/DialoGPT-medium`
- `distilgpt2`
- `gpt2`
- `EleutherAI/gpt-neo-125M`

### Option 3: Use Free AI Services
Consider these free alternatives:
- [Ollama](https://ollama.ai/) (local)
- [OpenAI API](https://openai.com/api/) (paid)
- [Anthropic Claude](https://console.anthropic.com/) (paid)

## 🔍 Debugging Steps

### 1. Check Console Logs
The extension now provides detailed logging:
- 🔍 **Gemini Debug Info**: Shows URL and API key (first 10 chars)
- 🔄 **Fallback Attempts**: Shows which fallback is being tried
- ❌ **Error Details**: Shows specific error messages

### 2. Test API Keys Manually
Use the curl commands above to test your API keys outside the extension.

### 3. Check Network Tab
1. Open Chrome DevTools
2. Go to Network tab
3. Click "Summarize Email"
4. Look for failed requests and their details

### 4. Verify API Quotas
- **Gemini**: Check [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- **Hugging Face**: Check [Hugging Face Settings](https://huggingface.co/settings/tokens)

## 🎯 Quick Fix

If you want to test the UI immediately:

1. **Reload the extension** in `chrome://extensions/`
2. **Go to Gmail** and click "Summarize Email"
3. **Check console** - you should see:
   ```
   🔄 Attempting fallback API...
   🔄 Trying fallback 1/3: Hugging Face GPT-2
   ❌ Hugging Face GPT-2 failed: [error]
   🔄 Trying fallback 2/3: Hugging Face DistilGPT2
   ❌ Hugging Face DistilGPT2 failed: [error]
   🔄 Trying fallback 3/3: Mock Response
   📝 Using mock response for demonstration
   ```

The mock response will show you the beautiful UI working perfectly! 🎨✨

## 📞 Need Help?

If you're still having issues:
1. **Check your API keys** are correct and active
2. **Verify API quotas** haven't been exceeded
3. **Try the mock response** to test the UI
4. **Use the debugging logs** to identify specific issues

The extension is designed to gracefully handle API failures and provide a great user experience even when APIs are unavailable! 🚀 