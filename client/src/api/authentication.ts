import UserLogin from "../interfaces/UserLogin"

class AuthService {
    login = async (userInfo: UserLogin) => {
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
            localStorage.setItem('id_token', data.token);
            window.location.assign('/');
            return data;
    
        } catch (error){
            console.log('Error from user login: ',error);
            return Promise.reject('Could not fetch user info');
        }
    }

    signUp = async (userInfo: UserLogin) => {
        try {
            const response = await fetch('auth/signUp', {
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
            localStorage.setItem('id_token', data.token);
            window.location.assign('/');
            return data;
    
        } catch (error){
            console.log('Error from user login: ',error);
            return Promise.reject('Could not fetch user info');
        }
    }
  
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
  
    // Remove the JWT token from localStorage and redirect to the home page
    logout() {
      localStorage.removeItem('id_token');
    //   window.location.assign('/user-info');
    }
}
  
const authService  = new AuthService();
export { authService  };
  

