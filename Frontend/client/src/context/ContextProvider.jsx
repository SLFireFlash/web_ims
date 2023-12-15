import { createContext, useState,useContext } from "react";


const StateContext = createContext({
    currentUser: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
  })

export const ContextProvider = ({children}) => {

    //dev only
    // const [user, setUser] = useState("Lahiru");
    // const [token, _setToken] = useState(123);

    //prod
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [user, setUser] = useState({});

    const setToken = (token) => {
        _setToken(token)
        if (token) {
          localStorage.setItem('ACCESS_TOKEN', token);
        } else {
          localStorage.removeItem('ACCESS_TOKEN');
        }
      }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
    }}>
      {children}
    </StateContext.Provider>
  );

}
export const useStateContext = () => useContext(StateContext);