import { Bullet } from "./Bullet";

let b: Bullet = new Bullet(new Vector3(0, 2 ,0), 420, new Vector3(0, 30, 45));
wait(5);
b.launch();