import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

const UserList = () => {

    const [users, setUsers] = useState([])
    const api = "https://jsonplaceholder.typicode.com/users"
    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(api)
                console.log(response.data)
                setUsers(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getUsers()

    }, [])

    const deleteUser = async (id) => {
        const deleteApi = `https://jsonplaceholder.typicode.com/users/${id}`

        try {
            await axios.delete(deleteApi)

            const del = users.filter(user =>
                user.id !== id
            )
            setUsers(del)
        }
        catch (err) { err }

    }
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.company.name}</td>
                                <td>
                                    <button className="btn btn-danger"
                                        onClick={() => deleteUser(user.id)}>
                                        Delete User
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>

        </div>
    )
}

export default UserList