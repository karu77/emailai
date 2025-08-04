# 📧 Email AI Assistant

A powerful Chrome extension that adds AI-powered email analysis to Gmail. Extract, summarize, and analyze emails with multiple AI providers including Google Gemini, Hugging Face, and more.

## ✨ Features

- 🤖 **Multi-AI Support**: Google Gemini 2.5, Hugging Face, OpenAI, Anthropic Claude
- 📊 **Smart Analysis**: Summary, key points, priority, category, and sentiment analysis
- 🔄 **Fallback System**: Automatic fallback between different AI providers
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📱 **Responsive**: Works on all Gmail layouts and screen sizes
- 🔒 **Secure**: Environment-based API key management
- 📋 **Copy Analysis**: One-click copy of analysis results
- 📧 **View Original**: Quick access to original email content

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/email-ai-assistant.git
cd email-ai-assistant
```

### 2. Set Up Environment Variables
```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your API keys
nano .env
```

### 3. Configure API Keys
Edit `.env` file with your actual API keys:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Hugging Face API
HUGGINGFACE_TOKEN=your_huggingface_token_here

# OpenAI API (optional)
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic Claude API (optional)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 4. Load Extension in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the project folder
5. The extension should now appear in your extensions list

### 5. Use the Extension
1. Go to Gmail
2. Open any email thread
3. Click the "Summarize Email" button that appears
4. View the AI analysis results

## 🔧 Configuration

### API Keys Setup

#### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to your `.env` file

#### Hugging Face API
1. Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
2. Create a new token
3. Add to your `.env` file

#### OpenAI API (Optional)
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to your `.env` file

#### Anthropic Claude API (Optional)
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create a new API key
3. Add to your `.env` file

## 🏗️ Project Structure

```
email-ai-assistant/
├── manifest.json          # Chrome extension manifest
├── content.js            # Main extension logic
├── api-config.js         # API configuration
├── popup.html            # Extension popup UI
├── popup.js              # Popup functionality
├── styles.css            # Extension styling
├── .env                  # Environment variables (not in repo)
├── env.example           # Example environment file
├── .gitignore            # Git ignore rules
└── README.md            # This file
```

## 🔍 How It Works

1. **Email Detection**: Automatically detects when you're viewing an email in Gmail
2. **Content Extraction**: Extracts email subject, sender, date, and content
3. **AI Analysis**: Sends data to configured AI providers for analysis
4. **Fallback System**: If primary AI fails, automatically tries fallback providers
5. **Result Display**: Shows analysis in a beautiful modal popup
6. **Data Management**: Allows copying analysis and viewing original email

## 🛠️ Development

### Local Development
1. Make changes to the code
2. Reload the extension in `chrome://extensions/`
3. Test in Gmail

### Debugging
- Open Chrome DevTools (F12)
- Check the Console tab for debug messages
- Use the `test-gemini-api.html` file to test API keys

### Building for Production
1. Update version in `manifest.json`
2. Create a ZIP file of the project
3. Upload to Chrome Web Store (if publishing)

## 🔒 Security

- API keys are stored in `.env` file (not committed to repo)
- `.gitignore` prevents sensitive files from being committed
- Extension only requests necessary permissions
- All API calls are made over HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Hugging Face for open-source AI models
- Chrome Extensions API for the platform
- Gmail for the email interface

## 📞 Support

If you encounter any issues:

1. Check the [API Debug Guide](API_DEBUG_GUIDE.md)
2. Test your API keys with `test-gemini-api.html`
3. Check the console for error messages
4. Open an issue on GitHub

## 🔄 Changelog

### v1.0.0
- Initial release
- Multi-AI provider support
- Modern UI design
- Fallback system
- Environment variable support

---

**Made with ❤️ for better email productivity** 