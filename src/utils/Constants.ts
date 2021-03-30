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
            Log.info("Found .git directory, getting version from ")
        }
    }
    static checkGit(): void {
        if (fs.existsSync(".git")) {
            this.getVersionFromGit();
        } else {
            this.getVersionFromFile();
        }
    }

    static getVersionFromGit(): void {
        // check for version tag
        try {
            this.version = execSync("git describe --tags --abbrev=0 --always").toString('ascii');
            if (!this.versions.includes(this.version)) {
                this.version = "unknown";
            }
        } catch (e) {

        }

    }

    static getVersionFromFile(): void {
        try {
            const fileContents =
        }
    }
}


