import {RunService, ServerStorage, Workspace} from "@rbxts/services";

export class Bullet {
    private position: Vector3;
    private model: Part;
    private initialVelocity: number;
    private angle: Vector3;
    private isDrag: boolean;

    public constructor(pos: Vector3, iv: number, ang: Vector3, is: boolean) {
        this.isDrag = is;

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
        if (this.isDrag) {
            return ((0.5*this.getDragAdjustedYAcceleration(t)*(t**2)) + (v*t) + x);
        }
        return ((0.5*this.convertUnits(-9.81)*(t**2)) + (v*t) + x);
    }

    public formulateXPos(t: number, x: number): number {
        let v: number = (this.getInitialVelocity() * math.cos(math.rad(this.getAngle().Z)));

        if (this.isDrag) {
            return ((0.5 * this.getDragAdjustedXAcceleration(t) * (t**2)) + (v*t) + x)
        }
        return ((v*t) + x);
    }

    public adjustForX(h: number): number {
        return (math.cos(math.rad(this.getAngle().Y) * -1) * h);
    }

    public adjustForZ(h: number): number {
        return (math.sin(math.rad(this.getAngle().Y) * -1) * h);
    }

    public getDragAdjustedYAcceleration(t: number): number {
        let initialVelocity: number = this.getInitialVelocity();
        let mass: number = this.convertUnits(0.02719);
        let airDensity: number = this.convertUnits(1.293);
        let dragCoefficent: number = 0.47;
        let bulletArea: number = this.convertUnits((0.017526 ** 2) * math.pi);

        let dragForce: number = (0.5 * dragCoefficent * airDensity * bulletArea) * ((this.convertUnits(-9.81) * t) + initialVelocity);

        return (((this.convertUnits(-9.81) * mass) - dragForce) / mass);
    }

    public getDragAdjustedXAcceleration(t: number): number {
        let initialVelocity: number = this.getInitialVelocity();
        let mass: number = this.convertUnits(0.02719);
        let airDensity: number = this.convertUnits(1.293);
        let dragCoefficent: number = 0.47;
        let bulletArea: number = this.convertUnits((0.017526 ** 2) * math.pi);

        let dragForce: number = (0.5 * dragCoefficent * airDensity * bulletArea) * (initialVelocity);

        return (dragForce * -1) / mass;
    }

    public moveNCheck(t: number, initialPosition: Vector3): boolean {
        this.setPosition(new Vector3(
            this.adjustForX(this.formulateXPos(t, initialPosition.X)),
            this.formulateYPos(t, initialPosition.Y),
            this.adjustForZ(this.formulateXPos(t, initialPosition.Z))
        ));

        let foundParts: BasePart[] = Workspace.GetPartsInPart(this.getModel());
        for (let x of foundParts) {
            if (x.CanCollide === false) {
                continue;
            }

            if (!(x.Parent)) {
                print("hit " + x.Name);
                return true;
            }
            if (!(x.Parent.FindFirstChildWhichIsA("Humanoid"))) {
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
