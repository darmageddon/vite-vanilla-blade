import axios from "axios";

(function () {
    // destructure objects
    const { users } = ComponentData;

    const getUserById = (id) => {
        const url = '/users/' + id;
        return axios.get(url);
    }

    const getUsers = () => {
        const usersRequests = users.map(user => getUserById(user.id));

        Promise.all(usersRequests)
            .then(function (results) {
                results.forEach(response => {
                    const user = response.data;
                    console.log(`User: Id=${user.id}; Name=${user.name}`);
                });
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }).then(function () {
                console.log('Done.');
            });
    }

    // IIFE (Immediately Invoked Function Expression)
    (function () {

        getUsers();

    })();
})();