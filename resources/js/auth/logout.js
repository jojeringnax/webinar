export const logout = () => {
    let appState = {
        isLoggedIn: false,
        user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
};