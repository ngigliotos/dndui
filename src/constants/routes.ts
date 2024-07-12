const ROUTES = {
  root: "main_window",
  character: "/character",
  start: "/start",
  spells: "/spells,",
  classes: "/classes",
  classInfo: "/class",
  races: "/races",
  raceInfo: "/race",
};

export const makeRoute = (...parts: string[]) => {
  return parts
    .map((p) =>
      p.startsWith("/") || p.startsWith("https://") ? p : encodeURIComponent(p)
    )
    .join("/");
};

export default ROUTES;
