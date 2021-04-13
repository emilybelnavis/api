import {execSync} from "child_process";
import fs from 'fs'
import { NoVersionTagError, InvalidVersionTagError } from "@utils/Error";
import Log from "@utils/Log";

export default abstract class Constants {
    static versions: string[] = [
        "copernicus"
    ]
    static version: string;

    static versionCheck(): void {
        // check for git
        if (fs.existsSync(".git")) {
            Log.debug("Found .git directory, checking for version tag");
            try {
                this.version = execSync("git describe --tags --abrev=0 --always").toString('ascii');
                if (!this.versions.includes(this.version)) {
                    // check branch name
                    this.version = execSync("git branch --show-curent").toString('ascii');
                }
            } catch (e) {
                this.version = "unknown"
            }
        }
    }
}


