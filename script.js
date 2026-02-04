// Counter functionality
let counter = 0;
const counterValue = document.getElementById('counterValue');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

function updateCounter() {
    counterValue.textContent = counter;
    counterValue.classList.add('pulse');
    setTimeout(() => counterValue.classList.remove('pulse'), 300);
}

incrementBtn.addEventListener('click', () => {
    counter++;
    updateCounter();
});

decrementBtn.addEventListener('click', () => {
    counter--;
    updateCounter();
});

resetBtn.addEventListener('click', () => {
    counter = 0;
    updateCounter();
});

// Dynamic list functionality
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemList');

function addItem() {
    const itemText = itemInput.value.trim();
    
    if (itemText !== '') {
        const li = document.createElement('li');
        li.className = 'list-item';
        
        const span = document.createElement('span');
        span.textContent = itemText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-small btn-danger';
        deleteBtn.addEventListener('click', () => {
            li.classList.add('fade-out');
            setTimeout(() => li.remove(), 300);
        });
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        itemList.appendChild(li);
        
        itemInput.value = '';
        itemInput.focus();
        
        // Add animation
        setTimeout(() => li.classList.add('show'), 10);
    }
}

addItemBtn.addEventListener('click', addItem);

itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Theme switcher functionality
const themeButtons = document.querySelectorAll('.theme-btn');

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        document.body.className = `theme-${theme}`;
        
        // Store theme preference
        localStorage.setItem('selectedTheme', theme);
        
        // Visual feedback
        themeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    document.body.className = `theme-${savedTheme}`;
    
    // Set active button
    themeButtons.forEach(btn => {
        if (btn.dataset.theme === savedTheme) {
            btn.classList.add('active');
        }
    });
});

// Animation functionality
const animatedBox = document.getElementById('animatedBox');
const animateBtn = document.getElementById('animateBtn');

animateBtn.addEventListener('click', () => {
    animatedBox.classList.remove('animate');
    
    // Trigger reflow to restart animation
    void animatedBox.offsetWidth;
    
    animatedBox.classList.add('animate');
});

// Add welcome message on page load
window.addEventListener('load', () => {
    console.log('Welcome to JS Example Site!');
    console.log('This site demonstrates:');
    console.log('- Interactive counters');
    console.log('- Dynamic DOM manipulation');
    console.log('- Theme switching with localStorage');
    console.log('- CSS animations triggered by JavaScript');
    console.log('- Data visualization with Canvas');
});

// Plotly-style chart functionality using Canvas
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('plotlyChart');
    const legendContainer = document.getElementById('chartLegend');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Generate sample data for 3 curves
    const dataPoints = 100;
    const xValues = [];
    const datasets = [
        { name: 'Temperature (°C)', color: '#4a90e2', data: [] },
        { name: 'Humidity (%)', color: '#7b68ee', data: [] },
        { name: 'Pressure (kPa)', color: '#ff6b6b', data: [] }
    ];
    
    for (let i = 0; i <= dataPoints; i++) {
        const x = i * 0.1;
        xValues.push(x);
        // Curve 1: Sine wave
        datasets[0].data.push(Math.sin(x) * 10 + 20);
        // Curve 2: Cosine wave with offset
        datasets[1].data.push(Math.cos(x) * 8 + 15);
        // Curve 3: Exponential decay
        datasets[2].data.push(30 * Math.exp(-x / 5) + 5);
    }
    
    // Chart dimensions
    const padding = { top: 40, right: 30, bottom: 50, left: 60 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;
    
    // Find min and max values
    let minY = Infinity, maxY = -Infinity;
    datasets.forEach(dataset => {
        dataset.data.forEach(val => {
            minY = Math.min(minY, val);
            maxY = Math.max(maxY, val);
        });
    });
    
    // Add some padding to the range
    const yRange = maxY - minY;
    minY -= yRange * 0.1;
    maxY += yRange * 0.1;
    
    const minX = xValues[0];
    const maxX = xValues[xValues.length - 1];
    
    // Helper function to map data to canvas coordinates
    function mapX(x) {
        return padding.left + ((x - minX) / (maxX - minX)) * chartWidth;
    }
    
    function mapY(y) {
        return padding.top + chartHeight - ((y - minY) / (maxY - minY)) * chartHeight;
    }
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
        const x = padding.left + (chartWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + chartHeight);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 8; i++) {
        const y = padding.top + (chartHeight / 8) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();
    
    // Draw title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Environmental Sensor Data Over Time', canvas.width / 2, 25);
    
    // Draw axis labels
    ctx.font = '12px Arial';
    ctx.fillText('Time (hours)', canvas.width / 2, canvas.height - 10);
    
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Sensor Readings', 0, 0);
    ctx.restore();
    
    // Draw Y-axis labels
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 8; i++) {
        const y = padding.top + (chartHeight / 8) * i;
        const value = maxY - ((maxY - minY) / 8) * i;
        ctx.fillText(value.toFixed(1), padding.left - 10, y + 4);
    }
    
    // Draw X-axis labels
    ctx.textAlign = 'center';
    for (let i = 0; i <= 10; i++) {
        const x = padding.left + (chartWidth / 10) * i;
        const value = minX + ((maxX - minX) / 10) * i;
        ctx.fillText(value.toFixed(1), x, padding.top + chartHeight + 20);
    }
    
    // Draw data curves
    datasets.forEach(dataset => {
        ctx.strokeStyle = dataset.color;
        ctx.fillStyle = dataset.color;
        ctx.lineWidth = 2;
        
        // Draw line
        ctx.beginPath();
        for (let i = 0; i < xValues.length; i++) {
            const x = mapX(xValues[i]);
            const y = mapY(dataset.data[i]);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw markers (every 10th point for performance)
        for (let i = 0; i < xValues.length; i += 10) {
            const x = mapX(xValues[i]);
            const y = mapY(dataset.data[i]);
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    
    // Create legend
    datasets.forEach(dataset => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        const colorBox = document.createElement('div');
        colorBox.className = 'legend-color';
        colorBox.style.backgroundColor = dataset.color;
        
        const label = document.createElement('span');
        label.className = 'legend-label';
        label.textContent = dataset.name;
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(label);
        legendContainer.appendChild(legendItem);
    });
    
    // Make chart responsive
    window.addEventListener('resize', () => {
        // Redraw chart on resize - simplified for this example
        console.log('Chart resize detected - refresh page to see updated chart');
    });
});
