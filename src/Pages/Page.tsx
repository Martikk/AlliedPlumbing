export default function Page({title, children}:{title:string; children:React.ReactNode}) {
  return (
    <section className="prose max-w-none">
      <h1>{title}</h1>
      {children}
    </section>
  );
}