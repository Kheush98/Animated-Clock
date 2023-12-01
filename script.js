const canvas = document.getElementById('canvas');
const faceColor = document.getElementById('face-color');
const borerColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');

function clock() {
    const now = new Date();
    const ctx = canvas.getContext('2d');

    // Setup canvas
    ctx.save(); //save the default state
    ctx.clearRect(0, 0, 500, 500);
    ctx.translate(250, 250); // Put 0,0 in the middle
    ctx.rotate(-Math.PI / 2); // Rotate clock -90deg

    // Set default values
    ctx.strokeStyle = lineColor.value;
    ctx.fillStyle = faceColor.value;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    // Draw clock
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = borerColor.value;
    ctx.lineWidth = 14
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    // Draw hour lines
    ctx.save();
    for (let index = 0; index < 12; index++) {       
        ctx.beginPath();
        ctx.moveTo(110, 0);
        ctx.lineTo(130, 0);
        ctx.stroke();
        ctx.rotate(Math.PI / 6);
    }
    ctx.restore();

    // Draw minutes 
    ctx.save();
    for (let index = 0; index < 60; index++) {  
        if (index % 5 !== 0) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(125, 0);
            ctx.lineTo(130, 0);
            ctx.stroke();     
        }     
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    // Get current time
    const hr = now.getHours() % 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();

    // Set hours
    ctx.save();
    ctx.beginPath();
    ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + 
    (Math.PI / 21600) * sec);
    ctx.strokeStyle = largeHandColor.value;
    ctx.lineWidth = 14;
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // Set minutes
    ctx.save();
    ctx.beginPath();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.strokeStyle = largeHandColor.value;
    ctx.lineWidth = 10;
    ctx.moveTo(-28, 0);
    ctx.lineTo(105, 0);
    ctx.stroke();
    ctx.restore();

    // Set secondes
    ctx.save();
    ctx.beginPath();
    ctx.rotate(Math.PI / 30 * sec);
    ctx.strokeStyle = secondHandColor.value;
    ctx.fillStyle = secondHandColor.value;
    ctx.lineWidth = 6;
    ctx.moveTo(-30, 0);
    ctx.lineTo(95, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore(); //Restore default values

    requestAnimationFrame(clock)
}

requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'clock.png';
    link.href = dataURL;
    link.click();
})