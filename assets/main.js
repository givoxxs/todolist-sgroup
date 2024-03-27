let email = document.getElementById('email')
let password = document.getElementById('password')
let errorE = document.querySelector('.error-email')
let errorP = document.querySelector('.error-password')
let form = document.querySelector('.login-form')

form.addEventListener('submit', function(event) {
    event.preventDefault()
    console.log('submit')
    console.log('submit')
    console.log(email.value)
    console.log(password.value)
    if (email.value === '') {
        event.preventDefault()
        errorE.style.color = "red"
        errorE.innerHTML = 'Email is required'
    } else {
        errorE.innerHTML = ''
        errorE.style.color = ''
    }
    if (password.value === '') {
        event.preventDefault()
        errorP.style.color = "red"
        errorP.innerHTML = 'Password is required'
    } else {
        errorP.innerHTML = ''
        errorP.style.color = ''
    }

    if (email.value !== '' && password.value !== '') {
        login()
    }
})

async function login() {
    try {
        let response = await fetch('https://recruitment-api.pyt1.stg.jmr.pl/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: email.value,
                password: password.value
            })
        })

        if (response.ok) {
            let data = await response.json()
            console.log('data', data)

            if (data.status === 'ok') {
                window.location.href = 'home.html'
            } else {
                errorE.style.color = "red"
                errorP.style.color = "red"
                errorE.innerHTML = data.message
                errorP.innerHTML = data.message
                alert(data.message)
            }
        } else {
            console.error('Server response was not ok')
        }
    } catch (error) {
        console.error('Error:', error)
    }
}