import React from "react";
import Container from "./Container";
import Header from "./Header";
import TitleSection from "./TitleSection";

const LoadingInfo = () => {
    return (
        <Container>
            <TitleSection>
                Perfil
            </TitleSection>
            <div className="flex flex-col items-center">
                <p>Carregando informações...</p>
            </div>
        </Container>
    )
}

export default LoadingInfo;