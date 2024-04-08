document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('main section');
    let isScrolling = false; // 스크롤 중 여부를 나타내는 플래그

    menuLinks.forEach(function(menuLink) {
        menuLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection && !isScrolling) {
                smoothScrollTo(targetSection.offsetTop);
            }
            setActive(menuLink);
        });
    });

    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            const fromTop = window.scrollY;

            sections.forEach(function(section) {
                if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                    setActive(document.querySelector('header nav a[href="#' + section.id + '"]'));
                }
            });
        }
    });

    function smoothScrollTo(targetPosition) {
        isScrolling = true; // 스크롤 중임을 표시
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 500; // milliseconds
        const startTime = performance.now(); // 시작 시간을 기록

        function scrollStep(timestamp) {
            const currentTime = timestamp - startTime;
            const progress = Math.min(currentTime / duration, 1); // 진행률은 0과 1 사이의 값으로 제한
            const easedProgress = easeInOutCubic(progress);
            window.scrollTo(0, startPosition + distance * easedProgress);

            if (currentTime < duration) {
                window.requestAnimationFrame(scrollStep);
            } else {
                isScrolling = false; // 스크롤 완료 후 플래그를 false로 설정하여 다음 스크롤 이벤트를 허용
            }
        }

        window.requestAnimationFrame(scrollStep);
    }

    function easeInOutCubic(t) {
        // Cubic easing in/out 함수
        t *= 2;
        if (t < 1) return 0.5 * t * t * t;
        t -= 2;
        return 0.5 * (t * t * t + 2);
    }

    function setActive(clickedLink) {
        menuLinks.forEach(function(link) {
            if (link === clickedLink) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});



  
/* 랜덤 컬러 텍스트 */
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
