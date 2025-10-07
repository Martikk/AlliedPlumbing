function Services() {
  return (
    <section className="prose max-w-none">
      <h1>Services</h1>
      <ul>
        <li><Link to="/services/residential-plumbing">Residential Plumbing</Link></li>
        <li><Link to="/services/commercial-plumbing">Commercial & Institutional Plumbing</Link></li>
        <li><Link to="/services/hvac">HVAC (RTU, MUA, AHU, Heat Pumps, VRF)</Link></li>
        <li><Link to="/services/boilers">Boiler Plants & Controls</Link></li>
        <li><Link to="/services/maintenance">Preventive Maintenance Programs</Link></li>
        <li><Link to="/services/emergency">24/7 Emergency Service</Link></li>
      </ul>
    </section>
  );
}