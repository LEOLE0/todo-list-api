import React from 'react';
import GlobalStyle from './GlobalStyles';
import ToDoPage from './pages/ToDoPage';

function App() {
    return (
        <div className="App">
            <GlobalStyle />
            <ToDoPage />
        </div>
    );
}

export default App;