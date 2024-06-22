import { createContext, useState } from "react";

const UserType = createContext()

const UserContext = ({children}) => {
    const [id, setId] = useState("")

    return <UserType.Provider value={{ id, setId}}>
        {children}
    </UserType.Provider>
}

export {UserType, UserContext}
