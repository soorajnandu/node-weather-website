console.log('Client side js is rendering');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    if (search.value) {
        const location = search.value;
        messageOne.textContent = 'Loading....';
        messageTwo.textContent = '';
        fetchWeather(location);
    } else {
        messageOne.textContent = 'Enter a Location to Fetch Weather';
    }
});

const fetchWeather = (location) => {
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else  {
                messageOne.textContent = 'Location: '+ data.location;
                messageTwo.textContent = 'Forecast:' + data.forecast;
            }
        })
    });
}