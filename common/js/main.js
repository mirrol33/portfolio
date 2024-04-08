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

/* 마우스 따라다니는 프로젝트 이미지 */
document.addEventListener('DOMContentLoaded', function() {
    var projectBoxes = document.querySelectorAll('.project-box');
    
    projectBoxes.forEach(function(box) {
        var image = box.querySelector('.image');
        image.style.position = 'fixed'; // 이미지의 position을 fixed로 변경
        image.style.pointerEvents = 'none';
        image.style.opacity = '0'; // 이미지를 처음에 숨김

        box.addEventListener('mouseenter', function() {
            image.style.opacity = '0.5'; // 마우스가 상자 위에 있을 때 이미지를 나타냄
        });

        document.addEventListener('mousemove', function(event) {
            var mouseX = event.clientX; // 전체 웹 브라우저 화면을 기준으로한 마우스 위치 계산
            var mouseY = event.clientY;

            var imageWidth = image.offsetWidth;
            var imageHeight = image.offsetHeight;

            // 이미지의 중심 좌표 계산
            var imageX = mouseX - imageWidth / 2;
            var imageY = mouseY - imageHeight / 2;

            // 이미지가 화면을 벗어나지 않도록 조정
            imageX = Math.min(Math.max(imageX, 0), window.innerWidth - imageWidth);
            imageY = Math.min(Math.max(imageY, 0), window.innerHeight - imageHeight);

            image.style.left = imageX + 'px';
            image.style.top = imageY + 'px';
        });

        box.addEventListener('mouseleave', function() {
            image.style.opacity = '0'; // 마우스가 상자를 떠날 때 이미지를 숨김
        });
    });
});
