import {ServerStorage, Workspace} from "@rbxts/services";

export class Bullet {
    private position: Vector3;
    private model: Part;

    public constructor(pos: Vector3) {
        this.position = pos;

        this.model = ServerStorage.Bullet.Clone();
        this.model.Parent = Workspace;
        this.setPosition(pos);
    }

    public getPosition(): Vector3 {
        return this.position;
    }

    public setPosition(p: Vector3): void {
        this.position = p;
        this.model.Position = this.position;
    }
}
