# 🔄 Fallback API System Guide

The Gmail AI Assistant now includes a **smart fallback system** that tries Gemini first, then automatically falls back to an open-source API if Gemini fails.

## 🚀 **How the Fallback System Works**

### **1. Primary: Gemini API**
- Tries Gemini first (fast, reliable, free tier available)
- Uses Google's Gemini Pro model
- Requires Gemini API key

### **2. Fallback: Open-Source API**
- Automatically triggered if Gemini fails
- Uses OpenAI GPT-3.5-turbo by default (cost-effective)
- Can be configured to use any open-source API
- Ensures reliability even if primary API is down

## ⚙️ **Configuration**

### **Step 1: Set Up Gemini API**
In `content.js`, find the `sendToGemini()` method and add your API key:

```javascript
const API_KEY = 'YOUR_ACTUAL_GEMINI_API_KEY'; // Get from Google AI Studio
```

### **Step 2: Configure Fallback API**
In `content.js`, find the `sendToFallbackAPI()` method and configure:

```javascript
const FALLBACK_CONFIG = {
  url: 'https://api.openai.com/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
  },
  bodyFormat: 'openai',
  model: 'gpt-3.5-turbo'
};
```

## 🔧 **Fallback API Options**

### **Option 1: OpenAI (Recommended)**
```javascript
const FALLBACK_CONFIG = {
  url: 'https://api.openai.com/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk-your-openai-key'
  },
  bodyFormat: 'openai',
  model: 'gpt-3.5-turbo'
};
```

### **Option 2: Ollama (Local)**
```javascript
const FALLBACK_CONFIG = {
  url: 'http://localhost:11434/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  bodyFormat: 'ollama',
  model: 'llama2'
};
```

### **Option 3: Free Open-Source API**
```javascript
const FALLBACK_CONFIG = {
  url: 'https://api.free-ai-service.com/analyze',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  bodyFormat: 'custom',
  model: 'free-model'
};
```

### **Option 4: Anthropic Claude**
```javascript
const FALLBACK_CONFIG = {
  url: 'https://api.anthropic.com/v1/messages',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'sk-ant-your-anthropic-key',
    'anthropic-version': '2023-06-01'
  },
  bodyFormat: 'anthropic',
  model: 'claude-3-sonnet-20240229'
};
```

## 🎯 **Benefits of Fallback System**

### **1. Reliability**
- If Gemini is down, automatically uses fallback
- No interruption to user experience
- Handles API rate limits gracefully

### **2. Cost Optimization**
- Use Gemini's free tier as primary
- Fallback to cost-effective alternatives
- Avoid expensive API calls when possible

### **3. Performance**
- Gemini is typically faster
- Fallback ensures analysis always completes
- Smart error handling

### **4. Flexibility**
- Easy to switch between different APIs
- Can use local models as fallback
- Supports any API format

## 🔍 **Visual Indicators**

The extension shows which API was used:

- **Primary (Gemini)**: "🤖 Gemini AI Analysis"
- **Fallback**: "🤖 Fallback AI Analysis" + "⚠️ Using Fallback API"

## 🛠️ **Setup Instructions**

### **Step 1: Get API Keys**
1. **Gemini API Key**: [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Fallback API Key**: Choose your preferred service

### **Step 2: Configure Extension**
1. Open `content.js`
2. Add your Gemini API key in `sendToGemini()`
3. Configure fallback API in `sendToFallbackAPI()`

### **Step 3: Test**
1. Reload extension in `chrome://extensions/`
2. Refresh Gmail
3. Test with and without internet to see fallback in action

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Both APIs Fail**
   - Check API keys and internet connection
   - Verify API endpoints are correct
   - Check browser console for detailed errors

2. **Fallback Not Triggering**
   - Ensure Gemini API key is invalid or network is down
   - Check that fallback API is properly configured

3. **CORS Errors**
   - Some APIs may not support browser requests
   - Consider using a proxy or backend service

### **Debug Mode:**
Add this to see which API is being used:

```javascript
console.log('Using API:', usedFallback ? 'Fallback' : 'Gemini');
```

## 💰 **Cost Comparison**

| API | Cost | Speed | Reliability |
|-----|------|-------|-------------|
| **Gemini** | Free tier | Fast | High |
| **OpenAI GPT-3.5** | $0.002/1K tokens | Fast | High |
| **Ollama (Local)** | Free | Medium | High |
| **Free APIs** | Free | Slow | Variable |

## 🎯 **Recommended Setup**

### **For Personal Use:**
- **Primary**: Gemini (free tier)
- **Fallback**: Ollama (local, free)

### **For Business Use:**
- **Primary**: Gemini (free tier)
- **Fallback**: OpenAI GPT-3.5 (reliable, cost-effective)

### **For Development:**
- **Primary**: Gemini (free tier)
- **Fallback**: Custom local API

## 🔒 **Security Notes**

- Store API keys securely
- Never commit keys to version control
- Consider using environment variables
- Monitor API usage and costs

---

**The fallback system ensures your extension always works, even when APIs are down or rate-limited!** 🛡️ 