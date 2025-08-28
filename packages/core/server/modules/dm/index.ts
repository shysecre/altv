import { Clothe, Team } from "./sturctures/team";

const teams = [
  new Team({
    clothes: [
      new Clothe({ type: "prop", componentId: 0, drawable: 109, textureId: 0 }),
      new Clothe({
        type: "clothe",
        componentId: 11,
        drawable: 338,
        textureId: 7
      }),
      new Clothe({ type: "clothe", componentId: 4, drawable: 0, textureId: 0 })
    ],
    spawn_cords: [-505, 1186, 324],
    name: "red"
  }),
  new Team({
    clothes: [
      new Clothe({ type: "prop", componentId: 0, drawable: 76, textureId: 0 }),
      new Clothe({
        type: "clothe",
        componentId: 11,
        drawable: 338,
        textureId: 9
      }),
      new Clothe({ type: "clothe", componentId: 4, drawable: 0, textureId: 0 })
    ],
    spawn_cords: [-492, 1198, 324],
    name: "blue"
  })
];
