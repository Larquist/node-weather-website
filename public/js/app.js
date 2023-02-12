const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error
                return
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forcast
        })
    })
})
