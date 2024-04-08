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


// 마우스 따라다니는 이미지
// 이미지를 따라다니게 하는 함수
function followMouse(event, image) {
    // 이벤트가 발생한 위치를 가져옵니다.
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    // 이미지의 너비와 높이를 가져옵니다.
    var imageWidth = image.width;
    var imageHeight = image.height;

    // 이미지의 중심 좌표를 계산합니다.
    var imageCenterX = mouseX - imageWidth / 2;
    var imageCenterY = mouseY - imageHeight / 2;

    // 이미지를 이동합니다.
    image.style.position = 'absolute';
    image.style.left = imageCenterX + 'px';
    image.style.top = imageCenterY + 'px';
}

// 각 project-box 요소에 이벤트를 추가합니다.
var projectBoxes = document.querySelectorAll('.project-box');
projectBoxes.forEach(function(box) {
    var image = box.querySelector('img');
    box.addEventListener('mouseenter', function() {
        document.addEventListener('mousemove', function(event) {
            followMouse(event, image);
        });
        showImage(image);
    });
    box.addEventListener('mouseleave', function() {
        document.removeEventListener('mousemove', function(event) {
            followMouse(event, image);
        });
        hideImage(image);
    });
});