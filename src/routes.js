import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './screens/home';
import CreateScreen from './screens/createscreen';
import NotesScreen from './screens/notesscreen';
import EditScreen from './screens/editscreen';
import VerMaisScreen from './screens/vermaisscreen';

function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element= {<Home/>}></Route>
                <Route exact path='/create' element= {<CreateScreen/>}></Route>
                <Route exact path='/notes' element= {<NotesScreen/>}></Route>
                <Route exact path='/edit/:id' element= {<EditScreen/>}></Route>
                <Route exact path="/vermais/:id" element={<VerMaisScreen/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;