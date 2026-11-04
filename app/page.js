
import styles from "./page.module.css";

const services = [
  { icon: "❄️", name: "AC Repair", desc: "AC servicing, cooling problems and installation." },
  { icon: "🧊", name: "Fridge Repair", desc: "Refrigerator cooling, gas filling and repair." },
  { icon: "🧺", name: "Washing Machine", desc: "Repair for front load and top load machines." },
  { icon: "🍽️", name: "Microwave Repair", desc: "Microwave heating and electrical problems." },
  { icon: "💧", name: "RO & Water Purifier", desc: "RO servicing, filter change and maintenance." },
  { icon: "🔥", name: "Geyser Repair", desc: "Geyser installation and heating problems." },
  { icon: "📺", name: "TV Repair", desc: "LED and Smart TV repair services." },
  { icon: "🌬️", name: "Chimney Repair", desc: "Kitchen chimney cleaning and servicing." },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <a href="#" className={styles.logo}>
          Power<span>Supply.</span>
        </a>

        <div className={styles.navLinks}>
          <a href="#">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="/track">Track My Booking</a>
        </div>

       <a href="/booking" className={styles.navButton}>
  Book Service
</a>
      </nav>

      <section className={styles.hero}>
        <div>
          <p className={styles.tag}>YOUR TRUSTED REPAIR PARTNER</p>

          <h1>
            Expert Home Appliance
            <span> Repair Services</span>
          </h1>

          <p className={styles.heroText}>
            Fast, reliable and affordable repair services for your home
            appliances. We help keep your home running smoothly.
          </p>

          <div className={styles.heroButtons}>
            <a href="#services" className={styles.primaryBtn}>
              Explore Services
            </a>
            <a href="#contact" className={styles.secondaryBtn}>
              Contact Us
            </a>
          </div>

          <div className={styles.stats}>
            <div><strong>500+</strong><small>Happy Customers</small></div>
            <div><strong>8+</strong><small>Repair Services</small></div>
            <div><strong>24/7</strong><small>Support</small></div>
          </div>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.imageCard}>
            <div className={styles.imageIcon}>🛠️</div>
            <h3>Professional Repair Team</h3>
            <p>Quality service at your doorstep</p>
          </div>
        </div>
      </section>

      <div className={styles.trustBar}>
        <span>✓ Trusted Technicians</span>
        <span>✓ Affordable Pricing</span>
        <span>✓ Quick Service</span>
        <span>✓ Customer Support</span>
      </div>

      <section id="services" className={styles.services}>
        <div className={styles.sectionHeading}>
          <p className={styles.tag}>WHAT WE REPAIR</p>
          <h2>Our Repair Services</h2>
          <p>Professional solutions for all your home appliances.</p>
        </div>

        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <div className={styles.serviceCard} key={service.name}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3>{service.name}</h3>
              <p>{service.desc}</p>
              <a href="#contact">Book Now →</a>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className={styles.about}>
        <div>
          <p className={styles.tag}>ABOUT POWER SUPPLY</p>
          <h2>We Make Appliance Repair Easy</h2>
          <p>
            Power Supply provides convenient home appliance repair services.
            Our goal is to deliver dependable service and customer satisfaction.
          </p>
        </div>

        <div className={styles.features}>
          <div>✓ <strong>Experienced Technicians</strong></div>
          <div>✓ <strong>Reliable Repair Solutions</strong></div>
          <div>✓ <strong>Convenient Home Service</strong></div>
          <div>✓ <strong>Customer Satisfaction</strong></div>
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <p className={styles.tag}>NEED A REPAIR?</p>
        <h2>Let Us Fix It For You!</h2>
        <p>Contact our team to discuss your appliance repair needs.</p>
        <a href="mailto:info@powersupply.com" className={styles.primaryBtn}>
          Contact Us
        </a>
      </section>

      <footer className={styles.footer}>
        <h2>Power<span>Supply.</span></h2>
        <p>Reliable Home Appliance Repair Services</p>
        <p>© 2026 Power Supply. All rights reserved.</p>
      </footer>
    </main>
  );
}
