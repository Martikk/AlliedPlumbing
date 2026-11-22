/** The six services, in one place. The header dropdown (C-04), the services
 *  grid (D-02) and the enquiry form's Service select (H-01) all read this, so
 *  they can never drift apart. */

export type ServiceKey =
  | 'hvac'
  | 'boilers'
  | 'commercial-plumbing'
  | 'maintenance'
  | 'emergency'
  | 'residential-plumbing';

export type ServiceLink = {
  key: ServiceKey;
  to: string;
  /** Navigation and form label. */
  label: string;
  /** One line for the services grid. */
  summary: string;
  image: string;
};

export const SERVICE_LINKS: ServiceLink[] = [
  {
    key: 'hvac',
    to: '/services/hvac',
    label: 'HVAC and ventilation',
    summary: 'RTU, MUA, AHU, unit ventilators, heat pumps and VRF, with DDC integration.',
    image:
      'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065876/Allied/3_gk4dl8.png',
  },
  {
    key: 'boilers',
    to: '/services/boilers',
    label: 'Heating and boiler plants',
    summary: 'Condensing boilers, burners, VFD pumps, heat exchangers, safety and controls.',
    image:
      'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068155/Allied/10_kubptf.png',
  },
  {
    key: 'commercial-plumbing',
    to: '/services/commercial-plumbing',
    label: 'Commercial and institutional plumbing',
    summary: 'Backflows, PRVs, booster pumps, DHW plants and tenant improvements.',
    image:
      'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760065875/Allied/1_tc9jiy.png',
  },
  {
    key: 'maintenance',
    to: '/services/maintenance',
    label: 'Preventive maintenance',
    summary: 'Monthly, quarterly and annual programs with trend reviews, DDC checks and reporting.',
    image:
      'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760069670/Allied/maintance_grwetv.png',
  },
  {
    key: 'emergency',
    to: '/services/emergency',
    label: '24/7 emergency service',
    summary: 'No heat, leaks, floods and plant failures — answered around the clock.',
    image:
      'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068155/Allied/11_r4dgo3.png',
  },
  {
    key: 'residential-plumbing',
    to: '/services/residential-plumbing',
    label: 'Residential plumbing',
    summary: 'Repairs, fixture replacements, rough-ins, repipes and water heaters.',
    image:
      'https://res.cloudinary.com/dzytbkc5l/image/upload/v1760068156/Allied/14_urnogx.png',
  },
];

export const SERVICE_BY_KEY = Object.fromEntries(
  SERVICE_LINKS.map(service => [service.key, service]),
) as Record<ServiceKey, ServiceLink>;
