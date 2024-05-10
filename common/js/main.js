document.addEventListener('DOMContentLoaded', function() {

    /* Header 메뉴 */
    const header = document.querySelector('header');
    const menuLinks = document.querySelectorAll('nav li a');
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
    
    /* 스크롤 다운시 상단 메뉴바 색상 변경 */
    let scrollTimeout;

    window.addEventListener('scroll', function() {
        header.classList.add('blur');
        clearTimeout(scrollTimeout);

        if (!isScrolling) {
            isScrolling = true;
        }

        // 스크롤 중이면 0.1초 후에 isScrolling을 false로 설정
        scrollTimeout = setTimeout(function() {
            header.classList.remove('blur');
            isScrolling = false;
        }, 100);

        if (window.scrollY === 0) {
            header.classList.remove('opaque');
            setActive(menuLinks[0]); // 스크롤 최상단일 때 첫번째 메뉴 활성화
        } else {
            header.classList.add('opaque');
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

    /* project 마우스 오버 시 이미지 따라다니기 */
    let image = document.querySelectorAll('.image');

    function showImage(e){

        for(var i = 0; i < image.length; i++){
            // 전체 웹 브라우저 화면을 기준으로한 마우스 위치 계산
            mouseX = e.clientX;
            mouseY = e.clientY;

            // 이미지 사이즈 측정
            var imageWidth = image[i].offsetWidth;
            var imageHeight = image[i].offsetHeight;

            // 이미지 중심 좌표 계산
            var imageX = mouseX - imageWidth / 2;
            var imageY = mouseY - imageHeight / 2;
            // console.log(imageX, imageY);

            // image[i].style.transform = `translate(${imageX}px, ${imageY}px)`;
            image[i].style.left = imageX + 'px';
            image[i].style.top = imageY + 'px';
        }
        
    }
    document.addEventListener('mousemove', showImage);

    /* 모바일 메뉴 버튼 클릭 시 토글 이벤트 */
    const mobileNav = document.querySelector('.mobile_nav');
    // const nav = document.querySelector('header');
    const navIcon = document.querySelector('.ham');

    mobileNav.addEventListener('click', function() {
        header.classList.toggle('open'); // open 클래스를 추가하거나 제거하여 토글
    });

    const navLinks = document.querySelectorAll('header nav li a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            header.classList.remove('open'); // 클릭된 링크를 통해 네비게이션 메뉴가 닫힘
            navIcon.classList.remove('active') // 메뉴가 닫히면 아이콘 모양 변경
        });
    });

    /* 바뀐 커서 모양 따라다니기 */
    const cursor = document.querySelector('.cursor');
    // const links = document.querySelectorAll('a');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
    });

    // 링크에 마우스 오버 또는 아웃 시 hover 클래스를 토글
    function toggleHover() {
        cursor.classList.toggle('hover');
    }

    // 모든 링크에 대해 이벤트 리스너 등록
    document.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('mouseenter', toggleHover);
        link.addEventListener('mouseleave', toggleHover);
    });

});
