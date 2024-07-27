function sendMessage() {
    let userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    let chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<div class="chat user">${userInput}</div>`;

    fetch('http://localhost:5000/api/check_symptoms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptoms: userInput })
    })
    .then(response => response.json())
    .then(data => {
        let conditions = data.conditions;
        let responseMessage = conditions.length ? `Possible conditions: ${conditions.join(', ')}` : "No matching conditions found.";
        chatbox.innerHTML += `<div class="chat bot">${responseMessage}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    });

    document.getElementById('userInput').value = '';
}
