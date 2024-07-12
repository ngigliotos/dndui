import { Button } from "antd";
import ROUTES from "../constants/routes";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { fetchCharacters, selectCharacters } from "../store/Characters";
import { useSelector } from "react-redux";
import { fetchSpells } from "../store/Spells";
import { Link, useLocation } from "react-router-dom";
import { fetchClasses } from "../store/Classes";

export function HeaderContent() {
  const dispatch = useAppDispatch();

  const characters = useSelector(selectCharacters);

  const location = useLocation();

  const isActiveLink = useCallback(
    (route: string, useInclude: boolean = true) => {
      if (!useInclude) {
        return (
          location.pathname.replaceAll("/", "").toLowerCase() ===
          route.replaceAll("/", "").toLowerCase()
        );
      }
      return location.pathname.indexOf(route) !== -1;
    },
    [location.pathname]
  );

  //Reads in the character files and parses them into objects once on load
  useEffect(() => {
    dispatch(fetchCharacters())
      .unwrap()
      .catch(async (e) => {
        console.log(e);
        return true;
      });
    dispatch(fetchSpells())
      .unwrap()
      .catch(async (e) => {
        console.log(e);
        return true;
      });
    dispatch(fetchClasses())
      .unwrap()
      .catch(async (e) => {
        console.log(e);
        return true;
      });
  }, [dispatch]);

  return (
    <div className="header-content">
      <Link to={ROUTES.spells} className="header-link">
        <Button
          className={
            isActiveLink(ROUTES.spells)
              ? "start-new-char-button-selected"
              : "start-new-char-button"
          }
        >
          Spells
        </Button>
      </Link>
      <Link className="header-link" to={ROUTES.classes}>
        <Button
          className={
            isActiveLink(ROUTES.classes)
              ? "start-new-char-button-selected"
              : "start-new-char-button"
          }
        >
          Classes
        </Button>
      </Link>
      <Link className="header-link" to={ROUTES.character + "/"}>
        <Button
          className={
            isActiveLink(ROUTES.character, false)
              ? "start-new-char-button-selected"
              : "start-new-char-button"
          }
        >
          Create New character
        </Button>
      </Link>
      {Object.entries(characters).map((char) => {
        return (
          <Link
            to={`${ROUTES.character}/${char[0]}`}
            key={char[1].name}
            className="header-link"
          >
            <Button
              key={`char-button${char[1].name}`}
              className={
                isActiveLink(`${ROUTES.character}/${char[0]}`)
                  ? "start-new-char-button-selected"
                  : "start-new-char-button"
              }
            >
              Character: {char[1].name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}

export default HeaderContent;
