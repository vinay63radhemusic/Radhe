document.querySelector("input[name='location']").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const locationInput = document.querySelector("input[name='location']");
            const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
            locationInput.value = mapLink;
        }, function(error) {
            alert("Unable to fetch location. Please allow location access.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

document.getElementById("eventForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.querySelector("input[name='name']").value;
    const location = document.querySelector("input[name='location']").value;
    const event = document.querySelector("input[name='event']").value;
    const contact = document.querySelector("input[name='contact']").value;
    const date = document.querySelector("input[name='date']").value;

    const whatsappMessage = `https://wa.me/919636142401?text=Hello,%20I%20want%20to%20book%20an%20event.%0AName:%20${name}%0ALocation:%20${location}%0AEvent:%20${event}%0AContact:%20${contact}%0AEvent%20Date:%20${date}`;
    window.open(whatsappMessage, '_blank');

    // QR Code Generator
    const qrWindow = window.open("", "QR Code", "width=300,height=300");
    qrWindow.document.write(`
        <html>
        <head><title>Event Location QR Code</title></head>
        <body style="display:flex;justify-content:center;align-items:center;height:100vh;background:#f0f0f0;">
            <div>
                <h3>Scan Location QR</h3>
                <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(location)}&size=200x200" alt="QR Code" />
            </div>
        </body>
        </html>
    `);
});
