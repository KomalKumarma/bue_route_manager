document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('route-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    const start = document.getElementById('start').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('travel-date').value;

    // Simple validation
    if (start === "" || destination === "" || date === "") {
      alert("Please fill in all the fields.");
      return;
    }

    if (start === destination) {
      alert("Starting point and destination must be different.");
      return;
    }

    // Show result below the form
    showResult(start, destination, date);
  });

  function showResult(start, destination, date) {
    // Remove existing result if any
    const oldResult = document.getElementById('result');
    if (oldResult) {
      oldResult.remove();
    }

    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    resultDiv.style.marginTop = '20px';
    resultDiv.style.padding = '15px';
    resultDiv.style.backgroundColor = '#ecf0f1';
    resultDiv.style.borderRadius = '10px';
    resultDiv.innerHTML = `
      <h3>Route Details</h3>
      <p><strong>From:</strong> ${capitalize(start)}</p>
      <p><strong>To:</strong> ${capitalize(destination)}</p>
      <p><strong>Date:</strong> ${date}</p>
    `;

    document.querySelector('.container').appendChild(resultDiv);
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
});
