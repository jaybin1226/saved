window.onload = function () {
    // ✅ 로고 애니메이션 실행
    const logo = document.querySelector('.logo');
    if (logo) {
        let hue = 0;
        function rotateGradient() {
            hue += 1;
            logo.style.filter = `hue-rotate(${hue}deg)`;
            requestAnimationFrame(rotateGradient);
        }
        rotateGradient();
    }

    // ✅ 스크롤 이벤트 감지
    window.addEventListener('scroll', handleScroll);
};

// ✅ 스크롤 감지 변수
let lastScrollTop = 0;
let scrollTimeout;

// ✅ 메시지 박스 생성
const messageBox = document.createElement("div");
messageBox.textContent = "스크롤을 위로 하셨거나 3초 이상 멈췄습니다!";
messageBox.style.cssText = `
    position: fixed;
    bottom: -50px; /* 초기에는 숨김 */
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    transition: bottom 0.5s ease-in-out;
    z-index: 1000;
`;
document.body.appendChild(messageBox);

// ✅ 메시지 표시 함수
function showMessage() {
    messageBox.style.bottom = "20px"; // 화면 하단에 표시
    setTimeout(() => {
        messageBox.style.bottom = "-50px"; // 3초 후 숨김
    }, 3000);
}

// ✅ 스크롤 이벤트 함수
function handleScroll() {
    const scrollTop = window.scrollY || window.pageYOffset;

    // ✅ 위로 스크롤하면 메시지 표시
    if (scrollTop < lastScrollTop) {
        showMessage();
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // ✅ 기존 타이머 초기화 (새로운 스크롤 이벤트 발생 시)
    clearTimeout(scrollTimeout);

    // ✅ 3초 동안 스크롤이 없으면 메시지 표시
    scrollTimeout = setTimeout(() => {
        showMessage();
    }, 3000);
}

// ✅ 스크롤 이벤트 리스너 등록
window.addEventListener("scroll", handleScroll);
