interface IRoute {
  name: string;
  path: string;
}

const routes: IRoute[] = [
  {name: "home", path: "/"},
  {name: "about", path: "/about"},
  {name: "counter", path: "/counter"},
  {name: "deposit", path: "/deposit"},
  {name: "peak", path: "/peak"},
  {name: "register", path: "/register"},
  {name: "stars", path: "/stars"}
];

export default routes;
