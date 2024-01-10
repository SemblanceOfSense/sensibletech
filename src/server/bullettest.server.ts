import { Bullet } from "./Bullet";

let b: Bullet = new Bullet(new Vector3(0, 2 ,0), 30, new Vector3(0, 30, 45), false);
wait(5);
b.launch();
let c: Bullet = new Bullet(new Vector3(0, 2 ,0), 30, new Vector3(0, 30, 45), true);
c.launch();
