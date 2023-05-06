import HomeStat from "../../components/Home/HomeStat/HomeStat";

function Home() {
  return (
    <div className="py-20 max-w-screen-xl m-auto">
      <div className="flex w-full items-center justify-around px-10">
        <HomeStat title="Protocols" stat="4,561" additional="158" />
        <HomeStat title="Sponsors" stat="258" additional="21" />
        <HomeStat title="Sites" stat="942" additional="184" />
        <HomeStat title="Doctors" stat="1,254" additional="256" />
        <HomeStat title="Staff" stat="8,412" additional="389" />
      </div>
    </div>
  );
}

export default Home;
