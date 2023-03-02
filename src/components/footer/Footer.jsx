import "./footer.css"

export const Footer = (props) =>{
    const urlImgs = ["email_logo.png","logo_instagram.jpg","facebook_logo.png"]

    return(
        <footer className={props.className}>
            <div><a className="email_logo" href="https://mail.google.com/"><img src={process.env.PUBLIC_URL + "/images/" +urlImgs[0] } alt="" /></a></div>
            <div><a className="instagram_logo" href="https://www.instagram.com/bossy.skincare/"><img src={process.env.PUBLIC_URL + "/images/" +urlImgs[1]} alt="" /></a></div>
            <div><a className="facebook_logo" href="https://www.facebook.com/"><img src={process.env.PUBLIC_URL + "/images/" +urlImgs[2]} alt="" /></a></div>
        </footer>
    )
}