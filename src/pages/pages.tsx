import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "../constants/routes";
import Character from "./Character";
import { Start } from "./Start";
import Header from "../components/Header";
import { Spells } from "./Spells";
import { Class } from "./Class";
import Classes from "./Classes";
import ScrollToTop from "../components/ScrollToTop";
import { useSelector } from "react-redux";
import { selectCharacters } from "../store/Characters";

const { character, root, start, spells, classes, classInfo } = ROUTES;

function Pages() {
  const characters = useSelector(selectCharacters);
  return (
    <Header>
      {/*This is to scroll to the top of every page on load. It
      Fixes pages jumping to locations after their render loads initial data*/}
      <ScrollToTop />

      <Routes>
        <Route
          path={`${character}/:id`}
          element={<Character characters={characters} />}
        />
        <Route
          path={character}
          element={<Character characters={characters} />}
        />
        <Route path={root} element={<Navigate to={character} />} />
        <Route path={spells} element={<Spells />} />
        <Route path={classes} element={<Classes />} />
        <Route path={`${classInfo}/:class`} element={<Class />}></Route>
      </Routes>
    </Header>
  );
}

export default Pages;
