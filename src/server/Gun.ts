import {ServerStorage} from "@rbxts/services";
import { Bullet } from "./Bullet";

export class Gun {
    private animationState: String;
    private model: Tool;
    private owner: Player;
    private velocity: number;
    private bullet: Bullet | undefined;

    public constructor(m: Tool, p: Player, v: number) {
        this.animationState = "Unequipped";
        this.owner = p;

        this.model = ServerStorage.Tool.Clone();
        this.model.Parent = this.owner.FindFirstChildOfClass("Backpack");

        this.velocity = v;

        this.bullet = undefined;
    }

    public getModel(): Tool {
        return this.model;
    }

    public getOwner(): Player {
        return this.owner;
    }

    public getAnimationState(): String {
        return this.animationState;
    }

    public getVelocity(): number {
        return this.velocity;
    }

    public setAnimationState(s: String): void {
        if (!(this.getModel().Parent?.ClassName === "Backpack")) {
            this.animationState = this.playAnimation(s);
        }
    }

    public playAnimation(s: String): String {
        return s;
    }

    public fire(): void {
        this.bullet = new Bullet((this.getModel().WaitForChild("BulletSpawner") as Part).Position, this.getVelocity(), new Vector3(45,45, 90), true);
    }

    //Input reciving functions

    public sendMouseClick(): void {}

    public sendFKEy(): void {}
}
