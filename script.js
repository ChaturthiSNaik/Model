// script.js
document.addEventListener("DOMContentLoaded", function () {
    const reviewButtons = document.querySelectorAll("button");

    reviewButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();  // Prevent default form submission

            const sentence = button.innerText;  // Get the review sentence
            const formData = new FormData();
            formData.append('sentence', sentence);

            // Perform the AJAX request
            fetch('/classify', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                const resultContainer = document.getElementById('result-container');
                resultContainer.innerHTML = `
                    <h3>Classification Result</h3>
                    <p><strong>Input Sentence:</strong> ${data.sentence}</p>
                    <p><strong>Predicted Sentiment:</strong> ${data.result}</p>
                    <p><strong>Actual Sentiment:</strong> ${data.actual}</p>
                    <p><strong>Match:</strong> ${data.match}</p>
                `;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });
});
