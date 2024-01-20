import { Gun } from "./Gun";

export class Rifle extends Gun {
    public constructor(m: Tool, p: Player) {
        super(m,p,420);
    }
}
