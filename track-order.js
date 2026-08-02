const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx7wTWeMzRzJfPwKAgAxDSS-ZGX1TwKpIgkv4GhF_guHUMBpeKBkbVRduD9y51ID1b9IQ/exec";

document.getElementById("trackBtn").addEventListener("click", function () {

    const search = document.getElementById("searchInput").value.trim();

    if (search === "") {
        alert("Please enter Order ID or Mobile Number");
        return;
    }

    const result = document.getElementById("result");

    result.style.display = "block";
    result.innerHTML = "⏳ Searching...";

    fetch(WEB_APP_URL + "?action=track&search=" + encodeURIComponent(search))
        .then(response => response.json())
        .then(data => {

            if (data.success) {

                result.className = "success";

                result.innerHTML = `
<h3>✅ Order Found</h3>

<p><b>Order ID:</b> ${data.orderId}</p>

<p><b>Customer:</b> ${data.name}</p>

<p><b>Status:</b> ${data.status}</p>

<p><b>Courier:</b> ${data.courier || "Not Assigned Yet"}</p>

<p><b>Tracking:</b> ${data.tracking || "Not Available Yet"}</p>

<p><b>Remark:</b> ${data.remark || "-"}</p>

`;

            } else {

                result.className = "error";

                result.innerHTML = `
<h3>❌ Order Not Found</h3>

<p>Please check your Order ID or Mobile Number.</p>
`;

            }

        })

        .catch(() => {

            result.className = "error";

            result.innerHTML = `
<h3>⚠ Error</h3>

<p>Unable to connect. Please try again later.</p>
`;

        });

});
