document.addEventListener('x.users.index', function (e) {
    const users = e.detail.users;
    const url = '/users/' + (users.length > 0 ? users[0].id : 0);

    axios({
        method: 'GET',
        url: url,
    }).then(function (response) {
        const user = response.data;
        console.log(`User: Id=${user.id}; Name=${user.name}`);
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
});