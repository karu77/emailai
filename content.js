// Gmail AI Assistant Content Script
console.log('Gmail AI Assistant: Content script loaded!');

// Extension is working - no need for test button

class GmailAIAssistant {
  constructor() {
    console.log('Gmail AI Assistant: Initializing...');
    this.button = null;
    this.isButtonInjected = false;
    this.init();
  }

  init() {
    // Wait for Gmail to load
    this.waitForGmail();
    
    // Listen for navigation changes in Gmail
    this.observeGmailNavigation();
  }

  waitForGmail() {
    console.log('Gmail AI Assistant: Waiting for Gmail to load...');
    const checkGmail = () => {
      const gmailContainer = document.querySelector('[role="main"]');
      if (gmailContainer) {
        console.log('Gmail AI Assistant: Gmail container found, injecting button...');
        this.injectButton();
      } else {
        console.log('Gmail AI Assistant: Gmail container not found, retrying...');
        setTimeout(checkGmail, 1000);
      }
    };
    checkGmail();
  }

  observeGmailNavigation() {
    // Gmail uses History API for navigation, so we need to listen for URL changes
    let currentUrl = location.href;
    
    const checkUrlChange = () => {
      if (location.href !== currentUrl) {
        currentUrl = location.href;
        console.log('Gmail AI Assistant: URL changed, re-injecting button...');
        this.isButtonInjected = false; // Reset flag to allow re-injection
        // Small delay to let Gmail update the DOM
        setTimeout(() => {
          this.injectButton();
        }, 500);
      }
      setTimeout(checkUrlChange, 100);
    };
    
    checkUrlChange();
  }

  injectButton() {
    if (this.isButtonInjected) {
      console.log('Gmail AI Assistant: Button already injected, skipping...');
      return;
    }

    // Look for the Gmail toolbar where we can inject our button
    const toolbarSelectors = [
      '.aA5',
      '[role="toolbar"]',
      '.aA5 .aA6',
      '.aA5 .aA7',
      '.aA5 .aA8',
      '.aA5 .aA9',
      '.aA5 .aAa',
      '.aA5 .aAb',
      '.aA5 .aAc',
      '.aA5 .aAd',
      '.aA5 .aAe',
      '.aA5 .aAf',
      '.aA5 .aAg',
      '.aA5 .aAh',
      '.aA5 .aAi',
      '.aA5 .aAj',
      '.aA5 .aAk',
      '.aA5 .aAl',
      '.aA5 .aAm',
      '.aA5 .aAn',
      '.aA5 .aAo',
      '.aA5 .aAp',
      '.aA5 .aAq',
      '.aA5 .aAr',
      '.aA5 .aAs',
      '.aA5 .aAt',
      '.aA5 .aAu',
      '.aA5 .aAv',
      '.aA5 .aAw',
      '.aA5 .aAx',
      '.aA5 .aAy',
      '.aA5 .aAz'
    ];

    let toolbar = null;
    for (const selector of toolbarSelectors) {
      toolbar = document.querySelector(selector);
      if (toolbar) {
        console.log('Gmail AI Assistant: Found toolbar with selector:', selector);
        break;
      }
    }

    // Try alternative selectors
    if (!toolbar) {
      const alternativeSelectors = [
        '[role="main"]',
        '.aA5',
        '.aA6',
        '.aA7',
        '.aA8',
        '.aA9',
        '.aAa',
        '.aAb',
        '.aAc',
        '.aAd',
        '.aAe',
        '.aAf',
        '.aAg',
        '.aAh',
        '.aAi',
        '.aAj',
        '.aAk',
        '.aAl',
        '.aAm',
        '.aAn',
        '.aAo',
        '.aAp',
        '.aAq',
        '.aAr',
        '.aAs',
        '.aAt',
        '.aAu',
        '.aAv',
        '.aAw',
        '.aAx',
        '.aAy',
        '.aAz'
      ];
      
      for (const selector of alternativeSelectors) {
        toolbar = document.querySelector(selector);
        if (toolbar) {
          console.log('Gmail AI Assistant: Found alternative container with selector:', selector);
          break;
        }
      }
    }

    if (toolbar && !this.button) {
      console.log('Gmail AI Assistant: Creating and inserting button...');
      this.createButton();
      this.insertButton(toolbar);
      this.isButtonInjected = true;
      console.log('Gmail AI Assistant: Button successfully injected!');
    } else {
      console.log('Gmail AI Assistant: Could not find suitable toolbar or button already exists');
      // Try to inject into body as fallback
      if (!this.button) {
        console.log('Gmail AI Assistant: Trying fallback injection into body...');
        this.createButton();
        
        // Make it a floating button in the top-left corner
        this.button.style.cssText = `
          position: fixed !important;
          top: 50px !important;
          left: 10px !important;
          background: #ea4335 !important;
          color: white !important;
          border: 2px solid #d93025 !important;
          border-radius: 4px !important;
          padding: 8px 16px !important;
          margin: 4px !important;
          font-weight: bold !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
          z-index: 10000 !important;
        `;
        
        document.body.appendChild(this.button);
        this.isButtonInjected = true;
        console.log('Gmail AI Assistant: Button injected into body as fallback!');
      }
    }
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.id = 'gmail-ai-summarize-btn';
    this.button.className = 'gmail-ai-button';
    this.button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
      </svg>
      <span>Summarize Email</span>
    `;
    
    // Button styling will be set in insertButton method
    
    this.button.addEventListener('click', () => {
      this.handleSummarizeClick();
    });
  }

  insertButton(toolbar) {
    // Make the button a floating button instead of trying to insert into toolbar
    // This ensures it's always visible
    this.button.style.cssText = `
      position: fixed !important;
      top: 80px !important;
      right: 20px !important;
      background: #4285f4 !important;
      color: white !important;
      border: 2px solid #1a73e8 !important;
      border-radius: 4px !important;
      padding: 8px 16px !important;
      margin: 4px !important;
      font-weight: bold !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
      z-index: 10000 !important;
    `;
    
    document.body.appendChild(this.button);
    console.log('Gmail AI Assistant: Button positioned as floating button!');
  }

  async handleSummarizeClick() {
    try {
      this.button.disabled = true;
      this.button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="spinning">
          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
        </svg>
        <span>Extracting...</span>
      `;

      const emailData = this.extractEmailData();
      
      if (emailData) {
        // Store the extracted data
        this.storeEmailData(emailData);
        
        // Show the email content in a popup
        this.showEmailPopup(emailData);
        
        // Show success message
        this.showNotification('Email extracted! Sending to Gemini...', 'success');
        
        // Update button to show processing
        this.button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="spinning">
            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
          </svg>
          <span>Analyzing with Gemini...</span>
        `;
        
        // Try Gemini first, then fallback to open-source API
        let aiResponse = null;
        let usedFallback = false;
        
        try {
          // Try Gemini first
          console.log('Attempting Gemini API call...');
          aiResponse = await this.sendToGemini(emailData);
          console.log('Gemini analysis complete:', aiResponse);
        } catch (error) {
          console.log('Gemini failed, trying fallback API...', error.message);
          usedFallback = true;
          
          try {
            // Fallback to Hugging Face
            aiResponse = await this.sendToFallbackAPI(emailData);
            console.log('Fallback API analysis complete:', aiResponse);
          } catch (fallbackError) {
            console.error('Fallback API failed:', fallbackError);
            
            // Use mock response for demonstration
            console.log('Using mock response for demonstration...');
            aiResponse = {
              summary: `This email from ${emailData.sender} appears to be about ${emailData.subject}. Based on the content, it seems to contain important information that may require attention.`,
              keyPoints: [
                `Email is from ${emailData.sender}`,
                `Subject: ${emailData.subject}`,
                'Contains relevant information',
                'May require follow-up action',
                'Important for recipient to review'
              ],
              priority: 'Medium',
              category: 'Work',
              sentiment: 'Neutral'
            };
          }
        }
        
        // Show results in popup
        console.log('🔍 About to call showGeminiResults with:');
        console.log('emailData:', emailData);
        console.log('aiResponse:', aiResponse);
        console.log('usedFallback:', usedFallback);
        this.showGeminiResults(emailData, aiResponse, usedFallback);
      } else {
        this.showNotification('No email content found. Please open an email first.', 'error');
      }
    } catch (error) {
      console.error('Error extracting email text:', error);
      this.showNotification('Error extracting email text. Please try again.', 'error');
    } finally {
      this.button.disabled = false;
      this.button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
        <span>Summarize Email</span>
      `;
    }
  }

  extractEmailData() {
    // Gmail's email content is typically in these selectors
    const emailSelectors = [
      '.a3s',
      '.a3s .a3s',
      '[role="main"] .a3s',
      '.adn .a3s',
      '.a3s .adn',
      '.a3s .a3s .a3s'
    ];

    let emailContent = null;
    
    for (const selector of emailSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        emailContent = element;
        break;
      }
    }

    if (!emailContent) {
      // Fallback: look for any div with substantial text content
      const allDivs = document.querySelectorAll('div');
      for (const div of allDivs) {
        const text = div.textContent.trim();
        if (text.length > 100 && !div.querySelector('div')) {
          // Check if this looks like email content (has some structure)
          if (text.includes('@') || text.includes('Subject:') || text.includes('From:')) {
            emailContent = div;
            break;
          }
        }
      }
    }

    if (emailContent) {
      // Clean up the text
      let text = emailContent.textContent || emailContent.innerText;
      
      // Remove extra whitespace and normalize
      text = text.replace(/\s+/g, ' ').trim();
      
      // Extract structured data
      const subject = this.extractSubject();
      const sender = this.extractSender();
      const date = this.extractDate();
      
      return {
        subject: subject || 'No Subject',
        sender: sender || 'Unknown Sender',
        date: date || 'Unknown Date',
        content: text,
        fullText: `${subject ? `Subject: ${subject}\n\n` : ''}${sender ? `From: ${sender}\n\n` : ''}${text}`,
        timestamp: Date.now()
      };
    }

    return null;
  }

  extractSubject() {
    // Look for subject in various Gmail selectors
    const subjectSelectors = [
      'h2.hP',
      '.hP',
      '[data-thread-perm-id] h2',
      '.a4Wlk .a4Wlk'
    ];

    for (const selector of subjectSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }

    return null;
  }

  extractSender() {
    // Look for sender information
    const senderSelectors = [
      '.gD',
      '.gD .gD',
      '.a4Wlk .gD',
      '[email]'
    ];

    for (const selector of senderSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }

    return null;
  }

  extractDate() {
    // Look for date information with more comprehensive selectors
    const dateSelectors = [
      // Gmail's date selectors
      '.xW.xY .xS',
      '.xW.xY .xT',
      '.xW.xY .xU',
      '.xW.xY .xV',
      '.xW.xY .xW',
      '.xW.xY .xX',
      '.xW.xY .xY',
      '.xW.xY .xZ',
      '.xW.xY .xAa',
      '.xW.xY .xAb',
      '.xW.xY .xAc',
      '.xW.xY .xAd',
      '.xW.xY .xAe',
      '.xW.xY .xAf',
      '.xW.xY .xAg',
      '.xW.xY .xAh',
      '.xW.xY .xAi',
      '.xW.xY .xAj',
      '.xW.xY .xAk',
      '.xW.xY .xAl',
      '.xW.xY .xAm',
      '.xW.xY .xAn',
      '.xW.xY .xAo',
      '.xW.xY .xAp',
      '.xW.xY .xAq',
      '.xW.xY .xAr',
      '.xW.xY .xAs',
      '.xW.xY .xAt',
      '.xW.xY .xAu',
      '.xW.xY .xAv',
      '.xW.xY .xAw',
      '.xW.xY .xAx',
      '.xW.xY .xAy',
      '.xW.xY .xAz',
      // Additional Gmail selectors
      '[data-message-id] [data-tooltip]',
      '[data-message-id] [title*="Date"]',
      '[data-message-id] [title*="date"]',
      '[data-message-id] [aria-label*="Date"]',
      '[data-message-id] [aria-label*="date"]',
      // Generic date patterns
      '[title*="Jan"], [title*="Feb"], [title*="Mar"], [title*="Apr"], [title*="May"], [title*="Jun"]',
      '[title*="Jul"], [title*="Aug"], [title*="Sep"], [title*="Oct"], [title*="Nov"], [title*="Dec"]',
      '[aria-label*="Jan"], [aria-label*="Feb"], [aria-label*="Mar"], [aria-label*="Apr"], [aria-label*="May"], [aria-label*="Jun"]',
      '[aria-label*="Jul"], [aria-label*="Aug"], [aria-label*="Sep"], [aria-label*="Oct"], [aria-label*="Nov"], [aria-label*="Dec"]',
      // Time patterns
      '[title*="AM"], [title*="PM"], [title*="am"], [title*="pm"]',
      '[aria-label*="AM"], [aria-label*="PM"], [aria-label*="am"], [aria-label*="pm"]',
      // Date format patterns
      '[title*="/"], [title*="-"], [title*="."]',
      '[aria-label*="/"], [aria-label*="-"], [aria-label*="."]'
    ];

    for (const selector of dateSelectors) {
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        const text = element.textContent.trim();
        const title = element.getAttribute('title') || '';
        const ariaLabel = element.getAttribute('aria-label') || '';
        
        // Check if this looks like a date
        if (text && this.isDateLike(text)) {
          return text;
        }
        if (title && this.isDateLike(title)) {
          return title;
        }
        if (ariaLabel && this.isDateLike(ariaLabel)) {
          return ariaLabel;
        }
      }
    }

    // Fallback: look for any element with date-like content
    const allElements = document.querySelectorAll('*');
    for (const element of allElements) {
      const text = element.textContent.trim();
      if (text && this.isDateLike(text) && text.length < 50) {
        return text;
      }
    }

    return null;
  }

  isDateLike(text) {
    // Check if text contains date-like patterns
    const datePatterns = [
      /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i,
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/i,
      /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/,
      /\b\d{1,2}-\d{1,2}-\d{2,4}\b/,
      /\b\d{1,2}\.\d{1,2}\.\d{2,4}\b/,
      /\b(AM|PM|am|pm)\b/,
      /\b\d{1,2}:\d{2}\s*(AM|PM|am|pm)?\b/,
      /\b(today|yesterday|tomorrow)\b/i,
      /\b\d{4}\b/ // Year
    ];

    return datePatterns.some(pattern => pattern.test(text));
  }

  storeEmailData(data) {
    // Store structured data in localStorage
    localStorage.setItem('gmail_ai_extracted_data', JSON.stringify(data));
    localStorage.setItem('gmail_ai_extracted_timestamp', data.timestamp.toString());
  }

  showEmailPopup(data) {
    // Remove any existing popup
    const existingPopup = document.getElementById('gmail-ai-popup');
    if (existingPopup) {
      existingPopup.remove();
    }

    // Create popup container
    const popup = document.createElement('div');
    popup.id = 'gmail-ai-popup';
    popup.style.cssText = `
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      width: 600px !important;
      max-width: 90vw !important;
      max-height: 80vh !important;
      background: white !important;
      border: 2px solid #4285f4 !important;
      border-radius: 8px !important;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
      z-index: 10001 !important;
      font-family: 'Google Sans', Roboto, Arial, sans-serif !important;
      overflow: hidden !important;
    `;

    // Create popup content
    popup.innerHTML = `
      <div style="background: #4285f4; color: white; padding: 16px; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
        <span>📧 Email AI Assistant</span>
        <button id="gmail-ai-close" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; width: 24px; height: 24px;">×</button>
      </div>
      <div style="padding: 20px; overflow-y: auto; max-height: 60vh;">
        <div style="margin-bottom: 16px;">
          <strong style="color: #5f6368;">From:</strong> ${data.sender}
        </div>
        <div style="margin-bottom: 16px;">
          <strong style="color: #5f6368;">Subject:</strong> ${data.subject}
        </div>
        <div style="margin-bottom: 16px;">
          <strong style="color: #5f6368;">Date:</strong> ${data.date}
        </div>
        <div style="margin-bottom: 16px;">
          <strong style="color: #5f6368;">Content:</strong>
        </div>
        <div style="background: #f8f9fa; padding: 12px; border-radius: 4px; border-left: 4px solid #4285f4; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">
          ${data.content}
        </div>
        <div style="margin-top: 20px; display: flex; gap: 10px;">
          <button id="gmail-ai-copy" style="background: #4285f4; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 14px;">
            📋 Copy Text
          </button>
          <button id="gmail-ai-copy-full" style="background: #34a853; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 14px;">
            📄 Copy Full Email
          </button>
          <button id="gmail-ai-save" style="background: #ea4335; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 14px;">
            💾 Save as File
          </button>
        </div>
      </div>
    `;

    // Add event listeners
    popup.querySelector('#gmail-ai-close').addEventListener('click', () => {
      popup.remove();
    });

    popup.querySelector('#gmail-ai-copy').addEventListener('click', () => {
      navigator.clipboard.writeText(data.content).then(() => {
        this.showNotification('Content copied to clipboard!', 'success');
      });
    });

    popup.querySelector('#gmail-ai-copy-full').addEventListener('click', () => {
      navigator.clipboard.writeText(data.fullText).then(() => {
        this.showNotification('Full email copied to clipboard!', 'success');
      });
    });

    popup.querySelector('#gmail-ai-save').addEventListener('click', () => {
      this.saveEmailAsFile(data);
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.remove();
      }
    });

    // Add to page
    document.body.appendChild(popup);
  }

  async sendToCustomAPI(data) {
    try {
      // Configuration for your custom API endpoint
      const API_CONFIG = {
        url: 'YOUR_CUSTOM_API_ENDPOINT', // e.g., 'https://api.openai.com/v1/chat/completions'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY', // Add your API key here
          // Add any other headers your API needs
        },
        bodyFormat: 'openai', // 'openai', 'anthropic', 'custom', 'gemini'
        model: 'gpt-3.5-turbo' // Specify your model name
      };

      // Create the prompt
      const prompt = `Please analyze this email and provide a JSON response with the following structure:

Email Details:
From: ${data.sender}
Subject: ${data.subject}
Date: ${data.date}
Content: ${data.content}

Please respond with ONLY a valid JSON object in this exact format:
{
  "summary": "A brief 2-3 sentence summary of the email content",
  "keyPoints": ["First key point", "Second key point", "Third key point"],
  "priority": "High/Medium/Low",
  "category": "Work/Personal/Spam/Newsletter/Other",
  "sentiment": "Positive/Negative/Neutral"
}

Important: Respond with ONLY the JSON object, no additional text or explanations.`;

      // Prepare request body based on API format
      let requestBody;
      
      switch (API_CONFIG.bodyFormat) {
        case 'openai':
          requestBody = {
            model: API_CONFIG.model,
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 1000
          };
          break;
          
        case 'anthropic':
          requestBody = {
            model: API_CONFIG.model,
            max_tokens: 1000,
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ]
          };
          break;
          
        case 'gemini':
          requestBody = {
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          };
          break;
          
        case 'ollama':
          requestBody = {
            model: API_CONFIG.model,
            prompt: prompt,
            stream: false
          };
          break;
          
        case 'custom':
          // For completely custom API formats
          requestBody = {
            prompt: prompt,
            email_data: data,
            // Add any other fields your API expects
          };
          break;
          
        default:
          requestBody = {
            prompt: prompt
          };
      }

      const response = await fetch(API_CONFIG.url, {
        method: API_CONFIG.method,
        headers: API_CONFIG.headers,
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Custom API error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      
      // Parse response based on API format
      let aiText;
      
      switch (API_CONFIG.bodyFormat) {
        case 'openai':
          aiText = result.choices[0].message.content;
          break;
          
        case 'anthropic':
          aiText = result.content[0].text;
          break;
          
        case 'gemini':
          aiText = result.candidates[0].content.parts[0].text;
          break;
          
        case 'ollama':
          aiText = result.response;
          break;
          
        case 'custom':
          // Handle your custom API response format
          aiText = result.response || result.text || result.content || JSON.stringify(result);
          break;
          
        default:
          aiText = result.response || result.text || result.content || JSON.stringify(result);
      }
      
      // Try to parse JSON response
      try {
        return JSON.parse(aiText);
      } catch (e) {
        // If not JSON, return as text
        return {
          summary: aiText,
          keyPoints: [],
          priority: 'Unknown',
          category: 'Unknown',
          sentiment: 'Unknown'
        };
      }
    } catch (error) {
      console.error('Custom API error:', error);
      return {
        summary: 'Error analyzing email with custom API',
        keyPoints: ['Please check your API endpoint and configuration'],
        priority: 'Unknown',
        category: 'Error',
        sentiment: 'Unknown'
      };
    }
  }

  async sendToFallbackAPI(data) {
    try {
      console.log('🔄 Attempting fallback API...');
      
      // Multiple fallback options - we'll try them in order
      const fallbackOptions = [
        {
          name: 'Hugging Face GPT-2',
          url: 'https://api-inference.huggingface.co/models/gpt2',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.HUGGINGFACE_TOKEN || 'YOUR_HUGGINGFACE_TOKEN_HERE'}`
          },
          bodyFormat: 'huggingface',
          model: 'gpt2'
        },
        {
          name: 'Hugging Face DistilGPT2',
          url: 'https://api-inference.huggingface.co/models/distilgpt2',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.HUGGINGFACE_TOKEN || 'YOUR_HUGGINGFACE_TOKEN_HERE'}`
          },
          bodyFormat: 'huggingface',
          model: 'distilgpt2'
        },
        {
          name: 'Hugging Face DialoGPT',
          url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.HUGGINGFACE_TOKEN || 'YOUR_HUGGINGFACE_TOKEN_HERE'}`
          },
          bodyFormat: 'huggingface',
          model: 'microsoft/DialoGPT-medium'
        },
        {
          name: 'Hugging Face GPT-Neo',
          url: 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.HUGGINGFACE_TOKEN || 'YOUR_HUGGINGFACE_TOKEN_HERE'}`
          },
          bodyFormat: 'huggingface',
          model: 'EleutherAI/gpt-neo-125M'
        },
        {
          name: 'Mock Response',
          url: null,
          method: 'GET',
          headers: {},
          bodyFormat: 'mock',
          model: 'mock'
        }
      ];

      // Try each fallback option
      for (let i = 0; i < fallbackOptions.length; i++) {
        const config = fallbackOptions[i];
        console.log(`🔄 Trying fallback ${i + 1}/${fallbackOptions.length}: ${config.name}`);
        
        try {
          if (config.bodyFormat === 'mock') {
            // Use mock response
            console.log('📝 Using mock response for demonstration');
            return {
              summary: `This email from ${data.sender} appears to be about ${data.subject}. Based on the content, it seems to contain important information that may require attention.`,
              keyPoints: [
                `Email is from ${data.sender}`,
                `Subject: ${data.subject}`,
                'Contains relevant information',
                'May require follow-up action',
                'Important for recipient to review'
              ],
              priority: 'Medium',
              category: 'Work',
              sentiment: 'Neutral'
            };
          }

          const prompt = `Email Analysis:

From: ${data.sender}
Subject: ${data.subject}
Date: ${data.date}
Content: ${data.content}

This email appears to be about: `;

          // Prepare request body based on API format
          let requestBody;
          
          switch (config.bodyFormat) {
            case 'huggingface':
              requestBody = {
                inputs: prompt,
                parameters: {
                  max_length: 500,
                  temperature: 0.7,
                  do_sample: true,
                  return_full_text: false
                }
              };
              break;
              
            default:
              requestBody = {
                prompt: prompt
              };
          }

          console.log('Request URL:', config.url);
          console.log('Request body:', requestBody);
          
          const response = await fetch(config.url, {
            method: config.method,
            headers: config.headers,
            body: JSON.stringify(requestBody)
          });

          console.log('Response status:', response.status);
          console.log('Response headers:', response.headers);

          if (!response.ok) {
            const errorText = await response.text();
            console.log('Error response body:', errorText);
            throw new Error(`${config.name} API error: ${response.status} - ${response.statusText}`);
          }

          const result = await response.json();
          console.log(`${config.name} response:`, result);
          
          // Parse response based on API format
          let aiText;
          
          switch (config.bodyFormat) {
            case 'huggingface':
              // Hugging Face returns an array of generated text
              aiText = Array.isArray(result) ? result[0]?.generated_text || result[0] : result.generated_text || JSON.stringify(result);
              break;
              
            default:
              aiText = result.response || result.text || result.content || JSON.stringify(result);
          }
          
          console.log('Generated text:', aiText);
          
                // Clean the response by removing markdown code blocks
      let cleanText = aiText;
      
      // Remove ```json and ``` markers
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\s*/, '');
      }
      if (cleanText.endsWith('```')) {
        cleanText = cleanText.replace(/\s*```$/, '');
      }
      
      console.log('Cleaned text for JSON parsing:', cleanText.substring(0, 200) + '...');
      
      // Try to parse JSON response
      try {
        const parsedData = JSON.parse(cleanText);
        console.log('Successfully parsed JSON response:', parsedData);
        
        // Ensure all required fields exist
        return {
          summary: parsedData.summary || aiText,
          keyPoints: Array.isArray(parsedData.keyPoints) ? parsedData.keyPoints : [],
          priority: parsedData.priority || 'Unknown',
          category: parsedData.category || 'Unknown',
          sentiment: parsedData.sentiment || 'Unknown'
        };
      } catch (e) {
        console.log('Failed to parse JSON, analyzing text response');
        
        // Try to extract information from text response
        const lines = aiText.split('\n').filter(line => line.trim());
        const summary = lines[0] || aiText;
        const keyPoints = lines.slice(1).filter(line => line.trim().length > 0);
        
        return {
          summary: summary,
          keyPoints: keyPoints,
          priority: 'Unknown',
          category: 'Unknown',
          sentiment: 'Unknown'
        };
      }
          
        } catch (fallbackError) {
          console.log(`❌ ${config.name} failed:`, fallbackError.message);
          
          // If this is the last option, throw the error
          if (i === fallbackOptions.length - 1) {
            throw fallbackError;
          }
          
          // Otherwise, continue to next option
          console.log('🔄 Trying next fallback option...');
        }
      }
      
    } catch (error) {
      console.error('❌ All fallback APIs failed:', error);
      throw error;
    }
  }

  async sendToGemini(data) {
    try {
      // You'll need to get your API key from Google AI Studio
      // https://makersuite.google.com/app/apikey
      const API_KEY = API_CONFIG.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE'; // Replace with your actual API key
      
      // Try different Gemini 2.5 models (latest)
      const GEMINI_MODELS = [
        'gemini-2.5-flash',
        'gemini-2.5-pro',
        'gemini-2.0-flash-exp',
        'gemini-2.0-flash',
        'gemini-1.5-pro',
        'gemini-1.5-flash'
      ];
      
      // Use the first available model
      const MODEL_NAME = GEMINI_MODELS[0];
      const API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
      
              console.log('🔍 Gemini API Debug Info:');
        console.log('Model:', MODEL_NAME);
        console.log('URL:', API_URL);
        console.log('API Key (first 10 chars):', API_KEY.substring(0, 10) + '...');
      
      const prompt = `Please analyze this email and provide a JSON response with the following structure:

Email Details:
From: ${data.sender}
Subject: ${data.subject}
Date: ${data.date}
Content: ${data.content}

Please respond with ONLY a valid JSON object in this exact format:
{
  "summary": "A brief 2-3 sentence summary of the email content",
  "keyPoints": ["First key point", "Second key point", "Third key point"],
  "priority": "High/Medium/Low",
  "category": "Work/Personal/Spam/Newsletter/Other",
  "sentiment": "Positive/Negative/Neutral"
}

Important: Respond with ONLY the JSON object, no additional text or explanations.`;

      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      };

      console.log('Request body:', requestBody);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        throw new Error(`Gemini API error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Gemini response:', result);
      
      // Check if the response contains an error
      if (result.error) {
        throw new Error(`Gemini API error: ${result.error.message || 'Unknown error'}`);
      }
      
      // Check if we have valid candidates
      if (!result.candidates || !result.candidates[0] || !result.candidates[0].content) {
        throw new Error('Gemini API returned invalid response format');
      }
      
      const geminiText = result.candidates[0].content.parts[0].text;
      console.log('Gemini generated text:', geminiText);
      console.log('Text length:', geminiText.length);
      console.log('First 200 chars:', geminiText.substring(0, 200));
      
      // Clean the response by removing markdown code blocks
      let cleanText = geminiText;
      
      // Remove ```json and ``` markers
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\s*/, '');
      }
      if (cleanText.endsWith('```')) {
        cleanText = cleanText.replace(/\s*```$/, '');
      }
      
      console.log('Cleaned text for JSON parsing:', cleanText.substring(0, 200) + '...');
      
      // Try to parse JSON response
      try {
        const parsedData = JSON.parse(cleanText);
        console.log('Successfully parsed JSON response:', parsedData);
        
        // Ensure all required fields exist
        return {
          summary: parsedData.summary || geminiText,
          keyPoints: Array.isArray(parsedData.keyPoints) ? parsedData.keyPoints : [],
          priority: parsedData.priority || 'Unknown',
          category: parsedData.category || 'Unknown',
          sentiment: parsedData.sentiment || 'Unknown'
        };
      } catch (e) {
        console.log('Failed to parse JSON, analyzing text response');
        
        // Try to extract information from text response
        const lines = geminiText.split('\n').filter(line => line.trim());
        const summary = lines[0] || geminiText;
        const keyPoints = lines.slice(1).filter(line => line.trim().length > 0);
        
        return {
          summary: summary,
          keyPoints: keyPoints,
          priority: 'Unknown',
          category: 'Unknown',
          sentiment: 'Unknown'
        };
      }
    } catch (error) {
      console.error('❌ Gemini API error:', error);
      throw error; // Re-throw the error to trigger fallback
    }
  }

  showGeminiResults(emailData, geminiData, usedFallback = false) {
    // Debug the data being passed
    console.log('🔍 showGeminiResults called with:');
    console.log('emailData:', emailData);
    console.log('geminiData:', geminiData);
    console.log('usedFallback:', usedFallback);
    
    // Remove any existing popup
    const existingPopup = document.getElementById('gmail-ai-popup');
    if (existingPopup) {
      existingPopup.remove();
    }

    // Create popup container with modern design
    const popup = document.createElement('div');
    popup.id = 'gmail-ai-popup';
    popup.style.cssText = `
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      width: 800px !important;
      max-width: 95vw !important;
      max-height: 85vh !important;
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important;
      border: none !important;
      border-radius: 20px !important;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 8px 25px rgba(0,0,0,0.1) !important;
      z-index: 10001 !important;
      font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      overflow: hidden !important;
      backdrop-filter: blur(10px) !important;
      animation: slideIn 0.3s ease-out !important;
    `;

    // Create popup content with enhanced design
    popup.innerHTML = `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
            <span style="font-size: 18px;">🤖</span>
          </div>
          <div>
            <div style="font-size: 18px; font-weight: 700;">Email AI Assistant</div>
            <div style="font-size: 12px; opacity: 0.9; margin-top: 2px;">Powered by ${usedFallback ? 'Hugging Face' : 'Google Gemini'}</div>
          </div>
        </div>
        <button id="gmail-ai-close" style="background: rgba(255,255,255,0.2); border: none; color: white; font-size: 18px; cursor: pointer; padding: 8px; width: 32px; height: 32px; border-radius: 50%; backdrop-filter: blur(10px); transition: all 0.2s ease;">×</button>
      </div>
      <div style="padding: 20px; overflow-y: auto; max-height: 60vh;">
        <div style="margin-bottom: 24px; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border-left: 4px solid #667eea; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">From</div>
              <div style="font-weight: 600; color: #495057;">${emailData.sender}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Date</div>
              <div style="font-weight: 600; color: #495057;">${emailData.date}</div>
            </div>
          </div>
          <div style="margin-top: 12px;">
            <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Subject</div>
            <div style="font-weight: 600; color: #495057; font-size: 16px;">${emailData.subject}</div>
          </div>
          ${usedFallback ? '<div style="margin-top: 12px; padding: 8px 12px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); color: white; border-radius: 8px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 6px;"><span>⚠️</span> Using Fallback API</div>' : ''}
        </div>
        
        <div style="margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">📝</div>
            <h3 style="color: #495057; margin: 0; font-size: 18px; font-weight: 700;">Summary</h3>
          </div>
          <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #667eea; box-shadow: 0 2px 8px rgba(0,0,0,0.05); line-height: 1.6;">
            ${(() => {
              console.log('🔍 Processing summary:', geminiData.summary);
              console.log('Summary type:', typeof geminiData.summary);
              return typeof geminiData.summary === 'string' ? geminiData.summary : JSON.stringify(geminiData.summary, null, 2);
            })()}
          </div>
        </div>
        
        <div style="margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">🎯</div>
            <h3 style="color: #495057; margin: 0; font-size: 18px; font-weight: 700;">Key Points</h3>
          </div>
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            ${(() => {
              console.log('🔍 Processing keyPoints:', geminiData.keyPoints);
              console.log('KeyPoints type:', typeof geminiData.keyPoints);
              console.log('KeyPoints isArray:', Array.isArray(geminiData.keyPoints));
              console.log('KeyPoints length:', geminiData.keyPoints?.length);
              
              if (Array.isArray(geminiData.keyPoints) && geminiData.keyPoints.length > 0) {
                return `<ul style="margin: 0; padding-left: 20px;">
                  ${geminiData.keyPoints.map(point => `<li style="margin-bottom: 8px; line-height: 1.5; color: #495057;">${point}</li>`).join('')}
                </ul>`;
              } else {
                return `<div style="color: #6c757d; font-style: italic; text-align: center; padding: 20px;">
                  No key points available
                </div>`;
              }
            })()}
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px;">
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%); border-radius: 12px; border: 2px solid #e8f5e8; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.2s ease;">
            <div style="font-size: 11px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Priority</div>
            <div style="font-weight: 700; color: #28a745; font-size: 16px;">${(() => {
              console.log('🔍 Processing priority:', geminiData.priority);
              return geminiData.priority || 'Unknown';
            })()}</div>
          </div>
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #fff3cd 0%, #fef9e7 100%); border-radius: 12px; border: 2px solid #fff3cd; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.2s ease;">
            <div style="font-size: 11px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Category</div>
            <div style="font-weight: 700; color: #fd7e14; font-size: 16px;">${(() => {
              console.log('🔍 Processing category:', geminiData.category);
              return geminiData.category || 'Unknown';
            })()}</div>
          </div>
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); border-radius: 12px; border: 2px solid #e3f2fd; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.2s ease;">
            <div style="font-size: 11px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Sentiment</div>
            <div style="font-weight: 700; color: #667eea; font-size: 16px;">${(() => {
              console.log('🔍 Processing sentiment:', geminiData.sentiment);
              return geminiData.sentiment || 'Unknown';
            })()}</div>
          </div>
        </div>
        
        <div style="margin-top: 24px; display: flex; gap: 12px;">
          <button id="gmail-ai-copy-analysis" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 20px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 600; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 16px;">📋</span>
            Copy Analysis
          </button>
          <button id="gmail-ai-view-original" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border: none; padding: 12px 20px; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 600; box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3); transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 16px;">📧</span>
            View Original Email
          </button>
        </div>
      </div>
    `;

    // Add event listeners
    popup.querySelector('#gmail-ai-close').addEventListener('click', () => {
      popup.remove();
    });

    popup.querySelector('#gmail-ai-copy-analysis').addEventListener('click', () => {
      const analysisText = `Gemini AI Analysis

Summary: ${geminiData.summary}

Key Points:
${geminiData.keyPoints.map(point => `• ${point}`).join('\n')}

Priority: ${geminiData.priority}
Category: ${geminiData.category}
Sentiment: ${geminiData.sentiment}

Original Email:
From: ${emailData.sender}
Subject: ${emailData.subject}
Date: ${emailData.date}

Content:
${emailData.content}`;

      navigator.clipboard.writeText(analysisText).then(() => {
        this.showNotification('Analysis copied to clipboard!', 'success');
      });
    });

    popup.querySelector('#gmail-ai-view-original').addEventListener('click', () => {
      popup.remove();
      this.showEmailPopup(emailData);
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.remove();
      }
    });

    // Add to page
    document.body.appendChild(popup);
  }

  saveEmailAsFile(data) {
    const content = `Email Extracted by Gmail AI Assistant

From: ${data.sender}
Subject: ${data.subject}
Date: ${data.date}

Content:
${data.content}

---
Extracted on: ${new Date(data.timestamp).toLocaleString()}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email_${data.timestamp}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showNotification('Email saved as file!', 'success');
  }

  showNotification(message, type = 'info') {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `gmail-ai-notification gmail-ai-notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }
}

// Initialize the extension when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new GmailAIAssistant();
  });
} else {
  new GmailAIAssistant();
} 