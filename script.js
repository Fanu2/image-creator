const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const textInput = document.getElementById('textInput');
const bgSelect = document.getElementById('bgSelect');
const fontSelect = document.getElementById('fontSelect');
const colorSelect = document.getElementById('colorSelect');
const statusDiv = document.getElementById('status');

// Load selected background image
function loadBackground(imageUrl) {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.onerror = () => {
        console.error('Error loading image:', imageUrl);
        alert('Failed to load background image. Please check the file path.');
    };
}

// Create image with text
function createImage() {
    const bg = bgSelect.value;
    const text = textInput.value;
    const font = fontSelect.value;
    const color = colorSelect.value;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load background
    loadBackground(bg);

    // Set text properties
    ctx.font = `30px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw text after background has loaded
    const img = new Image();
    img.src = bg;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        saveBtn.classList.remove('hidden'); // Show save button
    };
}

function saveImage() {
    const link = document.createElement('a');
    link.download = 'my-image.png';
    link.href = canvas.toDataURL();
    link.click();
}

generateBtn.addEventListener('click', createImage);
saveBtn.addEventListener('click', saveImage);
