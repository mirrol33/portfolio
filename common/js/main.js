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

// skill 마우스 슬라이드 효과
const skillList = document.querySelector('.skill-list');
const lis = skillList.querySelectorAll('li');

// User Agent를 이용하여 기기를 구분
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    // 모바일 기기인 경우 터치 이벤트를 사용
    skillList.addEventListener('touchstart', handleTouchStart, false);
    skillList.addEventListener('touchmove', handleTouchMove, false);
    skillList.addEventListener('touchend', resetSlide, false);
} else {
    // PC인 경우 마우스 이벤트를 사용
    skillList.addEventListener('mouseenter', function() {
        skillList.addEventListener('mousemove', moveSlide);
    });

    skillList.addEventListener('mouseleave', function() {
        skillList.removeEventListener('mousemove', moveSlide);
        resetSlide();
    });
}

let startX;
let startY;
let lastY;

function handleTouchStart(event) {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    lastY = startY;
}

function handleTouchMove(event) {
    if (!startX || !startY) {
        return;
    }

    const touch = event.touches[0];
    const deltaY = touch.clientY - lastY;

    event.preventDefault();
    updateSlide(deltaY);
    lastY = touch.clientY;
}

function moveSlide(e) {
    const mouseY = e.clientY;
    const deltaY = mouseY - lastY;

    updateSlide(deltaY);
    lastY = mouseY;
}

function updateSlide(deltaY) {
    const listHeight = skillList.clientHeight;
    const percentage = deltaY / listHeight;

    let translateY = 0;
    translateY = percentage * (lis.length * 30); // 요소의 수에 따라 계산

    lis.forEach(li => {
        li.style.transform = `translateY(-${translateY}%)`;
    });
}

function resetSlide() {
    lis.forEach(li => {
        li.style.transform = 'translateY(0)';
    });

    startX = null;
    startY = null;
}
