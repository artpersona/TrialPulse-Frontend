import {
  ClipboardDocumentIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import "./ActivitySchedule.styles.css";
import colorPalette from "src/utils/styles/colorPalette";

function ActivitySchedule() {
  return (
    <table className="activitySchedule" border>
      <tbody>
        <tr>
          <th></th>
          <th>Visit</th>
          <th>Screening</th>
          <th>Notes</th>
          <th>Treatments</th>
        </tr>
        <tr>
          <td className="left">Week 1</td>
          <td>
            <input type="checkbox" />
          </td>
          <td>
            <input type="checkbox" />
          </td>
          <td>
            <ClipboardDocumentIcon
              height={20}
              width={20}
              color={colorPalette.SECONDARY_COLOR}
            />
          </td>
          <td className="left">
            <PencilSquareIcon
              height={20}
              width={20}
              color={colorPalette.SECONDARY_COLOR}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ActivitySchedule;
