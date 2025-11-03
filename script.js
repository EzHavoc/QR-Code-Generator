// Wait for DOM and QRCode library to be ready
function initializeApp() {
    // Check if QRCode library is loaded
    if (typeof QRCode === 'undefined') {
        console.log('Waiting for QRCode library...');
        setTimeout(initializeApp, 100);
        return;
    }

    console.log('QRCode library loaded:', typeof QRCode);
    console.log('QRCode methods available:', Object.keys(QRCode || {}));

    // DOM Elements
    const textUrlInput = document.getElementById('textUrl');
    const centerImageInput = document.getElementById('centerImage');
    const centerImageFileInput = document.getElementById('centerImageFile');
    const imageUrlOption = document.getElementById('imageUrlOption');
    const imageFileOption = document.getElementById('imageFileOption');
    const sizeInput = document.getElementById('size');
    const dotStyleSelect = document.getElementById('dotStyle');
    const dotColorInput = document.getElementById('dotColor');
    const filenameInput = document.getElementById('filename');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const qrContainer = document.getElementById('qrContainer');

    // Verify all elements exist
    if (!textUrlInput || !generateBtn || !qrContainer) {
        console.error('Required DOM elements not found!');
        alert('Error: Page not loaded correctly. Please refresh.');
        return;
    }

    let currentQRCanvas = null;
    let centerImageDataUrl = null;

    // Handle image option toggle (URL vs File)
    imageUrlOption.addEventListener('change', () => {
        if (imageUrlOption.checked) {
            centerImageInput.style.display = 'block';
            centerImageFileInput.style.display = 'none';
            centerImageFileInput.value = '';
            centerImageDataUrl = null;
        }
    });

    imageFileOption.addEventListener('change', () => {
        if (imageFileOption.checked) {
            centerImageInput.style.display = 'none';
            centerImageFileInput.style.display = 'block';
            centerImageInput.value = '';
            centerImageDataUrl = null;
        }
    });

    // Handle file upload
    centerImageFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                centerImageFileInput.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                centerImageDataUrl = event.target.result;
                console.log('Image file loaded');
            };
            reader.onerror = () => {
                alert('Error reading file');
                centerImageFileInput.value = '';
                centerImageDataUrl = null;
            };
            reader.readAsDataURL(file);
        }
    });

    // Check if QRCode library is loaded
    function checkQRCodeLibrary() {
        if (typeof QRCode === 'undefined') {
            alert('QR Code library failed to load. Please refresh the page.');
            return false;
        }
        return true;
    }

    // Generate QR Code
    generateBtn.addEventListener('click', async () => {
        if (!checkQRCodeLibrary()) {
            return;
        }

        const text = textUrlInput.value.trim();
        if (!text) {
            alert('Please enter text or URL');
            return;
        }

        const size = parseInt(sizeInput.value) || 300;
        const sizeClamped = Math.max(100, Math.min(1000, size));
        const color = dotColorInput.value;

        // Get center image - either from URL or uploaded file
        let centerImageSource = null;
        if (imageUrlOption.checked) {
            centerImageSource = centerImageInput.value.trim();
        } else if (imageFileOption.checked) {
            centerImageSource = centerImageDataUrl;
        }

        try {
            generateBtn.disabled = true;
            generateBtn.textContent = 'Generating...';

            console.log('Generating QR code for:', text);
            console.log('Size:', sizeClamped, 'Color:', color);

            // Create a temporary container for QR code generation
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            document.body.appendChild(tempContainer);

            // Create canvas for final QR code
            const canvas = document.createElement('canvas');
            canvas.width = sizeClamped;
            canvas.height = sizeClamped;
            const ctx = canvas.getContext('2d');

            // Generate QR code using the library
            try {
                const qr = new QRCode(tempContainer, {
                    text: text,
                    width: sizeClamped,
                    height: sizeClamped,
                    colorDark: color,
                    colorLight: '#FFFFFF',
                    correctLevel: QRCode.CorrectLevel.H
                });

                // Wait a moment for QR code to render
                await new Promise(resolve => setTimeout(resolve, 100));

                // Get the generated image/canvas from the QR code library
                const qrImg = tempContainer.querySelector('img') || tempContainer.querySelector('canvas');

                if (!qrImg) {
                    throw new Error('QR code generation failed - no image found');
                }

                // If it's an img element, draw it to canvas
                if (qrImg.tagName === 'IMG') {
                    await new Promise((resolve, reject) => {
                        const img = new Image();
                        img.crossOrigin = 'anonymous';
                        img.onload = () => {
                            ctx.drawImage(img, 0, 0, sizeClamped, sizeClamped);
                            resolve();
                        };
                        img.onerror = reject;
                        img.src = qrImg.src;
                    });
                } else if (qrImg.tagName === 'CANVAS') {
                    // If it's a canvas, copy it
                    ctx.drawImage(qrImg, 0, 0, sizeClamped, sizeClamped);
                }

                // Clean up
                document.body.removeChild(tempContainer);
                console.log('QR code generated successfully');
            } catch (qrError) {
                document.body.removeChild(tempContainer);
                console.error('QRCode generation error:', qrError);
                throw new Error(`Failed to generate QR code: ${qrError.message}`);
            }

            // Add center image if provided
            if (centerImageSource) {
                try {
                    const centerImg = new Image();

                    // Set up event handlers first
                    await new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            reject(new Error('Image load timeout'));
                        }, 10000);

                        centerImg.onload = () => {
                            clearTimeout(timeout);
                            resolve();
                        };
                        centerImg.onerror = (err) => {
                            clearTimeout(timeout);
                            reject(err);
                        };

                        // Only set crossOrigin for URLs, not for data URLs
                        if (centerImageSource.startsWith('data:')) {
                            // File upload - no crossOrigin needed
                            centerImg.src = centerImageSource;
                        } else {
                            // URL - set crossOrigin
                            centerImg.crossOrigin = 'anonymous';
                            centerImg.src = centerImageSource;
                        }
                    });

                    const centerSize = sizeClamped * 0.2; // 20% of QR size
                    const centerX = (sizeClamped - centerSize) / 2;
                    const centerY = (sizeClamped - centerSize) / 2;

                    // Draw white background for center image
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(centerX - 4, centerY - 4, centerSize + 8, centerSize + 8);

                    // Draw border around center image
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 4;
                    ctx.strokeRect(centerX - 4, centerY - 4, centerSize + 8, centerSize + 8);

                    // Draw center image
                    ctx.drawImage(centerImg, centerX, centerY, centerSize, centerSize);
                } catch (error) {
                    console.warn('Could not load center image:', error);
                    // Continue without center image
                }
            }

            // Clear previous QR code
            qrContainer.innerHTML = '';
            qrContainer.appendChild(canvas);
            qrContainer.classList.add('show');
            currentQRCanvas = canvas;

            // Enable download and copy buttons
            downloadBtn.disabled = false;
            copyBtn.disabled = false;

            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate QR';
        } catch (error) {
            console.error('Error generating QR code:', error);
            alert(`Error generating QR code: ${error.message || 'Unknown error'}. Please check your input.`);
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate QR';
        }
    });

    // Download QR Code
    downloadBtn.addEventListener('click', () => {
        if (!currentQRCanvas) return;

        const filename = filenameInput.value.trim() || 'QR-Code';
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = currentQRCanvas.toDataURL('image/png');
        link.click();
    });

    // Copy to Clipboard
    copyBtn.addEventListener('click', async () => {
        if (!currentQRCanvas) return;

        try {
            // Convert canvas to blob
            currentQRCanvas.toBlob(async (blob) => {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({
                            'image/png': blob
                        })
                    ]);

                    // Visual feedback
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = '✓ Copied!';
                    copyBtn.style.background = '#FF1493';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                        copyBtn.style.background = '';
                    }, 2000);
                } catch (error) {
                    console.error('Error copying to clipboard:', error);
                    alert('Could not copy to clipboard. Please try downloading instead.');
                }
            }, 'image/png');
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            alert('Could not copy to clipboard. Please try downloading instead.');
        }
    });

    // Allow Enter key to generate QR code
    textUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
