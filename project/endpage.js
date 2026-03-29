document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('route-form');

  // Updated bus data with fare, duration, and multiple buses per route
  const busRoutes = [
    {
      start: "bangalore",
      destination: "mysore",
      buses: [
        {  DepartureTime: "07:00 AM", duration: "3h" ,DestinationTime:"10:00 AM"},
        {  DepartureTime: "11:00 AM" ,duration: "3h 15m" ,DestinationTime:"1:15 PM"},
        {  DepartureTime: "04:00 PM", duration: "3h 10m",DestinationTime:"07:10 AM" }
      ]
    },
    {
      start: "mysore",
      destination: "bangalore",
      buses: [
        {  DepartureTime: "07:00 AM", duration: "3h" ,DestinationTime:"10:00 AM"},
        {  DepartureTime: "11:00 AM" ,duration: "3h 15m" ,DestinationTime:"1:15 PM"},
        {  DepartureTime: "04:00 PM", duration: "3h 10m",DestinationTime:"07:10 AM" }
      ]
    },
    {
      start: "hubli",
      destination: "mangalore",
      buses: [
        {  DepartureTime: "07:00 AM", duration: "3h" ,DestinationTime:"10:00 AM"},
        {  DepartureTime: "11:00 AM" ,duration: "3h 15m" ,DestinationTime:"1:15 PM"},
        {  DepartureTime: "04:00 PM", duration: "3h 10m",DestinationTime:"07:10 AM" }
      ]
    },
    {
      start: "mangalore",
      destination: "hubli",
      buses: [
      {  DepartureTime: "07:00 AM", duration: "3h" ,DestinationTime:"10:00 AM"},
        {  DepartureTime: "11:00 AM" ,duration: "3h 15m" ,DestinationTime:"1:15 PM"},
        {  DepartureTime: "04:00 PM", duration: "3h 10m",DestinationTime:"07:10 AM" }
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
    <p><strong>Fare:</strong> ₹150</p>
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
          <th style="padding: 8px; border: 1px solid #ccc;">Departure Time</th>
          <th style="padding: 8px; border: 1px solid #ccc;">Duration</th>
          <th style="padding: 8px; border: 1px solid #ccc;">Destination Time</th>
        </tr>
      </thead>
      <tbody>
        ${buses.map(bus => `
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc;">${bus.DepartureTime}</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${bus.duration}</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${bus.DestinationTime}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

    resultDiv.appendChild(table);
  }

  // Add Back Button
  const backButton = document.createElement('button');
  backButton.textContent = '← Back to Home';
  backButton.style.marginTop = '20px';
  backButton.style.padding = '10px 20px';
  backButton.style.backgroundColor = '#3498db';
  backButton.style.color = '#fff';
  backButton.style.border = 'none';
  backButton.style.borderRadius = '5px';
  backButton.style.cursor = 'pointer';

  backButton.addEventListener('click', function () {
    window.location.href = 'index1.html'; // Redirect to index1.html
  });

  resultDiv.appendChild(backButton);

  document.querySelector('.container').appendChild(resultDiv);
}


  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
});
