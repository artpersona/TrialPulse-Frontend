import HomeStat from "../../components/Home/HomeStat/HomeStat";
import { options, data } from "../../utils/dummy/chart.utitlity";
import { homeB, homeC } from "../../utils/dummy/dashboardSample.utility";
import colorPalette from "../../utils/styles/colorPalette";
import SwiperCardsHome from "./SwiperCardsHome";
import SwiperNewSponsors from "./SwiperNewSponsors";

function Home() {
  return (
    <div className="py-20 container m-auto">
      <section className="flex justify-between space-x-5 bg-white p-4 max-w-[1280px] m-auto">
        <HomeStat
          title="Protocols"
          stat="4,561"
          additional="158"
          options={options}
          data={data}
          days={7}
        />
        <HomeStat
          title="Sponsors"
          stat="258"
          additional="21"
          options={options}
          data={data}
          days={7}
        />
        <HomeStat
          title="Sites"
          stat="942"
          additional="184"
          options={options}
          data={data}
          days={7}
        />
        <HomeStat
          title="Doctors"
          stat="1,254"
          additional="256"
          options={options}
          data={data}
          days={7}
        />
        <HomeStat
          title="Staff"
          stat="8,412"
          additional="389"
          options={options}
          data={data}
          days={7}
        />
      </section>

      <section className="border-t-2 border-t-gray-light py-4">
        <h4 className="text-lg" style={{ color: colorPalette.GRAY_DARK }}>
          Recently Viewed
        </h4>
        <SwiperCardsHome data={homeB} type="recentlyViewed" />
      </section>

      <section className="border-t-2 border-t-gray-light py-4">
        <h4 className="text-lg" style={{ color: colorPalette.GRAY_DARK }}>
          New Studies
        </h4>
        <SwiperCardsHome data={homeB} type="newStudies" />
      </section>

      <section className="border-t-2 border-t-gray-light py-4">
        <h4 className="text-lg" style={{ color: colorPalette.GRAY_DARK }}>
          New Sponsors
        </h4>
        <SwiperNewSponsors data={homeC} type="newStudies" />
      </section>
    </div>
  );
}

export default Home;
