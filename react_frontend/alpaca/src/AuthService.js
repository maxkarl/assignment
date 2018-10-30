import decode from 'jwt-decode';
export default class AuthService {


    login(username, password) {
        return fetch('http://127.0.0.1:8000/rest-auth/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(res => res.json())
            .then(
                (res) => {
                    if (res.key) {
                        this.setToken('Token ' + res.key)
                        return Promise.resolve(res);
                    } else {
                        alert('Please check your mail and passwort again.')
                    }
                },
                (error) => {
                    alert('The api does not responde.')
                    return error;
                }
            )
    }

    register(username, email, password_one, password_two) {
        return fetch('http://127.0.0.1:8000/rest-auth/registration/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password1: password_one,
                password2: password_two,

            })
        }).then(res => res.json())
            .then(
                (res) => {
                    if (res.key) {
                        this.setToken('Token ' + res.key)
                        return Promise.resolve(res);
                    } else {
                        alert('Please check again if your mail is correct and both passwords are equal.')
                    }
                },
                (error) => {
                    alert('The api does not responde.')
                    return error;
                }
            )
    }

    getUser(token) {
        return fetch("http://127.0.0.1:8000/user-id/", {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(
                (result) => {
                    return result;
                },
                (error) => {
                    return error;
                }
            )
    }

    loggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        localStorage.setItem('id_token', idToken);
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    logout() {
        localStorage.removeItem('id_token');
    }


}