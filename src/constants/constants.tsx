// En tu archivo constText.ts
export const constText = {
        termsAndConditions: (
            <div>
                <div className={"mb-4"}>
                    <p><strong>Aceptación de los Términos:</strong> Al utilizar la Aplicación, usted acepta cumplir y
                        quedar sujeto a estos Términos.
                    </p>
                </div>
                <div className={"mb-4"}>
                    <p><strong>Propiedad de la Aplicación:</strong> La Aplicación es propiedad de [nombre de la
                        empresa],
                        una empresa registrada en [país]. Todos los derechos sobre la Aplicación están reservados y
                        pertenecen a la Empresa.
                    </p>
                </div>
                <div className={"mb-4"}>
                    <p><strong>Propósito de la Aplicación:</strong> La Aplicación tiene como propósito principal crear
                        una red de usuarios capaces de ofrecer asistencia y socorro hacia usuarios que hayan sufrido
                        algún accidente. Además, la Aplicación generará zonas con altos o bajos niveles de accidentes
                        para fomentar un entorno más seguro y tranquilo.
                    </p>
                </div>
                <div className={"mb-4"}>
                    <p><strong>Uso de la Información:</strong> Al utilizar la Aplicación, usted acepta que la
                        información proporcionada, incluidos los datos de ubicación, pueda ser utilizada para generar
                        mapas de zonas con altos o bajos niveles de accidentes. Esta información se utilizará
                        exclusivamente con fines de seguridad y análisis estadístico, y no será compartida con
                        terceros sin su consentimiento.
                    </p>
                </div>
                <div className={"mb-4"}>
                    <p><strong>Responsabilidad del Usuario:</strong> Usted acepta utilizar la Aplicación de manera
                        responsable y ética. La Aplicación no debe ser utilizada para realizar actividades ilegales o
                        perjudiciales para otros usuarios o terceros.
                    </p>
                </div>
                <div className={"mb-4"}>
                    <p><strong>Responsabilidad de la Empresa:</strong> La Empresa hará todo lo posible para garantizar
                        la precisión y confiabilidad de la información proporcionada por la Aplicación, pero no se hace
                        responsable de ningún error, omisión o inexactitud en los datos.
                    </p>
                </div>
                <div className={"mb-4"}>
                    <p><strong>Privacidad:</strong> La privacidad de nuestros usuarios es importante para nosotros. Por
                        favor, consulte nuestra Política de Privacidad para obtener información sobre cómo recopilamos,
                        utilizamos y protegemos sus datos personales.
                    </p>
                </div>
                <div className={"mb-4"}>
                    <p><strong>Modificaciones de los Términos:</strong> Nos reservamos el derecho de modificar estos
                        Términos en cualquier momento y sin previo aviso. Le recomendamos que revise periódicamente
                        estos Términos para estar al tanto de cualquier cambio. El uso continuado de la Aplicación
                        después de la publicación de los cambios constituirá su aceptación de los mismos.
                    </p>
                </div>
                <div className={"mb-4"}>
                    <p><strong>Legislación Aplicable:</strong> Estos Términos se rigen por las leyes de [país], sin
                        tener en cuenta sus disposiciones sobre conflictos de leyes.
                    </p>
                </div>
            </div>
        )
};

export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
