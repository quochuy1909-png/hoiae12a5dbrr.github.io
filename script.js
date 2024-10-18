const scratchCard = document.getElementById('scratchCard');
const cover = document.getElementById('cover');
const nextCardButton = document.getElementById('nextCardButton');
const result = document.getElementById('result');
const backgroundMusic = document.getElementById('backgroundMusic');
let remainingNumbers = [...Array(17).keys()].map(i => i + 1);
let previousWinners = [];
let scratchCount = 0;

// Bắt đầu phát nhạc nền xổ số
backgroundMusic.play();

// Hiệu ứng cào thẻ
cover.addEventListener('mousemove', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    cover.style.clipPath = `circle(50px at ${x}px ${y}px)`;
});

// Hàm cào thẻ
function scratchCardHandler() {
    scratchCount++;

    if (scratchCount === 7) {
        revealNumber(7);
    } else {
        const validNumbers = remainingNumbers.filter(num => num !== 7);
        const randomIndex = Math.floor(Math.random() * validNumbers.length);
        const selectedNumber = validNumbers[randomIndex];
        revealNumber(selectedNumber);
    }
}

// Hiển thị số trúng và loại bỏ khỏi danh sách
function revealNumber(number) {
    document.getElementById('number').textContent = number;
    result.textContent = `Bạn đã cào trúng số: ${number}`;
    previousWinners.push(number);
    remainingNumbers = remainingNumbers.filter(num => num !== number);

    // Ẩn lớp che thẻ
    cover.style.pointerEvents = 'none';
    cover.style.opacity = 0;

    // Kích hoạt nút thẻ kế tiếp
    nextCardButton.disabled = false;

    // Gọi hiệu ứng pháo giấy
    launchConfetti();
}

// Hiệu ứng pháo giấy nhiều màu
function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Tốc độ rơi ngẫu nhiên
        document.body.appendChild(confetti);

        // Xóa pháo giấy sau khi kết thúc hiệu ứng
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Tạo màu ngẫu nhiên cho pháo giấy
function getRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Hàm thẻ kế tiếp
function nextCardHandler() {
    if (remainingNumbers.length === 0) {
        result.textContent = 'Tất cả các số đã được cào!';
        nextCardButton.disabled = true;
        return;
    }

    // Tạo lại lớp che thẻ
    cover.style.opacity = 1;
    cover.style.pointerEvents = 'auto';
    cover.style.clipPath = 'none';
    cover.textContent = 'Cào Thẻ';

    document.getElementById('number').textContent = '';
    result.textContent = '';
    nextCardButton.disabled = true;
}

// Xử lý sự kiện cào thẻ
cover.addEventListener('click', scratchCardHandler);

// Xử lý sự kiện thẻ kế tiếp
nextCardButton.addEventListener('click', nextCardHandler);
