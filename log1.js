document.getElementById('toggleToSignUp').addEventListener('click', function () {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('toggleToLogin').classList.remove('hidden');
    document.getElementById('toggleToSignUp').classList.add('hidden');
});

document.getElementById('toggleToLogin').addEventListener('click', function () {
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('toggleToLogin').classList.add('hidden');
    document.getElementById('toggleToSignUp').classList.remove('hidden');
});

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic validation (more robust validation needed in real applications)
    let accounts=JSON.parse(localStorage.getItem('accounts'));
    console.log(accounts);
    let str = 'not found';
    for(let i=0;i<accounts.length;i++){

        console.log(accounts[i].username);

        if(accounts[i].username === username && accounts[i].password === password){
           alert('Logged in successfully!');
           window.location.href = "fronpage.html";
            str='found';
            break;
        }
    }
    if(str === "not found"){
        alert('Invailid Login ID or Password Please first SignUP.');
    }
    
    // if (username && password === storedPswd) {
        
    //     alert('Logged in successfully!');
        
    //     window.location.href = "fronpage.html"; // this line is window home  redirect for when user and password correct
    // } else {
    //     
    // }
});

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('newPassword').value;
    
    if (newUsername && email && newPassword) {
        // Create an account object
        const account = {
            username: newUsername,
            email: email,
            password: newPassword
        };

        let accountsNew = JSON.parse(localStorage.getItem('accounts')) || [];
        accountsNew.push(account);

        // Store the account in localStorage
        localStorage.setItem('accounts', JSON.stringify(accountsNew));
        alert('Account created successfully!');
        // window.location.href = "fronpage.html"; // this line is window home  redirect for when user and password correct

    } 
    else {
        alert('Please fill out all fields.');
        // alert('Invailid Login ID or Password Please first SignUP.');

    }
});
