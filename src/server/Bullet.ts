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
        return this.convertUnits(this.initialVelocity);
    }

    public getAngle(): Vector3 {
        return this.angle;
    }

    public convertUnits(x: number): number {
        return (x * 20) / 8;
    }

    public formulateYPos(t: number, x: number): number {
        let v: number = (this.getInitialVelocity() * math.sin(math.rad(this.getAngle().Z)));
        let g: number = this.convertUnits(-9.81);
        return ((0.5*g*(t**2)) + (v*t) + x);
    }

    public formulateXPos(t: number, x: number): number {
        let v: number = (this.getInitialVelocity() * math.cos(math.rad(this.getAngle().Z)));

        return (v*t + x)
    }
    public adjustForX(h: number): number {
        return (math.cos(math.rad(this.getAngle().Y) * -1) * h);
    }

    public adjustForZ(h: number): number {
        return (math.sin(math.rad(this.getAngle().Y) * -1) * h);
    }

    public moveNCheck(t: number, initialPosition: Vector3): boolean {
        this.setPosition(new Vector3(
            this.adjustForX(this.formulateXPos(t, initialPosition.X)),
            this.formulateYPos(t, initialPosition.Y),
            this.adjustForZ(this.formulateXPos(t, initialPosition.Z))
        ));

        let foundParts: BasePart[] = Workspace.GetPartsInPart(this.getModel());
        for (let x of foundParts) {
            if (!(x.Parent)) {
                this.getModel().Destroy();
                print("hit " + x.Name);
                return true;
            }
            if (!(x.Parent.FindFirstChildWhichIsA("Humanoid"))) {
                this.getModel().Destroy();
                print("hit " + x.Name);
                return true;
            }
            x.Parent.FindFirstChildWhichIsA("Humanoid")!.Health = 0;
            print("hit person");
            return true;
        }
        return false;
    }

    public launch(): void {
        let timeElapsed: number = 0;

        let collision: boolean = false;
        let initialPosition: Vector3 = this.getPosition();
        while (!collision) {
            let startTime = os.clock();
            collision = this.moveNCheck(timeElapsed, initialPosition);
            RunService.Heartbeat.Wait();
            timeElapsed += os.clock() - startTime;
        }
     }
}
