// Salvando os dados no LocalStorage
let user = null;
let reminders = [];

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const weight = parseFloat(document.getElementById('weight').value);

    if (name && email && weight) {
        user = { name, email, weight };
        localStorage.setItem('user', JSON.stringify(user));

        // Exibe a parte do lembrete após o cadastro
        document.getElementById('userForm').style.display = 'none';
        document.getElementById('reminderForm').style.display = 'block';
    }
});

// Adicionando lembretes
document.getElementById('reminderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const time = document.getElementById('time').value;
    if (time) {
        reminders.push({ time });
        localStorage.setItem('reminders', JSON.stringify(reminders));

        // Exibindo lembretes na tela
        document.getElementById('reminderForm').style.display = 'none';
        document.getElementById('summary').style.display = 'block';
        updateWaterSummary();
    }
});

// Atualizando o resumo de água consumida
function updateWaterSummary() {
    let totalWater = 0;
    if (user) {
        totalWater = user.weight * 35; // Exemplo de cálculo de água com base no peso (ml)
    }
    document.getElementById('totalWater').textContent = `Total de água ingerida: ${totalWater} ml`;

    // Exibindo os lembretes
    reminders.forEach((reminder, index) => {
        const reminderItem = document.createElement('p');
        reminderItem.textContent = `Lembrete ${index + 1}: ${reminder.time}`;
        document.getElementById('summary').appendChild(reminderItem);
    });
}

// Verificando se o usuário já tem cadastro e lembretes
window.onload = function() {
    const storedUser = localStorage.getItem('user');
    const storedReminders = localStorage.getItem('reminders');

    if (storedUser) {
        user = JSON.parse(storedUser);
        reminders = storedReminders ? JSON.parse(storedReminders) : [];
        document.getElementById('userForm').style.display = 'none';
        document.getElementById('reminderForm').style.display = 'block';
        updateWaterSummary();
    }
};
