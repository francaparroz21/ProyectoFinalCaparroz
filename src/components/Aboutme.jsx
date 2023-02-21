import { Footer } from "./Footer"

export const Aboutme = () => {
    return (
        <div>
            <main className="main-home">
                <section className="container">
                    <div className="intro">
                        <p>La estetica Bossy ofrece de las manos de los/las mejores especialistas, una amplia variedad de
                            terapias,
                            tratamientos y masajes de embellecimiento tanto corporales como faciales, ofrecemos una gran
                            cantidad de
                            productos para asesorar a nuestros clientes de la mejor linea <a href="https://idraetgroup.com/?gclid=Cj0KCQjw166aBhDEARIsAMEyZh6iwiQcJbNua7fvX7TcPgXoqKWANvligBEkQJWTMDLKDtH5ZAWx_gUaAtiVEALw_wcB">Idraet</a>.
                        </p>
                    </div>
                    <article className="makeupContainer">
                        <div className="publication_makeup_intro">
                            <h2>Makeup Natural</h2>
                            <span>Importante: siempre limpiar e hidratar la piel antes de maquillar para lucir
                                natural✨</span>
                        </div>
                        <div className="publication_makeup_steps">
                            <div className="steps">
                                <h3>3 PASOS DE LIMPIEZA</h3>
                                <ul>
                                    <li>Leche de limpieza</li>
                                    <li>Tónico hidratante</li>
                                    <li>Crema hidratante</li>
                                </ul>
                            </div>
                            <div className="steps">
                                <h3>3 PASOS PARA MAQUILLAJE</h3>
                                <ul>
                                    <li>Base (tono del color de la piel)</li>
                                    <li>Corrector</li>
                                    <li>Polvo volátil</li>
                                </ul>
                            </div>
                        </div>
                        <p className="since">Since 2019</p>
                    </article>
                    <div className="homeImages">
                        <div className="makeupMe">
                            <img src={process.env.PUBLIC_URL + "/images/makeup_me.PNG"} alt="me" />
                        </div>
                        <div className="makeupPhoto">
                            <img src={process.env.PUBLIC_URL + "/images/makeup_photo.PNG"} alt="makeup" />
                        </div>
                        <div className="banner">
                            <img src={process.env.PUBLIC_URL + "/images/banner.png"} alt="banner" />

                        </div>
                    </div>
                </section>
            </main>
            <Footer className="footer-home" />
        </div>
    )
}