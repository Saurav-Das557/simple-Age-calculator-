document.addEventListener('DOMContentLoaded', () => {
    const birthdateInput = document.getElementById('birthdate');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultElement = document.getElementById('result');

    // Set max date to today
    birthdateInput.max = new Date().toISOString().split('T')[0];

    // Set default year range to make year selection easier
    const currentYear = new Date().getFullYear();
    birthdateInput.min = `${currentYear - 120}-01-01`;

    // Added multiple event listeners for calculation
    calculateBtn.addEventListener('click', calculateAge);
    birthdateInput.addEventListener('change', calculateAge);
    birthdateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });

    function calculateAge() {
        // Reset previous result
        resultElement.textContent = '';
        resultElement.classList.remove('show');

        // Validate input
        if (!birthdateInput.value) {
            resultElement.textContent = 'Please select a birthdate';
            resultElement.classList.add('show');
            return;
        }

        // Create date objects
        const birthdate = new Date(birthdateInput.value);
        const today = new Date();

        // Validate birthdate is not in the future
        if (birthdate > today) {
            resultElement.textContent = 'Birthdate cannot be in the future';
            resultElement.classList.add('show');
            return;
        }

        // Calculate age
        let years = today.getFullYear() - birthdate.getFullYear();
        let months = today.getMonth() - birthdate.getMonth();
        let days = today.getDate() - birthdate.getDate();

        // Adjust calculations for negative months or days
        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Display result with animation
        resultElement.innerHTML = `You are <span>${years}</span> years, <span>${months}</span> months, and <span>${days}</span> days old`;
        resultElement.classList.add('show');
    }
});