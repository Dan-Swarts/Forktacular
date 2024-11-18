import UserLogin from "../interfaces/UserLogin"

export const login = async (userInfo: UserLogin) => {
    try {
        const response = await fetch('auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo),
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }

        const data = await response.json();
        return data;

    } catch (error){
        console.log('Error from user login: ',error);
        return Promise.reject('Could not fetch user info');
    }
}

class AuthService {
  
    // Check if the user is logged in by retrieving the token from localStorage
    loggedIn() {
      const token = this.getToken();
      return token;
    }
  
    // Retrieve the JWT token from localStorage
    getToken(): string {
      const loggedUser = localStorage.getItem('id_token') || '';
      return loggedUser;
    }
  
    // Store the JWT token in localStorage and redirect to the home page
    login(idToken: string) {
      localStorage.setItem('id_token', idToken);
      window.location.assign('/');
    }
  
    // Remove the JWT token from localStorage and redirect to the home page
    logout() {
      localStorage.removeItem('id_token');
      window.location.assign('/');
    }
}
  
  // Export an instance of the AuthService class
  export default new AuthService();
  

