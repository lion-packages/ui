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
import "./assets/css/loadings/loadings-app.css";
import "./assets/css/tables/datatables.css";
import "./assets/css/titles/title.css";

import { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLionUI } from "./context/LionUIComponentsContext.tsx";
import { PlatformTypes } from "./types/PlatformTypes.tsx";
import Header from "./features/Header.tsx";
import ButtonsSection from "./features/buttons/ButtonsSection.tsx";
import ButtonsAndroidSection from "./features/buttons/components/ButtonsAndroidSection.tsx";
import ButtonsIOSSection from "./features/buttons/components/ButtonsIOSSection.tsx";
import ButtonsBootstrapSection from "./features/buttons/components/ButtonsBootstrapSection.tsx";
import InputsSection from "./features/inputs/InputsSection.tsx";
import InputsAndroidSection from "./features/inputs/components/InputsAndroidSection.tsx";
import InputsIOSSection from "./features/inputs/components/InputsIOSSection.tsx";
import InputsBootstrapSection from "./features/inputs/components/InputsBootstrapSection.tsx";
import ModalsSection from "./features/modals/ModalsSection.tsx";
import LoadingsAppSection from "./features/loadings/LoadingApp/LoadingsAppSection.tsx";
import LoadingsBarSection from "./features/loadings/LoadingBar/LoadingsBarSection.tsx";
import SelectsAndroidSection from "./features/selects/components/SelectsAndroidSection.tsx";
import SelectsIOSSection from "./features/selects/components/SelectIOSSection.tsx";
import SelectsBootstrapSection from "./features/selects/components/SelectBootstrapSection.tsx";
import DataTablesSection from "./features/tables/DataTablesSection.tsx";
import LionTitlesSection from "./features/titles/title/LionTitlesSection.tsx";
import TextareaSection from "./features/textarea/TextareaSection.tsx";
import TextareasAndroidSection from "./features/textarea/components/TextareasAndroidSection.tsx";
import TextareasIOSSection from "./features/textarea/components/TextareasIOSSection.tsx";
import TextareasBootstrapSection from "./features/textarea/components/TextareasBootstrapSection.tsx";
import GetStarted from "./features/GetStarted.tsx";

export default function App() {
    const { pathname } = useLocation();
    const { updateState } = useLionUI();

    useEffect(() => {
        updateState({ platform: PlatformTypes.WEB });
    }, [pathname]);

    return (
        <Fragment>
            <Header />

            <Container className={"py-2"}>
                <Routes>
                    <Route path={"/"} element={<GetStarted />} />

                    <Route path={"buttons"} element={<ButtonsSection />}>
                        <Route path={PlatformTypes.ANDROID} element={<ButtonsAndroidSection />} />

                        <Route path={PlatformTypes.IOS} element={<ButtonsIOSSection />} />

                        <Route path={PlatformTypes.WEB} element={<ButtonsBootstrapSection />} />
                    </Route>

                    <Route path={"inputs"} element={<InputsSection />}>
                        <Route path={PlatformTypes.ANDROID} element={<InputsAndroidSection />} />

                        <Route path={PlatformTypes.IOS} element={<InputsIOSSection />} />

                        <Route path={PlatformTypes.WEB} element={<InputsBootstrapSection />} />
                    </Route>

                    <Route path={"textarea"} element={<TextareaSection />}>
                        <Route path={PlatformTypes.ANDROID} element={<TextareasAndroidSection />} />

                        <Route path={PlatformTypes.IOS} element={<TextareasIOSSection />} />

                        <Route path={PlatformTypes.WEB} element={<TextareasBootstrapSection />} />
                    </Route>

                    <Route path={"selects"} element={<InputsSection />}>
                        <Route path={PlatformTypes.ANDROID} element={<SelectsAndroidSection />} />

                        <Route path={PlatformTypes.IOS} element={<SelectsIOSSection />} />

                        <Route path={PlatformTypes.WEB} element={<SelectsBootstrapSection />} />
                    </Route>

                    <Route path={"modals"} element={<ModalsSection />} />

                    <Route path={"loadings"}>
                        <Route path={"app"} element={<LoadingsAppSection />} />

                        <Route path={"bar"} element={<LoadingsBarSection />} />
                    </Route>

                    <Route path={"tables"} element={<DataTablesSection />} />

                    <Route path={"titles"} element={<LionTitlesSection />} />
                </Routes>
            </Container>
        </Fragment>
    );
}