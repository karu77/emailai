# 🤗 Hugging Face & SLM Fallback Guide

The Gmail AI Assistant now uses **Hugging Face** and **Small Language Models (SLMs)** as the fallback API instead of OpenAI. This provides better privacy, cost-effectiveness, and open-source alternatives.

## 🚀 **How It Works**

### **1. Primary: Gemini API**
- Tries Gemini first (fast, reliable, free tier)
- Uses Google's Gemini Pro model

### **2. Fallback: Hugging Face/SLM**
- Automatically triggered if Gemini fails
- Uses Hugging Face Inference API (free tier available)
- Supports various open-source models
- Privacy-friendly and cost-effective

## 🔧 **Hugging Face Configuration**

### **Step 1: Get Hugging Face API Key**
1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account and sign in
3. Go to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
4. Create a new token with "read" permissions
5. Copy the token

### **Step 2: Configure in Extension**
In `content.js`, find the `sendToFallbackAPI()` method and update:

```javascript
const FALLBACK_CONFIG = {
  url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_HUGGINGFACE_API_KEY'
  },
  bodyFormat: 'huggingface',
  model: 'microsoft/DialoGPT-medium'
};
```

## 🤖 **Recommended Hugging Face Models**

### **1. Text Generation Models**
```javascript
// Microsoft DialoGPT (Good for conversations)
model: 'microsoft/DialoGPT-medium'

// GPT-2 (Classic text generation)
model: 'gpt2'

// DistilGPT2 (Faster, smaller)
model: 'distilgpt2'
```

### **2. Instruction-Following Models**
```javascript
// FLAN-T5 (Good for tasks)
model: 'google/flan-t5-base'

// BLOOM (Multilingual)
model: 'bigscience/bloom-560m'
```

### **3. Chat Models**
```javascript
// ChatGLM (Chinese-English)
model: 'THUDM/chatglm-6b'

// Vicuna (Good performance)
model: 'lmsys/vicuna-7b-v1.5'
```

## 🏠 **Small Language Models (SLMs)**

### **Option 1: TinyLlama**
```javascript
const FALLBACK_CONFIG = {
  url: 'https://api.tinyllama.com/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  bodyFormat: 'slm',
  model: 'tiny-llama-1.1b'
};
```

### **Option 2: Local SLM with Ollama**
```javascript
const FALLBACK_CONFIG = {
  url: 'http://localhost:11434/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  bodyFormat: 'ollama',
  model: 'tinyllama'
};
```

### **Option 3: Free SLM APIs**
```javascript
const FALLBACK_CONFIG = {
  url: 'https://api.free-llm.com/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  bodyFormat: 'slm',
  model: 'free-tiny-model'
};
```

## 📊 **Model Comparison**

| Model | Size | Speed | Quality | Cost |
|-------|------|-------|---------|------|
| **DialoGPT-medium** | 345M | Fast | Good | Free |
| **GPT-2** | 117M | Very Fast | Basic | Free |
| **FLAN-T5-base** | 250M | Fast | Good | Free |
| **TinyLlama** | 1.1B | Medium | Good | Free |
| **Gemini Pro** | Large | Fast | Excellent | Free tier |

## 🛠️ **Setup Instructions**

### **Step 1: Choose Your Model**
1. **For general use**: `microsoft/DialoGPT-medium`
2. **For speed**: `gpt2` or `distilgpt2`
3. **For tasks**: `google/flan-t5-base`
4. **For local use**: TinyLlama with Ollama

### **Step 2: Configure API**
1. Get your Hugging Face API key
2. Update the `FALLBACK_CONFIG` in `content.js`
3. Choose your preferred model

### **Step 3: Test**
1. Reload the extension
2. Test with invalid Gemini key to trigger fallback
3. Check browser console for API responses

## 🔍 **Hugging Face API Examples**

### **Text Generation Model**
```javascript
const FALLBACK_CONFIG = {
  url: 'https://api-inference.huggingface.co/models/gpt2',
  headers: {
    'Authorization': 'Bearer YOUR_KEY'
  },
  bodyFormat: 'huggingface',
  model: 'gpt2'
};
```

### **Conversational Model**
```javascript
const FALLBACK_CONFIG = {
  url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
  headers: {
    'Authorization': 'Bearer YOUR_KEY'
  },
  bodyFormat: 'huggingface',
  model: 'microsoft/DialoGPT-medium'
};
```

### **Instruction Model**
```javascript
const FALLBACK_CONFIG = {
  url: 'https://api-inference.huggingface.co/models/google/flan-t5-base',
  headers: {
    'Authorization': 'Bearer YOUR_KEY'
  },
  bodyFormat: 'huggingface',
  model: 'google/flan-t5-base'
};
```

## 🎯 **Benefits of Hugging Face/SLM**

### **1. Cost-Effective**
- Free tier available (30,000 requests/month)
- No per-token charges
- Open-source models

### **2. Privacy-Friendly**
- No data sent to commercial AI companies
- Local deployment possible
- Open-source transparency

### **3. Flexible**
- Thousands of models available
- Easy to switch between models
- Custom model support

### **4. Reliable**
- Stable API
- Good uptime
- Community support

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Model Loading Time**
   - First request may take 10-30 seconds
   - Model stays loaded for subsequent requests
   - Use smaller models for faster loading

2. **API Limits**
   - Free tier: 30,000 requests/month
   - Upgrade for higher limits
   - Consider local deployment

3. **Response Quality**
   - Different models have different strengths
   - Experiment with different models
   - Adjust prompt format

### **Debug Mode:**
Add this to see API responses:

```javascript
console.log('Hugging Face Response:', result);
console.log('Parsed Text:', aiText);
```

## 🚀 **Advanced Configuration**

### **Custom Model Endpoint**
```javascript
const FALLBACK_CONFIG = {
  url: 'https://api-inference.huggingface.co/models/YOUR_USERNAME/YOUR_MODEL',
  headers: {
    'Authorization': 'Bearer YOUR_KEY'
  },
  bodyFormat: 'huggingface',
  model: 'YOUR_USERNAME/YOUR_MODEL'
};
```

### **Local Hugging Face Server**
```javascript
const FALLBACK_CONFIG = {
  url: 'http://localhost:8000/generate',
  headers: {
    'Content-Type': 'application/json'
  },
  bodyFormat: 'custom',
  model: 'local-model'
};
```

## 💰 **Cost Comparison**

| Service | Cost | Requests/Month | Quality |
|---------|------|----------------|---------|
| **Hugging Face Free** | $0 | 30,000 | Good |
| **Hugging Face Pro** | $9/month | 100,000 | Good |
| **OpenAI GPT-3.5** | $0.002/1K tokens | Unlimited | Excellent |
| **Local SLM** | $0 | Unlimited | Variable |

## 🎯 **Recommended Setup**

### **For Personal Use:**
- **Primary**: Gemini (free tier)
- **Fallback**: Hugging Face DialoGPT-medium

### **For Development:**
- **Primary**: Gemini (free tier)
- **Fallback**: Local TinyLlama with Ollama

### **For Production:**
- **Primary**: Gemini (free tier)
- **Fallback**: Hugging Face FLAN-T5-base

---

**Hugging Face and SLMs provide excellent open-source alternatives to commercial AI APIs!** 🤗 