import { Bullet } from "./Bullet";

let b: Bullet = new Bullet(new Vector3(0, 2 ,0), 10, new Vector3(0, 30, 45));
wait(4);
b.launch();
wait(2);
let c: Bullet = new Bullet(new Vector3(0, 2, 0), 10, new Vector3(0, 45, 45));
c.launch();
let d: Bullet = new Bullet(new Vector3(0, 2, 0), 10, new Vector3(0, 90, 45));
d.launch();