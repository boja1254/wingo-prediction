let history = [];
let intervalTime = 60; // डिफॉल्ट 1 मिनट
let timerInterval;
let countdown;

function generatePrediction() {
    let number = Math.floor(Math.random() * 10);
    
    let color, hindiColor;
    if (number === 0 || number === 5) {
        if (Math.random() < 0.1) {
            color = 'Violet';
            hindiColor = 'वायलेट';
        } else {
            color = (number % 2 === 0) ? 'Red' : 'Green';
            hindiColor = (number % 2 === 0) ? 'रेड' : 'ग्रीन';
        }
    } else {
        color = (number % 2 === 0) ? 'Red' : 'Green';
        hindiColor = (number % 2 === 0) ? 'रेड' : 'ग्रीन';
    }
    
    let bigSmall = (number >= 5) ? 'बिग' : 'स्मॉल';
    let oddEven = (number % 2 === 0) ? 'ईवन' : 'ओड';
    
    return {
        number: number,
        color: color,
        hindiColor: hindiColor,
        bigSmall: bigSmall,
        oddEven: oddEven
    };
}

function updatePrediction() {
    let pred = generatePrediction();
    history.unshift(pred);
    if (history.length > 20) history.pop();
    
    document.getElementById('currentPrediction').innerHTML = 
        `<strong>अगला प्रेडिक्शन:</strong><br>
        कलर: ${pred.hindiColor} (${pred.color})<br>
        नंबर: ${pred.number}<br>
        बिग/स्मॉल: ${pred.bigSmall}<br>
        ओड/ईवन: ${pred.oddEven}`;
        
    let bgColor = pred.color === 'Red' ? '#FF0000' : 
                  pred.color === 'Green' ? '#00FF00' : '#9400D3';
    document.getElementById('colorCircle').style.backgroundColor = bgColor;
    document.getElementById('colorCircle').innerText = pred.number;
    
    updateHistory();
}

function updateHistory() {
    let histDiv = document.getElementById('history');
    histDiv.innerHTML = '';
    history.forEach(item => {
        let span = document.createElement('span');
        span.className = 'history-item ' + item.color.toLowerCase();
        span.innerText = `${item.number} (${item.hindiColor})`;
        histDiv.appendChild(span);
    });
}

function startTimer() {
    clearInterval(timerInterval);
    clearInterval(countdown);
    
    intervalTime = parseInt(document.getElementById('gameType').value);
    
    let timeLeft = intervalTime;
    document.getElementById('timer').innerText = `अगला प्रेडिक्शन: ${timeLeft} सेकंड में`;
    
    countdown = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `अगला प्रेडिक्शन: ${timeLeft} सेकंड में`;
        if (timeLeft <= 0) {
            timeLeft = intervalTime;
        }
    }, 1000);
    
    timerInterval = setInterval(updatePrediction, intervalTime * 1000);
    
    updatePrediction();
}

// पेज लोड पर शुरू करो
window.onload = function() {
    for (let i = 0; i < 10; i++) {
        history.push(generatePrediction());
    }
    updateHistory();
    startTimer();
};
