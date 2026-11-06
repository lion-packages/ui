import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { LionUIComponentsProvider } from "./context/LionUIComponentsContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <LionUIComponentsProvider>
            <App />
        </LionUIComponentsProvider>
    </BrowserRouter>,
)