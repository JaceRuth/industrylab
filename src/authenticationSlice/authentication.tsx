// MockAuthService.ts
export type UserType = 'admin' | 'editor' | 'viewer' | 'guest';

export interface Permission {
  canRead: boolean;
  canWrite: boolean;
  canExecute: boolean;
}

export interface User {
  id: string;
  name: string;
  userType: UserType;
}

const getCurrentUser = () => {
    return {
        id: '1',
        name: 'John Doe',
        userType: 'admin',
    };
}


const permissionsByPage: Record<string, Record<UserType, Permission>> = {
    'inventory': {
      admin: { canRead: true, canWrite: true, canExecute: true },
      editor: { canRead: true, canWrite: true, canExecute: false },
      viewer: { canRead: true, canWrite: false, canExecute: false },
      guest: { canRead: false, canWrite: false, canExecute: false },
    },
  };


export class MockAuthService {
  private currentUser = getCurrentUser();

  // Simulates a login operation
  login(user: User) {
    this.currentUser = user;
  }


  getPermissions(page: string): Permission {
    if (!this.currentUser || page === '') {
      return { canRead: false, canWrite: false, canExecute: false };
    }
  
    const userType = this.currentUser.userType as UserType; // Explicitly assert type
    return permissionsByPage[page][userType];
  }
}
