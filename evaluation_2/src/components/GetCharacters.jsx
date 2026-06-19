import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCharacters } from "../store/action/CharacterAction"

const GetCharacters = () => {

    
    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(20)
    const [array, setArray] = useState([])
    let count = 0

    const { characters, totalPages } = useSelector(
    state => state.characters
    )

    const dispatch = useDispatch()

    
    useEffect(() => {
    dispatch(getAllCharacters(currentPage))
    
}, [currentPage])
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Species</th>
                        <th scope="col">Origin</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        characters.map((character, index) => (
                            <tr key={index}>
                                <th scope="row">{(index+1) + (currentPage * size)}</th>
                                <td>{character.name}</td>
                                <td>{character.status}</td>
                                <td>{character.species}</td>
                                <td>{character.origin.name}</td>
                                <td>{character.location.name}</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>
                    {
                        Array.from({ length: totalPages }).map((_, index) => (
                            <li className="page-item" key={index}>
                                <button className="page-link" onClick={() => setCurrentPage(index)}>{count = count + 1}</button>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <button className="page-link" disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>


                </ul>
            </nav>

        </div>
    )
}

export default GetCharacters
