import { Listener } from "discord-akairo";

class ReadyListener extends Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
        });
    }

    public exec() {
        console.log("Client login to discord");
    }
}

export default ReadyListener;
