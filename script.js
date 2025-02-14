document.addEventListener("DOMContentLoaded", function() {
    // Attach click event listeners to the classify buttons
    const classifyButtons = document.querySelectorAll('.classify-btn');

    classifyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reviewText = this.getAttribute('data-review');
            // Send AJAX request to Flask backend
            fetch('/classify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sentence: reviewText })
            })
            .then(response => response.json())
            .then(data => {
                // Inject the result into the result container
                const resultContainer = document.getElementById('result-container');
                if (data.error) {
                    resultContainer.innerHTML = `<p>Error: ${data.error}</p>`;
                } else {
                    resultContainer.innerHTML = `
                        <h2>Classification Result</h2>
                        <p><strong>Input Sentence:</strong> ${data.sentence}</p>
                        <p><strong>Predicted Sentiment:</strong> ${data.result}</p>
                        <p><strong>Actual Sentiment:</strong> ${data.actual}</p>
                        <p><strong>Match:</strong> ${data.match}</p>
                    `;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });
});
