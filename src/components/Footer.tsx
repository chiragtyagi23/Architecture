function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer__grid">
        <div className="landing-footer__col">
          <p className="landing-footer__brand">Real estat website</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi</p>
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

        <div className="landing-footer__col">
          <h4>Follow us</h4>
          <a href="#">You tube</a>
          <br />
          <a href="#">Instagram</a>
          <br />
          <a href="#">Facebook</a>
        </div>

        <div className="landing-footer__col">
          <h4>Find us</h4>
          <img src="https://placehold.co/119x34" alt="Store button one" style={{ marginBottom: '0.5rem' }} />
          <img src="https://placehold.co/121x35" alt="Store button two" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
