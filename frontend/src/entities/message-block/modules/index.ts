import {Message, User} from "../../../models";

export * from './my-text-message'
export type MessageBlockType = Message & { user: User }

export * from './my-sticker-message'

export * from './my-voice-message'
export * from './friend-voice-message'
export * from './friend-text-message'
export * from './friend-sticker-message'