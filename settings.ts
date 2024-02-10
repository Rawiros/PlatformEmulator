/* eslint-disable simple-header/header */
/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

import plugin from "./index";

export const settings = definePluginSettings({
    platform: {
        placeholder: "Platform type",
        description: "Platform you want to emulate",
        restartNeeded: true,
        type: OptionType.SELECT,
        options: Object.entries({
            win32: { label: "Windows (Desktop)", default: IS_DISCORD_DESKTOP },
            web: { label: "Browser (Web)", default: IS_WEB },
            android: { label: "Android (Mobile)" }
        }).map(platform => ({ ...platform[1], value: platform[0] })),
        onChange: () => plugin.showWarning()
    }
}).withPrivateSettings<{
    warningAccepted: boolean;
}>();
