import { Bullet } from "./Bullet";

let b: Bullet = new Bullet(new Vector3(0, 1 ,0), 420, new Vector3(0, 45, 45));
wait(7)
b.launch();
