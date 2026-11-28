import { Link } from '../lib/navigation';
import JsonLd from '../components/JsonLd';
import { breadcrumbSchema } from '../lib/schema';

/** Section 6b of the November 2026 page-copy plan: a landing page for the
 *  buyer who is a volunteer rather than a facilities department.
 *
 *  It does not repeat `/clients`, which answers "whose buildings have you
 *  worked in". This answers a different question: how a strata council or a
 *  property manager gets from "the boiler is old" to a plant that was
 *  replaced on their own schedule. That is a question about votes, notices
 *  and budget years as much as about mechanical work, which is why the page
 *  is organised around the decision rather than around the equipment.
 *
 *  Two projects the plan wanted linked from here have no page yet. Olympic
 *  Village is marked [confirm current] and [confirm] for its parcel count and
 *  start year, and the central plant in Burnaby carries [Owner name, if
 *  approved] and no confirmed year. So both are described by the work rather
 *  than by a count, a date or an owner, and neither is linked — a link to a
 *  case study that does not exist is worse than no link, and a suite count
 *  nobody has checked is worse than no number. */
export default function Strata() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <JsonLd data={breadcrumbSchema([{ name: 'Strata and rental buildings', path: '/strata' }])} />

      <h1 className="text-4xl md:text-5xl font-extrabold">Mechanical services for strata corporations and rental buildings</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-700">
        When a strata&rsquo;s boiler or hot water plant fails, every owner hears about it the same
        morning. We help councils and property managers replace central plants on their own
        schedule, before that happens, and keep the systems running in the years between
        replacements.
      </p>
      <div className="mt-7 flex flex-wrap gap-4">
        <Link to="/quote?type=quote&amp;service=boilers" className="btn-brand">
          Request a strata assessment <span aria-hidden>↗</span>
        </Link>
        <a href="tel:+16047311000" data-cta-location="page" className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold">
          Call 604-731-1000
        </a>
      </div>

      <div className="mt-14 max-w-3xl space-y-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Built for how strata decisions actually get made</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            A council does not buy a boiler plant the way a school district does. There is no
            facilities department, the people deciding are owners with day jobs, and the money
            comes out of a fund with rules attached. The work below is the part that happens
            before anyone picks up a tool.
          </p>

          <h3 className="mt-8 text-xl font-semibold">Quotes a council can vote on</h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            Options side by side rather than one number: repair, like-for-like replacement, a
            high-efficiency condensing plant, and a heat pump hybrid. Each one shows installed
            cost, the warranty, the schedule, the electrical capacity it needs, and what it means
            for owners while the work happens. A single quote forces a council to choose between
            yes and nothing; four priced options let them choose between answers.
          </p>

          <h3 className="mt-8 text-xl font-semibold">Tied to your depreciation report</h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            We map the report&rsquo;s mechanical line items to the equipment actually in the room and
            to real dates, so the contingency reserve plan reflects the plant rather than a desk
            estimate. This is worth doing early for a reason that has nothing to do with
            mechanical work: spending from the contingency reserve fund normally needs a 3/4
            vote, but where the repair or replacement is recommended in the strata&rsquo;s most current
            depreciation report, section 96 of the Strata Property Act allows it on a majority
            vote. Planning ahead is the difference between those two thresholds. Confirm the
            current wording with your strata manager — we are a contractor, not your lawyer.
          </p>

          <h3 className="mt-8 text-xl font-semibold">Owner and tenant notices</h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            We draft the shutdown notice for your property manager to send, with the exact dates
            and hours, whether hot water is affected, and who to call. The contractor knows which
            hours are genuinely at risk, so the notice should come from the contractor and go out
            under the manager&rsquo;s name. A building told in advance that Tuesday morning will be
            cold complains far less than a building that finds out on Tuesday morning.
          </p>

          <h3 className="mt-8 text-xl font-semibold">Heat and hot water kept on</h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            The new plant is built and piped alongside the old one while it is still running, and
            the tie-in happens in one planned shutdown, usually overnight or on a weekend. Where
            a changeover needs longer than a shift, temporary heat or a temporary hot water heater
            covers the gap. Residents are at home rather than at work, which makes a restart that
            happens when it was promised matter more here than anywhere else we work.
          </p>

          <h3 className="mt-8 text-xl font-semibold">Incentive paperwork</h3>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            The owner applies; we supply the quotes, equipment specifications and invoices in the
            format each programme asks for. Most programmes require written pre-approval before a
            contract is signed or work starts, so the application belongs before the order rather
            than after it. In BC the programmes now favour switching away from gas, which is why
            a hybrid option is worth pricing even when the council expects to replace like for
            like.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Plants we have replaced in occupied residential buildings</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            At{' '}
            <Link to="/projects/haro" className="font-semibold text-red-800 underline underline-offset-4">
              1755 Haro Street
            </Link>{' '}
            in the West End, separate space-heating and domestic hot water plants at end of life
            were replaced by a single Viessmann CA3 condensing plant rated at 2.5 million BTU/h,
            serving both and connected to the building&rsquo;s existing low-rise and high-rise hot
            water systems. Allied did the layout in-house with the manufacturer, and our own
            gasfitters commissioned it and set up the programming.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            At{' '}
            <Link to="/projects/jervis" className="font-semibold text-red-800 underline underline-offset-4">
              945 Jervis Street
            </Link>
            , heating, domestic hot water and make-up air were renewed in an occupied rental
            high-rise — three systems in one scope, in a building nobody moved out of.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            We also replace central plants at a larger scale. In one Burnaby complex, three
            atmospheric boilers of 6.5 million BTU/h each were replaced with three De Dietrich
            condensing boilers of 5 million BTU/h on Weishaupt burners, with new welded 8-inch
            heating mains and 6-inch branches for heating and hot water production, and variable
            frequency drive pumps on the hydronic system. The work was staged so that two
            residential towers and an adjoining office tower — the office tower on heat pumps fed
            from a central cooling tower — kept heat and hot water throughout, and Allied
            contributed to the DDC programming for the new plant.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            In Vancouver&rsquo;s Olympic Village we hold scheduled maintenance on district-energy strata
            buildings, parcel by parcel. Every suite has its own energy transfer station taking
            heating and cooling from the city&rsquo;s district energy system — among the first installed
            in the Lower Mainland — and each parcel also runs chillers, rainwater cisterns with
            booster pumps feeding toilets and irrigation, heat pumps, air handling units, rooftop
            units and make-up air units, all under integrated controls.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Those two are described rather than linked because they have no project page yet. The
            equipment above is on record; the building owner, the dates and the number of parcels
            and suites are not confirmed for publication, so they are left out. We publish a
            project page when the work can be described accurately, and a client name when the
            client has said yes.
          </p>
          <p className="mt-5">
            <Link to="/clients" className="font-semibold text-red-800 underline underline-offset-4">
              See the organisations we work for
            </Link>{' '}
            or{' '}
            <Link to="/projects" className="font-semibold text-red-800 underline underline-offset-4">
              read the project scopes
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold">For property managers</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            One contact for service calls across your portfolio, one invoice format, and visit
            reports you can forward to a council without editing them first. The inventories,
            reports and as-builts belong to the building: if you change contractors, we hand the
            records over, with no fee and no delay.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Between replacements, a{' '}
            <Link to="/services/maintenance" className="font-semibold text-red-800 underline underline-offset-4">
              scheduled maintenance programme
            </Link>{' '}
            is what turns a 2 a.m. no-heat call into a planned visit, and what tells a council
            years ahead which equipment the budget has to cover.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Where to start</h2>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Send photographs of the boiler or water heater nameplates and the mechanical page of
            your depreciation report. We will tell you what you have, what is worth repairing, and
            what replacement would cost — enough to take to a council meeting rather than enough
            to sign.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            If you are a year or more away from the decision, the planning guide below is the
            order we would work in:{' '}
            <Link to="/blog/strata-boiler-replacement-planning" className="font-semibold text-red-800 underline underline-offset-4">
              replacing a strata boiler before it fails
            </Link>
            . For the plant itself, see{' '}
            <Link to="/services/boilers" className="font-semibold text-red-800 underline underline-offset-4">
              boiler plants and controls
            </Link>{' '}
            and{' '}
            <Link to="/services/heat-pump-conversions" className="font-semibold text-red-800 underline underline-offset-4">
              heat pump conversions
            </Link>
            .
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link to="/quote?type=quote&amp;service=boilers" className="btn-brand">
              Request a strata assessment <span aria-hidden>↗</span>
            </Link>
            <Link to="/quote?type=maintenance" className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold">
              Ask about a maintenance programme
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
