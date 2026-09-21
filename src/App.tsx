import "./assets/index.css";
import "./assets/custom.css";
import "./assets/buttons/buttons-android.css";
import "./assets/buttons/buttons-ios.css";
import "./assets/buttons/buttons-web.css";

import {Fragment} from "react";
import {Container} from "react-bootstrap";
import {Routes, Route} from 'react-router-dom';
import {LionUIComponentsProvider} from "./context/LionUIComponentsContext.tsx";
import Header from "./features/Header.tsx";
import ButtonsSection from "./features/buttons/ButtonsSection.tsx";
import ButtonsAndroidSection from "./features/buttons/components/ButtonsAndroidSection.tsx";
import ButtonsIOSSection from "./features/buttons/components/ButtonsIOSSection.tsx";
import ButtonsBootstrapSection from "./features/buttons/components/ButtonsBootstrapSection.tsx";
import ButtonsCustomSection from "./features/buttons/components/ButtonsCustomSection.tsx";

export default function App() {
    return (
        <Fragment>
            <Header />

            <Container className={"py-2"}>
                <LionUIComponentsProvider>
                    <Routes>
                        <Route path={"/"} element={<h1>Explore the page.</h1>} />

                        <Route path={"buttons"} element={<ButtonsSection />}>
                            <Route path={"custom"} element={<ButtonsCustomSection />} />

                            <Route path={"android"} element={<ButtonsAndroidSection />} />

                            <Route path={"ios"} element={<ButtonsIOSSection />} />

                            <Route path={"web"} element={<ButtonsBootstrapSection />} />
                        </Route>
                    </Routes>
                </LionUIComponentsProvider>
            </Container>
        </Fragment>
    );
}