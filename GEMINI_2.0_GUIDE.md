# 🚀 Gemini 2.5 Models Guide

## 📋 Available Gemini 2.5 Models

The extension now supports the latest Gemini 2.5 models:

### 🎯 **Primary Models (Recommended)**
- **`gemini-2.5-flash`** - Latest and fastest model (best for speed)
- **`gemini-2.5-pro`** - Latest and most powerful model (best for quality)
- **`gemini-2.0-flash-exp`** - Experimental 2.0 model
- **`gemini-2.0-flash`** - Stable 2.0 model (balanced)
- **`gemini-1.5-pro`** - Previous generation (reliable)
- **`gemini-1.5-flash`** - Fast 1.5 model (efficient)

## 🔧 How to Use

### 1. Get a Valid API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the new key (starts with `AIzaSy...`)

### 2. Update Your Configuration
In `api-config.js`, replace the API key:
```javascript
const API_CONFIG = {
  GEMINI_API_KEY: 'YOUR_NEW_GEMINI_API_KEY_HERE',
  // ... other keys
};
```

### 3. Test the Extension
1. Reload the extension in `chrome://extensions/`
2. Go to Gmail and click "Summarize Email"
3. Check console for model information

## 🔍 Console Logs to Look For

### ✅ Working Gemini 2.5:
```
🔍 Gemini API Debug Info:
Model: gemini-2.5-flash
URL: https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=AIzaSy...
API Key (first 10 chars): AIzaSyDqQx...
Request body: {contents: Array(1)}
Response status: 200
Gemini response: {candidates: [{content: {parts: [{text: "..."}]}}]}
```

### ❌ Common Issues:
```
❌ Gemini API error: Error: Gemini API error: 400 - API key expired
❌ Gemini API error: Error: Gemini API error: 404 - Model not found
```

## 🎯 Model Comparison

| Model | Speed | Quality | Use Case |
|-------|-------|---------|----------|
| `gemini-2.5-flash` | ⚡⚡⚡ | ⭐⭐⭐⭐ | Latest and fastest |
| `gemini-2.5-pro` | ⚡⚡ | ⭐⭐⭐⭐⭐ | Latest and most powerful |
| `gemini-2.0-flash-exp` | ⚡⚡⚡ | ⭐⭐⭐ | Experimental features |
| `gemini-2.0-flash` | ⚡⚡ | ⭐⭐⭐⭐ | Balanced performance |
| `gemini-1.5-pro` | ⚡ | ⭐⭐⭐⭐⭐ | Reliable quality |
| `gemini-1.5-flash` | ⚡⚡⚡ | ⭐⭐⭐ | Fast and efficient |

## 🛠️ Troubleshooting

### Problem: "API key expired"
**Solution:**
1. Get a new API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Update `api-config.js`
3. Reload the extension

### Problem: "Model not found"
**Solution:**
1. Check if the model is available in your region
2. Try a different model from the list
3. Check [Google AI Studio](https://makersuite.google.com/) for model availability

### Problem: "Quota exceeded"
**Solution:**
1. Check your API quotas in [Google Cloud Console](https://console.cloud.google.com/)
2. Upgrade your plan if needed
3. Use the fallback system (Hugging Face → Mock)

## 🎨 Features

### Current Capabilities:
- ✅ **Email Analysis** - Summary, key points, priority, category, sentiment
- ✅ **JSON Response** - Structured data for easy parsing
- ✅ **Error Handling** - Graceful fallback to other APIs
- ✅ **Debug Logging** - Detailed console information

### Planned Features:
- 🔄 **Model Selection** - Choose specific models
- 🔄 **Custom Prompts** - Different analysis types
- 🔄 **Batch Processing** - Multiple emails at once
- 🔄 **Response Caching** - Save API calls

## 📞 Support

### Need Help?
1. **Check console logs** for detailed error messages
2. **Verify API key** is correct and active
3. **Test with curl** to isolate issues
4. **Use fallback system** if Gemini fails

### Test with curl:
```bash
curl -X POST \
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Hello, how are you?"
      }]
    }]
  }'
```

## 🚀 Next Steps

1. **Get a new API key** if current one is expired
2. **Test with different models** to find the best one
3. **Customize prompts** for your specific needs
4. **Add more features** like custom analysis types

The extension is designed to work with all Gemini 2.0 models and gracefully fall back to other options if needed! 🎨✨ 