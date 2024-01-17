interface Workspace extends Model {
	Camera: Camera;
	Baseplate: Part;
}

interface ServerStorage extends Instance {
	Bullet: Part;
}

interface Workspace extends Model {
	Camera: Camera;
	Tool: Tool & {
		Handle: Part & {
			TouchInterest: TouchTransmitter;
			WeldConstraint: WeldConstraint;
		};
		BulletSpawner: Part;
	};
	Baseplate: Part;
}
