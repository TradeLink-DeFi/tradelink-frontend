
const parseJwt = (accessToken: string) => {
    try {
        return JSON.parse(atob(accessToken.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const isTokenExpired = (accessToken: string) => {
    try {
        const decodedToken = parseJwt(accessToken);
        if (decodedToken && decodedToken.exp) {
            return decodedToken.exp * 1000 < Date.now();
        }
        return false;
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return true;
    }
};