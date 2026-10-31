const logos=[
  {name:'Rinnai',src:'v1760074745/Allied/Rinnai_Logo_Red_uqwftm.png'},
  {name:'Daikin',src:'v1760075323/Allied/download_y9tiqd.png'},
  {name:'Viessmann',src:'v1760075211/Allied/Viessmann-Logo-1_ipdbjs.png'},
  {name:'IBC',src:'v1760074743/Allied/IBC-Logo-for-Gallery_hsklz0.webp'},
];
export default function LogoMarquee() {
  return <section aria-label="Equipment brands" className="py-8 md:py-12"><p className="text-center text-sm font-semibold text-slate-600 mb-7">Equipment we work with</p><div className="grid grid-cols-2 md:grid-cols-4 items-center gap-x-10 gap-y-8">{logos.map(logo=><div key={logo.name} className="h-16 flex items-center justify-center"><img src={`https://res.cloudinary.com/dzytbkc5l/image/upload/f_auto,q_auto,w_360/${logo.src}`} alt={logo.name} loading="lazy" className="max-w-[160px] max-h-14 w-auto h-auto object-contain grayscale opacity-80" /></div>)}</div></section>;
}
