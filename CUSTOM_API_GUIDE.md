# 🔧 Custom API Endpoint Integration Guide

This guide shows you how to configure the Gmail AI Assistant extension to work with any custom API endpoint.

## 🚀 **How It Works**

The extension now includes a flexible `sendToCustomAPI()` method that can work with:
- **OpenAI API** (GPT models)
- **Anthropic Claude API**
- **Google Gemini API**
- **Custom/Proprietary APIs**
- **Local AI models** (via API endpoints)
- **Ollama** (local models)

## 📋 **Configuration Options**

### **1. API Configuration Object**

Edit the `API_CONFIG` object in `content.js`:

```javascript
const API_CONFIG = {
  url: 'YOUR_CUSTOM_API_ENDPOINT',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY',
    // Add any other headers your API needs
  },
  bodyFormat: 'openai', // 'openai', 'anthropic', 'custom', 'gemini'
  model: 'gpt-3.5-turbo' // Specify your model name
};
```

## 🔌 **Supported API Formats**

### **1. OpenAI Format**
```javascript
const API_CONFIG = {
  url: 'https://api.openai.com/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk-your-openai-api-key'
  },
  bodyFormat: 'openai',
  model: 'gpt-3.5-turbo'
};
```

### **2. Anthropic Claude Format**
```javascript
const API_CONFIG = {
  url: 'https://api.anthropic.com/v1/messages',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'sk-ant-your-anthropic-api-key',
    'anthropic-version': '2023-06-01'
  },
  bodyFormat: 'anthropic',
  model: 'claude-3-sonnet-20240229'
};
```

### **3. Google Gemini Format**
```javascript
const API_CONFIG = {
  url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  bodyFormat: 'gemini',
  model: 'gemini-pro'
};
```

### **4. Custom API Format**
```javascript
const API_CONFIG = {
  url: 'https://your-custom-api.com/analyze',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-custom-api-key'
  },
  bodyFormat: 'custom',
  model: 'your-model-name'
};
```

## 🏠 **Local AI Models**

### **Ollama Integration**
```javascript
const API_CONFIG = {
  url: 'http://localhost:11434/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  bodyFormat: 'ollama',
  model: 'llama2' // or 'mistral', 'codellama', etc.
};
```

### **Custom Local Endpoint**
```javascript
const API_CONFIG = {
  url: 'http://localhost:8000/analyze',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  bodyFormat: 'custom',
  model: 'local-model'
};
```

## 📝 **Expected Response Format**

Your API should return a JSON response in this format:

```json
{
  "summary": "Brief 2-3 sentence summary of the email",
  "keyPoints": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ],
  "priority": "High|Medium|Low",
  "category": "Work|Personal|Spam|Newsletter|Other",
  "sentiment": "Positive|Negative|Neutral"
}
```

## 🔧 **Custom Response Parsing**

If your API returns a different format, you can modify the response parsing in the `sendToCustomAPI()` method:

```javascript
case 'custom':
  // Handle your custom API response format
  aiText = result.response || result.text || result.content || JSON.stringify(result);
  break;
```

## 🛠️ **Setup Instructions**

### **Step 1: Choose Your API**
1. Decide which AI service you want to use
2. Get your API key/credentials
3. Note the API endpoint URL

### **Step 2: Configure the Extension**
1. Open `content.js` in your extension folder
2. Find the `API_CONFIG` object in the `sendToCustomAPI()` method
3. Update the configuration with your API details

### **Step 3: Test the Integration**
1. Reload the extension in `chrome://extensions/`
2. Refresh Gmail
3. Click the "Summarize Email" button
4. Check the browser console for any errors

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors**: Make sure your API supports CORS requests
2. **Authentication Errors**: Check your API key and headers
3. **Response Format**: Ensure your API returns the expected JSON format
4. **Network Errors**: Verify the API endpoint URL is correct

### **Debug Mode:**
Add this to see detailed API requests/responses:

```javascript
console.log('API Request:', requestBody);
console.log('API Response:', result);
```

## 🎯 **Example: OpenAI Integration**

Here's a complete example for OpenAI:

```javascript
const API_CONFIG = {
  url: 'https://api.openai.com/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk-your-actual-openai-key'
  },
  bodyFormat: 'openai',
  model: 'gpt-3.5-turbo'
};
```

## 🔒 **Security Notes**

- **Never commit API keys to version control**
- **Use environment variables for production**
- **Consider using a backend proxy for sensitive APIs**
- **Monitor API usage and costs**

## 📚 **Additional Resources**

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Google Gemini API](https://ai.google.dev/docs)
- [Ollama Documentation](https://ollama.ai/docs)

---

**Need help?** Check the browser console for error messages or modify the response parsing logic to match your API's format. 