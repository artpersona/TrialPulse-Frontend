import Sidebar from "src/components/Sidebar/Sidebar";
import UserChatItem from "src/components/Chat/UserChatItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";
import { Outlet } from "react-router-dom";
import useChatLandingData from "./hooks/useChatLandingData";
const dummyData = [
  {
    id: 35,
    firstName: "da",
    lastName: "aw",
    position: "Sponsor Staff",
    email: "fleeasura18@gmail.com",
    contactNumber: "12313213",
    address1: "1232123",
    address2: "123213213",
    cityId: 230,
    cityName: "Abbeville",
    stateId: 1,
    stateName: "Alabama",
    zipcode: "8000",
  },
  {
    id: 38,
    firstName: "Michael",
    lastName: "Phelps",
    position: "Site Staff",
    email: "test2@gmail.com",
    contactNumber: "12312321",
    address1: "test",
    address2: "test",
    cityId: 230,
    cityName: "Abbeville",
    stateId: 1,
    stateName: "Alabama",
    zipcode: "1231",
  },
  {
    id: 37,
    firstName: "Jane",
    lastName: "Doe",
    position: "Site Staff",
    email: "test1@gmail.com",
    contactNumber: "1231231",
    address1: "12312",
    address2: "123123",
    cityId: 1425,
    cityName: "Arizona City",
    stateId: 3,
    stateName: "Arizona",
    zipcode: "8000",
  },
  {
    id: 42,
    firstName: "spnsradmin 1",
    lastName: "spnsradmin 1",
    position: "Sponsor Admin",
    email: "sponsoradmin1@gmail.com",
    contactNumber: "12312313",
    address1: "deca indangan davao city",
    address2: "123123",
    cityId: 1419,
    cityName: "Aguila",
    stateId: 3,
    stateName: "Arizona",
    zipcode: "8000",
  },
];
function ChatLanding() {
  const { adminContacts } = useChatLandingData();

  return (
    <div className="relative">
      <Sidebar hideNavbar>
        <div>
          {adminContacts?.map((item) => (
            <UserChatItem key={item.id} data={item} />
          ))}
        </div>
      </Sidebar>

      <ContentSidebar>
        <Outlet />
      </ContentSidebar>
    </div>
  );
}

export default ChatLanding;
