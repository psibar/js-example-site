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
});
