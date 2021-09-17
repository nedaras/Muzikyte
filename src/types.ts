import type { Message as DiscordMessage, VoiceChannel } from 'discord.js';

export interface Songs {
    play: (channel: VoiceChannel, title: string) => void
    skip: (channel: VoiceChannel) => void
    //leave: () => void

}

export type Command = (args: string[], message: DiscordMessage, songs: Songs) => void