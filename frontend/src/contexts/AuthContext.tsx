import { useState, ReactNode } from 'react';
import { AuthContext, User } from './AuthContextType';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, we would validate the password here
    if (password.length < 6) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }
    
    // Mock successful login
    setUser({
      id: '1',
      name: 'Demo User',
      email: email,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    });
    
    setIsLoading(false);
  };

  // Mock signup function - in a real app, this would call an API
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, we would validate the password here
    if (password.length < 6) {
      setIsLoading(false);
      throw new Error('Password must be at least 6 characters');
    }
    
    // Mock successful signup
    setUser({
      id: '1',
      name: name,
      email: email,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    });
    
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };
  
  // Debug login function - instantly logs in with a debug user
  const debugLogin = () => {
    setUser({
      id: 'debug-1',
      name: 'Debug User',
      email: 'debug@example.com',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      debugLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
}
