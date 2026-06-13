function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer__grid">
        <div className="landing-footer__col">
          <p className="landing-footer__brand">Real estat website</p>
          <p className="landing-footer__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi</p>
        </div>

        <div className="landing-footer__col">
          <h4>Company</h4>
          <p>About us</p>
          <p>Why choose us</p>
          <p>Testimonial</p>
        </div>

        <div className="landing-footer__col">
          <h4>Resources</h4>
          <p>Privacy Policy</p>
          <p>Terms & Condition</p>
          <p>Contact us</p>
        </div>

        <div className="landing-footer__col landing-footer__col--social">
          <h4 className="landing-footer__follow">Follow us</h4>
          <div className="landing-footer__social-list">
            <a href="#" className="landing-footer__social-link" aria-label="YouTube">
              <img src="/assets/footer-youtube.png" alt="" aria-hidden />
              You tube
            </a>
            <a href="#" className="landing-footer__social-link" aria-label="Instagram">
              <img
                className="landing-footer__social-icon landing-footer__social-icon--instagram"
                src="/assets/footer-instagram.png"
                alt=""
                aria-hidden
              />
              Instagram
            </a>
            <a href="#" className="landing-footer__social-link" aria-label="Facebook">
              <img src="/assets/footer-facebook.png" alt="" aria-hidden />
              Facebook
            </a>
          </div>
        </div>

        <div className="landing-footer__col">
          <h4>Find us</h4>
          <a href="#" className="landing-footer__store-link" aria-label="Download on the App Store">
            <img src="/assets/footer-app-store.png" alt="" className="landing-footer__store landing-footer__store--apple" />
          </a>
          <a href="#" className="landing-footer__store-link" aria-label="Get it on Google Play">
            <img src="/assets/footer-google-play.png" alt="" className="landing-footer__store landing-footer__store--google" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
