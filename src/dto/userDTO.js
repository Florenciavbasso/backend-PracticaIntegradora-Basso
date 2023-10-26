class UserDTO {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }
}

export default UserDTO;