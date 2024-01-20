import {TeleportService} from "@rbxts/services";

let placeIDs: number[] = [];


const ATTEMPT_LIMIT: number = 5;
const RETRY_DELAY: number = 1;
const FLOOD_DELAY: number = 15;

export function createServer(player: Player, map: number) {
    let teleportOptions: TeleportOptions = generateTeleportOptions(true);

    TeleportService.TeleportInitFailed.Connect(handleFailedTeleport);

    safeTeleport(true, player, map, teleportOptions);
}

function safeTeleport(newServer: boolean, player: Player, map: number, teleportOptions: TeleportOptions) {
    let success: boolean | unknown, result: any;
    let attemptIndex = 0;

    while (true) {
        if (success || attemptIndex === ATTEMPT_LIMIT) {
            break;
        }

        [success, result] = pcall(() => {
            return TeleportService.TeleportAsync(placeIDs[map], [player], teleportOptions);
        })

        attemptIndex++;

        if (!success) {
            task.wait(RETRY_DELAY)
        }
    }

    if (!success) {
        warn(result);
    }
}

function handleFailedTeleport(player: Player, teleportResult: Enum.TeleportResult /*This typing is lazy pls change it */, errorMessage: string, placeId: number, teleportOptions: Instance) {
    if (teleportResult === Enum.TeleportResult.Flooded) {
        task.wait(FLOOD_DELAY);
    } else if (teleportResult === Enum.TeleportResult.Failure) {
        task.wait(RETRY_DELAY);
    } else {
        error(("Invalid teleport [%s]: %s").format(teleportResult.Name, errorMessage));
    }
}

function generateTeleportOptions(newServer: boolean, joinCode: string = ""): TeleportOptions {
    let returnValue: TeleportOptions = new Instance("TeleportOptions");

    if (newServer) {returnValue.ShouldReserveServer = newServer;} else {returnValue.ReservedServerAccessCode = joinCode}


    return returnValue;
}
