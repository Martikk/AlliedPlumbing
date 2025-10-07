import { EMAIL_INFO } from '@/config';

export default function Careers() {
  return (
    <section className="prose max-w-none">
      <h1>Careers at Allied</h1>
      <p>Always hiring: Journeyperson Plumber, Gasfitter B, Apprentice. Safe sites, steady hours, OT opportunities, paid training, diverse projects.</p>
      <p>Email your resume to <a href={`mailto:${EMAIL_INFO}`}>{EMAIL_INFO}</a>.</p>
    </section>
  );
}