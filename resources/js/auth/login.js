export const login = (email, password) => {
    $("#login-form button")
        .attr("disabled", "disabled")
        .html(
            '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
        );
    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
        .post("http://localhost:8000/api/user/login/", formData)
        .then(response => {
            return response;
        })
        .then(json => {
            if (json.data.success) {
                alert("Login Successful!");

                let userData = {
                    name: json.data.data.name,
                    id: json.data.data.id,
                    email: json.data.data.email,
                    auth_token: json.data.data.auth_token,
                    timestamp: new Date().toString()
                };
                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                // save app state with user date in local storage
                localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user
                });
            } else alert("Login Failed!");

            $("#login-form button")
                .removeAttr("disabled")
                .html("Login");
        })
        .catch(error => {
            alert(`An Error Occured! ${error}`);
            $("#login-form button")
                .removeAttr("disabled")
                .html("Login");
        });
};