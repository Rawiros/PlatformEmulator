/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";
import { Alerts } from "@webpack/common";

import { settings } from "./settings";

export default definePlugin({
    name: "PlatformEmulator",
    description: "Trick Discord into thinking that you are using a different operating system.",
    authors: [{ id: 824029986792931328n, name: "Rawir" }],
    settings,
    tags: ["Platform", "Emulator"],

    patches: [
        {
            find: ".browser_user_agent=",
            replacement: {
                match: /(\w)={os:.{0,200}}/,
                replace: (m, varName) => `${m},$self.setProperties(${varName})`
            }
        }
    ],

    getProperties() {
        switch (settings.store.platform) {
            case "win32":
                return {
                    browser: "Discord Client",
                    os: "Windows"
                };
            case "web":
                return {
                    browser: "Discord Web",
                    os: "Other"
                };
            case "android":
                return {
                    browser: "Discord Android",
                    os: "Android"
                };
            default:
                return {};
        }
    },

    showWarning() {
        if (settings.store.warningAccepted) return;

        Alerts.show({
            title: "Safety Warning",
            body: (
                <>
                    <p>Using <code>Platform Emulator</code> may result in <b>Discord disabling your account</b>. It is not confirmed, but it <b>may</b> happen.</p>
                    <p>Do you agree to take <b>full responsibility</b> when using this plugin?</p>
                </>
            ),
            confirmText: "I Agree",
            cancelText: "I disagree",

            onCancel() {
                // @ts-ignore
                settings.store.enabled = false;
            },

            onConfirm() {
                settings.store.warningAccepted = true;
            },
        });
    },

    start() { this.showWarning(); },

    setProperties(properties: any) { if (settings.store.warningAccepted) Object.assign(properties, this.getProperties()); }
});

