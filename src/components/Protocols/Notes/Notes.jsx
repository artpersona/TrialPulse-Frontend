import "./Notes.styles.css";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";

function Notes() {
  return (
    <div className="notes">
      <div className="notes__top">
        <div
          className="notes__topIcon"
          style={{ backgroundColor: colorPalette.GRAY }}
        >
          <ClipboardDocumentIcon width={25} height={25} color="white" />
        </div>
        <h4 style={{ color: colorPalette.PRIMARY_COLOR, fontSize: 20 }}>
          Notes
        </h4>
      </div>

      <div className="notes__description">
        <p>
          lorem ipsum hello workd jasjaklsds test mic whenecer i say hahssn
          lorem ipsum hello workd jasjaklsds test mic whenecer i say hahssnlorem
          ipsum hello workd jasjaklsds test mic whenecer i say hahssn lorem
          ipsum hello workd jasjaklsds test mic whenecer i say hahssnlorem ipsum
          hello workd jasjaklsds test mic whenecer i say hahssn
        </p>
      </div>
    </div>
  );
}

export default Notes;
