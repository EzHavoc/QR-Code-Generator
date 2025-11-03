# 🎨 QR Code Generator

A modern, neobrutalism-styled QR Code Generator web application built with vanilla HTML, CSS, and JavaScript. Create beautiful, customizable QR codes with a bold and vibrant design aesthetic.

![QR Code Generator](https://img.shields.io/badge/QR--Code-Generator-FF1493?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

- 🎨 **Neobrutalism Design**: Bold borders, vibrant colors, and striking shadows with a dark purplish-pink theme
- 📱 **QR Code Generation**: Generate high-quality QR codes from text or URLs
- 🖼️ **Custom Center Image**: Add a logo or image in the center of your QR code
  - Support for publicly available image URLs
  - Support for local file uploads
- 🎨 **Customizable Colors**: Choose any color for your QR code dots
- 📏 **Size Control**: Adjust QR code size from 100px to 1000px
- 💾 **Download**: Save your QR code as PNG with custom filename
- 📋 **Copy to Clipboard**: Copy QR code image directly to clipboard
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **No Backend Required**: Fully client-side, works offline after initial load

## 🚀 Live Demo

[View Live Demo]([https://your-project-name.vercel.app](https://qr-code-generator-rho-gold.vercel.app/))

## 📸 Screenshots

<img width="551" height="979" alt="image" src="https://github.com/user-attachments/assets/80860177-d3c7-49f8-8cc6-27ad49225630" />


## 🛠️ Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/QR-Code-Generator.git
   cd QR-Code-Generator
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the application**
   - Open `http://localhost:8000` in your browser

## 📖 Usage

### Basic Usage

1. **Enter Text/URL**: Type any text or URL in the "Text / URL" field
2. **Customize Options** (optional):
   - Set the size (100-1000px)
   - Choose dot color
   - Select dot style
3. **Generate QR Code**: Click the "Generate QR" button
4. **Download or Copy**: Use the download or copy buttons to save your QR code

### Adding a Center Image

#### Option 1: Using URL
1. Select the **"URL"** radio button
2. Enter a publicly available image URL
3. Generate your QR code

#### Option 2: Using File Upload
1. Select the **"Upload File"** radio button
2. Click "Choose File" and select an image from your computer
3. Generate your QR code

### Customization Options

- **Size**: Adjust from 100px to 1000px
- **Dot Color**: Use the color picker to choose any color
- **Dot Style**: Choose from Squares, Dots, or Rounded
- **Filename**: Set a custom filename for downloads

## 🏗️ Project Structure

```
QR-Code-Generator/
├── index.html          # Main HTML file
├── styles.css          # Neobrutalism styling
├── script.js           # JavaScript functionality
├── qrcode.min.js       # QR Code library (local)
├── package.json        # Project metadata
├── vercel.json         # Vercel configuration
├── .vercelignore      # Files to ignore in deployment
└── README.md           # This file
```

## 🎨 Design Philosophy

This project embraces **neobrutalism** design principles:
- **Bold Borders**: Thick, prominent borders (4-8px)
- **Vibrant Colors**: Dark purplish-pink theme (#1A0B2E, #FF1493, #FF69B4)
- **Striking Shadows**: Hard shadows with black offsets
- **High Contrast**: Bold typography and clear visual hierarchy
- **Minimal Rounding**: Sharp corners with minimal border-radius
- **Playful Interactions**: Transform effects on button clicks

## 🚀 Deployment

### Deploy to Vercel

#### Method 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

#### Method 2: GitHub Integration
1. Push your code to GitHub
2. Import your repository in [Vercel Dashboard](https://vercel.com)
3. Configure as a static site
4. Deploy!

#### Method 3: Drag & Drop
1. Go to [vercel.com](https://vercel.com)
2. Drag and drop your project folder
3. Deploy!

For detailed deployment instructions, see the project files or Vercel documentation.

### Other Deployment Options

- **Netlify**: Drag & drop or connect GitHub repository
- **GitHub Pages**: Enable in repository settings
- **Any Static Host**: Upload files to any static hosting service

## 🧪 Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: 
  - Custom properties
  - Flexbox layout
  - Box shadows and transforms
  - Responsive media queries
- **JavaScript (ES6+)**:
  - Async/await
  - DOM manipulation
  - Canvas API
  - FileReader API
  - Clipboard API
- **QRCode.js**: QR code generation library (included locally)

## 🌐 Browser Compatibility

| Browser | Version |
|---------|---------|
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

Requires support for:
- Canvas API
- Clipboard API
- FileReader API
- ES6+ JavaScript

## 📝 API Reference

### QR Code Generation

The application uses the QRCode.js library to generate QR codes. All processing happens client-side.

### File Upload

- **Accepted Formats**: All image formats (JPG, PNG, GIF, WebP, SVG, etc.)
- **Max Size**: Limited by browser memory (typically 5-10MB)
- **Processing**: Files are converted to data URLs for use in QR codes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- CORS restrictions may affect some external image URLs
- Large QR codes (>500px) may take longer to generate
- Clipboard API requires HTTPS in production (works on localhost)

## 🔮 Future Enhancements

- [ ] QR code error correction level selector
- [ ] Multiple QR code formats (SVG, PDF)
- [ ] Batch QR code generation
- [ ] QR code scanning functionality
- [ ] History of generated QR codes
- [ ] Export to different formats
- [ ] Template gallery

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [QRCode.js](https://github.com/davidshimjs/qrcodejs) - QR code generation library
- Neobrutalism design inspiration from the web design community
---

⭐ If you like this project, please give it a star on GitHub!
