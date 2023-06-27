// import { useParams } from "react-router-dom";

// import useGetProtocolsBySponsor from "src/api/sponsors/useGetProtocolsBySponsor";

// import ProtocolItem from "src/components/Sponsors/ProtocolItem";
// import { useAuthContext } from "../../../contexts/AuthContext";

function SponsorProtocols() {
  // const { userDetails } = useAuthContext();
  // console.log(userDetails);

  // const { sponsorId } = useParams();

  // const { api, protocols } = useGetProtocolsBySponsor(
  //   sponsorId || userDetails.sponsorId
  // );

  // if (api.isLoading) {
  //   return <div>Loading..</div>;
  // }

  return (
    <div>
      <h1>hello world</h1>
      {/* {protocols?.map((item) => (
        <ProtocolItem key={item.id} data={item} />
      ))} */}
    </div>
  );
}

export default SponsorProtocols;
