import { userDataType } from "../hooks/useAuth";


// Abilities and Roles Authorization ////
// Assign roles to an Ability method ////

const canRead = (user: userDataType): boolean => {
    const allowed = ['admin', 'manager', 'developer'];
    return checkAuthorization(user, allowed);
}

const canEdit = (user: userDataType): boolean => {
   const allowed = ['admin', 'manager'] 
    return checkAuthorization(user, allowed);
}









// determines if user has matcing roles


const checkAuthorization = (user: userDataType, allowedRoles: string[]): boolean => {
    if (!user) return false;
    for (const role of allowedRoles) {
        if (user.roles[role]) {
            return true;
        }
    }
    return false;
}
