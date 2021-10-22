import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

type TFile = {
	type: 'file';
	value: {
		type: string;
		ext: string;
		data: string | ArrayBuffer;
		name: string;
		size: number;
	};
};

type TText = {
	type: 'text';
	value: string;
};

type TMessageParts = TFile | TText[];
type TState = 'hold' | 'sent' | 'seen' | 'failed';

type TMessage = {
	id: string;
	timestamp: number;
	userId: string; // userid
	parts: TMessageParts;
	state: TState;
};

type TChat = { id: string; messages: TMessage[] };
type TChats = TChat[];

const fakeChat: TChats = [
	{
		id: 'chat_0',
		messages: [
			{
				id: 'message_1',
				timestamp: new Date().getTime(),
				userId: '1',
				parts: [
					{
						type: 'text',
						value: 'hello'
					}
				],
				state: 'seen'
			},
			{
				id: 'message_2',
				timestamp: new Date().getTime() + 1000,
				userId: '2',
				parts: [
					{
						type: 'text',
						value: 'hello to you too'
					}
				],
				state: 'sent'
			}
		]
	},
	{
		id: 'chat_1',
		messages: [
			{
				id: 'message_3',
				timestamp: new Date().getTime(),
				userId: '1',
				parts: [
					{
						type: 'text',
						value: 'what are you doing?'
					}
				],
				state: 'seen'
			},
			{
				id: 'message_4',
				timestamp: new Date().getTime() + 1000,
				userId: '2',
				parts: [
					{
						type: 'text',
						value: 'I am confused'
					}
				],
				state: 'seen'
			},
			{
				id: 'mesasge_5',
				timestamp: new Date().getTime() + 10000,
				userId: '2',
				parts: [{ type: 'text', value: 'some random chat bla bla bla' }],
				state: 'sent'
			}
		]
	}
];

export const chats: Writable<TChats> = writable(fakeChat);
export const selectedChat: Writable<string> = writable('');
export const showEmoji: Writable<boolean> = writable(false);
export const currentUserId: Writable<string> = writable('1');
export const currentChat = derived([chats, selectedChat], ([$chats, $selectedChat]) => {
	return $chats.filter((c) => c.id === $selectedChat)[0];
});
