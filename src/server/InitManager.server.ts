import { ReplicatedStorage } from "@rbxts/services";
import { t } from "t";

let createServer: RemoteEvent = ReplicatedStorage.FindFirstChild("createServer") as RemoteEvent;

createServer.OnServerEvent.Connect((map: unknown) => {
    assert(t.number(map));
})
