# Extension Icons

This directory should contain the extension icons. The manifest.json references these files:

- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels) 
- `icon128.png` (128x128 pixels)

## Creating Icons

You can create simple icons using any image editor or online tools:

1. **Online Icon Generators:**
   - [Favicon.io](https://favicon.io/)
   - [Icons8](https://icons8.com/)
   - [Flaticon](https://www.flaticon.com/)

2. **Simple Text-based Icons:**
   - Create a simple "AI" or "S" text icon
   - Use a document/summary icon
   - Use Gmail's color scheme (#4285f4 blue)

3. **Icon Requirements:**
   - PNG format
   - Square dimensions
   - Clear visibility at small sizes
   - Match Gmail's design aesthetic

## Alternative: Remove Icon References

If you don't want to create icons, you can remove the "icons" section from `manifest.json`:

```json
{
  "manifest_version": 3,
  "name": "Gmail AI Assistant",
  "version": "1.0.0",
  "description": "Adds a 'Summarize Email' button to Gmail interface",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "https://mail.google.com/*"
  ],
  "content_scripts": [
    {
      "matches": ["https://mail.google.com/*"],
      "js": ["content.js"],
      "css": ["styles.css"],
      "run_at": "document_end"
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_title": "Gmail AI Assistant"
  }
}
```

The extension will work perfectly fine without custom icons - Chrome will use a default icon. 