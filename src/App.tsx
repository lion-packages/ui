import "./assets/css/index.css";
import "./assets/css/custom.css";

import "./assets/css/buttons/buttons-android.css";
import "./assets/css/buttons/buttons-ios.css";
import "./assets/css/buttons/buttons-web.css";

import "./assets/css/inputs/inputs-android.css";
import "./assets/css/inputs/inputs-ios.css";
import "./assets/css/inputs/inputs-bootstrap.css";

import "./assets/css/modals/modals.css";

import "./assets/css/loadings/loadings-bar.css";

import { Fragment } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import { LionUIComponentsProvider } from "./context/LionUIComponentsContext.tsx";
import Header from "./features/Header.tsx";
import ButtonsSection from "./features/buttons/ButtonsSection.tsx";
import ButtonsAndroidSection from "./features/buttons/components/ButtonsAndroidSection.tsx";
import ButtonsIOSSection from "./features/buttons/components/ButtonsIOSSection.tsx";
import ButtonsBootstrapSection from "./features/buttons/components/ButtonsBootstrapSection.tsx";
import ButtonsCustomSection from "./features/buttons/components/ButtonsCustomSection.tsx";
import InputsSection from "./features/inputs/InputsSection.tsx";
import InputsAndroidSection from "./features/inputs/components/InputsAndroidSection.tsx";
import InputsIOSSection from "./features/inputs/components/InputsIOSSection.tsx";
import InputsBootstrapSection from "./features/inputs/components/InputsBootstrapSection.tsx";
import ModalsSection from "./features/modals/ModalsSection.tsx";
import ModalsAndroidSection from "./features/modals/components/ModalsAndroidSection.tsx";
import ModalsIOSSection from "./features/modals/components/ModalsIOSSection.tsx";
import ModalsWebSection from "./features/modals/components/ModalsWebSection.tsx";
import LoadingSection from "./features/loadings/LoadingSection.tsx";
import LoadingBarSection from "./features/loadings/components/LoadingBarSection.tsx";
import InputsCustomSection from "./features/inputs/components/InputsCustomSection.tsx";
import SelectsAndroidSection from "./features/selects/components/SelectsAndroidSection.tsx";
import SelectsIOSSection from "./features/selects/components/SelectIOSSection.tsx";
import SelectsBootstrapSection from "./features/selects/components/SelectBootstrapSection.tsx";
import SelectsCustomSection from "./features/selects/components/SelectsCustomSection.tsx";

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

                        <Route path={"inputs"} element={<InputsSection />}>
                            <Route path={"custom"} element={<InputsCustomSection />} />

                            <Route path={"android"} element={<InputsAndroidSection />} />

                            <Route path={"ios"} element={<InputsIOSSection />} />

                            <Route path={"web"} element={<InputsBootstrapSection />} />
                        </Route>

                        <Route path={"selects"} element={<InputsSection />}>
                            <Route path={"custom"} element={<SelectsCustomSection />} />

                            <Route path={"android"} element={<SelectsAndroidSection />} />

                            <Route path={"ios"} element={<SelectsIOSSection />} />

                            <Route path={"web"} element={<SelectsBootstrapSection />} />
                        </Route>

                        <Route path={"modals"} element={<ModalsSection />}>
                            <Route path={"android"} element={<ModalsAndroidSection />} />

                            <Route path={"ios"} element={<ModalsIOSSection />} />

                            <Route path={"web"} element={<ModalsWebSection />} />
                        </Route>

                        <Route path={"loadings"} element={<LoadingSection />}>
                            <Route path={"bar"} element={<LoadingBarSection />} />
                        </Route>
                    </Routes>
                </LionUIComponentsProvider>
            </Container>
        </Fragment>
    );
}