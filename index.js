import * as core from "@actions/core";
import {context} from "@actions/github";

export async function run() {
    try {
        if (context.eventName !== "release") {
            core.setFailed(`Cannot execute release action in event '${context.eventName}'.`);
            return;
        }

        let tag = context.payload.release?.tag_name;
        if (tag.length < 5) {
            core.setFailed(`Invalid release tag. Expecting either 'v1.2.3' or '1.2.3' or 'v1.2.3-preview' but got '${tag}'.`);
            return;
        }

        if (tag.startsWith("v")) {
            tag = tag.substring(1);
        }
        core.info(`Version: ${tag}`);

        const format = core.getInput('format');
        core.info(`Format: ${format}`);

        if (format === 'tomcat') {
            tag = tag.split('.').map((v) => v.padStart(3, '0')).join('.');
        }

        core.setOutput("version", tag);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
