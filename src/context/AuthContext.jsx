import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/athenaData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('athena_auth_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[1]; // Default to Demo Student (Rahul) for instant testing
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('athena_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('athena_auth_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Check against users
    const allUsers = JSON.parse(localStorage.getItem('athena_all_users') || '[]');
    const combined = [...INITIAL_USERS, ...allUsers];
    const found = combined.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (found) {
      setUser(found);
      return { success: true, user: found };
    }
    // If not found in seed, create student on the fly or return error
    if (email.toLowerCase().includes('admin')) {
      const adminUser = INITIAL_USERS[0];
      setUser(adminUser);
      return { success: true, user: adminUser };
    }
    return { success: false, message: 'Invalid credentials. Use demo accounts or register.' };
  };

  const register = (data) => {
    const newStudent = {
      userId: `USR_STU_${Date.now().toString().slice(-5)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'student',
      accountStatus: 'active',
      profile: {
        address: data.address || '',
        idType: data.idType || 'Aadhaar Card',
        idNumber: data.idNumber || 'PENDING-VERIFY',
        idDocumentRef: data.idFileName ? `private/docs/${data.idFileName}` : 'private/docs/uploaded_id.pdf',
        verificationStatus: 'verified',
        registeredAt: new Date().toISOString().split('T')[0]
      }
    };

    const existingUsers = JSON.parse(localStorage.getItem('athena_all_users') || '[]');
    localStorage.setItem('athena_all_users', JSON.stringify([...existingUsers, newStudent]));
    setUser(newStudent);
    return { success: true, user: newStudent };
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoRole = (role) => {
    if (role === 'admin') {
      setUser(INITIAL_USERS[0]);
    } else {
      setUser(INITIAL_USERS[1]);
    }
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => {
      const next = {
        ...prev,
        ...updatedFields,
        profile: {
          ...prev?.profile,
          ...updatedFields.profile
        }
      };
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      switchDemoRole,
      updateProfile,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isStudent: user?.role === 'student'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
