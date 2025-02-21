window.onload = function() {
    // 로고 애니메이션 실행
    const logo = document.querySelector('.logo');
    if (logo) {
        let hue = 0;
        function rotateGradient() {
            hue += 1;
            logo.style.filter = `hue-rotate(${hue}deg)`; // 올바른 백틱(`) 적용
            requestAnimationFrame(rotateGradient);
        }
        rotateGradient();
    }

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);
};

// 스크롤 방향 감지 변수
let lastScrollTop = 0;

// 스크롤 이벤트 핸들러 함수
function handleScroll() {
    const scrollInfo = document.querySelector('.scroll-info');
    const section1 = document.getElementById('section1');
    const chatBubbles = document.querySelectorAll('.message');
    const scrollTop = window.scrollY || window.pageYOffset;
    const hideThreshold = window.innerHeight * 0.9;

    // 스크롤 방향 감지 및 클래스 추가/제거
    if (section1) {
        if (scrollTop > lastScrollTop) {
            section1.classList.add('scroll-up');
        } else {
            section1.classList.remove('scroll-up');
        }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 모바일에서 음수 스크롤 방지

    // 채팅 버블 가시성 조절
    chatBubbles.forEach(bubble => {
        const bubbleRect = bubble.getBoundingClientRect();
        bubble.style.opacity = (bubbleRect.top > hideThreshold || bubbleRect.bottom < 0) ? '0' : '1';
    });
}
