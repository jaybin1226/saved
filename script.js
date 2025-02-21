// 페이지 로드 시 한 번만 실행되는 코드
window.onload = function() {
    const logo = document.querySelector('.logo');
    let hue = 0;
  
    function rotateGradient() {
      hue += 1; // 색상 각도 증가
      logo.style.filter = `hue-rotate(${hue}deg)`; // 로고에 그라디언트 적용
      requestAnimationFrame(rotateGradient);
    }
  
    rotateGradient();
};

let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollInfo = document.querySelector('.scroll-info');
    const scrollTop = window.scrollY || window.pageYOffset;

    if (scrollTop > lastScrollTop) {
        document.getElementById('section1').classList.add('scroll-up');
    } else {
        document.getElementById('section1').classList.remove('scroll-up');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// script.js

// DOM 요소들을 가져옵니다.
const chatBubbles = document.querySelectorAll('.message');

// 스크롤 이벤트 리스너를 추가합니다.
window.addEventListener('scroll', toggleChatBubblesVisibility);

// 채팅 버블들의 가시성을 토글하는 함수를 정의합니다.
function toggleChatBubblesVisibility() {
  // 화면의 아래쪽에서 숨겨야 할 기준 위치를 설정합니다.
  const hideThreshold = window.innerHeight * 0.9;

  // 각 채팅 버블들에 대해 처리합니다.
  chatBubbles.forEach(bubble => {
    // 채팅 버블의 위치를 가져옵니다.
    const bubbleRect = bubble.getBoundingClientRect();
    
    // 채팅 버블이 화면 아래쪽에 위치하면 투명도를 0으로 설정하여 숨깁니다.
    if (bubbleRect.top > hideThreshold || bubbleRect.bottom < 0) {
      bubble.style.opacity = '0';
    } else {
      bubble.style.opacity = '1';
    }
  });
}
