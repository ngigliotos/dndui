import { Button } from "antd";
import ROUTES from "../constants/routes";

export function Start() {
  return (
    <Button className="start-new-char-button" href={ROUTES.character}>
      Create New Character
    </Button>
  );
}

export default Start;
