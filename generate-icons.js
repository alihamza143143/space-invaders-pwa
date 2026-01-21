const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

function drawSpaceInvaderIcon(ctx, size) {
    const scale = size / 512;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, '#000033');
    gradient.addColorStop(1, '#000011');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Stars
    ctx.fillStyle = '#ffffff';
    const starPositions = [
        [50, 80], [120, 40], [200, 60], [300, 30], [400, 70], [450, 45],
        [80, 450], [150, 480], [380, 460], [460, 490]
    ];
    starPositions.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x * scale, y * scale, Math.max(1, 2 * scale), 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Alien (Crab type - cyan)
    ctx.fillStyle = '#00ffff';
    const alienX = 156 * scale;
    const alienY = 100 * scale;
    const s = 40 * scale;
    
    ctx.fillRect(alienX + s, alienY, s, s);
    ctx.fillRect(alienX + 3*s, alienY, s, s);
    ctx.fillRect(alienX + 1.5*s, alienY + s, s, s);
    ctx.fillRect(alienX + 2.5*s, alienY + s, s, s);
    ctx.fillRect(alienX + 0.5*s, alienY + 2*s, 4*s, s);
    ctx.fillRect(alienX, alienY + 3*s, 5*s, s);
    ctx.fillRect(alienX, alienY + 4*s, s, s);
    ctx.fillRect(alienX + 1.5*s, alienY + 4*s, 2*s, s);
    ctx.fillRect(alienX + 4*s, alienY + 4*s, s, s);
    
    // Player Ship (green)
    ctx.fillStyle = '#00ff00';
    const playerX = 176 * scale;
    const playerY = 340 * scale;
    const ps = 40 * scale;
    
    ctx.fillRect(playerX + 1.5*ps, playerY, ps, 2*ps);
    ctx.fillRect(playerX + 0.5*ps, playerY + ps, 3*ps, 1.5*ps);
    ctx.fillRect(playerX, playerY + 2*ps, 4*ps, ps);
    ctx.fillRect(playerX + 1.8*ps, playerY - 0.75*ps, 0.4*ps, ps);
    
    // Bullet (yellow)
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(248 * scale, 270 * scale, 16 * scale, 50 * scale);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(252 * scale, 270 * scale, 8 * scale, 16 * scale);
    
    // Shields (green)
    ctx.fillStyle = '#00ff00';
    ctx.globalAlpha = 0.8;
    ctx.fillRect(80 * scale, 420 * scale, 80 * scale, 60 * scale);
    ctx.fillRect(216 * scale, 420 * scale, 80 * scale, 60 * scale);
    ctx.fillRect(352 * scale, 420 * scale, 80 * scale, 60 * scale);
    ctx.globalAlpha = 1;
    
    // UFO (red)
    ctx.fillStyle = '#ff0000';
    const ufoX = 360 * scale;
    const ufoY = 90 * scale;
    const us = 10 * scale * 0.6;
    
    ctx.fillRect(ufoX + 4*us, ufoY, 4*us, us);
    ctx.fillRect(ufoX + 2*us, ufoY + us, 8*us, us);
    ctx.fillRect(ufoX + us, ufoY + 2*us, 10*us, us);
    ctx.fillRect(ufoX, ufoY + 3*us, 12*us, us);
    ctx.fillRect(ufoX + 2*us, ufoY + 4*us, 2*us, us);
    ctx.fillRect(ufoX + 8*us, ufoY + 4*us, 2*us, us);
    
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(ufoX + 3*us, ufoY + 2*us, us, us);
    ctx.fillRect(ufoX + 5.5*us, ufoY + 2*us, us, us);
    ctx.fillRect(ufoX + 8*us, ufoY + 2*us, us, us);
}

const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
}

sizes.forEach(size => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    drawSpaceInvaderIcon(ctx, size);
    
    const buffer = canvas.toBuffer('image/png');
    const filename = path.join(iconsDir, `icon-${size}x${size}.png`);
    fs.writeFileSync(filename, buffer);
    console.log(`Generated: icon-${size}x${size}.png`);
});

console.log('\nAll icons generated successfully!');
