import Header from "./components/Header/Header.tsx";
import './styles/index.css'
import CardUsers from "./components/Users/CardUsers.tsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.tsx";

function App() {

    return (
            <>
            <Header/>
                <div className='main-container'>
            <CardUsers/>
            <RegisterForm/>
                </div>
           </>
    )
}

export default App
