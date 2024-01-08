import {RunService, ServerStorage, Workspace} from "@rbxts/services";

export class Bullet {
    private position: Vector3;
    private model: Part;
    private initialVelocity: number;
    private angle: Vector3;

    public constructor(pos: Vector3, iv: number, ang: Vector3) {
        this.position = pos;

        this.initialVelocity = iv;
        this.angle = ang;

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

    public getModel(): Part {
        return this.model;
    }

    public getInitialVelocity(): number {
        return (this.initialVelocity * 20) / 8;
    }

    public getAngle(): Vector3 {
        return this.angle;
    }

    public formulateYPos(t: number): number {
        let v: number = (this.getInitialVelocity() * math.sin(this.getAngle().Z));
        let g: number = -9.81;

        return ((0.5*g*(t^2)) + (v*t));
    }

    public formulateXPos(t: number): number {
        let v: number = (this.getInitialVelocity() * math.cos(this.getAngle().Z));

        return (v*t)
    }
    public adjustForX(h: number): number {
        return ((math.cos(this.getAngle().Y) * -1) * h);
    }

    public adjustForZ(h: number): number {
        return ((math.sin(this.getAngle().Y * -1) * h));
    }

    public moveNCheck(t: number): boolean {
        let initialPosition: Vector3 = this.getPosition();
        this.setPosition(new Vector3(
            initialPosition.X + this.adjustForX(this.formulateXPos(t)),
            initialPosition.Y + this.formulateYPos(t),
            initialPosition.Z + this.adjustForZ(this.formulateXPos(t))
        ));

        let foundParts: BasePart[] = Workspace.GetPartsInPart(this.getModel());
        for (let x of foundParts) {
            if (!(x.Parent)) {
                this.getModel().Destroy();
                return true;
            }
            if (!(x.Parent.FindFirstChildWhichIsA("Humanoid"))) {
                this.getModel().Destroy();
                return true;
            }
            x.Parent.FindFirstChildWhichIsA("Humanoid")!.Health = 0;
            return true;
        }
        return false;
    }

    public launch(): void {
        let timeElapsed: number = 0;

        let collision: boolean = false;
        while (!collision) {
            let startTime = os.clock();
            collision = this.moveNCheck(timeElapsed);
            RunService.Heartbeat.Wait();
            timeElapsed += os.clock() - startTime;
        }
     }
}
