import Header from "./components/Header/Header.tsx";
import './styles/index.css'
import CardUsers from "./components/Users/CardUsers.tsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.tsx";
import './styles/index.css'

function App() {

    return (
            <>
            <Header/>
                <div className='MainContainer'>
            <CardUsers/>
            <RegisterForm/>
                </div>
           </>
    )
}

export default App
