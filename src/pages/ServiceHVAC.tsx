import ServiceTemplate from './ServiceTemplate';

/** All content lives in src/data/services-content.json (audit I-02), so a
 *  copy change never touches a component. */
export default function ServiceHVAC() {
  return <ServiceTemplate service="hvac" />;
}
