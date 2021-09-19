import type { Message as DiscordMessage, VoiceChannel } from 'discord.js';

type errors = 'NOTFOUND' | 'NOTSUPPORTED' | 'NOTURL'
export interface Songs {
    play: (channel: VoiceChannel, title: string, onError: (type: errors) => void) => void
    skip: () => void
    clear: () => void
    stop: () => void

}

export type Command = (args: string[], message: DiscordMessage, songs: Songs) => void