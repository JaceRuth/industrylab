export type UserType = 'admin' | 'editor' | 'viewer';

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
        userType: 'editor',
    };
}

// TO DO: Make this permissions make sense. 
const permissionsByPage: Record<string, Record<UserType, Permission>> = {
    'inventory': {
      admin: { canRead: true, canWrite: true, canExecute: true },
      editor: { canRead: true, canWrite: true, canExecute: true },
      viewer: { canRead: true, canWrite: true, canExecute: true },
    },
  };


export class MockAuthService {
  private currentUser = getCurrentUser();

  login(user: User) {
    this.currentUser = user;
  }

  getPermissions(page: string): Permission {
    if (!this.currentUser || page === '') {
      return { canRead: false, canWrite: false, canExecute: false };
    }
  
    const userType = this.currentUser.userType as UserType; 
    return permissionsByPage[page][userType];
  }

  
}
