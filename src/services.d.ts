interface Workspace extends Model {
	Camera: Camera;
}

interface ReplicatedStorage extends Instance {
	createServer: RemoteEvent;
	joinServer: RemoteEvent;
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@rbxts"]: Folder & {
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				services: ModuleScript;
			};
		};
	};
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
