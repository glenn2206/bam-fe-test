// Get elements
const menu1Btn = document.getElementById('menu1');
const menu2Btn = document.getElementById('menu2');
const info1 = document.getElementById('info1');
const form2 = document.getElementById('form2');
const info2 = document.getElementById('info2');
const questionInput = document.getElementById('questionInput');
const submitBtn = document.getElementById('submitBtn');
const answerText = document.getElementById('answerText');

// Menu 1 functionality
menu1Btn.addEventListener('click', () => {
    info1.classList.toggle('show');
    // Hide other panels
    form2.classList.remove('show');
    info2.classList.remove('show');
});

// Menu 2 functionality
menu2Btn.addEventListener('click', () => {
    form2.classList.toggle('show');
    // Hide other panels
    info1.classList.remove('show');
    info2.classList.remove('show');
});

// Submit button functionality
submitBtn.addEventListener('click', () => {
    const question = questionInput.value.trim();
    if (question) {
        // Simulate answering the question
        answerText.textContent = `Menu yang dipilih: Menu 2 - Pertanyaan: "${question}" - Jawaban: Ini adalah jawaban untuk pertanyaan Anda.`;
        info2.classList.add('show');
        questionInput.value = '';
    } else {
        alert('Silakan masukkan pertanyaan terlebih dahulu.');
    }
});
