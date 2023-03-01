window.onload = function () {

    document.getElementById('phone').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    document.addEventListener('submit', function (event) {
        event.preventDefault();

        document.getElementById('submitButton').disabled = true;
        document.getElementById('spin').style.display = "inline-block";

        const data = JSON.stringify({
            "messages": [
                {
                    "channel": "sms",
                    "originator": "https://lucashunter.ca",
                    "recipients": "xxxxxxxxxxxxx",
                    "content": new FormData(event.target).get('message'),
                    "data_coding": "text"
                }
            ]
        });

        console.log(data);

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", async function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                await new Promise(r => setTimeout(r, 2000));
                document.getElementById('submitButton').disabled = false;
                document.getElementById('spin').style.display = "none";
            }
        });

        xhr.open("POST", "https://d7sms.p.rapidapi.com/messages/v1/send");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("Token", "undefined");
        xhr.setRequestHeader("X-RapidAPI-Key", "");
        xhr.setRequestHeader("X-RapidAPI-Host", "d7sms.p.rapidapi.com");

        xhr.send(data)

    });

}