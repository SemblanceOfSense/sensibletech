import { ReplicatedStorage } from "@rbxts/services";
import { t } from "t";
import { createServer } from "./teleporter"

let createServerEvent: RemoteEvent = ReplicatedStorage.WaitForChild("createServer") as RemoteEvent;
let joinServer: RemoteEvent = ReplicatedStorage.WaitForChild("joinServer") as RemoteEvent;

createServerEvent.OnServerEvent.Connect((player: Player, map: unknown) => {
    /* Map list:
       1 - The only map so far lol */

    assert(t.number(map));
    coroutine.resume(coroutine.create((player: Player, map: number) => createServer(player, map)));
})

joinServer.OnServerEvent.Connect((player: Player, joinCode: unknown) => {
    assert(t.string(joinCode));
})
