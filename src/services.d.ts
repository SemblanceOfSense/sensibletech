interface Workspace extends Model {
	Camera: Camera;
	Baseplate: Part;
}

interface ServerStorage extends Instance {
	Tool: Tool & {
		Handle: Part & {
			WeldConstraint: WeldConstraint;
		};
		BulletSpawner: Part;
	};
	Bullet: Part & {
		Trail: Trail;
	};
}
