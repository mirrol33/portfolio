function changeColor() {
    const spans = document.querySelectorAll('.is-colored span');
    spans.forEach(span => {
        span.style.color = getRandomColor();
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 1초마다 폰트 컬러 변경
setInterval(changeColor, 200);