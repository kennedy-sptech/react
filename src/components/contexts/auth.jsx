import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate(); 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const ra = window.sessionStorage.ra_usuario;

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        if(recoveredUser){
            setUser(JSON.parse(recoveredUser));
        }

        setLoading(false);
    }, []);

    const login = (ra, senha) => {
        console.log("login", { ra, senha });

        const loggedUser = 
            axios.post("https://sptechforum-backend.azurewebsites.net/usuarios", {
                ra: document.getElementById("input-ra").value,
                senha: document.getElementById("input-senha").value,
              });
        

        localStorage.setItem("user", JSON.stringify(loggedUser));

            if (senha === document.getElementById("input-senha").value){
                setUser(loggedUser);
                  navigate("/home");
            }

    }

    function logout(){
        

   
        axios.delete(`https://sptechforum-backend.azurewebsites.net/usuarios?ra=${ra}`)
        .then((respostaObtida) => {
          console.log("Apagando autenticação do usuário: ");
          console.log(respostaObtida.data);
          console.log("logout")
        setUser(null);
        localStorage.removeItem('user');
        sessionStorage.clear();
        sessionStorage.removeItem('user');
        navigate("/");
        console.log("testeeeeeeeeee");
        })
        .catch((erroOcorrido) => {
          console.log("Não foi possivel deslogar!");
          console.log(erroOcorrido);
        });
    }

    // const logout = () => {
    //     console.log("logout")
    //     setUser(null);
    //     localStorage.removeItem('user');
    //     sessionStorage.clear();

    //     const objetoFormatado = {
    //         ra: ra
    //       };

    //     api
    //     .delete("/usuarios", objetoFormatado)
    //     .then((respostaObtida) => {
    //       console.log("Apagando autenticação do usuário: ");
    //       console.log(respostaObtida.data);
    //       //sessionStorage.removeItem('user');
    //     //navigate("/");
    //     console.log("testeeeeeeeeee");
    //     })
    //     .catch((erroOcorrido) => {
    //       console.log("Não foi possivel deslogar!");
    //       console.log(erroOcorrido);
    //     });
            
    // }


    return (
        <AuthContext.Provider value={{
            authenticated:
                !!user, user, loading, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}