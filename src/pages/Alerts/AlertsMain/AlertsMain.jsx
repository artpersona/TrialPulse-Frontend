import { Outlet, useSearchParams } from "react-router-dom";

import useGetAlerts from "src/api/alerts/useGetAlerts";

import Sidebar from "src/components/Sidebar/Sidebar";
import AlertItem from "src/components/Alerts/AlertItem/AlertItem";
import ContentSidebar from "src/components/ContentSidebar/ContentSidebar";
import { useEffect } from "react";

function AlertsMain() {
  const [searchParams] = useSearchParams();

  const { alerts, api } = useGetAlerts({
    sort: searchParams.get("sort") || "",
  });

  useEffect(() => {
    api.refetch({
      sort: searchParams.get("sort") || "",
    });
  }, [searchParams]);

  if (api.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="relative">
      <Sidebar hideNavbar>
        <div>
          {alerts.map((item) => (
            <AlertItem key={item.id} data={item} />
          ))}
        </div>
      </Sidebar>

      <ContentSidebar>
        <Outlet />
      </ContentSidebar>
    </div>
  );
}

export default AlertsMain;
