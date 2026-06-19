import axios from "axios"
import { useEffect, useState } from "react"

const AddUser=()=>{

    const[name, setName] = useState()
    const[email, setEmail] = useState()
    const[phone, setPhone] = useState()
    const[companyName, setCompanyName] = useState()
    const[successMsg, setSuccessMsg] = useState()

    const postApi = "https://jsonplaceholder.typicode.com/users"
    const postUser=async(e)=>{
        e.preventDefault()
        try{
            let body={
                name:name,
                email:email,
                phone:phone,
                company:{
                    name:companyName
                }
            }
            const response = await axios.post(postApi)
            setSuccessMsg("User added successfully!")
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Add User
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e)=>postUser(e)}>
                                    {
                                    successMsg!==undefined?<div className="alert alert-primary">
                                        {successMsg}
                                    </div> : ""
                                }
                                    <div className="mb-4">
                                        <label>Name</label>
                                        <input type="text" className="form-control" 
                                        onChange={(e)=>setName(e.target.value)}/>
                                    </div>
                                    <div className="mb-4">
                                        <label>Email</label>
                                        <input type="text" className="form-control" 
                                        onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                    <div className="mb-4">
                                        <label>Phone</label>
                                        <input type="text" className="form-control" 
                                        onChange={(e)=>setPhone(e.target.value)}/>
                                    </div>
                                    <div className="mb-4">
                                        <label>CompanyName</label>
                                        <input type="text" className="form-control" 
                                        onChange={(e)=>setCompanyName(e.target.value)}/>
                                    </div>
                                    <div className="mb-4">
                                        <input type="submit" value="Add" className="btn btn-primary"/>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row-sm-3"></div>
                </div>
            </div>

        </div>
    )
}

export default AddUser