export const isAuthenticated = ():boolean => {

    return !!localStorage.getItem('token');
}


export default isAuthenticated