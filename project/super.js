document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('route-form');

  // Updated bus data with fare, duration, and multiple buses per route
  const busRoutes = [
    {
      start: "bangalore",
      destination: "mysore",
      buses: [
        { time: "07:00 AM", fare: "₹150", duration: "3h" },
        { time: "11:00 AM", fare: "₹170", duration: "3h 15m" },
        { time: "04:00 PM", fare: "₹160", duration: "3h 10m" }
      ]
    },
    {
      start: "mysore",
      destination: "bangalore",
      buses: [
        { time: "09:00 AM", fare: "₹150", duration: "3h" },
        { time: "03:00 PM", fare: "₹160", duration: "3h 5m" }
      ]
    },
    {
      start: "hubli",
      destination: "mangalore",
      buses: [
        { time: "06:30 AM", fare: "₹300", duration: "6h" },
        { time: "01:30 PM", fare: "₹320", duration: "6h 20m" }
      ]
    },
    {
      start: "mangalore",
      destination: "hubli",
      buses: [
        { time: "08:00 AM", fare: "₹300", duration: "6h 10m" }
      ]
    }
  ];

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const start = document.getElementById('start').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('travel-date').value;

    // Validation
    if (!start || !destination || !date) {
      alert("Please fill in all fields.");
      return;
    }

    if (start === destination) {
      alert("Starting point and destination must be different.");
      return;
    }

    // Find matching route
    const route = busRoutes.find(
      r => r.start === start && r.destination === destination
    );

    showResults(start, destination, date, route ? route.buses : []);
  });

  function showResults(start, destination, date, buses) {
    const oldResult = document.getElementById('result');
    if (oldResult) oldResult.remove();

    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    resultDiv.style.marginTop = '20px';
    resultDiv.style.padding = '15px';
    resultDiv.style.backgroundColor = '#ecf0f1';
    resultDiv.style.borderRadius = '10px';

    resultDiv.innerHTML = `
      <h3>Bus Timings & Details</h3>
      <p><strong>From:</strong> ${capitalize(start)}</p>
      <p><strong>To:</strong> ${capitalize(destination)}</p>
      <p><strong>Date:</strong> ${date}</p>
    `;

    if (buses.length === 0) {
      resultDiv.innerHTML += `<p style="color:red;">No buses available for this route.</p>`;
    } else {
      const table = document.createElement('table');
      table.style.width = "100%";
      table.style.marginTop = "15px";
      table.style.borderCollapse = "collapse";

      table.innerHTML = `
        <thead>
          <tr style="background-color: #dcdcdc;">
            <th style="padding: 8px; border: 1px solid #ccc;">Time</th>
            <th style="padding: 8px; border: 1px solid #ccc;">Fare</th>
            <th style="padding: 8px; border: 1px solid #ccc;">Duration</th>
          </tr>
        </thead>
        <tbody>
          ${buses.map(bus => `
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc;">${bus.time}</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${bus.fare}</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${bus.duration}</td>
            </tr>
          `).join('')}
        </tbody>
      `;

      resultDiv.appendChild(table);
    }

    document.querySelector('.container').appendChild(resultDiv);
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
});
